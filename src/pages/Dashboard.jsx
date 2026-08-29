import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth, ROLES } from '../store/AuthContext'
import { filings, companies } from '../data/mockData'

/* ────────────────────── Status color map (NZ palette) ────────────────────── */
const STATUS_STYLES = {
  Approved: 'text-nzGreen',
  'Under Processing': 'text-nzPrimary',
  Draft: 'text-nzMuted',
  Resubmission: 'text-nzRed',
  Pending: 'text-[#FCD358]',
  'Pending DSC Upload': 'text-nzPrimary',
}

/* ────────────────────── Role key → label map ────────────────────── */
const ROLE_LABELS = Object.fromEntries(
  Object.entries(ROLES).map(([k, v]) => [k, v.label])
)

/* ════════════════════════════ DASHBOARD ════════════════════════════ */
export default function Dashboard() {
  const { user, role, roleConfig, switchRole, allRoles, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const [drafts, setDrafts] = useState(() => {
    try {
      const d = []
      for (let i = 0; i < localStorage.length; i++) {
        const k = localStorage.key(i)
        if (k && k.startsWith('draft_')) {
          try { d.push({ key: k, ...JSON.parse(localStorage.getItem(k)) }) } catch { /* ignore */ }
        }
      }
      return d
    } catch { return [] }
  })

  /* ── role-filtered filings ── */
  const filteredFilings = filings.filter((f) => {
    if (!role) return true
    if (role === 'ca_cs') return ['AOC-4', 'MGT-7', 'DIR-3-KYC', 'CHG-1'].includes(f.formId)
    if (role === 'director') return ['DIR-3-KYC', 'AOC-4'].includes(f.formId)
    if (role === 'attorney') return ['MGT-14', 'CHG-1'].includes(f.formId)
    if (role === 'investor') return ['IEPF-5', 'CHG-1'].includes(f.formId)
    if (role === 'entrepreneur') return ['SPICe+', 'RUN', 'INC-20A'].includes(f.formId)
    return true
  })

  /* ── draft helpers ── */
  const deleteDraft = (key) => {
    localStorage.removeItem(key)
    setDrafts((prev) => prev.filter((d) => d.key !== key))
  }

  const draftDaysLeft = (d) => {
    if (!d.at) return 15
    const elapsed = (Date.now() - new Date(d.at).getTime()) / (1000 * 60 * 60 * 24)
    return Math.max(0, 15 - Math.floor(elapsed))
  }

  const draftTarget = (key) => `/efiling/${key.replace('draft_', '')}`

  /* ════════════════════════════ RENDER ════════════════════════════ */

  /* ── not logged in ── */
  if (!isAuthenticated) {
    return (
      <main className="max-w-[79rem] mx-auto px-4 sm:px-6 py-6">
        <nav className="mb-6 text-sm text-nzMuted">
          <Link to="/" className="hover:text-nzPrimary">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-nzBlack font-medium">Dashboard</span>
        </nav>
        <div className="bg-white border border-nzDivider p-10 text-center">
          <p className="text-lg text-nzDarkGrey">
            Please sign in to access your dashboard.
          </p>
          <Link
            to="/login"
            className="inline-block mt-4 bg-nzPrimary text-white px-6 py-2.5 text-sm font-medium hover:bg-nzMediumTeal transition-colors"
          >
            Sign In
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="max-w-[79rem] mx-auto px-4 sm:px-6 py-6">

      {/* ═══════════════════════════ 1  BREADCRUMB ═══════════════════════════ */}
      <nav className="mb-6 text-sm text-nzMuted">
        <Link to="/" className="hover:text-nzPrimary">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-nzBlack font-medium">Dashboard</span>
      </nav>

      {/* ═══════════════════════════ 2  HEADER SECTION ═══════════════════════════ */}
      <div className="mb-8">
        <h1 className="text-[28px] font-[200] text-nzBlack leading-tight">My Dashboard</h1>

        <div className="mt-3 flex flex-col sm:flex-row sm:items-center gap-3">
          {/* User name + role badge */}
          <div className="flex items-center gap-3">
            <span className="text-base font-[600] text-nzBlack">
              {user?.name || user?.email || 'User'}
            </span>
            <span className="bg-nzMediumTeal text-white text-xs font-medium px-3 py-1">
              {roleConfig?.label || 'User'}
            </span>
          </div>

          {/* Switch Role dropdown */}
          <select
            value={role || ''}
            onChange={(e) => switchRole(e.target.value)}
            className="border border-nzDivider px-3 py-2 text-sm text-nzBlack bg-white focus:outline-none focus:border-nzPrimary cursor-pointer"
          >
            {Object.keys(allRoles || ROLES).map((r) => (
              <option key={r} value={r}>
                {ROLES[r]?.label || r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* ═══════════════════════════ 3  ROLE QUICK ACTIONS ═══════════════════════════ */}
      {roleConfig?.quickActions && roleConfig.quickActions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-xl font-[200] text-nzBlack mb-4">
            Quick actions for {roleConfig.label}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {roleConfig.quickActions.map((action) => (
              <Link
                key={action.label}
                to={action.href}
                className="bg-white border border-nzDivider p-4 flex flex-col items-center gap-3 text-center hover:border-nzPrimary transition-colors group"
              >
                {/* Icon in nzMediumTeal circle */}
                <div className="w-10 h-10 rounded-full bg-nzMediumTeal flex items-center justify-center shrink-0">
                  <i className={`fa-solid ${action.icon} text-white text-sm`} />
                </div>
                <span className="text-sm font-medium text-nzBlack group-hover:text-nzPrimary transition-colors">
                  {action.label}
                </span>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ═══════════════════════════ 4  MY APPLICATIONS TABLE ═══════════════════════════ */}
      <section className="mb-8">
        <h2 className="text-xl font-[200] text-nzBlack mb-4">My Applications</h2>

        <div className="bg-white border border-nzDivider overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-nzLightBg text-nzDarkGrey text-[13px] uppercase font-bold">
                <th className="px-4 py-3 text-left">SRN</th>
                <th className="px-4 py-3 text-left">Form</th>
                <th className="px-4 py-3 text-left">Company</th>
                <th className="px-4 py-3 text-left">Status</th>
                <th className="px-4 py-3 text-left">Date</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredFilings.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-sm text-nzMuted">
                    No applications found for this role.
                  </td>
                </tr>
              ) : (
                filteredFilings.map((f, idx) => (
                  <tr
                    key={f.srn}
                    className={idx % 2 === 0 ? 'bg-white' : 'bg-[#FAFAFA]'}
                  >
                    <td className="px-4 py-3 font-mono text-xs font-semibold text-nzBlack">
                      {f.srn}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-nzBody">
                      {f.formId}
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-xs font-medium text-nzBlack">{f.companyName}</div>
                      <div className="font-mono text-[11px] text-nzMuted mt-0.5">{f.cin}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold ${STATUS_STYLES[f.status] || 'text-nzMuted'}`}>
                        {f.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-nzBody">{f.filingDate}</td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        to={`/filing/${f.srn}`}
                        className="text-xs font-semibold text-nzPrimary hover:underline"
                      >
                        View
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* ═══════════════════════════ 5  SAVED DRAFTS ═══════════════════════════ */}
      <section className="mb-8">
        <h2 className="text-xl font-[200] text-nzBlack mb-4">Saved Drafts</h2>

        {drafts.length === 0 ? (
          <div className="bg-white border border-nzDivider p-8 text-center">
            <p className="text-sm text-nzMuted">
              No saved drafts. Start a filing and save it to resume later.
            </p>
            <Link
              to="/efiling/AOC-4"
              className="inline-block mt-3 text-sm font-medium text-nzPrimary hover:underline"
            >
              Start AOC-4 filing &rarr;
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {drafts.map((d) => {
              const formId = d.key.replace('draft_', '')
              const daysLeft = draftDaysLeft(d)
              const urgent = daysLeft < 3

              return (
                <div
                  key={d.key}
                  className="bg-white border border-nzDivider p-4 flex flex-col sm:flex-row sm:items-center gap-3"
                >
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-medium text-nzBlack">
                      {formId}
                    </span>
                    {d.cin && (
                      <span className="ml-2 text-xs text-nzMuted font-mono">{d.cin}</span>
                    )}
                    <div className="flex items-center gap-3 mt-1 text-[11px] text-nzMuted">
                      <span>Step {d.step || '?'}</span>
                      <span>&middot;</span>
                      <span>Saved {d.at ? new Date(d.at).toLocaleDateString() : 'recently'}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    {urgent && (
                      <span className="bg-[#FEF2CD] text-amber-700 text-[11px] font-semibold px-2 py-0.5">
                        {daysLeft} day{daysLeft !== 1 ? 's' : ''} left
                      </span>
                    )}
                    {!urgent && (
                      <span className="text-[11px] text-nzMuted">
                        {daysLeft} days left
                      </span>
                    )}
                    <Link
                      to={draftTarget(d.key)}
                      className="text-xs font-semibold text-nzPrimary hover:underline"
                    >
                      Resume
                    </Link>
                    <button
                      type="button"
                      onClick={() => deleteDraft(d.key)}
                      className="text-xs font-semibold text-nzRed hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </section>

      {/* ═══════════════════════════ 6  NOTIFICATIONS ═══════════════════════════ */}
      <section className="mb-8">
        <h2 className="text-xl font-[200] text-nzBlack mb-4">Notifications</h2>

        {roleConfig?.notifications && roleConfig.notifications.length > 0 ? (
          <ul className="divide-y divide-nzDivider">
            {roleConfig.notifications.map((note, idx) => (
              <li key={idx} className="flex items-start gap-3 py-3">
                {/* notification icon */}
                <div className="w-2 h-2 rounded-full bg-nzMediumTeal mt-2 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-nzBody">{note}</p>
                </div>
                <span className="text-[11px] text-nzMuted whitespace-nowrap shrink-0">
                  recent
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <div className="bg-white border border-nzDivider p-6 text-center text-sm text-nzMuted">
            No notifications for this role.
          </div>
        )}
      </section>
    </main>
  )
}
