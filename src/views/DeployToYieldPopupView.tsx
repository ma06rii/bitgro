// DeployToYieldPopupView — direct port of `views/DeployToYieldPopupView.vue`.
// Same grid as DeployToYieldGridView, with a modal overlay rendered on top.

import { Icon } from '@iconify/react'

import '@/assets/deploy_to_yield_popup.css'

export default function DeployToYieldPopupView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Deploy to Yield</span>
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
        <div>
          <h2 className="section-title">
            <span>Available Strategies</span>
          </h2>
          <div className="strategy-grid">
            <div className="strategy-card">
              <div className="strategy-card-pad">
                <div className="strategy-card-header">
                  <div className="strategy-name-group">
                    <h3 className="strategy-name">
                      <span>Bitcoin Lending</span>
                    </h3>
                    <p className="strategy-provider">
                      <span>Starknet</span>
                    </p>
                  </div>
                  <div className="badge-tier2">
                    <span>Tier 2: Self-Custody</span>
                  </div>
                </div>
                <div className="strategy-apy-box">
                  <div className="apy-header">
                    <span className="apy-label">
                      <span>Target APY</span>
                    </span>
                    <span className="apy-value">
                      <span>3.5% – 5.0%</span>
                    </span>
                  </div>
                  <p className="apy-note">
                    <span>* Variable rate, not guaranteed</span>
                  </p>
                </div>
                <div className="strategy-details">
                  <div className="risk-block">
                    <div className="risk-header">
                      <span className="risk-label">
                        <span>Risk Rating</span>:
                      </span>
                      <span className="risk-value">
                        <span>Moderate</span>
                      </span>
                    </div>
                    <p className="risk-desc">
                      <span>Smart contract risk on Starknet L2 ecosystem.</span>
                    </p>
                  </div>
                  <div className="protocol-status-ok">
                    <Icon icon="lucide:check-circle" className="protocol-icon-ok" />
                    <span className="protocol-label-ok">
                      <span>Protocol Healthy</span>
                    </span>
                  </div>
                </div>
                <div className="strategy-card-footer">
                  <button className="btn-deploy">
                    <span>Deploy Capital</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="strategy-card-locked">
              <div className="strategy-card-pad">
                <div className="strategy-card-header">
                  <div className="strategy-name-group">
                    <h3 className="strategy-name">
                      <span>mRe7BTC Fund</span>
                    </h3>
                    <p className="strategy-provider">
                      <span>Re7 Capital</span>
                    </p>
                  </div>
                  <div className="badge-tier3">
                    <span>Tier 3: Delegated</span>
                  </div>
                </div>
                <div className="strategy-apy-box">
                  <div className="apy-header">
                    <span className="apy-label">
                      <span>Target APY</span>
                    </span>
                    <span className="apy-value">
                      <span>5.5% – 7.0%</span>
                    </span>
                  </div>
                  <p className="apy-note">
                    <span>* Variable rate, not guaranteed</span>
                  </p>
                </div>
                <div className="strategy-details">
                  <div className="risk-block">
                    <div className="risk-header">
                      <span className="risk-label">
                        <span>Risk Rating</span>:
                      </span>
                      <span className="risk-value">
                        <span>Advanced</span>
                      </span>
                    </div>
                    <p className="risk-desc">
                      <span>Active algorithmic trading fund with counterparty exposure.</span>
                    </p>
                  </div>
                  <div className="protocol-status-locked">
                    <Icon icon="lucide:lock" className="protocol-icon-locked" />
                    <span className="protocol-label-locked">
                      <span>Locked: Pending Board Approval</span>
                    </span>
                  </div>
                </div>
                <div className="strategy-card-footer">
                  <button className="btn-locked">
                    <span>Tier 3 Required</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="strategy-card">
              <div className="strategy-card-pad">
                <div className="strategy-card-header">
                  <div className="strategy-name-group">
                    <h3 className="strategy-name">
                      <span>Collateralized Debt</span>
                    </h3>
                    <p className="strategy-provider">
                      <span>Mezo CDP</span>
                    </p>
                  </div>
                  <div className="badge-tier2">
                    <span>Tier 2: Self-Custody</span>
                  </div>
                </div>
                <div className="strategy-apy-box">
                  <div className="apy-header">
                    <span className="apy-label">
                      <span>Target APY</span>
                    </span>
                    <span className="apy-value">
                      <span>7.0% – 8.5%</span>
                    </span>
                  </div>
                  <p className="apy-note">
                    <span>* Variable rate, not guaranteed</span>
                  </p>
                </div>
                <div className="strategy-details">
                  <div className="risk-block">
                    <div className="risk-header">
                      <span className="risk-label">
                        <span>Risk Rating</span>:
                      </span>
                      <span className="risk-value">
                        <span>Conservative</span>
                      </span>
                    </div>
                    <p className="risk-desc">
                      <span>Over-collateralized debt position on native Bitcoin L2.</span>
                    </p>
                  </div>
                  <div className="protocol-status-ok">
                    <Icon icon="lucide:check-circle" className="protocol-icon-ok" />
                    <span className="protocol-label-ok">
                      <span>Protocol Healthy</span>
                    </span>
                  </div>
                </div>
                <div className="strategy-card-footer">
                  <button className="btn-deploy">
                    <span>Deploy Capital</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="positions-panel">
          <div className="positions-panel-header">
            <h3 className="positions-panel-title">
              <span>Active Positions Summary</span>
            </h3>
          </div>
          <div className="positions-panel-body">
            <div className="positions-table-wrap">
              <table className="positions-table">
                <thead className="positions-thead">
                  <tr>
                    <th className="positions-th">
                      <span>Strategy</span>
                    </th>
                    <th className="positions-th-right">
                      <span>Amount Deployed</span>
                    </th>
                    <th className="positions-th-right">
                      <span>Current APY</span>
                    </th>
                    <th className="positions-th-center">
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="positions-tbody">
                  <tr className="positions-tr">
                    <td className="positions-td">
                      <span>Bitcoin Lending – Starknet</span>
                    </td>
                    <td className="positions-td-right">150.00 BTC</td>
                    <td className="positions-td-success">4.2%</td>
                    <td className="positions-td-center">
                      <div className="badge-healthy">
                        <span>Healthy</span>
                      </div>
                    </td>
                  </tr>
                  <tr className="positions-tr">
                    <td className="positions-td">
                      <span>Mezo CDP</span>
                    </td>
                    <td className="positions-td-right">300.25 BTC</td>
                    <td className="positions-td-success">8.1%</td>
                    <td className="positions-td-center">
                      <div className="badge-healthy">
                        <span>Healthy</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div className="modal-overlay">
        <div className="modal-dialog">
          <div className="modal-header">
            <div className="modal-header-left">
              <div className="modal-header-icon">
                <Icon icon="lucide:trending-up" className="modal-header-icon-glyph" />
              </div>
              <h2 className="modal-title">
                <span>Deploy to Mezo CDP</span>
              </h2>
            </div>
            <button className="modal-close">
              <Icon icon="lucide:x" className="modal-close-icon" />
            </button>
          </div>
          <div className="modal-body">
            <div className="wizard-steps">
              <div className="wizard-connector-line" />
              <div className="wizard-step-item">
                <div className="wizard-step-circle">1</div>
                <span className="wizard-step-label">
                  <span>Amount</span>
                </span>
              </div>
              <div className="wizard-step-item">
                <div className="wizard-step-circle">2</div>
                <span className="wizard-step-label">
                  <span>Risk Disclosure</span>
                </span>
              </div>
              <div className="wizard-step-item">
                <div className="wizard-step-circle-active">3</div>
                <span className="wizard-step-label-active">
                  <span>Review &amp; Execution</span>
                </span>
              </div>
            </div>
            <div className="risk-disclaimer">
              <h4 className="disclaimer-title">
                <Icon icon="lucide:alert-triangle" className="disclaimer-icon" />
                <span>Mandatory Risk Acknowledgement</span>
              </h4>
              <p className="disclaimer-text">
                <span>
                  By proceeding, you acknowledge that capital deployed to smart contracts carries
                  inherent risks, including but not limited to protocol exploits, liquidation
                  cascades, and temporary loss of peg. This is a Tier 2 Self-Custody action.
                </span>
              </p>
              <label className="disclaimer-accept">
                <div className="disclaimer-checkbox">
                  <Icon icon="lucide:check" className="disclaimer-check-icon" />
                </div>
                <span className="disclaimer-accept-text">
                  <span>
                    I, Sarah Jenkins (CFO), have read the full risk disclosure and authorize this
                    deployment on behalf of ACME Holdings LLC.
                  </span>
                </span>
              </label>
            </div>
            <div className="preview-card">
              <div className="preview-card-header">
                <h3 className="preview-card-title">
                  <span>Execution Preview</span>
                </h3>
              </div>
              <div className="preview-card-body">
                <div className="preview-grid">
                  <div>
                    <label className="preview-label">
                      <span>Source Account</span>
                    </label>
                    <div className="preview-value">
                      <span>Coinbase Prime (Available: 1,245.88 BTC)</span>
                    </div>
                  </div>
                  <div>
                    <label className="preview-label">
                      <span>Target Protocol</span>
                    </label>
                    <div className="preview-value">
                      <span>Mezo CDP Contract</span>
                    </div>
                  </div>
                </div>
                <div className="deployment-amount-box">
                  <div>
                    <div className="deployment-box-label">
                      <span>Deployment Amount</span>
                    </div>
                    <div className="deployment-btc">50.00 BTC</div>
                  </div>
                  <div className="deployment-box-right">
                    <div className="deployment-box-label">
                      <span>Live Value</span>
                    </div>
                    <div className="deployment-usd">
                      <span>≈ $3,385,000 USD</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="tx-sequence-title">
                    <span>Transaction Sequence:</span>
                  </h4>
                  <ul className="tx-sequence">
                    <div className="tx-connector" />
                    <li className="tx-step">
                      <div className="tx-number">1</div>
                      <p className="tx-desc">
                        <span>Withdraw 50.00 BTC from Coinbase Prime.</span>
                      </p>
                    </li>
                    <li className="tx-step">
                      <div className="tx-number">2</div>
                      <p className="tx-desc">
                        <span>Bridge assets to Mezo native network via official bridge.</span>
                      </p>
                    </li>
                    <li className="tx-step">
                      <div className="tx-number">3</div>
                      <p className="tx-desc">
                        <span>Deposit into Mezo CDP contract and mint receipt tokens.</span>
                      </p>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button className="btn-cancel">
              <span>Cancel</span>
            </button>
            <button className="btn-confirm">
              <span className="confirm-inner">
                <Icon icon="lucide:lock" className="confirm-lock-icon" />
                <span>Confirm Deployment (4s)</span>
              </span>
              <div className="confirm-progress-bar" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
