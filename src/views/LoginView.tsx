// -----------------------------------------------------------------------------
// LoginView — Clerk-backed sign-in, with the existing card design preserved.
//
// Auth strategy:
//   - useSignIn from `@clerk/react/legacy` exposes the stable v5-style SignIn
//     resource: signIn.create({ strategy: 'password', ... }) for email/password
//     and signIn.authenticateWithRedirect({ strategy: 'oauth_*', ... }) for SSO.
//   - On a complete sign-in we call setActive to install the session, then
//     call useAuthStore.login(...) so the rest of the app's Zustand-based user
//     state remains populated (other views read from there).
// -----------------------------------------------------------------------------

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useSignIn } from '@clerk/react/legacy'
import { isClerkAPIResponseError } from '@clerk/react/errors'

import { useAuthStore } from '@/stores/auth'
import AuthHeroBackground from '@/components/AuthHeroBackground'
import '@/assets/auth.css'

type OAuthStrategy = 'oauth_google' | 'oauth_apple' | 'oauth_microsoft'

const OAUTH_PROVIDERS: ReadonlyArray<{ strategy: OAuthStrategy; label: string; icon: string }> = [
  { strategy: 'oauth_google', label: 'Continue with Google', icon: 'logos:google-icon' },
  { strategy: 'oauth_apple', label: 'Continue with Apple', icon: 'logos:apple' },
  { strategy: 'oauth_microsoft', label: 'Continue with Microsoft', icon: 'logos:microsoft-icon' },
]

export default function LoginView() {
  const navigate = useNavigate()
  const { isLoaded, signIn, setActive } = useSignIn()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [pendingProvider, setPendingProvider] = useState<OAuthStrategy | null>(null)

  const busy = submitting || pendingProvider !== null

  function readClerkError(err: unknown): string {
    if (isClerkAPIResponseError(err)) {
      const first = err.errors?.[0]
      return first?.longMessage || first?.message || 'Sign in failed. Please try again.'
    }
    return err instanceof Error ? err.message : 'Sign in failed. Please try again.'
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded || busy) return
    setError(null)
    setSubmitting(true)
    try {
      const result = await signIn.create({ strategy: 'password', identifier: email, password })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        await useAuthStore.getState().login({ email, password })
        navigate('/')
      } else {
        setError('Additional verification is required to sign in to this account.')
      }
    } catch (err) {
      setError(readClerkError(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleOAuth(strategy: OAuthStrategy) {
    if (!isLoaded || busy) return
    setError(null)
    setPendingProvider(strategy)
    try {
      await signIn.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
      // Browser navigates away on success; nothing to do here.
    } catch (err) {
      setError(readClerkError(err))
      setPendingProvider(null)
    }
  }

  return (
    <div className="auth-shell">
      <style>{OAUTH_STYLES}</style>
      <aside className="auth-brand-panel">
        <AuthHeroBackground />
        <div className="auth-brand-header">
          <div className="logo-mark">
            <span className="logo-initial">B</span>
          </div>
          <span className="logo-label">BITGRO</span>
        </div>
        <div className="auth-brand-body">
          <span className="auth-brand-eyebrow">Institutional Treasury</span>
          <h2 className="auth-brand-headline">
            Put your Bitcoin reserves to work - safely.
          </h2>
          <p className="auth-brand-subline">
            Connect qualified custodians, deploy to vetted yield, and keep
            accounting and compliance in lockstep.
          </p>
        </div>
        <div className="auth-brand-trust">
          <div className="auth-brand-trust-item">
            <Icon icon="lucide:shield-check" className="auth-brand-trust-icon" />
            <span>SOC 2 Type II audited infrastructure</span>
          </div>
          <div className="auth-brand-trust-item">
            <Icon icon="lucide:lock" className="auth-brand-trust-icon" />
            <span>MPC custody &amp; policy-engine controls</span>
          </div>
          <div className="auth-brand-trust-item">
            <Icon icon="lucide:file-check-2" className="auth-brand-trust-icon" />
            <span>Real-time compliance &amp; reporting</span>
          </div>
        </div>
      </aside>

      <section className="auth-form-panel">
        <div className="auth-card">
          <header className="auth-card-head">
            <span className="auth-eyebrow">Sign in</span>
            <h1 className="auth-title">Welcome back</h1>
            <p className="auth-subtitle">
              Sign in to access your treasury dashboard.
            </p>
          </header>

          <div className="auth-oauth-row">
            {OAUTH_PROVIDERS.map((p) => (
              <button
                key={p.strategy}
                type="button"
                className="auth-oauth-button"
                onClick={() => handleOAuth(p.strategy)}
                disabled={!isLoaded || busy}
              >
                {pendingProvider === p.strategy ? (
                  <span className="auth-spinner" aria-hidden="true" />
                ) : (
                  <Icon icon={p.icon} className="auth-oauth-icon" />
                )}
                <span>{p.label}</span>
              </button>
            ))}
          </div>

          <div className="auth-divider">
            <span className="auth-divider-line" aria-hidden="true" />
            <span className="auth-divider-label">or continue with email</span>
            <span className="auth-divider-line" aria-hidden="true" />
          </div>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="login-email">
                Work email
              </label>
              <div className="auth-input-wrap">
                <input
                  id="login-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="auth-input"
                  placeholder="you@company.com"
                  autoComplete="email"
                  required
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="login-password">
                Password
              </label>
              <div className="auth-input-wrap">
                <input
                  id="login-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-input-with-toggle"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                  required
                  minLength={1}
                />
                <button
                  type="button"
                  className="auth-input-toggle"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  onClick={() => setShowPassword((s) => !s)}
                >
                  <Icon icon={showPassword ? 'lucide:eye-off' : 'lucide:eye'} />
                </button>
              </div>
            </div>

            <div className="auth-meta-row">
              <label className="auth-checkbox">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span>Remember me</span>
              </label>
              <a href="#" className="auth-forgot">
                Forgot password?
              </a>
            </div>

            {error && (
              <div className="auth-error" role="alert">
                <Icon icon="lucide:alert-circle" />
                <span>{error}</span>
              </div>
            )}

            <button
              type="submit"
              className="auth-submit"
              disabled={!isLoaded || busy}
            >
              {submitting && (
                <span className="auth-spinner" aria-hidden="true" />
              )}
              <span>{submitting ? 'Signing in…' : 'Sign in'}</span>
              {!submitting && (
                <Icon icon="lucide:arrow-right" className="auth-submit-icon" />
              )}
            </button>
          </form>

          <p className="auth-footer">
            <span>Don't have an account? </span>
            <Link to="/signup" className="auth-footer-link">
              Sign up
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}

// Scoped styles for the OAuth row + divider. Defined inline (rather than in
// auth.css) so all auth changes stay co-located with the two view files.
// Every value resolves against existing CSS variables so the visuals stay in
// lockstep with the rest of the design system.
const OAUTH_STYLES = `
.auth-oauth-row {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  margin-bottom: 1.25rem;
}
.auth-oauth-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.625rem;
  width: 100%;
  font-family: var(--font-headings);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  font-size: 0.8125rem;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  background-color: white;
  color: var(--color-foreground);
  border: 1px solid var(--color-border);
  cursor: pointer;
  transition: background-color 0.15s, border-color 0.15s, transform 0.05s;
}
.auth-oauth-button:hover {
  border-color: color-mix(in srgb, var(--color-accent) 45%, var(--color-border));
  background-color: color-mix(in srgb, var(--color-accent) 5%, white);
}
.auth-oauth-button:active { transform: translateY(1px); }
.auth-oauth-button:disabled {
  opacity: 0.65;
  cursor: not-allowed;
  transform: none;
}
.auth-oauth-icon {
  font-size: 1.125rem;
  flex-shrink: 0;
}
.auth-divider {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}
.auth-divider-line {
  flex: 1;
  height: 1px;
  background-color: var(--color-border);
}
.auth-divider-label {
  font-size: 11px;
  font-weight: 600;
  color: var(--color-muted-foreground);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
}
`
