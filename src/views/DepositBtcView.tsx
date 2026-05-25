// DepositBtcView — direct port of `views/DepositBtcView.vue`.

import { Icon } from '@iconify/react'

import '@/assets/deposit_btc.css'

export default function DepositBtcView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Deposit BTC</span>
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
        <div className="deposit-layout">
          <div className="deposit-main">
            <div className="deposit-info-bar">
              <div className="info-bar-inner">
                <Icon icon="lucide:check-circle" className="info-bar-icon" />
                <div className="info-bar-content">
                  <h4 className="info-bar-title">
                    <span>Tier 1 Custody Selected</span>
                  </h4>
                  <p className="info-bar-desc">
                    <span>
                      Funds deposited here will be held by a Qualified Custodian in cold storage.
                      Bankruptcy remote and fully audited.
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="deposit-details-card">
              <div className="deposit-details-header">
                <h3 className="deposit-details-title">
                  <span>Deposit Details</span>
                </h3>
              </div>
              <div className="deposit-details-body">
                <div className="deposit-step">
                  <h3 className="step-heading">
                    <span className="step-number-badge">1</span>
                    <span>Destination Account</span>
                  </h3>
                  <div className="destination-selector">
                    <div className="destination-left">
                      <div className="destination-icon">
                        <Icon icon="lucide:shield" className="destination-shield-icon" />
                      </div>
                      <div className="destination-info">
                        <p className="destination-name">
                          <span>Coinbase Prime – Main Treasury</span>
                        </p>
                        <div className="destination-meta">
                          <div className="badge-tier1">
                            <span>Tier 1: Qualified</span>
                          </div>
                          <span className="destination-balance">
                            <span>Current Balance: 1,245.88 BTC</span>
                          </span>
                        </div>
                      </div>
                    </div>
                    <Icon icon="lucide:chevron-down" className="destination-chevron" />
                  </div>
                </div>
                <div className="deposit-step">
                  <h3 className="step-heading">
                    <span className="step-number-badge">2</span>
                    <span>Send Bitcoin (BTC) to this address</span>
                  </h3>
                  <div className="send-section">
                    <div className="qr-frame">
                      <img
                        data-query="Black and white QR code"
                        data-aspect-ratio="1:1"
                        src="https://storage.googleapis.com/banani-generated-images/generated-images/34731da1-f86c-439f-8fb2-dcf92e554fc3.jpg"
                        className="qr-image"
                        alt=""
                      />
                    </div>
                    <div className="send-details">
                      <div>
                        <label className="field-label">
                          <span>Network</span>
                        </label>
                        <div className="network-badge">
                          <Icon icon="lucide:bitcoin" className="network-icon" />
                          <span className="network-name">
                            <span>Bitcoin Network</span>
                          </span>
                        </div>
                      </div>
                      <div>
                        <label className="field-label">
                          <span>Deposit Address</span>
                        </label>
                        <div className="address-row">
                          <div className="address-field">
                            bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh
                          </div>
                          <button className="btn-copy">
                            <Icon icon="lucide:copy" className="copy-icon" />
                            <span>Copy</span>
                          </button>
                        </div>
                      </div>
                      <div className="deposit-warning">
                        <Icon icon="lucide:alert-triangle" className="warning-icon" />
                        <p className="warning-text">
                          <span>
                            Only send standard BTC to this address. Sending other assets will
                            result in permanent loss.
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="deposit-step">
                  <h3 className="step-heading">
                    <span className="step-number-badge">3</span>
                    <span>Important Information</span>
                  </h3>
                  <ul className="info-list">
                    <li className="info-item">
                      <Icon icon="lucide:info" className="info-icon" />
                      <span>
                        <span>
                          Minimum deposit amount is 0.01 BTC. Deposits below this amount may not be
                          credited.
                        </span>
                      </span>
                    </li>
                    <li className="info-item">
                      <Icon icon="lucide:clock" className="info-icon" />
                      <span>
                        <span>
                          Deposits require 6 network confirmations (approx. 60 minutes) to settle
                          fully into your treasury balance.
                        </span>
                      </span>
                    </li>
                    <li className="info-item">
                      <Icon icon="lucide:file-text" className="info-icon" />
                      <span>
                        <span>
                          A journal entry will be automatically synced to QuickBooks upon
                          successful settlement.
                        </span>
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <aside className="deposit-tracking-sidebar">
            <div className="tracking-card">
              <div className="tracking-card-header">
                <h3 className="tracking-card-title">
                  <span>Live Deposit Tracking</span>
                </h3>
              </div>
              <div className="tracking-card-body">
                <div className="tracking-status-row">
                  <span className="tracking-status-label">
                    <span>Status</span>
                  </span>
                  <div className="badge-confirming">
                    <span>Confirming</span>
                  </div>
                </div>
                <div className="tracking-timeline">
                  <div className="timeline-connector" />
                  <div className="tracking-step-done">
                    <div className="step-dot-done" />
                    <div className="step-content">
                      <h4 className="step-title">
                        <span>Deposit Detected</span>
                      </h4>
                      <p className="step-desc">
                        <span>Transaction seen on mempool.</span>
                      </p>
                      <div className="step-txid">
                        <span>TxID: a8f9...4b2c</span>
                      </div>
                      <p className="step-time">
                        <span>Today, 14:05 PM</span>
                      </p>
                    </div>
                  </div>
                  <div className="tracking-step-active">
                    <div className="step-dot-active">
                      <div className="ping-dot" />
                    </div>
                    <div className="step-content-wide">
                      <h4 className="step-title">
                        <span>Network Confirmations</span>
                      </h4>
                      <p className="step-desc">
                        <span>Awaiting 6 confirmations for settlement.</span>
                      </p>
                      <div className="confirmation-progress">
                        <div className="progress-header">
                          <span>
                            <span>Progress</span>
                          </span>
                          <span className="progress-count">2 / 6</span>
                        </div>
                        <div className="progress-bar-wrap">
                          <div className="progress-fill" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="tracking-step-pending">
                    <div className="step-dot-pending" />
                    <div className="step-content">
                      <h4 className="step-title-muted">
                        <span>Funds Settled</span>
                      </h4>
                      <p className="step-desc">
                        <span>Balance updated and accounting synced.</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="tracking-explorer-footer">
                  <button className="btn-block-explorer">
                    <span>View Block Explorer</span>
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}
