import { useState } from 'react'
import { Icon } from '@iconify/react'
import { useAccount, useDisconnect } from 'wagmi'
import { useBitcoinAccount, useWalletAccount } from '@mezo-org/passport'

import MezoWalletPickerModal from './MezoWalletPickerModal'

const truncate = (addr?: string): string =>
  addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : ''

const formatBtc = (sats?: number): string =>
  typeof sats === 'number' ? (sats / 1e8).toFixed(8) : '0.00000000'

export default function MezoPassportCard() {
  const [modalOpen, setModalOpen] = useState(false)
  const { isConnected } = useAccount()
  const { accountAddress } = useWalletAccount()
  const { btcBalance } = useBitcoinAccount()
  const { disconnect } = useDisconnect()

  return (
    <>
      {isConnected ? (
        <div className="custodian-card-connected">
          <div className="custodian-card-pad">
            <div className="custodian-card-top">
              <div className="custodian-card-icon">
                <Icon
                  icon="lucide:check-circle"
                  className="custodian-icon-success"
                />
              </div>
              <div className="badge-tier2">
                <span>Tier 2: Self-Custody</span>
              </div>
            </div>
            <h3 className="custodian-name">
              <span>Mezo Passport</span>
            </h3>
            <p className="custodian-desc">
              <span>Connected as {truncate(accountAddress)}</span>
            </p>
            <div className="custodian-card-footer-connected">
              <div>
                <div className="custodian-balance-label">
                  <span>Balance</span>
                </div>
                <div className="custodian-balance-value">
                  {formatBtc(btcBalance?.total)} BTC
                </div>
              </div>
              <button
                type="button"
                className="btn-manage"
                onClick={() => disconnect()}
              >
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="custodian-card">
          <div className="custodian-card-pad">
            <div className="custodian-card-top">
              <div className="custodian-card-icon">
                <Icon icon="lucide:shield" className="custodian-icon" />
              </div>
              <div className="badge-tier2">
                <span>Tier 2: Self-Custody</span>
              </div>
            </div>
            <h3 className="custodian-name">
              <span>Mezo Passport</span>
            </h3>
            <p className="custodian-desc">
              <span>Connect Bitcoin-native wallets via Mezo&rsquo;s smart-account layer.</span>
            </p>
            <div className="custodian-card-footer">
              <button
                type="button"
                className="btn-connect"
                onClick={() => setModalOpen(true)}
              >
                <span>Connect</span>
                <Icon icon="lucide:arrow-right" className="btn-connect-icon" />
              </button>
            </div>
          </div>
        </div>
      )}

      <MezoWalletPickerModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  )
}
