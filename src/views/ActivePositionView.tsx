// ActivePositionView — direct port of `views/ActivePositionView.vue`.

import { Icon } from '@iconify/react'

import '@/assets/active_position.css'

export default function ActivePositionView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Active Positions</span>
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
        <div className="stats-grid">
          <div className="stat-card-hero">
            <div className="stat-card-pad">
              <div className="stat-hero-inner">
                <div>
                  <h2 className="stat-hero-label">
                    <span>Total Capital Deployed</span>
                  </h2>
                  <div className="stat-hero-amount">
                    535.75 <span className="stat-hero-unit">BTC</span>
                  </div>
                  <div className="stat-hero-sub">
                    <span>≈ $36,431,000 USD</span>
                  </div>
                </div>
                <div className="stat-hero-icon-wrap">
                  <Icon icon="lucide:pie-chart" className="stat-hero-icon" />
                </div>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-pad">
              <h2 className="stat-label">
                <span>Total Yield Earned</span>
              </h2>
              <div className="stat-value-success">+4.25 BTC</div>
              <div className="stat-sub-success">
                <span>+$289,000 USD</span>
              </div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-card-pad">
              <h2 className="stat-label">
                <span>Blended APY</span>
              </h2>
              <div className="stat-value">6.8%</div>
              <div className="stat-sub">
                <span>Across 3 active strategies</span>
              </div>
            </div>
          </div>
        </div>

        <div className="positions-card">
          <div className="positions-header">
            <h3 className="positions-title">
              <span>Position Management</span>
            </h3>
          </div>
          <div className="positions-body">
            <div className="positions-table-wrap">
              <table className="positions-table">
                <thead className="positions-thead">
                  <tr>
                    <th className="pos-th">
                      <span>Strategy</span>
                    </th>
                    <th className="pos-th">
                      <span>Deployed &amp; Value</span>
                    </th>
                    <th className="pos-th">
                      <span>Performance</span>
                    </th>
                    <th className="pos-th">
                      <span>Health &amp; Collateral</span>
                    </th>
                    <th className="pos-th pos-th-center">
                      <span>Auto-Compound</span>
                    </th>
                    <th className="pos-th pos-th-right">
                      <span>Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="positions-tbody">
                  <tr className="position-row">
                    <td className="pos-td-top">
                      <div className="position-name">
                        <span>Mezo CDP</span>
                      </div>
                      <div className="position-badge">
                        <span>Tier 2</span>
                      </div>
                    </td>
                    <td className="pos-td-top">
                      <div className="pos-amount">300.25 BTC</div>
                      <div className="pos-usd">$20,417,000</div>
                    </td>
                    <td className="pos-td-top">
                      <div className="pos-yield">+2.68 BTC</div>
                      <div className="pos-apy">
                        8.1%<span> APY</span>
                      </div>
                    </td>
                    <td className="pos-td-top">
                      <div className="health-badge-good">
                        <span>Healthy</span>
                      </div>
                      <div className="health-ltv">
                        <span>45% LTV</span>
                      </div>
                      <div className="health-liq">
                        <span>Liq. at $35,200</span>
                      </div>
                    </td>
                    <td className="pos-td-center">
                      <div className="toggle-wrap">
                        <div className="toggle-thumb-on" />
                      </div>
                      <div className="toggle-label">
                        <span>Enabled</span>
                      </div>
                    </td>
                    <td className="pos-td-right">
                      <button className="btn-outline-sm">
                        <span>Withdraw</span>
                      </button>
                      <button className="btn-link-right">
                        <span>View History</span>
                        <Icon icon="lucide:chevron-down" className="entity-chevron" />
                      </button>
                    </td>
                  </tr>

                  <tr className="position-row-warning">
                    <td className="pos-td-top">
                      <div className="position-name">
                        <span>mRe7BTC Fund</span>
                      </div>
                      <div className="position-badge">
                        <span>Tier 3</span>
                      </div>
                    </td>
                    <td className="pos-td-top">
                      <div className="pos-amount">85.50 BTC</div>
                      <div className="pos-usd">$5,814,000</div>
                    </td>
                    <td className="pos-td-top">
                      <div className="pos-yield">+1.12 BTC</div>
                      <div className="pos-apy">
                        5.8%<span> APY</span>
                      </div>
                    </td>
                    <td className="pos-td-top">
                      <div className="health-badge-warning">
                        <span>At Risk</span>
                      </div>
                      <div className="health-ltv">
                        <span>82% LTV</span>
                      </div>
                      <div className="health-liq-danger">
                        <span>Liq. at $62,400</span>
                      </div>
                    </td>
                    <td className="pos-td-center">
                      <div className="toggle-wrap">
                        <div className="toggle-thumb-off" />
                      </div>
                      <div className="toggle-label">
                        <span>Disabled</span>
                      </div>
                    </td>
                    <td className="pos-td-right">
                      <button className="btn-primary-full">
                        <span>Add Collateral</span>
                      </button>
                      <button className="btn-outline-full">
                        <span>Withdraw</span>
                      </button>
                      <button className="btn-link-right">
                        <span>Hide History</span>
                        <Icon icon="lucide:chevron-up" className="entity-chevron" />
                      </button>
                    </td>
                  </tr>

                  <tr className="position-history-row">
                    <td colSpan={6} className="pos-td-history">
                      <div className="history-panel">
                        <h4 className="history-title">
                          <span>Recent Position History</span>
                        </h4>
                        <div className="history-list">
                          <div className="history-item-border">
                            <div className="history-item-left">
                              <span className="history-dot-warning" />
                              <span className="history-label">
                                <span>LTV Alert Triggered</span>
                              </span>
                            </div>
                            <div className="history-time">
                              <span>Today, 09:15 AM</span>
                            </div>
                          </div>
                          <div className="history-item-border">
                            <div className="history-item-left">
                              <span className="history-dot-success" />
                              <span className="history-label">
                                <span>Yield Accrued (+0.12 BTC)</span>
                              </span>
                            </div>
                            <div className="history-time">
                              <span>Yesterday, 14:00 PM</span>
                            </div>
                          </div>
                          <div className="history-item">
                            <div className="history-item-left">
                              <span className="history-dot-primary" />
                              <span className="history-label">
                                <span>Initial Deployment (85.50 BTC)</span>
                              </span>
                            </div>
                            <div className="history-time">
                              <span>Oct 12, 2023</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>

                  <tr className="position-row">
                    <td className="pos-td-top">
                      <div className="position-name">
                        <span>Bitcoin Lending – Starknet</span>
                      </div>
                      <div className="position-badge">
                        <span>Tier 2</span>
                      </div>
                    </td>
                    <td className="pos-td-top">
                      <div className="pos-amount">150.00 BTC</div>
                      <div className="pos-usd">$10,200,000</div>
                    </td>
                    <td className="pos-td-top">
                      <div className="pos-yield">+0.45 BTC</div>
                      <div className="pos-apy">
                        4.2%<span> APY</span>
                      </div>
                    </td>
                    <td className="pos-td-top">
                      <div className="health-badge-good">
                        <span>Healthy</span>
                      </div>
                      <div className="health-ltv">
                        <span>N/A (Lending)</span>
                      </div>
                      <div className="health-liq">
                        <span>No Liq. Risk</span>
                      </div>
                    </td>
                    <td className="pos-td-center">
                      <div className="toggle-wrap">
                        <div className="toggle-thumb-on" />
                      </div>
                      <div className="toggle-label">
                        <span>Enabled</span>
                      </div>
                    </td>
                    <td className="pos-td-right">
                      <button className="btn-outline-sm">
                        <span>Withdraw</span>
                      </button>
                      <button className="btn-link-right">
                        <span>View History</span>
                        <Icon icon="lucide:chevron-down" className="entity-chevron" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="info-bar">
              <Icon icon="lucide:info" className="info-icon" />
              <p className="info-text">
                <strong className="info-strong">
                  <span>Auto-Compound:</span>
                </strong>{' '}
                <span>
                  When enabled, earned yield is automatically re-deposited into the strategy to
                  maximize APY. When disabled, yield accumulates in your un-deployed wallet
                  balance. Changing this setting requires a signature.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
