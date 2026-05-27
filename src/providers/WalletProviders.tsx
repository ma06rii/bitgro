// Wallet-stack provider boundary.
//
// This file is the sole place at runtime that statically imports the wallet
// libraries (wagmi, RainbowKit, Mezo Passport). Because it sits behind a
// React.lazy() boundary at the /connect-wallet route, Vite emits it — along
// with its entire dependency tree (~2 MB including MetaMask SDK) — as a
// separate chunk that the user only downloads when they actually visit the
// wallet route. The Zustand wallet store keeps the snapshot alive for the
// rest of the app after the user has been here once.

import type { ReactNode } from 'react'
import { WagmiProvider } from 'wagmi'
import { RainbowKitProvider } from '@rainbow-me/rainbowkit'

import WalletSync from './WalletSync'
import { initialChain, wagmiConfig } from '@/lib/wallet-config'

import '@rainbow-me/rainbowkit/styles.css'

export default function WalletProviders({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={wagmiConfig}>
      <RainbowKitProvider initialChain={initialChain}>
        <WalletSync />
        {children}
      </RainbowKitProvider>
    </WagmiProvider>
  )
}
