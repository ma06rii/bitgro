import type { Page, ConsoleMessage } from '@playwright/test'

// Patterns we never want to fail tests on. These are environment noise, not app bugs:
//  - favicon 404s in dev
//  - Iconify CDN fetch failures (icons load asynchronously from a third-party CDN)
//  - React DevTools install prompt
//  - Vite HMR informational logs
const IGNORE_PATTERNS = [
  /favicon\.ico/i,
  /api\.iconify\.design/i,
  /api\.simplesvg\.com/i,
  /api\.unisvg\.com/i,
  /Download the React DevTools/i,
  /\[vite\]/i,
]

export interface ConsoleErrorCollector {
  errors: string[]
}

/**
 * Attach listeners that collect console errors and uncaught page errors.
 * Returns an object you can read `errors` from after the test action.
 */
export function collectConsoleErrors(page: Page): ConsoleErrorCollector {
  const collector: ConsoleErrorCollector = { errors: [] }

  page.on('console', (msg: ConsoleMessage) => {
    if (msg.type() !== 'error') return
    const text = msg.text()
    if (IGNORE_PATTERNS.some((re) => re.test(text))) return
    collector.errors.push(`[console.error] ${text}`)
  })

  page.on('pageerror', (err) => {
    const text = err.message
    if (IGNORE_PATTERNS.some((re) => re.test(text))) return
    collector.errors.push(`[pageerror] ${text}`)
  })

  return collector
}

// Route → expected landmark heading text (used by smoke and navigation tests).
// Keep these short and unique enough to confirm the correct view rendered.
export const ROUTE_LANDMARKS: Record<string, string> = {
  '/': 'Treasury Overview',
  '/accounting': 'Accounting Sync',
  '/active': 'Active Positions',
  '/compliance': 'Compliance & Audit',
  '/connect-wallet': 'Connect Wallet',
  '/custody-accounts': 'Custody Accounts & Policies',
  '/yield': 'Deploy to Yield',
  '/deploy-to-yield-popup': 'Deploy to Yield',
  '/deposit': 'Deposit BTC',
  '/tier-activation': 'Complete Tier 3 Activation',
  '/login': 'Welcome back',
  '/signup': 'Open a treasury account',
}

// Routes where the sidebar should be HIDDEN (matches `hideSidebar: true` in routes.tsx).
export const HIDE_SIDEBAR_ROUTES = new Set(['/login', '/signup'])

// Convert a route path to a safe filename slug for screenshots.
export function slugify(route: string): string {
  if (route === '/') return 'home'
  return route.replace(/^\//, '').replace(/\//g, '-')
}
