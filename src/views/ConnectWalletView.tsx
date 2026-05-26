// ConnectWalletView — direct port of `views/ConnectWalletView.vue`.

import { Icon } from '@iconify/react'

import { useMezoWallet } from '@/hooks/useMezoWallet'
import '@/assets/connect_wallet.css'

type Web3ButtonState = 'idle' | 'connecting' | 'connected' | 'error'

function Web3ConnectButton() {
  const { shortAddress, isConnected, isConnecting, error, openConnect, disconnect } =
    useMezoWallet()

  const state: Web3ButtonState = isConnecting
    ? 'connecting'
    : isConnected
      ? 'connected'
      : error
        ? 'error'
        : 'idle'

  const handleClick = () => {
    if (state === 'connecting') return
    if (state === 'connected') {
      disconnect()
      return
    }
    openConnect()
  }

  const label =
    state === 'connecting'
      ? 'Connecting…'
      : state === 'connected'
        ? (shortAddress ?? 'Connected')
        : state === 'error'
          ? 'Try again'
          : 'Connect'

  const iconName =
    state === 'connecting'
      ? 'lucide:loader-2'
      : state === 'connected'
        ? 'lucide:check'
        : state === 'error'
          ? 'lucide:alert-circle'
          : 'lucide:arrow-right'

  const ariaLabel =
    state === 'connecting'
      ? 'Connecting wallet, please wait'
      : state === 'connected'
        ? `Connected as ${shortAddress ?? 'wallet'}, click to disconnect`
        : state === 'error'
          ? 'Wallet error, click to retry'
          : 'Connect Web3 wallet'

  const classes = ['btn-connect']
  if (state === 'connecting') classes.push('is-connecting')
  if (state === 'connected') classes.push('is-connected')

  return (
    <>
      <button
        type="button"
        className={classes.join(' ')}
        onClick={handleClick}
        disabled={state === 'connecting'}
        aria-busy={state === 'connecting'}
        aria-label={ariaLabel}
      >
        <span>{label}</span>
        <Icon
          icon={iconName}
          className={`btn-connect-icon${state === 'connecting' ? ' spin' : ''}`}
          aria-hidden="true"
        />
      </button>
      {error && state !== 'connecting' ? (
        <p className="btn-connect-error" role="alert">
          {error}
        </p>
      ) : null}
    </>
  )
}

export default function ConnectWalletView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Connect Wallet</span>
          </h1>
        </div>
        <div className="header-right">
          <div className="entity-selector">
            <span className="entity-label">
              <span>Entity:</span>
            </span>
            <span className="entity-name">
              <span>ACME Holdings LLC</span>
            </span>
            <Icon icon="lucide:chevron-down" className="entity-chevron" />
          </div>
          <div className="notification-trigger">
            <Icon icon="lucide:bell" className="notification-bell" />
          </div>
        </div>
      </header>
      <div className="page-body">
        <div className="wallet-layout">
          <div className="wallet-main">
            <div className="wallet-intro">
              <p className="wallet-intro-text">
                <span>Select a custodian to connect your corporate accounts.</span>
              </p>
            </div>
            <div className="custodian-grid">
              <div className="custodian-card">
                <div className="custodian-card-pad">
                  <div className="custodian-card-top">
                    <div className="custodian-card-icon">
                      <Icon icon="lucide:shield" className="custodian-icon" />
                    </div>
                    <div className="badge-tier1">
                      <span>Tier 1: Qualified</span>
                    </div>
                  </div>
                  <h3 className="custodian-name">
                    <span>Fireblocks</span>
                  </h3>
                  <p className="custodian-desc">
                    <span>Enterprise-grade MPC wallet with policy engine.</span>
                  </p>
                  <div className="custodian-card-footer">
                    <button className="btn-connect">
                      <span>Connect</span>
                      <Icon icon="lucide:arrow-right" className="btn-connect-icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="custodian-card">
                <div className="custodian-card-pad">
                  <div className="custodian-card-top">
                    <div className="custodian-card-icon">
                      <Icon icon="lucide:shield" className="custodian-icon" />
                    </div>
                    <div className="badge-tier1">
                      <span>Tier 1: Qualified</span>
                    </div>
                  </div>
                  <h3 className="custodian-name">
                    <span>BitGo</span>
                  </h3>
                  <p className="custodian-desc">
                    <span>Regulated institutional digital asset custody.</span>
                  </p>
                  <div className="custodian-card-footer">
                    <button className="btn-connect">
                      <span>Connect</span>
                      <Icon icon="lucide:arrow-right" className="btn-connect-icon" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="custodian-card-connected">
                <div className="custodian-card-pad">
                  <div className="custodian-card-top">
                    <div className="custodian-card-icon">
                      <Icon
                        icon="lucide:check-circle"
                        className="custodian-icon-success"
                      />
                    </div>
                    <div className="badge-tier1">
                      <span>Tier 1: Qualified</span>
                    </div>
                  </div>
                  <h3 className="custodian-name">
                    <span>Coinbase Prime</span>
                  </h3>
                  <p className="custodian-desc">
                    <span>Integrated prime brokerage and cold storage.</span>
                  </p>
                  <div className="custodian-card-footer-connected">
                    <div>
                      <div className="custodian-balance-label">
                        <span>Balance</span>
                      </div>
                      <div className="custodian-balance-value">1,245.88 BTC</div>
                    </div>
                    <button className="btn-manage">
                      <span>Manage</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="custodian-card">
                <div className="custodian-card-pad">
                  <div className="custodian-card-top">
                    <div className="custodian-card-icon">
                      <Icon icon="lucide:shield" className="custodian-icon" />
                    </div>
                    <div className="badge-tier1">
                      <span>Tier 1: Qualified</span>
                    </div>
                  </div>
                  <h3 className="custodian-name">
                    <span>Anchorage Digital</span>
                  </h3>
                  <p className="custodian-desc">
                    <span>First federally chartered digital asset bank.</span>
                  </p>
                  <div className="custodian-card-footer">
                    <button className="btn-connect">
                      <span>Connect</span>
                      <Icon icon="lucide:arrow-right" className="btn-connect-icon" />
                    </button>
                  </div>
                </div>
              </div>

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
                    <span>Dfns</span>
                  </h3>
                  <p className="custodian-desc">
                    <span>Programmable keyless wallet infrastructure.</span>
                  </p>
                  <div className="custodian-card-footer">
                    <button className="btn-connect">
                      <span>Connect</span>
                      <Icon icon="lucide:arrow-right" className="btn-connect-icon" />
                    </button>
                  </div>
                </div>
              </div>

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
                    <span>RainbowKit / Web3</span>
                  </h3>
                  <p className="custodian-desc">
                    <span>Connect standard hardware or browser wallets.</span>
                  </p>
                  <div className="custodian-card-footer">
                    <Web3ConnectButton />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="tier-info-sidebar">
            <div className="tier-info-card">
              <div className="tier-info-header">
                <h3 className="tier-info-title">
                  <span>Custody Tiers</span>
                </h3>
              </div>
              <div className="tier-info-body">
                <div className="tier-section">
                  <div className="tier-section-header">
                    <div className="badge-tier1">
                      <span>Tier 1</span>
                    </div>
                    <span className="tier-section-name">
                      <span>Qualified Custodian</span>
                    </span>
                  </div>
                  <p className="tier-desc">
                    <span>
                      Fully regulated entities holding assets in trust. Required for primary
                      treasury reserve.
                    </span>
                  </p>
                  <ul className="tier-list">
                    <li className="tier-list-item">
                      <Icon icon="lucide:check" className="check-icon-success" />
                      <span>Multi-sig / MPC security</span>
                    </li>
                    <li className="tier-list-item">
                      <Icon icon="lucide:check" className="check-icon-success" />
                      <span>Bankruptcy remote</span>
                    </li>
                    <li className="tier-list-item">
                      <Icon icon="lucide:check" className="check-icon-success" />
                      <span>Audited SOC 1/2</span>
                    </li>
                  </ul>
                </div>
                <div className="tier-section-divider">
                  <div className="tier-section-header">
                    <div className="badge-tier2">
                      <span>Tier 2</span>
                    </div>
                    <span className="tier-section-name">
                      <span>Self-Custody</span>
                    </span>
                  </div>
                  <p className="tier-desc">
                    <span>
                      Direct control of private keys via hardware or MPC infrastructure.
                    </span>
                  </p>
                  <ul className="tier-list">
                    <li className="tier-list-item">
                      <Icon icon="lucide:check" className="check-icon-success" />
                      <span>No counterparty risk</span>
                    </li>
                    <li className="tier-list-item">
                      <Icon icon="lucide:check" className="check-icon-success" />
                      <span>Instant execution</span>
                    </li>
                    <li className="tier-list-item">
                      <Icon icon="lucide:alert-triangle" className="check-icon-warning" />
                      <span>Requires strong internal controls</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
