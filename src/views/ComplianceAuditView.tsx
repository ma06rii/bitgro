// ComplianceAuditView — direct port of `views/ComplianceAuditView.vue`.

import { Icon } from '@iconify/react'

import '@/assets/compliance_audit.css'

export default function ComplianceAuditView() {
  return (
    <>
      <header className="page-header">
        <div className="header-left">
          <h1 className="page-title">
            <span>Compliance &amp; Audit</span>
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
        <div className="status-cards-grid">
          <div className="status-card">
            <div className="status-card-pad">
              <div className="status-card-header">
                <Icon icon="lucide:check-circle" className="status-card-icon-success" />
                <h3 className="status-card-title">
                  <span>Proof of Reserves (PoR)</span>
                </h3>
              </div>
              <p className="status-card-desc">
                <span>Cryptographic verification of on-chain assets.</span>
              </p>
              <div className="status-card-footer">
                <span className="status-card-meta">
                  <span>Last verified:</span>
                </span>
                <span className="status-card-meta-value">
                  <span>Today, 08:00 AM</span>
                </span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-card-pad">
              <div className="status-card-header">
                <Icon icon="lucide:shield-check" className="status-card-icon-success" />
                <h3 className="status-card-title">
                  <span>AML / KYC Status</span>
                </h3>
              </div>
              <p className="status-card-desc">
                <span>Ongoing transaction monitoring &amp; screening.</span>
              </p>
              <div className="status-card-footer">
                <span className="status-card-meta">
                  <span>Flagged Txns:</span>
                </span>
                <span className="status-card-meta-value-success">
                  <span>0 (Clean)</span>
                </span>
              </div>
            </div>
          </div>

          <div className="status-card">
            <div className="status-card-pad">
              <div className="status-card-header">
                <Icon icon="lucide:file-signature" className="status-card-icon-accent" />
                <h3 className="status-card-title">
                  <span>Tier 3 Approvals</span>
                </h3>
              </div>
              <p className="status-card-desc">
                <span>Board waivers for advanced yield strategies.</span>
              </p>
              <div className="status-card-footer">
                <span className="status-card-meta">
                  <span>Active Waivers:</span>
                </span>
                <span className="status-card-meta-value">1</span>
              </div>
            </div>
          </div>
        </div>

        <div className="audit-panel">
          <div className="audit-tabs">
            <button className="audit-tab-active">
              <span>Deployment Logs</span>
            </button>
            <button className="audit-tab">
              <span>Proof of Reserves (PoR)</span>
            </button>
            <button className="audit-tab">
              <span>AML/KYC Status</span>
            </button>
            <button className="audit-tab">
              <span>Tier 3 Waivers</span>
            </button>
            <button className="audit-tab">
              <span>Performance Audit</span>
            </button>
          </div>
          <div className="audit-body">
            <div className="audit-header-row">
              <div>
                <h3 className="audit-title">
                  <span>Deployment &amp; Risk Authorisation Log</span>
                </h3>
                <p className="audit-subtitle">
                  <span>
                    Immutable record of all capital deployments, including who authorized them and
                    the specific risks acknowledged.
                  </span>
                </p>
              </div>
              <button className="btn-outline-icon">
                <Icon icon="lucide:download" className="btn-icon" />
                <span>Export Audit Trail</span>
              </button>
            </div>
            <div className="audit-table-wrap">
              <table className="audit-table">
                <thead className="audit-thead">
                  <tr>
                    <th className="audit-th">
                      <span>Date / ID</span>
                    </th>
                    <th className="audit-th">
                      <span>Authorized By</span>
                    </th>
                    <th className="audit-th">
                      <span>Action / Amount</span>
                    </th>
                    <th className="audit-th">
                      <span>Risk Acknowledged</span>
                    </th>
                    <th className="audit-th audit-th-center">
                      <span>Status</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="audit-tbody">
                  <tr className="audit-row">
                    <td className="audit-td-top">
                      <div className="audit-date-main">Oct 15, 2023 • 14:32</div>
                      <div className="audit-date-id">LOG-9921</div>
                    </td>
                    <td className="audit-td-top">
                      <div className="author-row">
                        <div className="author-avatar">S</div>
                        <div>
                          <div className="author-name">Sarah Jenkins</div>
                          <div className="author-role">CFO</div>
                        </div>
                      </div>
                    </td>
                    <td className="audit-td-top">
                      <div className="action-main">
                        <span>Deploy to Mezo Earn</span>
                      </div>
                      <div className="action-sub">50.00 BTC</div>
                    </td>
                    <td className="audit-td-top">
                      <div className="risk-row">
                        <Icon icon="lucide:check-square" className="risk-check" />
                        <div>
                          <div className="risk-title">
                            <span>Mandatory Disclosure Signed</span>
                          </div>
                          <div className="risk-sub">
                            <span>Standard Earn Risk, Smart Contract Exposure</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="audit-td-top-center">
                      <div className="badge-executed">
                        <span>Executed</span>
                      </div>
                    </td>
                  </tr>

                  <tr className="audit-row">
                    <td className="audit-td-top">
                      <div className="audit-date-main">Oct 12, 2023 • 09:15</div>
                      <div className="audit-date-id">LOG-9884</div>
                    </td>
                    <td className="audit-td-top">
                      <div className="author-row">
                        <div className="author-avatar">M</div>
                        <div>
                          <div className="author-name">Marcus Thorne</div>
                          <div className="author-role">CEO</div>
                        </div>
                      </div>
                    </td>
                    <td className="audit-td-top">
                      <div className="action-main">
                        <span>Tier 3 Activation Waiver</span>
                      </div>
                      <div className="action-sub">—</div>
                    </td>
                    <td className="audit-td-top">
                      <div className="risk-row">
                        <Icon icon="lucide:check-square" className="risk-check" />
                        <div>
                          <div className="risk-title">
                            <span>Mandatory Disclosure Signed</span>
                          </div>
                          <div className="risk-sub">
                            <span>Counterparty Risk, Algorithmic Fund Exposure</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="audit-td-top-center">
                      <div className="badge-archived">
                        <span>Archived</span>
                      </div>
                    </td>
                  </tr>

                  {/* <tr className="audit-row">
                    <td className="audit-td-top">
                      <div className="audit-date-main">Oct 10, 2023 • 11:05</div>
                      <div className="audit-date-id">LOG-9801</div>
                    </td>
                    <td className="audit-td-top">
                      <div className="author-row">
                        <div className="author-avatar">S</div>
                        <div>
                          <div className="author-name">Sarah Jenkins</div>
                          <div className="author-role">CFO</div>
                        </div>
                      </div>
                    </td>
                    <td className="audit-td-top">
                      <div className="action-main">
                        <span>Deploy to Starknet Lending</span>
                      </div>
                      <div className="action-sub">150.00 BTC</div>
                    </td>
                    <td className="audit-td-top">
                      <div className="risk-row">
                        <Icon icon="lucide:check-square" className="risk-check" />
                        <div>
                          <div className="risk-title">
                            <span>Mandatory Disclosure Signed</span>
                          </div>
                          <div className="risk-sub">
                            <span>L2 Smart Contract Exposure</span>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="audit-td-top-center">
                      <div className="badge-executed">
                        <span>Executed</span>
                      </div>
                    </td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
