// Effect-only bridge between wagmi/Mezo Passport and the Zustand wallet store.
// Lives inside <WagmiProvider> so the hooks can read live state; renders nothing.

import { useEffect } from 'react'
import { useConnect } from 'wagmi'
import {
  isUnsupportedBitcoinAddressError,
  isWalletNetworkDoesNotMatchProviderChainError,
  useWalletAccount,
} from '@mezo-org/passport'

import { useWalletStore } from '@/stores/wallet'

function formatConnectError(error: unknown): string {
  if (!error) return ''
  if (isUnsupportedBitcoinAddressError(error)) {
    return 'Your Bitcoin address type is unsupported. Please use a Native Segwit account.'
  }
  if (isWalletNetworkDoesNotMatchProviderChainError(error)) {
    return 'Please switch your wallet network to match the dApp network.'
  }
  if (error instanceof Error) return error.message
  return 'Unable to connect wallet. Please try again.'
}

export default function WalletSync() {
  const setSnapshot = useWalletStore((state) => state.setSnapshot)
  const { accountAddress, walletAddress, networkFamily, chainId, isConnected } =
    useWalletAccount()
  const { isPending: isConnecting, error } = useConnect()

  useEffect(() => {
    setSnapshot({
      address: accountAddress,
      walletAddress,
      networkFamily,
      chainId,
      isConnected,
      isConnecting,
      error: error ? formatConnectError(error) : null,
    })
  }, [
    setSnapshot,
    accountAddress,
    walletAddress,
    networkFamily,
    chainId,
    isConnected,
    isConnecting,
    error,
  ])

  return null
}
