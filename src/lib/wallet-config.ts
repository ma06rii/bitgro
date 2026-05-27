// Mezo Passport / wagmi configuration.
//
// Imported only from the lazy wallet bundle (see src/providers/WalletProviders.tsx),
// so pulling in `@mezo-org/passport` from here does not affect the root chunk.

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
