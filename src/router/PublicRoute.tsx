// Route guard for signed-out-only routes (login, signup).
//
// Mirrors ProtectedRoute but in the opposite direction: an already-signed-in
// user trying to load `/login` or `/signup` is sent to `/`.
//
// `replace` avoids stacking the redirect in browser history, so the back
// button doesn't yo-yo the user through the bounce.

import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '@clerk/react'

export default function PublicRoute() {
  const { isLoaded, isSignedIn } = useAuth()

  if (!isLoaded) return null
  if (isSignedIn) return <Navigate to="/" replace />

  return <Outlet />
}
