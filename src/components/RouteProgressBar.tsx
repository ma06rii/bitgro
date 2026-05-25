// -----------------------------------------------------------------------------
// RouteProgressBar — top-of-page loading bar that runs while a new route is
// loading. Mirrors the Vue version's logic with React idioms.
//
// React explainer:
//   - Vue used `router.beforeEach` / `router.afterEach` to start/stop the
//     animation. React Router v6 has no equivalent global hooks, so we react
//     to `location.pathname` changes inside a `useEffect`.
//   - We store timer IDs in `useRef` (not `useState`) because changing a timer
//     ID should NOT cause a re-render — it's mutable bookkeeping, not UI state.
//     This is a key React idiom: useState for things the user sees, useRef for
//     things the component remembers between renders.
//   - The "start then finish" pattern in this version fires on every location
//     change. The `finish` is delayed enough to play the full sweep even on
//     near-instant route swaps, matching the Vue version's perceived behaviour.
// -----------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function RouteProgressBar() {
  const location = useLocation()
  const [visible, setVisible] = useState(false)
  const [progress, setProgress] = useState(0)

  // Timer IDs — kept in refs so they survive across renders without triggering re-renders.
  const delayTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const tickTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const finishTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  // We need the latest `progress` inside the interval callback without
  // re-creating the interval on every render. A ref is the React pattern for
  // "latest value visible to an effect's interval/timeout".
  const progressRef = useRef(0)
  progressRef.current = progress

  // Skip the very first render — we don't want the bar to flash on initial load.
  const firstRender = useRef(true)

  useEffect(() => {
    const clearTimers = () => {
      if (delayTimer.current) clearTimeout(delayTimer.current)
      if (tickTimer.current) clearInterval(tickTimer.current)
      if (finishTimer.current) clearTimeout(finishTimer.current)
      delayTimer.current = tickTimer.current = finishTimer.current = null
    }

    if (firstRender.current) {
      firstRender.current = false
      return
    }

    // --- start() ----------------------------------------------------------
    clearTimers()
    delayTimer.current = setTimeout(() => {
      setVisible(true)
      setProgress(8)
      progressRef.current = 8
      tickTimer.current = setInterval(() => {
        // Ease towards 90% — never quite reach it until we explicitly finish.
        const next = Math.min(90, progressRef.current + (90 - progressRef.current) * 0.12)
        progressRef.current = next
        setProgress(next)
      }, 120)
    }, 150)

    // --- finish() ---------------------------------------------------------
    // Schedule the completion just after start has had time to begin animating.
    // This mirrors the Vue version where afterEach fires after navigation
    // resolves; in React, since lazy() chunks may or may not have loaded yet,
    // a short delay keeps the bar visible long enough to feel like progress.
    const finishDelay = setTimeout(() => {
      if (delayTimer.current) {
        clearTimeout(delayTimer.current)
        delayTimer.current = null
      }
      if (tickTimer.current) {
        clearInterval(tickTimer.current)
        tickTimer.current = null
      }
      setProgress(100)
      progressRef.current = 100
      finishTimer.current = setTimeout(() => {
        setVisible(false)
        setProgress(0)
        progressRef.current = 0
      }, 200)
    }, 400)

    return () => {
      clearTimeout(finishDelay)
      clearTimers()
    }
  }, [location.pathname])

  return (
    <div
      className={visible ? 'route-progress route-progress--visible' : 'route-progress'}
      aria-hidden="true"
    >
      <div className="route-progress__bar" style={{ width: `${progress}%` }} />
    </div>
  )
}
