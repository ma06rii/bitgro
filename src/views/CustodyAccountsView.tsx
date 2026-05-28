// CustodyAccountsView — direct port of `views/CustodyAccountsView.vue`.

import { Icon } from '@iconify/react'

import '@/assets/custody_accounts.css'

export default function CustodyAccountsView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Custody Accounts &amp; Policies</span>
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
        <div className="custody-layout">
          <div className="accounts-sidebar">
            <div className="accounts-sidebar-header">
              <h2 className="accounts-sidebar-title">
                <span>Connected Accounts</span>
              </h2>
              <button className="btn-add-account">
                <span>+ Add</span>
              </button>
            </div>

            <div className="account-card">
              <div className="account-card-top">
                <div>
                  <h3 className="account-name">Coinbase Prime</h3>
                  <p className="account-type">
                    <span>Cold Storage</span>
                  </p>
                </div>
                <div className="badge-tier1-sm">
                  <span>Tier 1</span>
                </div>
              </div>
              <div className="account-balance-row">
                <span className="account-balance-label">
                  <span>Balance</span>
                </span>
                <span className="account-balance-value">1,245.88 BTC</span>
              </div>
            </div>

            <div className="account-card-active">
              <div className="account-card-top">
                <div>
                  <h3 className="account-name">DFNS</h3>
                  <p className="account-type">
                    <span>MPC Programmable</span>
                  </p>
                </div>
                <div className="badge-tier2-sm">
                  <span>Tier 2</span>
                </div>
              </div>
              <div className="account-balance-row">
                <span className="account-balance-label">
                  <span>Balance</span>
                </span>
                <span className="account-balance-value-primary">115.00 BTC</span>
              </div>
            </div>

            <div className="account-card">
              <div className="account-card-top">
                <div>
                  <h3 className="account-name">BitGo</h3>
                  <p className="account-type">
                    <span>Regulated Trust</span>
                  </p>
                </div>
                <div className="badge-tier1-sm">
                  <span>Tier 1</span>
                </div>
              </div>
              <div className="account-balance-row">
                <span className="account-balance-label">
                  <span>Balance</span>
                </span>
                <span className="account-balance-value">0.00 BTC</span>
              </div>
            </div>
          </div>

          <div className="policy-editor">
            <div className="policy-editor-panel">
              <div className="policy-editor-header">
                <div>
                  <h2 className="policy-editor-title">
                    <span>Dfns Policy Editor</span>
                  </h2>
                  <p className="policy-editor-subtitle">
                    <span>
                      Configure programmable Wallet Execution Module (WEM) rules.
                    </span>
                  </p>
                </div>
                <button className="btn-save">
                  <span>Save Policy</span>
                </button>
              </div>

              <div className="policy-section">
                <h3 className="policy-section-title">
                  <Icon icon="lucide:sliders" className="policy-section-icon" />
                  <span>Velocity Limits</span>
                </h3>
                <div className="velocity-group">
                  <div className="velocity-item">
                    <div className="velocity-header">
                      <span className="velocity-label">
                        <span>Maximum Transfer per 24 Hours</span>
                      </span>
                      <span className="velocity-value">50.00 BTC</span>
                    </div>
                    <div className="slider-track">
                      <div className="slider-fill-25" />
                      <div className="slider-thumb-25" />
                    </div>
                    <div className="velocity-range">
                      <span>0 BTC</span>
                      <span>
                        200 BTC <span>(Max Capacity)</span>
                      </span>
                    </div>
                  </div>
                  <div className="velocity-item">
                    <div className="velocity-header">
                      <span className="velocity-label">
                        <span>Maximum Transfer per 7 Days</span>
                      </span>
                      <span className="velocity-value">150.00 BTC</span>
                    </div>
                    <div className="slider-track">
                      <div className="slider-fill-75" />
                      <div className="slider-thumb-75" />
                    </div>
                    <div className="velocity-range">
                      <span>0 BTC</span>
                      <span>
                        200 BTC <span>(Max Capacity)</span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="policy-section">
                <div className="quorum-header">
                  <h3 className="policy-section-title">
                    <Icon icon="lucide:users" className="policy-section-icon" />
                    <span>Approval Quorum</span>
                  </h3>
                  <div className="quorum-condition">
                    <span className="quorum-condition-label">
                      <span>Condition:</span>
                    </span>
                    <span className="quorum-condition-value">
                      <span>Transfers &gt; 10.00 BTC</span>
                    </span>
                  </div>
                </div>
                <div className="quorum-panel">
                  <div className="quorum-accent-bar" />
                  <div className="quorum-statement">
                    <span className="quorum-text">
                      <span>Requires</span>
                    </span>
                    <div className="quorum-n-of-m">
                      <span className="quorum-primary">2</span>
                      <span className="quorum-separator">
                        <span>of</span>
                      </span>
                      <span className="quorum-total">3</span>
                    </div>
                    <span className="quorum-text">
                      <span>approvals from the group below:</span>
                    </span>
                  </div>
                  <div className="approver-list">
                    <div className="approver-chip">
                      <img
                        src="https://storage.googleapis.com/banani-avatars/avatar/male/18-25/European/0"
                        className="approver-avatar"
                        alt=""
                      />
                      <div>
                        <p className="approver-name">Sarah Jenkins</p>
                        <p className="approver-role">CFO</p>
                      </div>
                      <div className="approver-remove">
                        <Icon icon="lucide:x" className="approver-remove-icon" />
                      </div>
                    </div>
                    <div className="approver-chip">
                      <img
                        src="https://storage.googleapis.com/banani-avatars/avatar/male/18-25/European/1"
                        className="approver-avatar"
                        alt=""
                      />
                      <div>
                        <p className="approver-name">Marcus Thorne</p>
                        <p className="approver-role">CEO</p>
                      </div>
                      <div className="approver-remove">
                        <Icon icon="lucide:x" className="approver-remove-icon" />
                      </div>
                    </div>
                    <div className="approver-chip">
                      <img
                        src="https://storage.googleapis.com/banani-avatars/avatar/male/18-25/European/2"
                        className="approver-avatar"
                        alt=""
                      />
                      <div>
                        <p className="approver-name">Elena Rostova</p>
                        <p className="approver-role">COO</p>
                      </div>
                      <div className="approver-remove">
                        <Icon icon="lucide:x" className="approver-remove-icon" />
                      </div>
                    </div>
                    <button className="btn-add-approver">
                      <Icon icon="lucide:plus" className="btn-add-approver-icon" />
                      <span>Add Approver</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="policy-section">
                <div className="whitelist-header">
                  <h3 className="policy-section-title">
                    <Icon icon="lucide:list-checks" className="policy-section-icon" />
                    <span>Whitelisted Addresses</span>
                  </h3>
                  <button className="btn-outline-sm">
                    <span>Add Address</span>
                  </button>
                </div>
                <div className="whitelist-table-wrap">
                  <table className="whitelist-table">
                    <thead className="whitelist-thead">
                      <tr>
                        <th className="whitelist-th">
                          <span>Label</span>
                        </th>
                        <th className="whitelist-th">
                          <span>Address</span>
                        </th>
                        <th className="whitelist-th whitelist-th-center">
                          <span>Status</span>
                        </th>
                        <th className="whitelist-th whitelist-th-right">
                          <span>Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="whitelist-tbody">
                      <tr className="whitelist-row">
                        <td className="whitelist-td whitelist-td-label">
                          <span>Coinbase Prime - Main</span>
                        </td>
                        <td className="whitelist-td-mono">bc1qxy2kgdygjrsqtzq...</td>
                        <td className="whitelist-td whitelist-td-center">
                          <div className="badge-active-green">
                            <span>Active</span>
                          </div>
                        </td>
                        <td className="whitelist-td-right">
                          <button className="btn-icon-delete">
                            <Icon icon="lucide:trash-2" className="delete-icon" />
                          </button>
                        </td>
                      </tr>
                      <tr className="whitelist-row">
                        <td className="whitelist-td whitelist-td-label">
                          <span>BitGo Cold Storage</span>
                        </td>
                        <td className="whitelist-td-mono">3J98t1WpEZ73CNmQvie...</td>
                        <td className="whitelist-td whitelist-td-center">
                          <div className="badge-active-green">
                            <span>Active</span>
                          </div>
                        </td>
                        <td className="whitelist-td-right">
                          <button className="btn-icon-delete">
                            <Icon icon="lucide:trash-2" className="delete-icon" />
                          </button>
                        </td>
                      </tr>
                      <tr className="whitelist-row">
                        <td className="whitelist-td whitelist-td-label">
                          <span>Kraken OTC Desk</span>
                        </td>
                        <td className="whitelist-td-mono">bc1qxy2kgdygjrsqtzq...</td>
                        <td className="whitelist-td whitelist-td-center">
                          <div className="badge-pending-orange">
                            <span>Pending Approval</span>
                          </div>
                        </td>
                        <td className="whitelist-td-right">
                          <button className="btn-icon-delete">
                            <Icon icon="lucide:trash-2" className="delete-icon" />
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
