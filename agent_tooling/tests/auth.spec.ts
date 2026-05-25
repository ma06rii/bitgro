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
