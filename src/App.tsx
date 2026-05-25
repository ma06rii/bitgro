// -----------------------------------------------------------------------------
// App shell — equivalent of Vue's `src/App.vue`.
//
// Responsibilities (1:1 with the Vue version):
//   1. Show the Sidebar except on routes where `hideSidebar` is true.
//   2. Show the RouteProgressBar across the top of the main panel.
//   3. Render the active route inside a fade transition that completes the
//      old view's exit animation before the new view starts entering.
//
// React explainer for the transition:
//   Vue used `<Transition name="page" mode="out-in" appear>`. The closest
//   React-land equivalent is framer-motion's `<AnimatePresence mode="wait">`,
//   keyed by `location.pathname`. Each time the URL changes, AnimatePresence
//   sees a new `<motion.div key=...>` and orchestrates the exit-then-enter
//   sequence automatically.
// -----------------------------------------------------------------------------

import { Suspense } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import Sidebar from './components/Sidebar'
import RouteProgressBar from './components/RouteProgressBar'
import { routes } from './router/routes'

export default function App() {
  // `useLocation` is the React-Router equivalent of Vue Router's `useRoute()`.
  const location = useLocation()

  // The Vue source kept `hideSidebar` in route meta; we keep it on the same
  // route record (see `src/router/routes.tsx`). Lookup is O(routes), cheap.
  const currentRoute = routes.find((r) => r.path === location.pathname)
  const hideSidebar = currentRoute?.hideSidebar ?? false

  return (
    <div className="app-shell">
      {!hideSidebar && <Sidebar />}
      <main className="main-panel">
        <RouteProgressBar />
        <AnimatePresence mode="wait" initial>
          <motion.div
            key={location.pathname}
            className="view-shell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
          >
            {/*
              <Suspense> is required because every route component is
              `React.lazy(...)`. Vue Router handled this implicitly; in React
              we have to provide the fallback boundary explicitly.
            */}
            <Suspense fallback={null}>
              <Routes location={location}>
                {routes.map(({ path, Component }) => (
                  <Route key={path} path={path} element={<Component />} />
                ))}
              </Routes>
            </Suspense>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
