// -----------------------------------------------------------------------------
// Auth store (Zustand) — replaces Vue's Pinia auth store.
//
// React explainer for someone new to Zustand:
//   - `create()` returns a custom hook (`useAuthStore`). Components that call
//     `useAuthStore()` re-render whenever the slice of state they read changes.
//   - There is NO Provider component. The store lives in module scope, so any
//     component can import the hook and read/write state.
//   - `set(...)` is the equivalent of mutating Pinia's `.value` refs — it merges
//     the partial object into the store's current state.
//
// Business logic is intentionally identical to the Vue project's `stores/auth.js`
// (600 ms simulated network delay; no real API yet).
// -----------------------------------------------------------------------------

import { create } from 'zustand'

export interface User {
  email: string
  name?: string
}

interface LoginPayload {
  email: string
  password: string
}

interface SignupPayload {
  name: string
  email: string
  password: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (payload: LoginPayload) => Promise<boolean>
  signup: (payload: SignupPayload) => Promise<boolean>
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async ({ email }) => {
    set({ error: null, isLoading: true })
    try {
      // Stub — replace with real auth call.
      await new Promise((resolve) => setTimeout(resolve, 600))
      set({ user: { email } })
      return true
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unable to sign in. Please try again.'
      set({ error: message })
      return false
    } finally {
      set({ isLoading: false })
    }
  },

  signup: async ({ name, email }) => {
    set({ error: null, isLoading: true })
    try {
      // Stub — replace with real auth call.
      await new Promise((resolve) => setTimeout(resolve, 600))
      set({ user: { name, email } })
      return true
    } catch (e) {
      const message =
        e instanceof Error ? e.message : 'Unable to create your account. Please try again.'
      set({ error: message })
      return false
    } finally {
      set({ isLoading: false })
    }
  },

  // Reset every field so a logout fired mid-login/signup leaves no stale flags.
  logout: () => set({ user: null, error: null, isLoading: false }),
}))
