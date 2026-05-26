// Wallet store (Zustand) — mirrors live wagmi / Mezo Passport state so any view
// can read connection details without importing wagmi directly. Synchronization
// is driven externally by `providers/WalletSync.tsx`, which lives inside the
// WagmiProvider and pushes snapshots in here on every reactive change.

import { create } from 'zustand'

export type NetworkFamily = 'bitcoin' | 'evm'

export interface WalletSnapshot {
  address?: `0x${string}`
  walletAddress?: string
  networkFamily?: NetworkFamily
  chainId?: number
  isConnected: boolean
  isConnecting: boolean
  error: string | null
}

interface WalletState extends WalletSnapshot {
  setSnapshot: (snapshot: Partial<WalletSnapshot>) => void
  reset: () => void
}

const initialSnapshot: WalletSnapshot = {
  address: undefined,
  walletAddress: undefined,
  networkFamily: undefined,
  chainId: undefined,
  isConnected: false,
  isConnecting: false,
  error: null,
}

export const useWalletStore = create<WalletState>((set) => ({
  ...initialSnapshot,
  setSnapshot: (snapshot) => set(snapshot),
  reset: () => set(initialSnapshot),
}))
