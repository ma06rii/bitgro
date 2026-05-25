// -----------------------------------------------------------------------------
// SignupView — Clerk-backed sign-up with optional email-code verification.
//
// Auth strategy:
//   - useSignUp from `@clerk/react/legacy` exposes signUp.create({ ... }) for
//     email/password and signUp.authenticateWithRedirect({ ... }) for OAuth.
//   - If the Clerk Dashboard requires email verification, signUp.create returns
//     status='missing_requirements' with unverifiedFields containing
//     'email_address'. We call prepareEmailAddressVerification and toggle to an
//     in-place OTP step (no new view file) — same .auth-card chrome, just
//     different contents.
//   - After completion we call setActive + the local Zustand signup so the
//     rest of the app (which reads useAuthStore) keeps working unchanged.
// -----------------------------------------------------------------------------

import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useSignUp } from '@clerk/react/legacy'
import { isClerkAPIResponseError } from '@clerk/react/errors'

import { useAuthStore } from '@/stores/auth'
import AuthHeroBackground from '@/components/AuthHeroBackground'
import '@/assets/auth.css'

type OAuthStrategy = 'oauth_google' | 'oauth_apple' | 'oauth_microsoft'
type Stage = 'form' | 'verify'

const OAUTH_PROVIDERS: ReadonlyArray<{ strategy: OAuthStrategy; label: string; icon: string }> = [
  { strategy: 'oauth_google', label: 'Continue with Google', icon: 'logos:google-icon' },
  { strategy: 'oauth_apple', label: 'Continue with Apple', icon: 'logos:apple' },
  { strategy: 'oauth_microsoft', label: 'Continue with Microsoft', icon: 'logos:microsoft-icon' },
]

export default function SignupView() {
  const navigate = useNavigate()
  const { isLoaded, signUp, setActive } = useSignUp()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [code, setCode] = useState('')

  const [stage, setStage] = useState<Stage>('form')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [pendingProvider, setPendingProvider] = useState<OAuthStrategy | null>(null)

  const busy = submitting || pendingProvider !== null

  function readClerkError(err: unknown): string {
    if (isClerkAPIResponseError(err)) {
      const first = err.errors?.[0]
      return first?.longMessage || first?.message || 'Sign up failed. Please try again.'
    }
    return err instanceof Error ? err.message : 'Sign up failed. Please try again.'
  }

  async function finishSignedUp() {
    await useAuthStore.getState().signup({ name, email, password })
    navigate('/')
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded || busy) return
    setError(null)
    setInfo(null)
    setSubmitting(true)
    try {
      const parts = name.trim().split(/\s+/)
      const firstName = parts[0] || undefined
      const lastName = parts.slice(1).join(' ') || undefined

      const result = await signUp.create({
        emailAddress: email,
        password,
        firstName,
        lastName,
      })

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        await finishSignedUp()
        return
      }

      if (
        result.status === 'missing_requirements' &&
        result.unverifiedFields.includes('email_address')
      ) {
        await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
        setStage('verify')
        return
      }

      setError('Account created, but additional steps are required. Please contact support.')
    } catch (err) {
      setError(readClerkError(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleVerify(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isLoaded || busy) return
    setError(null)
    setInfo(null)
    setSubmitting(true)
    try {
      const result = await signUp.attemptEmailAddressVerification({ code: code.trim() })
      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId })
        await finishSignedUp()
      } else {
        setError('Could not verify the code. Please check it and try again.')
      }
    } catch (err) {
      setError(readClerkError(err))
    } finally {
      setSubmitting(false)
    }
  }

  async function handleResend() {
    if (!isLoaded || busy) return
    setError(null)
    setInfo(null)
    try {
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })
      setInfo('A new code has been sent to your email.')
    } catch (err) {
      setError(readClerkError(err))
    }
  }

  function backToForm() {
    setStage('form')
    setCode('')
    setError(null)
    setInfo(null)
  }

  async function handleOAuth(strategy: OAuthStrategy) {
    if (!isLoaded || busy) return
    setError(null)
    setPendingProvider(strategy)
    try {
      await signUp.authenticateWithRedirect({
        strategy,
        redirectUrl: '/sso-callback',
        redirectUrlComplete: '/',
      })
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
          {stage === 'form' ? (
            <>
              <header className="auth-card-head">
                <span className="auth-eyebrow">Create account</span>
                <h1 className="auth-title">Open a treasury account</h1>
                <p className="auth-subtitle">
                  Just a few details to get your workspace set up.
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
                <span className="auth-divider-label">or sign up with email</span>
                <span className="auth-divider-line" aria-hidden="true" />
              </div>

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
                  disabled={!isLoaded || busy}
                >
                  {submitting && (
                    <span className="auth-spinner" aria-hidden="true" />
                  )}
                  <span>{submitting ? 'Creating account…' : 'Create account'}</span>
                  {!submitting && (
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
            </>
          ) : (
            <>
              <header className="auth-card-head">
                <span className="auth-eyebrow">Create account</span>
                <h1 className="auth-title">Verify your email</h1>
                <p className="auth-subtitle">
                  We sent a 6-digit code to <strong>{email}</strong>. Enter it
                  below to finish setting up your account.
                </p>
              </header>

              <form className="auth-form" onSubmit={handleVerify} noValidate>
                <div className="auth-field">
                  <label className="auth-label" htmlFor="signup-code">
                    Verification code
                  </label>
                  <div className="auth-input-wrap">
                    <input
                      id="signup-code"
                      value={code}
                      onChange={(e) =>
                        setCode(e.target.value.replace(/[^0-9]/g, '').slice(0, 6))
                      }
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      maxLength={6}
                      className="auth-input auth-code-input"
                      placeholder="123456"
                      required
                    />
                  </div>
                </div>

                <div className="auth-meta-row">
                  <button
                    type="button"
                    className="auth-forgot"
                    onClick={handleResend}
                    disabled={busy}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    Resend code
                  </button>
                  <button
                    type="button"
                    className="auth-forgot"
                    onClick={backToForm}
                    disabled={busy}
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
                  >
                    Back
                  </button>
                </div>

                {info && (
                  <div
                    role="status"
                    className="auth-error"
                    style={{
                      backgroundColor: 'color-mix(in srgb, var(--color-success) 8%, transparent)',
                      borderColor: 'color-mix(in srgb, var(--color-success) 25%, transparent)',
                      color: 'var(--color-success)',
                    }}
                  >
                    <Icon icon="lucide:check-circle-2" />
                    <span>{info}</span>
                  </div>
                )}

                {error && (
                  <div className="auth-error" role="alert">
                    <Icon icon="lucide:alert-circle" />
                    <span>{error}</span>
                  </div>
                )}

                <button
                  type="submit"
                  className="auth-submit"
                  disabled={!isLoaded || busy || code.length < 6}
                >
                  {submitting && (
                    <span className="auth-spinner" aria-hidden="true" />
                  )}
                  <span>{submitting ? 'Verifying…' : 'Verify email'}</span>
                  {!submitting && (
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
            </>
          )}
        </div>
      </section>
    </div>
  )
}

// Scoped styles for the OAuth row, divider, and verification-code input.
// Defined inline so all auth changes stay co-located with the two view files.
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
.auth-code-input {
  font-family: var(--font-mono);
  font-size: 1.125rem;
  letter-spacing: 0.4em;
  text-align: center;
}
`
