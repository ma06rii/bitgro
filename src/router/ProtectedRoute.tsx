// Route guard for authenticated-only routes.
//
// Reads from Clerk (the persistent session source) rather than the Zustand
// `useAuthStore` stub, so a page refresh on `/yield` doesn't bounce a
// signed-in user back to `/login`.
//
// `isLoaded` is normally already `true` here because App.tsx blocks the
// shell render until Clerk hydrates; the check stays so this guard remains
// safe in isolation.

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/react'

export default function ProtectedRoute() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return null
  if (!isSignedIn) return <Navigate to="/login" replace />

  return <Outlet />
}
