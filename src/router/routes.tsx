// -----------------------------------------------------------------------------
// Route table — the React Router v6 equivalent of `src/router/index.js`.
//
// React explainer:
//   - `React.lazy(() => import(...))` is the React equivalent of Vue Router's
//     `component: () => import('...')`. It returns a component that suspends
//     while the chunk loads, so it must be rendered inside a <Suspense>.
//   - We attach a `hideSidebar` flag here (instead of Vue's `meta`) so App.tsx
//     can decide whether to render the Sidebar for the active route.
// -----------------------------------------------------------------------------

import { lazy, type LazyExoticComponent, type ComponentType } from 'react'

export interface AppRoute {
  path: string
  name: string
  Component: LazyExoticComponent<ComponentType>
  hideSidebar?: boolean
}

export const routes: AppRoute[] = [
  { path: '/', name: 'home', Component: lazy(() => import('@/views/TreasuryView')) },
  { path: '/accounting', name: 'accounting', Component: lazy(() => import('@/views/AccountingSyncView')) },
  { path: '/active', name: 'active', Component: lazy(() => import('@/views/ActivePositionView')) },
  { path: '/compliance', name: 'compliance', Component: lazy(() => import('@/views/ComplianceAuditView')) },
  { path: '/connect-wallet', name: 'connect-wallet', Component: lazy(() => import('@/views/ConnectWalletView')) },
  { path: '/custody-accounts', name: 'custody-accounts', Component: lazy(() => import('@/views/CustodyAccountsView')) },
  { path: '/yield', name: 'yield', Component: lazy(() => import('@/views/DeployToYieldGridView')) },
  { path: '/deploy-to-yield-popup', name: 'deploy-to-yield-popup', Component: lazy(() => import('@/views/DeployToYieldPopupView')) },
  { path: '/deposit', name: 'deposit', Component: lazy(() => import('@/views/DepositBtcView')) },
  { path: '/tier-activation', name: 'tier-activation', Component: lazy(() => import('@/views/Tier3ActivationView')) },
  { path: '/login', name: 'login', hideSidebar: true, Component: lazy(() => import('@/views/LoginView')) },
  { path: '/signup', name: 'signup', hideSidebar: true, Component: lazy(() => import('@/views/SignupView')) },
]
