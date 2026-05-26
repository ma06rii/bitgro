import { useEffect } from 'react'
import { Icon } from '@iconify/react'
import { useAccount, useChainId, useConnect } from 'wagmi'

type Props = {
  open: boolean
  onClose: () => void
}

const FALLBACK_ICON = 'lucide:wallet'

export default function MezoWalletPickerModal({ open, onClose }: Props) {
  const { connectors, connect, error, isPending, variables } = useConnect()
  const { isConnected } = useAccount()
  const chainId = useChainId()

  useEffect(() => {
    if (open && isConnected) onClose()
  }, [open, isConnected, onClose])

  if (!open) return null

  return (
    <div
      className="modal-overlay"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
    >
      <div
        className="modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="mezo-wallet-picker-title"
      >
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-header-icon">
              <Icon icon="lucide:wallet" className="modal-header-icon-glyph" aria-hidden="true" />
            </div>
            <h2 id="mezo-wallet-picker-title" className="modal-title">
              Connect Bitcoin Wallet
            </h2>
          </div>
          <button
            type="button"
            className="modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <Icon icon="lucide:x" className="modal-close-icon" aria-hidden="true" />
          </button>
        </div>

        <div className="modal-body">
          <ul className="wallet-picker-list">
            {connectors.map((connector) => {
              const isThisPending =
                isPending && variables?.connector && 'id' in variables.connector
                  ? variables.connector.id === connector.id
                  : false
              return (
                <li key={connector.id}>
                  <button
                    type="button"
                    className="wallet-picker-item"
                    onClick={() => connect({ connector, chainId })}
                    disabled={isPending}
                  >
                    <span className="wallet-picker-item-icon" aria-hidden="true">
                      {connector.icon ? (
                        <img src={connector.icon} alt="" />
                      ) : (
                        <Icon icon={FALLBACK_ICON} />
                      )}
                    </span>
                    <span className="wallet-picker-item-name">{connector.name}</span>
                    {isThisPending && (
                      <Icon
                        icon="lucide:loader-2"
                        className="spin wallet-picker-item-spinner"
                        aria-hidden="true"
                      />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>

          {error && (
            <div className="wallet-picker-error" role="alert">
              {error.message}
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
