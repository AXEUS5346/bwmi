import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, ROLES } from '../store/AuthContext'

const DEMO_EMAILS = [
  { email: 'bmwi@aeos.com', label: 'Entrepreneur' },
  { email: 'rahul@cafirm.com', label: 'CA/CS' },
  { email: 'priya@legal.co', label: 'Attorney' },
  { email: 'neha@corp.co', label: 'Director' },
  { email: 'suresh@bank.in', label: 'Investor' },
  { email: 'public@mca.gov.in', label: 'Guest' },
]

const ROLE_CARDS = [
  { id: 'entrepreneur', label: 'Entrepreneur / Founder', icon: 'fa-rocket', tagline: 'Start and grow your business' },
  { id: 'ca_cs', label: 'CA / CS Professional', icon: 'fa-briefcase', tagline: 'Manage compliance for your clients' },
  { id: 'attorney', label: 'Attorney / Legal', icon: 'fa-gavel', tagline: 'Search records and track filings' },
  { id: 'director', label: 'Director', icon: 'fa-user-tie', tagline: 'Manage your DIN and company roles' },
  { id: 'investor', label: 'Investor / Bank', icon: 'fa-chart-line', tagline: 'Verify companies and charges' },
  { id: 'citizen', label: 'General Public', icon: 'fa-user', tagline: 'Search and verify company information' },
]

export default function Login() {
  const [email, setEmail] = useState('')
  const [step, setStep] = useState('email') // 'email' | 'role'
  const [submittedEmail, setSubmittedEmail] = useState('')
  const { login, switchRole } = useAuth()
  const nav = useNavigate()

  const handleEmailSubmit = (e) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubmittedEmail(email)
    setStep('role')
  }

  const handleRoleSelect = (roleId) => {
    login(submittedEmail)
    switchRole(roleId)
    nav('/dashboard')
  }

  const handleGuestContinue = () => {
    login('public@mca.gov.in')
    switchRole('citizen')
    nav('/dashboard')
  }

  return (
    <div className="min-h-screen bg-nzLightBg">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Breadcrumb ── */}
        <nav className="mb-8 text-sm">
          <ol className="flex items-center gap-1.5">
            <li>
              <Link to="/" className="text-nzPrimary hover:underline font-medium">
                Home
              </Link>
            </li>
            <li className="text-nzDarkGrey">/</li>
            <li className="text-nzDarkGrey">Sign In</li>
          </ol>
        </nav>

        {/* ── Page Title ── */}
        <h1 className="text-[28px] font-[200] text-nzBlack mb-10">
          Sign in to the Companies Register
        </h1>

        {/* ── Step 1: Email Login ── */}
        {step === 'email' && (
          <div className="bg-white border border-nzDivider p-8 max-w-[480px]">
            <form onSubmit={handleEmailSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-nzDarkGrey mb-1.5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  required
                  className="w-full border border-nzDivider px-4 py-3 text-[16px] text-nzBlack
                    placeholder:text-nzMuted
                    focus:border-nzPrimary focus:outline-none
                    transition-colors"
                  style={{ borderRadius: 0 }}
                />
              </div>

              <button
                type="submit"
                disabled={!email.includes('@')}
                className="w-full bg-nzPrimary hover:bg-[#00618F] text-white font-semibold
                  text-sm px-6 py-3 transition-colors
                  disabled:opacity-50 disabled:cursor-not-allowed"
                style={{ borderRadius: 0 }}
              >
                Sign in
              </button>
            </form>

            {/* ── Helper text ── */}
            <div className="mt-6 pt-5 border-t border-nzDivider">
              <p className="text-sm text-nzMuted leading-relaxed mb-3">
                For this demo, any email works. Pre-configured emails show role-specific dashboards.
              </p>
              <p className="text-xs text-nzMuted leading-relaxed">
                Pre-configured emails:
              </p>
              <ul className="mt-2 space-y-1">
                {DEMO_EMAILS.map((d) => (
                  <li key={d.email} className="text-xs text-nzBody">
                    <span className="font-medium">{d.email}</span>
                    <span className="text-nzMuted"> &rarr; {d.label}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ── Step 2: Role Selection ── */}
        {step === 'role' && (
          <div className="max-w-[720px]">
            {/* Back to email */}
            <button
              onClick={() => { setStep('email'); setSubmittedEmail('') }}
              className="text-sm text-nzPrimary hover:underline mb-6 inline-flex items-center gap-1.5"
            >
              <i className="fa-solid fa-arrow-left text-xs"></i>
              Change email
            </button>

            <p className="text-sm text-nzMuted mb-4">
              Signed in as <span className="font-medium text-nzBlack">{submittedEmail}</span>
            </p>

            <h2 className="text-2xl font-[200] text-nzBlack mb-8">
              Choose your role to personalise your experience
            </h2>

            {/* ── Role Grid: 2 columns × 3 rows ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {ROLE_CARDS.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  className="bg-white border border-nzDivider p-6 text-left
                    hover:border-nzPrimary transition-colors group"
                  style={{ borderRadius: 0 }}
                >
                  {/* Icon circle */}
                  <div className="w-12 h-12 bg-nzMediumTeal flex items-center justify-center mb-4"
                    style={{ borderRadius: '50%' }}
                  >
                    <i className={`fa-solid ${role.icon} text-white text-lg`}></i>
                  </div>

                  {/* Role name */}
                  <h3 className="text-base font-semibold text-nzBlack mb-1">
                    {role.label}
                  </h3>

                  {/* Tagline */}
                  <p className="text-sm text-nzMuted">
                    {role.tagline}
                  </p>
                </button>
              ))}
            </div>

            {/* ── "or" divider + Guest link ── */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-nzDivider"></div>
              <span className="text-sm text-nzMuted">or</span>
              <div className="flex-1 h-px bg-nzDivider"></div>
            </div>

            <button
              onClick={handleGuestContinue}
              className="text-nzPrimary hover:underline font-medium text-sm"
            >
              Continue as Guest <span>&rarr;</span>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
