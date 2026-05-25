// TreasuryView — direct port of `views/TreasuryView.vue`.
// This is the home/dashboard route. Heavy on layout, no state.
//
// Note: `treasury.css` (already imported by Sidebar) defines the .app-shell,
// .main-panel, and .view-shell layout — so we don't import it again here.

import { Icon } from '@iconify/react'

export default function TreasuryView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Treasury Overview</span>
          </h1>
          <div className="badge-tier">
            <span>Tier 1 Active</span>
          </div>
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
            <div className="notification-dot" />
          </div>
        </div>
      </header>
      <div className="page-body">
        <div className="alert-warning">
          <div className="alert-content">
            <Icon icon="lucide:alert-triangle" className="alert-icon" />
            <div>
              <h4 className="alert-title">
                <span>Collateral Health Alert</span>
              </h4>
              <p className="alert-text">
                <span>
                  Re7 mRe7BTC Fund is approaching liquidation threshold. Add collateral
                  immediately to avoid penalty.
                </span>
              </p>
            </div>
          </div>
          <button className="btn-alert-action">
            <span>Add Collateral</span>
          </button>
        </div>

        <div className="two-col-grid">
          <div className="hero-card">
            <div className="card-pad">
              <div className="hero-glow" />
              <div className="hero-content">
                <div>
                  <h2 className="hero-label">
                    <span>Total BTC Holdings</span>
                  </h2>
                  <div className="hero-amount-row">
                    <span className="hero-amount">
                      1,245.88 <span className="hero-amount-unit">BTC</span>
                    </span>
                  </div>
                  <p className="hero-usd">
                    <span>≈ $84,320,150 USD</span>
                  </p>
                  <div className="hero-stats-grid">
                    <div>
                      <div className="hero-stat-label">
                        <span>Available</span>
                      </div>
                      <div className="hero-stat-value">115.00 BTC</div>
                    </div>
                    <div>
                      <div className="hero-stat-label">
                        <span>Deployed</span>
                      </div>
                      <div className="hero-stat-value">1,130.88 BTC</div>
                    </div>
                  </div>
                </div>
                <div className="hero-actions">
                  <button className="btn-primary">
                    <span>Connect Wallet</span>
                  </button>
                  <button className="btn-ghost-white">
                    <span>Deposit BTC</span>
                  </button>
                  <button className="btn-ghost-white">
                    <span>Deploy to Yield</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="two-col-sub-grid">
            <div className="card">
              <div className="card-header">
                <h3 className="card-title">
                  <span>Yield Earnings</span>
                </h3>
                <p className="card-subtitle">
                  <span>Last 30 Days</span>
                </p>
              </div>
              <div className="card-body">
                <div className="yield-inner">
                  <span className="yield-amount">
                    +4.25 <span className="yield-unit">BTC</span>
                  </span>
                  <span className="yield-usd">
                    <span>+$287,550 USD</span>
                  </span>
                  <div className="yield-footer">
                    <div className="yield-footer-row">
                      <span className="yield-footer-label">
                        <span>Annualized Rate</span>
                      </span>
                      <span className="yield-footer-value">
                        <span>6.8% APY</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-flex">
              <div className="card-header">
                <h3 className="card-title">
                  <span>Custody Distribution</span>
                </h3>
              </div>
              <div className="card-body">
                <div className="donut-container">
                  <div className="donut-chart" />
                  <div className="donut-center">
                    <Icon icon="lucide:shield" className="donut-icon" />
                  </div>
                </div>
                <div className="legend">
                  <div className="legend-row">
                    <div className="legend-label">
                      <div className="legend-dot-primary" />
                      <span>Fireblocks</span>
                    </div>
                    <span className="legend-pct">65%</span>
                  </div>
                  <div className="legend-row">
                    <div className="legend-label">
                      <div className="legend-dot-accent" />
                      <span>BitGo</span>
                    </div>
                    <span className="legend-pct">25%</span>
                  </div>
                  <div className="legend-row">
                    <div className="legend-label">
                      <div className="legend-dot-accent-muted" />
                      <span>Self-Custody</span>
                    </div>
                    <span className="legend-pct">10%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <span>Active Positions</span>
            </h3>
            <p className="card-subtitle">
              <span>Deployed capital across strategies</span>
            </p>
          </div>
          <div className="card-body">
            <div className="table-wrapper">
              <table className="data-table">
                <thead className="table-head">
                  <tr>
                    <th className="th">
                      <span>Strategy</span>
                    </th>
                    <th className="th-right">
                      <span>Amount Deployed</span>
                    </th>
                    <th className="th-right">
                      <span>Current APY</span>
                    </th>
                    <th className="th-center">
                      <span>Status</span>
                    </th>
                    <th className="th-right">
                      <span>Action</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row">
                    <td className="td-strategy">
                      <span>Bitcoin Lending – Starknet</span>
                    </td>
                    <td className="td-amount">150.00 BTC</td>
                    <td className="td-apy">4.2%</td>
                    <td className="td-status">
                      <div className="badge-success">
                        <span>Healthy</span>
                      </div>
                    </td>
                    <td className="td-action">
                      <button className="link-action">
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="table-row">
                    <td className="td-strategy">
                      <span>Re7 mRe7BTC Fund</span>
                    </td>
                    <td className="td-amount">85.50 BTC</td>
                    <td className="td-apy">5.8%</td>
                    <td className="td-status">
                      <div className="badge-warning">
                        <span>At Risk</span>
                      </div>
                    </td>
                    <td className="td-action">
                      <button className="link-action">
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                  <tr className="table-row">
                    <td className="td-strategy">
                      <span>Mezo CDP</span>
                    </td>
                    <td className="td-amount">300.25 BTC</td>
                    <td className="td-apy">8.1%</td>
                    <td className="td-status">
                      <div className="badge-success">
                        <span>Healthy</span>
                      </div>
                    </td>
                    <td className="td-action">
                      <button className="link-action">
                        <span>Manage</span>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="table-footer">
              <button className="btn-sm">
                <span>View All Positions</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <footer className="page-footer">
        <div className="footer-status">
          <span className="status-dot" />
          <span>QuickBooks Sync: Active</span>
        </div>
        <div>
          <span>Last synced 2 minutes ago</span>
        </div>
      </footer>
    </>
  )
}
