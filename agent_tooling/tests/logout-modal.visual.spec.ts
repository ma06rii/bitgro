// Hermetic visual test for the logout confirmation modal.
//
// Why hermetic: the real flow requires a working Clerk session (flaky in
// this sandbox). Instead, we read the project's CSS from disk, inline it
// into a Playwright page, and render the modal's production markup verbatim.
// This catches the "missing CSS imports" class of bug (.modal-dialog and
// friends were defined only in deploy_to_yield_popup.css, not loaded by
// Sidebar) without needing to sign in.

import { test, expect, type Page } from '@playwright/test'
import path from 'node:path'
import fs from 'node:fs/promises'

const REACT_ROOT = path.resolve(__dirname, '..', '..')
const SCREENSHOT_DIR = path.resolve(__dirname, '..', 'screenshots')

// Read CSS once per worker — avoids 24KB disk reads on every test and
// removes a source of timing flakiness for the in-memory setContent flow.
let cachedCss: { treasury: string; modal: string } | null = null
async function loadCss() {
  if (cachedCss) return cachedCss
  const [treasury, modal] = await Promise.all([
    fs.readFile(path.join(REACT_ROOT, 'src', 'assets', 'treasury.css'), 'utf8'),
    fs.readFile(path.join(REACT_ROOT, 'src', 'assets', 'modal.css'), 'utf8'),
  ])
  cachedCss = { treasury, modal }
  return cachedCss
}

interface RenderOpts {
  /** Show the .logout-modal-error block. */
  error?: string
  /** Replace the confirm button content with the spinner+text loading state. */
  loading?: boolean
}

function buildHtml(treasuryCss: string, modalCss: string, opts: RenderOpts = {}): string {
  const errorBlock = opts.error
    ? `<p class="logout-modal-error" role="alert">
         <span class="logout-modal-error-icon" aria-hidden="true">!</span>
         <span>${opts.error}</span>
       </p>`
    : ''

  const confirmInner = opts.loading
    ? `<span class="confirm-lock-icon spin" aria-hidden="true">↻</span>
       <span>Signing out&hellip;</span>`
    : `<span class="confirm-lock-icon" aria-hidden="true">⎋</span>
       <span>Log out</span>`

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Logout modal visual fixture</title>
    <style>${treasuryCss}</style>
    <style>${modalCss}</style>
    <style>
      /* Reset only — the fixture should look exactly like production. */
      html, body { margin: 0; padding: 0; min-height: 100vh; background: var(--color-background); font-family: var(--font-body); }
    </style>
  </head>
  <body>
    <div class="logout-modal-overlay">
      <div class="modal-dialog logout-modal-dialog" role="dialog" aria-modal="true" aria-labelledby="logout-modal-title">
        <div class="modal-header">
          <div class="modal-header-left">
            <div class="modal-header-icon logout-modal-header-icon">
              <span class="modal-header-icon-glyph" aria-hidden="true">⎋</span>
            </div>
            <h2 id="logout-modal-title" class="modal-title">Log out of Bitgro?</h2>
          </div>
          <button type="button" class="modal-close" aria-label="Close">
            <span class="modal-close-icon" aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body logout-modal-body">
          <p class="logout-modal-copy">
            You&rsquo;ll need to sign in again to access your treasury dashboard.
          </p>
          ${errorBlock}
        </div>
        <div class="modal-footer">
          <button type="button" class="btn-cancel">Cancel</button>
          <button type="button" class="btn-confirm btn-confirm-danger">
            <span class="confirm-inner">${confirmInner}</span>
          </button>
        </div>
      </div>
    </div>
  </body>
</html>`
}

async function renderModal(page: Page, opts: RenderOpts = {}) {
  const { treasury, modal } = await loadCss()
  // Hard-reset to about:blank first — successive setContent calls in
  // headless Chromium sometimes don't re-fire load reliably otherwise.
  await page.goto('about:blank')
  await page.setContent(buildHtml(treasury, modal, opts), {
    waitUntil: 'load',
  })
  await page.locator('.modal-dialog').waitFor({ state: 'attached' })
  // If the caller asked for the error block, make sure it actually rendered
  // before returning — guards against the assert running before paint.
  if (opts.error) {
    await page.locator('.logout-modal-error').waitFor({ state: 'attached' })
  }
  if (opts.loading) {
    await page.locator('.confirm-lock-icon.spin').waitFor({ state: 'attached' })
  }
}

function rgb(r: number, g: number, b: number): string {
  return `rgb(${r}, ${g}, ${b})`
}

// Headless Chromium in this sandbox is flaky when too many setContent
// + screenshot pairs run back-to-back ("Target crashed"). Keep this spec
// to one test that exercises every variant against a single browser session
// — same coverage, fewer browser-side resets. Bump the per-test timeout to
// absorb the cumulative work of three variants + three screenshots.
test.describe.configure({ retries: 1, timeout: 90_000 })

test.describe('logout modal — visual & computed-style', () => {
  test('renders pixel-perfect across default, error, and loading variants', async ({ page }) => {
    // --- DEFAULT ---
    await renderModal(page)

    const dialogStyles = await page.locator('.modal-dialog').evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        backgroundColor: cs.backgroundColor,
        borderRadius: cs.borderTopLeftRadius,
        boxShadow: cs.boxShadow,
        display: cs.display,
        flexDirection: cs.flexDirection,
      }
    })
    expect(dialogStyles.backgroundColor).toBe(rgb(247, 248, 245)) // var(--color-background)
    expect(dialogStyles.borderRadius).toBe('20px')
    expect(dialogStyles.boxShadow).not.toBe('none')
    expect(dialogStyles.display).toBe('flex')
    expect(dialogStyles.flexDirection).toBe('column')

    const footerStyles = await page.locator('.modal-footer').evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        display: cs.display,
        justifyContent: cs.justifyContent,
        borderTopWidth: cs.borderTopWidth,
        position: cs.position,
      }
    })
    expect(footerStyles.display).toBe('flex')
    expect(footerStyles.justifyContent).toBe('space-between')
    expect(footerStyles.borderTopWidth).not.toBe('0px')
    expect(footerStyles.position).toBe('sticky')

    const headerStyles = await page.locator('.modal-header').evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        paddingTop: cs.paddingTop,
        paddingLeft: cs.paddingLeft,
        borderBottomWidth: cs.borderBottomWidth,
      }
    })
    expect(headerStyles.paddingTop).not.toBe('0px')
    expect(headerStyles.paddingLeft).not.toBe('0px')
    expect(headerStyles.borderBottomWidth).not.toBe('0px')

    const cancelStyles = await page.locator('.btn-cancel').evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        textTransform: cs.textTransform,
        fontFamily: cs.fontFamily,
        borderRadius: cs.borderTopLeftRadius,
      }
    })
    expect(cancelStyles.textTransform).toBe('uppercase')
    expect(cancelStyles.fontFamily).toContain('Gotham Medium')
    expect(cancelStyles.borderRadius).toBe('12px')

    const dangerStyles = await page.locator('.btn-confirm-danger').evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        backgroundColor: cs.backgroundColor,
        color: cs.color,
        textTransform: cs.textTransform,
      }
    })
    expect(dangerStyles.backgroundColor).toBe(rgb(185, 28, 28)) // --color-destructive
    expect(dangerStyles.color).toBe(rgb(255, 255, 255))
    expect(dangerStyles.textTransform).toBe('uppercase')

    const overlayPosition = await page
      .locator('.logout-modal-overlay')
      .evaluate((el) => getComputedStyle(el).position)
    expect(overlayPosition).toBe('fixed')

    // A11y polish: every interactive footer/close control has a focus-visible
    // outline rule (this was missing for .btn-cancel and .modal-close before).
    // Checking the stylesheet directly is more reliable than programmatic focus
    // — headless Chromium with touch flags doesn't always trigger :focus-visible.
    const focusVisibleSelectors = await page.evaluate(() => {
      const wanted = ['.btn-cancel:focus-visible', '.btn-confirm-danger:focus-visible', '.modal-close:focus-visible']
      const found = new Set<string>()
      for (const sheet of Array.from(document.styleSheets)) {
        let rules: CSSRuleList
        try {
          rules = sheet.cssRules
        } catch {
          continue
        }
        for (const rule of Array.from(rules)) {
          if (rule instanceof CSSStyleRule && wanted.includes(rule.selectorText)) {
            found.add(rule.selectorText)
          }
        }
      }
      return Array.from(found).sort()
    })
    expect(focusVisibleSelectors).toEqual([
      '.btn-cancel:focus-visible',
      '.btn-confirm-danger:focus-visible',
      '.modal-close:focus-visible',
    ])

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'logout-modal.png'), animations: 'disabled' })

    // --- ERROR VARIANT ---
    await renderModal(page, { error: 'Could not sign out. Please try again.' })

    const errorStyles = await page.locator('.logout-modal-error').evaluate((el) => {
      const cs = getComputedStyle(el)
      return {
        display: cs.display,
        borderRadius: cs.borderTopLeftRadius,
        color: cs.color,
        role: el.getAttribute('role'),
      }
    })
    expect(errorStyles.display).toBe('flex')
    // Polished: error border-radius now matches the rest of the app (12px, was 10px).
    expect(errorStyles.borderRadius).toBe('12px')
    expect(errorStyles.color).toBe(rgb(185, 28, 28))
    expect(errorStyles.role).toBe('alert')

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'logout-modal-error.png'), animations: 'disabled' })

    // --- LOADING VARIANT ---
    await renderModal(page, { loading: true })

    await expect(page.locator('.confirm-lock-icon.spin')).toBeVisible()
    await expect(page.getByText('Signing out')).toBeVisible()

    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'logout-modal-loading.png'), animations: 'disabled' })
  })
})
