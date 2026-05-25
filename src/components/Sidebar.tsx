// -----------------------------------------------------------------------------
// Sidebar — direct port of `Sidebar.vue` + `Sidebar.js`.
//
// React explainer:
//   - <NavLink> is React Router's "<a>-with-active-state" component. By passing
//     a function to `className`, we get the `isActive` flag and can apply our
//     existing CSS class `nav-link-active` exactly like Vue Router's
//     `exact-active-class` did.
//   - The `end` prop tells NavLink to only match the exact path (not prefix
//     matches), which is what Vue's `exact-active-class` behaviour was.
//
// Visual styles live in `assets/treasury.css` — same source of truth as Vue.
// -----------------------------------------------------------------------------

import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'

import '@/assets/treasury.css'

interface NavItem {
  to: string
  icon: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { to: '/', icon: 'lucide:layout-dashboard', label: 'Treasury Overview' },
  { to: '/connect-wallet', icon: 'lucide:wallet', label: 'Connect Wallet' },
  { to: '/deposit', icon: 'lucide:arrow-down-to-line', label: 'Deposit BTC' },
  { to: '/yield', icon: 'lucide:trending-up', label: 'Deploy to Yield' },
  { to: '/active', icon: 'lucide:activity', label: 'Active Positions' },
  { to: '/accounting', icon: 'lucide:refresh-ccw', label: 'Accounting Sync' },
  { to: '/compliance', icon: 'lucide:shield-check', label: 'Compliance & Audit' },
  { to: '/tier-activation', icon: 'lucide:unlock', label: 'Tier 3 Activation' },
  { to: '/custody-accounts', icon: 'lucide:building', label: 'Custody Accounts' },
]

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <div className="logo-mark">
            <span className="logo-initial">L</span>
          </div>
          <span className="logo-label">
            <span>LEMONGRASS</span>
          </span>
        </div>
        <nav className="sidebar-nav">
          <div className="nav-section-label">
            <span>Main Menu</span>
          </div>
          {NAV_ITEMS.map(({ to, icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end
              className={({ isActive }) =>
                isActive ? 'nav-link nav-link-active' : 'nav-link'
              }
            >
              <Icon icon={icon} className="nav-icon" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="sidebar-user">
        <img
          src="https://storage.googleapis.com/banani-avatars/avatar/male/18-25/European/0"
          className="user-avatar"
          alt=""
        />
        <div className="user-meta">
          <p className="user-name">
            <span>Sarah Jenkins</span>
          </p>
          <p className="user-role">
            <span>CFO, ACME Corp</span>
          </p>
        </div>
        <Icon icon="lucide:settings" className="settings-icon" />
      </div>
    </aside>
  )
}
