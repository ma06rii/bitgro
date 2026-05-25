// -----------------------------------------------------------------------------
// AuthHeroBackground — looping video + animated overlay used on login/signup.
// Direct port of `AuthHeroBackground.vue`.
//
// React explainer:
//   - The mp4 is imported as a module; Vite turns the import into a hashed URL
//     string. This is the React/Vite equivalent of Vue's `import bgVideo from
//     '@/assets/background_1_loop.mp4'` pattern.
//   - `useRef<HTMLVideoElement>(null)` is the React equivalent of Vue's
//     `const videoEl = ref(null)` + `ref="videoEl"` in the template.
//   - The single `useEffect(..., [])` body handles mount setup and the cleanup
//     function returned from it handles unmount — combining Vue's `onMounted`
//     and `onBeforeUnmount`.
// -----------------------------------------------------------------------------

import { useEffect, useRef, useState } from 'react'

import bgVideo from '@/assets/background_1_loop.mp4'
import '@/assets/auth_hero_background.css'

export default function AuthHeroBackground() {
  const videoEl = useRef<HTMLVideoElement>(null)
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const el = videoEl.current
    if (el) {
      el.playbackRate = 0.5
      el.play().catch(() => {})
    }

    if (typeof window === 'undefined' || !window.matchMedia) return

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    const sync = (event: MediaQueryListEvent | MediaQueryList) => {
      const matches = event.matches
      setReduced(matches)
      const v = videoEl.current
      if (!v) return
      if (matches) v.pause()
      else v.play().catch(() => {})
    }

    sync(mediaQuery)

    // Modern browsers expose addEventListener; older Safari only addListener.
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', sync)
    } else {
      mediaQuery.addListener(sync)
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', sync)
      } else {
        mediaQuery.removeListener(sync)
      }
    }
  }, [])

  return (
    <div
      className={reduced ? 'hero-bg hero-bg--reduced' : 'hero-bg'}
      aria-hidden="true"
    >
      <video
        ref={videoEl}
        className="hero-bg-video"
        src={bgVideo}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
      />

      <div className="hero-bg-overlay" />

      <div className="hero-bg-wash">
        <span className="hero-bg-wash-a" />
        <span className="hero-bg-wash-b" />
      </div>

      <div className="hero-bg-streaks">
        <span className="hero-bg-streak hero-bg-streak--a" />
        <span className="hero-bg-streak hero-bg-streak--b" />
        <span className="hero-bg-streak hero-bg-streak--c" />
      </div>

      <div className="hero-bg-particles" />

      <div className="hero-bg-pulses">
        <svg
          className="hero-bg-pulse hero-bg-pulse--a"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="50" cy="50" r="6" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="24" />
        </svg>
        <svg
          className="hero-bg-pulse hero-bg-pulse--b"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
        >
          <circle cx="50" cy="50" r="6" />
          <circle cx="50" cy="50" r="14" />
          <circle cx="50" cy="50" r="24" />
        </svg>
      </div>
    </div>
  )
}
