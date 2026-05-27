// Entry point — equivalent of Vue's `src/main.js`.
//
// React explainer:
//   - `createRoot(...).render(...)` is the React 18 mounting API. Vue used
//     `createApp(App).mount('#app')`.
//   - <BrowserRouter> is the React Router v6 wrapper around the app that
//     enables hooks like `useNavigate` / `useLocation` (analogous to Vue
//     Router's `app.use(router)`).
//   - Zustand has no Provider component — the store is imported directly by
//     any component that needs it (see `src/stores/auth.ts`).
//
// The wallet stack (wagmi, RainbowKit, Mezo Passport) is deliberately NOT
// mounted here — it lives behind a React.lazy() boundary at the
// /connect-wallet route (see src/providers/WalletProviders.tsx) so the
// ~2 MB of wallet code only loads when the user visits that route.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/react'
import { QueryClientProvider } from '@tanstack/react-query'

import App from './App'
import { queryClient } from '@/lib/queryClient'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) {
  throw new Error('Missing VITE_CLERK_PUBLISHABLE_KEY in .env.local')
}

const container = document.getElementById('app')
if (!container) {
  throw new Error('Root container #app missing in index.html')
}

createRoot(container).render(
  <StrictMode>
    <BrowserRouter>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/login">
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ClerkProvider>
    </BrowserRouter>
  </StrictMode>,
)
