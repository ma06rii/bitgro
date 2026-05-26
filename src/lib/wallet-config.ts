// Mezo Passport / wagmi configuration.
//
// Centralizes the wagmi Config, QueryClient, and selected Mezo chain so
// `main.tsx` only has to wire providers. Reads two Vite env vars:
//   - VITE_WALLETCONNECT_PROJECT_ID  (required — fail-fast at boot)
//   - VITE_MEZO_NETWORK              (optional — "testnet" | "mainnet", default "testnet")

import { QueryClient } from '@tanstack/react-query'
import { getConfig, mezoMainnet, mezoTestnet } from '@mezo-org/passport'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
if (!walletConnectProjectId) {
  throw new Error(
    'Missing VITE_WALLETCONNECT_PROJECT_ID in .env.local — required to initialize Mezo Passport.',
  )
}

const envNetwork = import.meta.env.VITE_MEZO_NETWORK
const mezoNetwork: 'testnet' | 'mainnet' = envNetwork === 'mainnet' ? 'mainnet' : 'testnet'

export const initialChain = mezoNetwork === 'mainnet' ? mezoMainnet : mezoTestnet

export const wagmiConfig = getConfig({
  appName: 'Bitgro',
  walletConnectProjectId,
  mezoNetwork,
})

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})
