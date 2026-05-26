// Façade hook for view code. Keeps wagmi / RainbowKit imports out of components
// so the underlying stack can evolve without rewriting consumers.

import { useMemo } from 'react'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import { useDisconnect } from 'wagmi'

import { useWalletStore } from '@/stores/wallet'

function shortenAddress(address?: string): string | undefined {
  if (!address || address.length < 10) return address
  return `${address.slice(0, 6)}…${address.slice(-4)}`
}

export interface MezoWallet {
  address?: string
  shortAddress?: string
  isConnected: boolean
  isConnecting: boolean
  error: string | null
  openConnect: () => void
  disconnect: () => void
}

export function useMezoWallet(): MezoWallet {
  const address = useWalletStore((state) => state.address)
  const walletAddress = useWalletStore((state) => state.walletAddress)
  const isConnected = useWalletStore((state) => state.isConnected)
  const isConnecting = useWalletStore((state) => state.isConnecting)
  const error = useWalletStore((state) => state.error)

  const { openConnectModal } = useConnectModal()
  const { disconnect } = useDisconnect()

  const displayAddress = walletAddress ?? address
  const shortAddress = useMemo(() => shortenAddress(displayAddress), [displayAddress])

  return {
    address: displayAddress,
    shortAddress,
    isConnected,
    isConnecting,
    error,
    openConnect: () => openConnectModal?.(),
    disconnect: () => disconnect(),
  }
}
