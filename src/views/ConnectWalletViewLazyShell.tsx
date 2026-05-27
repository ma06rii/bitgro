// Lazy boundary for the /connect-wallet route.
//
// router/routes.tsx does `lazy(() => import('@/views/ConnectWalletViewLazyShell'))`,
// so everything statically imported below — including WalletProviders and the
// entire wallet dependency tree it pulls in — lands in a single chunk that is
// only downloaded when the user navigates to /connect-wallet.

import WalletProviders from '@/providers/WalletProviders'
import ConnectWalletView from './ConnectWalletView'

export default function ConnectWalletViewLazyShell() {
  return (
    <WalletProviders>
      <ConnectWalletView />
    </WalletProviders>
  )
}
