// AccountingSyncView — direct port of `views/AccountingSyncView.vue`.

import { Icon } from '@iconify/react'

import '@/assets/accounting_sync.css'

export default function AccountingSyncView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Accounting Sync</span>
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
            <div className="notification-dot" />
          </div>
        </div>
      </header>
      <div className="page-body">
        <div className="three-col-grid">
          <div className="erp-card">
            <div className="card-header">
              <h3 className="card-title">
                <span>ERP Integration</span>
              </h3>
            </div>
            <div className="card-body">
              <div className="erp-row">
                <div className="erp-identity">
                  <div className="erp-logo-box">
                    <img
                      data-query="green quickbooks logo"
                      data-aspect-ratio="1:1"
                      src="https://storage.googleapis.com/banani-generated-images/generated-images/eef97db0-3448-45d8-8fe3-e2e3aaeffe87.jpg"
                      className="erp-logo-img"
                      alt=""
                    />
                  </div>
                  <div>
                    <h3 className="erp-name">
                      <span>QuickBooks Online</span>
                    </h3>
                    <div className="erp-status-row">
                      <span className="status-dot-success" />
                      <span className="erp-status-label">
                        <span>Connected &amp; Auto-syncing</span>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="erp-sync-info">
                  <p className="erp-sync-label">
                    <span>Last Sync</span>
                  </p>
                  <p className="erp-sync-time">
                    <span>Today, 11:42 AM</span>
                  </p>
                  <button className="link-action-sm">
                    <span>Force Manual Sync</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">
                <span>Tax Settings</span>
              </h3>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">
                  <span>Cost Basis Method</span>
                </label>
                <div className="select-trigger">
                  <span className="select-value">
                    <span>HIFO (Highest In, First Out)</span>
                  </span>
                  <Icon icon="lucide:chevron-down" className="entity-chevron" />
                </div>
                <p className="form-hint">
                  <Icon icon="lucide:info" className="form-hint-icon" />
                  <span>Changes apply to future un-synced entries only.</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="journal-queue">
            <div className="queue-header">
              <div>
                <h3 className="card-title">
                  <span>Journal Entries Queue</span>
                </h3>
                <p className="card-subtitle">
                  <span>
                    Review and approve entries before they are posted to your ERP.
                  </span>
                </p>
              </div>
              <div className="queue-actions">
                <button className="btn-sm">
                  <span>Export CSV</span>
                </button>
                <button className="btn-primary-sm">
                  <span>Sync 4 Pending</span>
                </button>
              </div>
            </div>

            <div className="filter-tabs-bar">
              <button className="filter-tab-active">
                <span>All Entries</span>
              </button>
              <button className="filter-tab">
                <span>Yield</span>
              </button>
              <button className="filter-tab">
                <span>Deployments</span>
              </button>
              <button className="filter-tab">
                <span>Bridge</span>
              </button>
              <button className="filter-tab">
                <span>Transfers</span>
              </button>
            </div>

            <div className="table-scroll">
              <table className="data-table-wide">
                <thead className="table-head">
                  <tr>
                    <th className="th-checkbox">
                      <div className="checkbox-empty" />
                    </th>
                    <th className="th">
                      <span>Date</span>
                    </th>
                    <th className="th">
                      <span>Source / Tag</span>
                    </th>
                    <th className="th">
                      <span>Description</span>
                    </th>
                    <th className="th-right">
                      <span>Debit</span>
                    </th>
                    <th className="th-right">
                      <span>Credit</span>
                    </th>
                    <th className="th-center">
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  <tr className="table-row">
                    <td className="td-checkbox">
                      <div className="checkbox-checked">
                        <Icon icon="lucide:check" className="checkbox-icon" />
                      </div>
                    </td>
                    <td className="td-date">
                      <span>Oct 15, 2023</span>
                    </td>
                    <td className="td-tag">
                      <div className="badge-success">
                        <span>Yield</span>
                      </div>
                    </td>
                    <td className="td-desc">
                      <p className="td-desc-title">
                        <span>Yield Accrual - Starknet Lending</span>
                      </p>
                      <p className="td-desc-sub">
                        <span>Tx: 0x8a2...3f9e</span>
                      </p>
                    </td>
                    <td className="td-amount">0.15 BTC</td>
                    <td className="td-muted">-</td>
                    <td className="td-status-center">
                      <span className="status-pending">
                        <span>Pending</span>
                      </span>
                    </td>
                  </tr>

                  <tr className="table-row">
                    <td className="td-checkbox">
                      <div className="checkbox-empty-muted" />
                    </td>
                    <td className="td-date">
                      <span>Oct 14, 2023</span>
                    </td>
                    <td className="td-tag">
                      <div className="badge-neutral">
                        <span>Transfer</span>
                      </div>
                    </td>
                    <td className="td-desc">
                      <p className="td-desc-title">
                        <span>Internal Transfer (Fireblocks to BitGo)</span>
                      </p>
                      <p className="td-desc-sub">
                        <span>Tx: a4d9...2b1c</span>
                      </p>
                    </td>
                    <td className="td-muted">-</td>
                    <td className="td-muted">-</td>
                    <td className="td-status-center">
                      <span className="status-synced">
                        <Icon icon="lucide:check-circle" className="status-icon" />
                        <span>Synced</span>
                      </span>
                    </td>
                  </tr>

                  <tr className="table-row-muted">
                    <td className="td-checkbox-sm">
                      <div className="checkbox-checked">
                        <Icon icon="lucide:check" className="checkbox-icon" />
                      </div>
                    </td>
                    <td className="td-date td-sm">
                      <span>Oct 12, 2023</span>
                    </td>
                    <td className="td-tag td-sm">
                      <div className="badge-accent">
                        <span>Deployment</span>
                      </div>
                    </td>
                    <td className="td-desc-sm">
                      <p className="td-desc-title-flex">
                        <Icon icon="lucide:chevron-down" className="entity-chevron" />
                        <span>Mezo CDP Multi-Step Deployment</span>
                      </p>
                    </td>
                    <td className="td-muted-sm">-</td>
                    <td className="td-muted-sm">-</td>
                    <td className="td-status-center td-sm">
                      <span className="status-pending">
                        <span>Pending</span>
                      </span>
                    </td>
                  </tr>

                  <tr className="table-row-sub">
                    <td className="td-accent-border" />
                    <td className="td-muted" />
                    <td className="td-step-label">
                      <span className="step-label">
                        <span>Step 1</span>
                      </span>
                    </td>
                    <td className="td-desc-sm">
                      <p className="td-desc-title">
                        <span>Withdraw from Coinbase Prime</span>
                      </p>
                      <p className="td-desc-sub">
                        <span>Tx: e1b8...9c4a</span>
                      </p>
                    </td>
                    <td className="td-muted-sm">-</td>
                    <td className="td-amount-sm">50.00 BTC</td>
                    <td />
                  </tr>

                  <tr className="table-row-sub">
                    <td className="td-accent-border" />
                    <td className="td-muted" />
                    <td className="td-step-label">
                      <span className="step-label">
                        <span>Step 2</span>
                      </span>
                    </td>
                    <td className="td-desc-sm">
                      <p className="td-desc-title">
                        <span>Bridge to Mezo Native L2</span>
                      </p>
                      <p className="td-desc-sub">
                        <span>Network fee: 0.0005 BTC</span>
                      </p>
                    </td>
                    <td className="td-amount-sm">50.00 BTC</td>
                    <td className="td-muted-sm">-</td>
                    <td />
                  </tr>

                  <tr className="table-row-sub">
                    <td className="td-accent-border" />
                    <td className="td-muted" />
                    <td className="td-step-label">
                      <span className="step-label">
                        <span>Step 3</span>
                      </span>
                    </td>
                    <td className="td-desc-sm">
                      <p className="td-desc-title">
                        <span>Deposit Collateral to CDP Vault</span>
                      </p>
                      <p className="td-desc-sub">
                        <span>Minted Receipt Tokens</span>
                      </p>
                    </td>
                    <td className="td-amount-sm">49.9995 BTC</td>
                    <td className="td-muted-sm">-</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="queue-footer">
              <span>
                <span>Showing 1-3 of 32 pending entries</span>
              </span>
              <div className="pagination">
                <button className="btn-xs">
                  <span>Previous</span>
                </button>
                <button className="btn-xs">
                  <span>Next</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
