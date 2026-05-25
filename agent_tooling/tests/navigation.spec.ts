import { test, expect } from '@playwright/test'
import { ROUTE_LANDMARKS } from './_helpers'

// The 9 sidebar nav items in the order Sidebar.tsx declares them.
// `accessibleName` is the visible link text; Playwright matches by accessible name.
const SIDEBAR_NAV = [
  { name: 'Treasury Overview', to: '/' },
  { name: 'Connect Wallet', to: '/connect-wallet' },
  { name: 'Deposit BTC', to: '/deposit' },
  { name: 'Deploy to Yield', to: '/yield' },
  { name: 'Active Positions', to: '/active' },
  { name: 'Accounting Sync', to: '/accounting' },
  { name: 'Compliance & Audit', to: '/compliance' },
  { name: 'Tier 3 Activation', to: '/tier-activation' },
  { name: 'Custody Accounts', to: '/custody-accounts' },
]

test.describe('sidebar navigation', () => {
  test('clicking each sidebar link navigates and renders the right view', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' })
    await expect(page.locator('aside.sidebar')).toBeVisible()

    for (const { name, to } of SIDEBAR_NAV) {
      // Click the nav link by its accessible name (the <span> text inside NavLink).
      await page.locator('aside.sidebar').getByRole('link', { name }).click()

      // URL changes (React Router pushed history).
      await expect(page).toHaveURL(new RegExp(`${to}$`))

      // Landmark heading of the destination view becomes visible.
      const landmark = ROUTE_LANDMARKS[to]
      await expect(
        page.getByText(landmark, { exact: false }).first(),
      ).toBeVisible({ timeout: 10_000 })
    }
  })

  test('active sidebar link gets nav-link-active class (replaces Vue exact-active-class)', async ({
    page,
  }) => {
    await page.goto('/connect-wallet', { waitUntil: 'domcontentloaded' })

    const activeLink = page
      .locator('aside.sidebar')
      .getByRole('link', { name: 'Connect Wallet' })
    await expect(activeLink).toHaveClass(/nav-link-active/)

    // A non-active link should NOT carry the active class.
    const otherLink = page
      .locator('aside.sidebar')
      .getByRole('link', { name: 'Treasury Overview' })
    await expect(otherLink).not.toHaveClass(/nav-link-active/)
  })
})
