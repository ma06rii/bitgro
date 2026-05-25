import { test, expect } from '@playwright/test'
import path from 'node:path'
import {
  collectConsoleErrors,
  ROUTE_LANDMARKS,
  HIDE_SIDEBAR_ROUTES,
  slugify,
} from './_helpers'

const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'screenshots')

// One parametrised test per route. This is the bulk of the verification:
// the page must load, render its landmark, show/hide the sidebar correctly,
// and produce zero meaningful console errors.
for (const [route, landmark] of Object.entries(ROUTE_LANDMARKS)) {
  test(`smoke: ${route} loads, renders, and has no console errors`, async ({ page }) => {
    const errors = collectConsoleErrors(page)

    const response = await page.goto(route, { waitUntil: 'domcontentloaded' })
    expect(response, `navigation to ${route} returned null response`).not.toBeNull()
    expect(response!.ok(), `HTTP status for ${route} was ${response!.status()}`).toBeTruthy()

    // Title is set globally in index.html — should be "Bitgro" on every route.
    await expect(page).toHaveTitle('Bitgro')

    // Landmark heading proves the right view rendered (React Router + lazy chunk
    // worked). This implicitly waits for React hydration + the lazy chunk to load.
    await expect(
      page.getByText(landmark, { exact: false }).first(),
    ).toBeVisible({ timeout: 10_000 })

    // Now that the view has mounted, double-check the body isn't empty.
    const bodyText = (await page.locator('body').textContent()) ?? ''
    expect(bodyText.trim().length, `body of ${route} appears empty`).toBeGreaterThan(0)

    // Sidebar visibility matches the route's `hideSidebar` flag.
    const sidebar = page.locator('aside.sidebar')
    if (HIDE_SIDEBAR_ROUTES.has(route)) {
      await expect(sidebar).toHaveCount(0)
    } else {
      await expect(sidebar).toBeVisible()
    }

    // Settle network — assets and lazy chunks should be done before the screenshot.
    await page
      .waitForLoadState('networkidle', { timeout: 10_000 })
      .catch(() => { /* video loop keeps network busy on auth pages; not fatal */ })

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, `${slugify(route)}.png`),
      fullPage: true,
    })

    expect(
      errors,
      `unexpected console errors on ${route}:\n${errors.errors.join('\n')}`,
    ).toMatchObject({ errors: [] })
  })
}
