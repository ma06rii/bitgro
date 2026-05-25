// -----------------------------------------------------------------------------
// LoginView — direct port of `views/LoginView.vue`.
//
// React explainer:
//   - Vue's `v-model="email"` becomes a controlled input: we read the value
//     from state and write to it via `onChange`.
//   - Vue's `useRouter()` + `router.push(...)` becomes React Router's
//     `useNavigate()` + `navigate(...)`.
//   - The Zustand selector pattern keeps the component reactive to changes in
//     the parts of the store it actually reads.
// -----------------------------------------------------------------------------

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

import { useAuthStore } from '@/stores/auth'
import AuthHeroBackground from '@/components/AuthHeroBackground'
import '@/assets/auth.css'

export default function LoginView() {
  const navigate = useNavigate()
  // Pulling everything we need from the store in one call. Components re-render
  // when any of these slices change.
  const login = useAuthStore((s) => s.login)
  const isLoading = useAuthStore((s) => s.isLoading)
  const error = useAuthStore((s) => s.error)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const ok = await login({ email, password })
    if (ok) navigate('/')
  }

  return (
    <div className="auth-shell">
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
              disabled={isLoading}
            >
              {isLoading && (
                <span className="auth-spinner" aria-hidden="true" />
              )}
              <span>{isLoading ? 'Signing in…' : 'Sign in'}</span>
              {!isLoading && (
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
