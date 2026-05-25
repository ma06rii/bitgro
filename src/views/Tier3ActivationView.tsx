// Tier3ActivationView — direct port of `views/Tier3ActivationView.vue`.
// Purely presentational (no state, no handlers); template + CSS only.

import { Icon } from '@iconify/react'

import '@/assets/tier3_activation.css'

export default function Tier3ActivationView() {
  return (
    <div className="t3-main">
      <div className="t3-intro">
        <h1 className="t3-title">
          <span>Complete Tier 3 Activation</span>
        </h1>
        <p className="t3-subtitle">
          <span>Unlock advanced delegated yield strategies and algorithmic funds.</span>
        </p>
      </div>
      <div className="wizard-track">
        <div className="wizard-connector" />
        <div className="wizard-steps">
          <div className="wizard-step">
            <div className="step-icon-done">
              <Icon icon="lucide:check" className="step-check-icon" />
            </div>
            <div className="step-body">
              <div className="step-header-row">
                <div>
                  <h3 className="step-title">
                    <span>Tier 3 Explainer</span>
                  </h3>
                  <p className="step-desc">
                    <span>Acknowledged the risks and mechanics of delegated strategies.</span>
                  </p>
                </div>
                <button className="btn-edit">
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          <div className="wizard-step">
            <div className="step-icon-done">
              <Icon icon="lucide:check" className="step-check-icon" />
            </div>
            <div className="step-body">
              <div className="step-header-row">
                <div>
                  <h3 className="step-title">
                    <span>Investor Classification</span>
                  </h3>
                  <p className="step-desc">
                    <span>Classified as Qualified Purchaser.</span>
                  </p>
                  <div className="classification-grid">
                    <div className="classification-item">
                      <span className="item-label">
                        <span>Entity Type</span>
                      </span>
                      <span className="item-value">
                        <span>Corporate Entity</span>
                      </span>
                    </div>
                    <div className="classification-item">
                      <span className="item-label">
                        <span>Assets Under Management</span>
                      </span>
                      <span className="item-value">
                        <span>&gt; $25,000,000 USD</span>
                      </span>
                    </div>
                  </div>
                </div>
                <button className="btn-edit">
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          <div className="wizard-step">
            <div className="step-icon-done">
              <Icon icon="lucide:check" className="step-check-icon" />
            </div>
            <div className="step-body">
              <div className="step-header-row">
                <div className="step-body-full">
                  <h3 className="step-title">
                    <span>Board Approval Upload</span>
                  </h3>
                  <p className="step-desc">
                    <span>Corporate resolution authorizing Tier 3 deployments.</span>
                  </p>
                  <div className="board-doc-card">
                    <div className="doc-left">
                      <div className="doc-icon">
                        <Icon icon="lucide:file-text" className="doc-file-icon" />
                      </div>
                      <div className="doc-info">
                        <p className="doc-name">
                          <span>Board_Resolution_ACME_Oct2023.pdf</span>
                        </p>
                        <p className="doc-meta">
                          1.4 MB • <span>Uploaded by Sarah Jenkins</span>
                        </p>
                      </div>
                    </div>
                    <Icon icon="lucide:check-circle" className="doc-check" />
                  </div>
                </div>
                <button className="btn-edit">
                  <span>Edit</span>
                </button>
              </div>
            </div>
          </div>

          <div className="wizard-step">
            <div className="step-icon-current">4</div>
            <div className="step-body">
              <div>
                <h3 className="step-title-lg">
                  <span>Liability Waiver</span>
                </h3>
                <p className="step-desc">
                  <span>
                    Please read the full risk disclosure. You must scroll to the bottom to accept.
                  </span>
                </p>
                <div className="waiver-box">
                  <div className="waiver-scroll">
                    <div className="waiver-section">
                      <h4 className="waiver-section-title">
                        <span>1. Acknowledgment of Risk</span>
                      </h4>
                      <p className="waiver-section-text">
                        <span>
                          By activating Tier 3, you acknowledge that capital deployed to third-party
                          smart contracts, delegated trading funds, and algorithmic strategies
                          carries inherent and significant risks, including but not limited to
                          protocol exploits, liquidation cascades, temporary loss of peg, and total
                          loss of principal.
                        </span>
                      </p>
                    </div>
                    <div className="waiver-section">
                      <h4 className="waiver-section-title">
                        <span>2. Smart Contract Vulnerabilities</span>
                      </h4>
                      <p className="waiver-section-text">
                        <span>
                          Lemongrass acts solely as a treasury management interface. We do not
                          audit, endorse, or guarantee the security of third-party smart contracts
                          (e.g., Mezo, Starknet, Re7). You accept that hacks or exploits on these
                          external networks may result in irreversible loss.
                        </span>
                      </p>
                    </div>
                    <div className="waiver-section">
                      <h4 className="waiver-section-title">
                        <span>3. Counterparty Risk</span>
                      </h4>
                      <p className="waiver-section-text">
                        <span>
                          Delegated funds (e.g., mRe7BTC) involve trusting a third-party entity to
                          execute trading strategies. You acknowledge that malfeasance, bankruptcy,
                          or insolvency of these counterparties may lead to a total loss of
                          deployed assets.
                        </span>
                      </p>
                    </div>
                    <div className="waiver-section">
                      <h4 className="waiver-section-title">
                        <span>4. Regulatory Compliance</span>
                      </h4>
                      <p className="waiver-section-text">
                        <span>
                          You confirm that your corporate entity is fully compliant with all local
                          jurisdictions regarding the deployment of digital assets into
                          yield-bearing strategies, and that you have obtained all necessary board
                          and legal approvals.
                        </span>
                      </p>
                    </div>
                    <div className="waiver-section">
                      <h4 className="waiver-section-title">
                        <span>5. No Recourse against Lemongrass</span>
                      </h4>
                      <p className="waiver-section-text">
                        <span>
                          Under no circumstances shall Lemongrass, its officers, or its affiliates
                          be held liable for any financial losses incurred through the use of Tier
                          3 strategies. This software is provided "as is" without warranty of any
                          kind.
                        </span>
                      </p>
                    </div>
                    <div className="waiver-end">
                      <span className="waiver-end-badge">
                        <Icon icon="lucide:check" className="waiver-end-icon" />
                        <span>End of document reached</span>
                      </span>
                    </div>
                  </div>
                  <div className="waiver-footer">
                    <label className="accept-label">
                      <div className="accept-checkbox">
                        <Icon icon="lucide:check" className="accept-check-icon" />
                      </div>
                      <span className="accept-text">
                        <span>
                          I, Sarah Jenkins (CFO), have read and fully accept the liability waiver
                          on behalf of ACME Holdings LLC.
                        </span>
                      </span>
                    </label>
                    <button className="btn-accept">
                      <span>I Accept &amp; Continue</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="wizard-step-pending">
            <div className="step-icon-pending">5</div>
            <div className="step-body">
              <h3 className="step-title">
                <span>Confirmation</span>
              </h3>
              <p className="step-desc">
                <span>Final review and activation.</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
