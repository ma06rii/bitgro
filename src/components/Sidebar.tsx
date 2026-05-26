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

import { useEffect, useId, useRef, useState } from 'react'
import { Icon } from '@iconify/react'
import { NavLink } from 'react-router-dom'
import { useClerk, useUser } from '@clerk/react'

import { useAuthStore } from '@/stores/auth'
import '@/assets/treasury.css'
import '@/assets/modal.css'

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

function deriveRole(user: ReturnType<typeof useUser>['user']): string {
  const metaRole = user?.publicMetadata?.role
  if (typeof metaRole === 'string' && metaRole.trim().length > 0) return metaRole
  const email = user?.primaryEmailAddress?.emailAddress
  const domain = email?.split('@')[1]
  if (domain) return domain
  return 'Member'
}

function deriveInitial(name: string): string {
  const trimmed = name.trim()
  if (!trimmed) return '?'
  return trimmed.charAt(0).toUpperCase()
}

export default function Sidebar() {
  const { user, isLoaded } = useUser()
  const { signOut } = useClerk()

  const menuId = useId()
  const titleId = useId()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isConfirmOpen, setIsConfirmOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const logoutItemRef = useRef<HTMLButtonElement | null>(null)
  const cancelBtnRef = useRef<HTMLButtonElement | null>(null)

  // Menu: close on outside click + Escape, focus first item on open.
  useEffect(() => {
    if (!isMenuOpen) return

    logoutItemRef.current?.focus()

    function handleMouseDown(event: MouseEvent) {
      const target = event.target as Node | null
      if (!target) return
      if (menuRef.current?.contains(target)) return
      if (triggerRef.current?.contains(target)) return
      setIsMenuOpen(false)
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('mousedown', handleMouseDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handleMouseDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isMenuOpen])

  // Modal: focus Cancel on open, handle Escape, trap focus inside dialog.
  useEffect(() => {
    if (!isConfirmOpen) return

    cancelBtnRef.current?.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        if (isSigningOut) return
        event.preventDefault()
        closeConfirm()
        return
      }
      if (event.key !== 'Tab') return
      const root = dialogRef.current
      if (!root) return
      const focusable = root.querySelectorAll<HTMLElement>(
        'button:not([disabled]), [href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (focusable.length === 0) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      const active = document.activeElement as HTMLElement | null
      if (event.shiftKey && active === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && active === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isConfirmOpen, isSigningOut])

  function openConfirm() {
    setIsMenuOpen(false)
    setErrorMessage(null)
    setIsConfirmOpen(true)
  }

  function closeConfirm() {
    if (isSigningOut) return
    setIsConfirmOpen(false)
    setErrorMessage(null)
    triggerRef.current?.focus()
  }

  async function handleConfirmLogout() {
    setIsSigningOut(true)
    setErrorMessage(null)
    try {
      // Clerk first: if it throws, local state stays intact so the user isn't
      // left with a half-cleared store while still holding a live Clerk session.
      await signOut({ redirectUrl: '/login' })
      useAuthStore.getState().logout()
    } catch (err) {
      setIsSigningOut(false)
      setErrorMessage(
        err instanceof Error ? err.message : 'Could not sign out. Please try again.',
      )
    }
  }

  const displayName =
    user?.fullName?.trim() ||
    user?.primaryEmailAddress?.emailAddress ||
    'Account'
  const displayRole = deriveRole(user)
  const avatarUrl = user?.imageUrl
  const initial = deriveInitial(displayName)

  return (
    <aside className="sidebar">
      <div>
        <div className="sidebar-header">
          <div className="logo-mark">
            <span className="logo-initial">B</span>
          </div>
          <span className="logo-label">
            <span>BITGRO</span>
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
        {avatarUrl ? (
          <img src={avatarUrl} className="user-avatar" alt="" />
        ) : (
          <div className="user-avatar-fallback" aria-hidden="true">
            {isLoaded ? initial : ''}
          </div>
        )}
        <div className="user-meta">
          {isLoaded ? (
            <>
              <p className="user-name">
                <span>{displayName}</span>
              </p>
              <p className="user-role">
                <span>{displayRole}</span>
              </p>
            </>
          ) : (
            <>
              <p className="user-name">
                <span className="user-skeleton user-skeleton-name" aria-hidden="true" />
              </p>
              <p className="user-role">
                <span className="user-skeleton user-skeleton-role" aria-hidden="true" />
              </p>
              <span className="sr-only">Loading account…</span>
            </>
          )}
        </div>

        <div className="sidebar-user-menu-wrapper">
          <button
            ref={triggerRef}
            type="button"
            className="sidebar-user-button"
            aria-haspopup="menu"
            aria-expanded={isMenuOpen}
            aria-controls={menuId}
            aria-label="Open account menu"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            <Icon icon="lucide:settings" className="settings-icon" />
          </button>

          {isMenuOpen && (
            <div
              ref={menuRef}
              id={menuId}
              role="menu"
              aria-label="Account"
              className="sidebar-user-menu"
            >
              <button
                type="button"
                role="menuitem"
                className="sidebar-user-menu-item"
                aria-disabled="true"
                tabIndex={-1}
                onClick={(e) => e.preventDefault()}
              >
                <Icon
                  icon="lucide:user-cog"
                  className="sidebar-user-menu-icon"
                  aria-hidden="true"
                />
                <span>Account settings</span>
                <span className="sidebar-user-menu-hint">Soon</span>
              </button>
              <button
                ref={logoutItemRef}
                type="button"
                role="menuitem"
                className="sidebar-user-menu-item sidebar-user-menu-item-danger"
                onClick={openConfirm}
              >
                <Icon
                  icon="lucide:log-out"
                  className="sidebar-user-menu-icon"
                  aria-hidden="true"
                />
                <span>Log out</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {isConfirmOpen && (
        <div
          className="logout-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeConfirm()
          }}
        >
          <div
            ref={dialogRef}
            className="modal-dialog logout-modal-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-header-icon logout-modal-header-icon">
                  <Icon
                    icon="lucide:log-out"
                    className="modal-header-icon-glyph"
                    aria-hidden="true"
                  />
                </div>
                <h2 id={titleId} className="modal-title">
                  Log out of Bitgro?
                </h2>
              </div>
              <button
                type="button"
                className="modal-close"
                onClick={closeConfirm}
                disabled={isSigningOut}
                aria-label="Close"
              >
                <Icon icon="lucide:x" className="modal-close-icon" aria-hidden="true" />
              </button>
            </div>
            <div className="modal-body logout-modal-body">
              <p className="logout-modal-copy">
                You&rsquo;ll need to sign in again to access your treasury dashboard.
              </p>
              {errorMessage && (
                <p className="logout-modal-error" role="alert">
                  <Icon
                    icon="lucide:alert-triangle"
                    className="logout-modal-error-icon"
                    aria-hidden="true"
                  />
                  <span>{errorMessage}</span>
                </p>
              )}
            </div>
            <div className="modal-footer">
              <button
                ref={cancelBtnRef}
                type="button"
                className="btn-cancel"
                onClick={closeConfirm}
                disabled={isSigningOut}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn-confirm btn-confirm-danger"
                onClick={handleConfirmLogout}
                disabled={isSigningOut}
              >
                <span className="confirm-inner">
                  {isSigningOut ? (
                    <>
                      <Icon
                        icon="lucide:loader-2"
                        className="confirm-lock-icon spin"
                        aria-hidden="true"
                      />
                      <span>Signing out&hellip;</span>
                    </>
                  ) : (
                    <>
                      <Icon
                        icon="lucide:log-out"
                        className="confirm-lock-icon"
                        aria-hidden="true"
                      />
                      <span>Log out</span>
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  )
}
