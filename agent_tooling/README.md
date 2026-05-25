# agent_tooling — Playwright E2E suite for `bitgro_react`

Self-contained Playwright suite that verifies the migrated React app boots and behaves correctly. Everything (config, deps, specs, screenshots, traces, reports) lives in this folder.

## One-time setup

```sh
cd agent_tooling
pnpm install
pnpm exec playwright install chromium
```

## Running

```sh
pnpm test        # headless, runs in chromium
pnpm test:headed # same suite, visible browser
pnpm report      # opens the last HTML report
```

The `webServer` block in `playwright.config.ts` starts the React dev server
(`pnpm dev` in the parent project) before tests and stops it after. If a dev
server is already running on `:5173`, it's reused.

## What's tested

- `tests/smoke.spec.ts` — every route loads, renders its landmark, sidebar
  visibility matches `hideSidebar`, no console errors, full-page screenshot.
- `tests/navigation.spec.ts` — clicking each sidebar link navigates correctly
  and the active link gets `nav-link-active`.
- `tests/auth.spec.ts` — login form renders, password toggle works, valid
  submit redirects to `/` and reveals the sidebar, "Sign up" link works.

## Outputs

- Screenshots: `screenshots/*.png`
- HTML report: `playwright-report/index.html`
- Traces (on retries): `test-results/`
