import { getConfig } from '@mezo-org/passport'

const walletConnectProjectId = import.meta.env.VITE_WALLETCONNECT_PROJECT_ID
if (!walletConnectProjectId) {
  throw new Error('Missing VITE_WALLETCONNECT_PROJECT_ID in .env.local')
}

export const wagmiConfig = getConfig({
  appName: 'Bitgro',
  walletConnectProjectId,
  mezoNetwork: import.meta.env.VITE_MEZO_NETWORK,
})
