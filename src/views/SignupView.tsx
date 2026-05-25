// SignupView — direct port of `views/SignupView.vue`.
// See LoginView.tsx for the React/Vue mapping explainer.

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'

import { useAuthStore } from '@/stores/auth'
import AuthHeroBackground from '@/components/AuthHeroBackground'
import '@/assets/auth.css'

export default function SignupView() {
  const navigate = useNavigate()
  const signup = useAuthStore((s) => s.signup)
  const isLoading = useAuthStore((s) => s.isLoading)
  const error = useAuthStore((s) => s.error)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const ok = await signup({ name, email, password })
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
          <span className="auth-brand-eyebrow">Get started</span>
          <h2 className="auth-brand-headline">
            Treasury-grade Bitcoin infrastructure.
          </h2>
          <p className="auth-brand-subline">
            Create a compliant treasury workflow in minutes - qualified custody,
            yield deployment, and audit-ready reporting in one place.
          </p>
        </div>
        <div className="auth-brand-trust">
          <div className="auth-brand-trust-item">
            <Icon icon="lucide:building-2" className="auth-brand-trust-icon" />
            <span>Trusted by corporate treasury teams</span>
          </div>
          <div className="auth-brand-trust-item">
            <Icon icon="lucide:plug-zap" className="auth-brand-trust-icon" />
            <span>Native integrations with Tier 1 custodians</span>
          </div>
          <div className="auth-brand-trust-item">
            <Icon icon="lucide:gauge" className="auth-brand-trust-icon" />
            <span>Live P&amp;L and exposure dashboards</span>
          </div>
        </div>
      </aside>

      <section className="auth-form-panel">
        <div className="auth-card">
          <header className="auth-card-head">
            <span className="auth-eyebrow">Create account</span>
            <h1 className="auth-title">Open a treasury account</h1>
            <p className="auth-subtitle">
              Just a few details to get your workspace set up.
            </p>
          </header>

          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-name">
                Full name
              </label>
              <div className="auth-input-wrap">
                <input
                  id="signup-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  className="auth-input"
                  placeholder="Sarah Jenkins"
                  autoComplete="name"
                  required
                  minLength={2}
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="signup-email">
                Work email
              </label>
              <div className="auth-input-wrap">
                <input
                  id="signup-email"
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
              <label className="auth-label" htmlFor="signup-password">
                Password
              </label>
              <div className="auth-input-wrap">
                <input
                  id="signup-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  className="auth-input auth-input-with-toggle"
                  placeholder="Create a password"
                  autoComplete="new-password"
                  required
                  minLength={8}
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
              <span className="auth-helper">At least 8 characters.</span>
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
              <span>{isLoading ? 'Creating account…' : 'Create account'}</span>
              {!isLoading && (
                <Icon icon="lucide:arrow-right" className="auth-submit-icon" />
              )}
            </button>
          </form>

          <p className="auth-footer">
            <span>Already have an account? </span>
            <Link to="/login" className="auth-footer-link">
              Sign in
            </Link>
          </p>
        </div>
      </section>
    </div>
  )
}
