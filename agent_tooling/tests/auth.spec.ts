import { test, expect } from '@playwright/test'

test.describe('login view', () => {
  test('renders fullscreen (no sidebar) with hero video and key copy', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    // Sidebar is hidden on auth routes (proves the hideSidebar route flag is respected).
    await expect(page.locator('aside.sidebar')).toHaveCount(0)

    // Marketing copy + form heading.
    await expect(page.getByText('Welcome back')).toBeVisible()
    await expect(page.getByText('Institutional Treasury')).toBeVisible()

    // Hero video element from AuthHeroBackground mounts (autoplay may not actually
    // play in headless Chromium, but the <video> tag should be in the DOM).
    await expect(page.locator('video.hero-bg-video')).toBeAttached()
  })

  test('password visibility toggle flips input type', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    const pwInput = page.locator('#login-password')
    await pwInput.fill('hunter2')
    await expect(pwInput).toHaveAttribute('type', 'password')

    // Toggle on (Show password).
    await page.getByRole('button', { name: 'Show password' }).click()
    await expect(pwInput).toHaveAttribute('type', 'text')

    // Toggle off (Hide password).
    await page.getByRole('button', { name: 'Hide password' }).click()
    await expect(pwInput).toHaveAttribute('type', 'password')
  })

  test('submitting valid credentials redirects to / and reveals sidebar', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    await page.locator('#login-email').fill('test@example.com')
    await page.locator('#login-password').fill('hunter2')

    await page.getByRole('button', { name: /sign in/i }).click()

    // Auth store stub waits 600 ms, then navigate('/'). Give it a generous window.
    await page.waitForURL('http://localhost:5173/', { timeout: 5_000 })

    // After redirect, sidebar should now be visible.
    await expect(page.locator('aside.sidebar')).toBeVisible()
    await expect(page.getByText('Treasury Overview').first()).toBeVisible()
  })

  test('"Sign up" link navigates to /signup', async ({ page }) => {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })

    await page.getByRole('link', { name: 'Sign up' }).click()
    await expect(page).toHaveURL(/\/signup$/)
    await expect(page.getByText('Open a treasury account')).toBeVisible()
  })
})

test.describe('logout flow', () => {
  async function signIn(page: import('@playwright/test').Page) {
    await page.goto('/login', { waitUntil: 'domcontentloaded' })
    await page.locator('#login-email').fill('test@example.com')
    await page.locator('#login-password').fill('hunter2')
    await page.getByRole('button', { name: /sign in/i }).click()
    await page.waitForURL('http://localhost:5173/', { timeout: 5_000 })
    await expect(page.locator('aside.sidebar')).toBeVisible()
  }

  test('Cancel in the confirm dialog leaves the session intact', async ({ page }) => {
    await signIn(page)

    await page.getByRole('button', { name: 'Open account menu' }).click()
    await page.getByRole('menuitem', { name: /log out/i }).click()

    const dialog = page.getByRole('dialog', { name: 'Log out of Bitgro?' })
    await expect(dialog).toBeVisible()

    // Cancel is focused first on open (accessibility regression guard).
    await expect(dialog.getByRole('button', { name: 'Cancel' })).toBeFocused()

    // Escape dismisses the dialog without signing out.
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL('http://localhost:5173/')
    await expect(page.locator('aside.sidebar')).toBeVisible()
  })

  test('Confirming the dialog signs out, redirects to /login, and invalidates the session', async ({
    page,
  }) => {
    await signIn(page)

    await page.getByRole('button', { name: 'Open account menu' }).click()
    await page.getByRole('menuitem', { name: /log out/i }).click()

    const dialog = page.getByRole('dialog', { name: 'Log out of Bitgro?' })
    await expect(dialog).toBeVisible()

    await dialog.getByRole('button', { name: /^log out$/i }).click()

    await page.waitForURL(/\/login$/, { timeout: 10_000 })
    await expect(page.locator('aside.sidebar')).toHaveCount(0)

    // Negative-path guard: a protected route bounces back to /login,
    // proving the Clerk session is genuinely gone (not just the local store).
    await page.goto('/yield', { waitUntil: 'domcontentloaded' })
    await expect(page).toHaveURL(/\/login$/)
  })
})
