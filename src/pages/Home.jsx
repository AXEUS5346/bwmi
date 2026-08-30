import { Link, useNavigate } from 'react-router-dom'
import { circulars, stats } from '../data/mockData'
import { useAuth } from '../store/AuthContext'

/* ─── Topic panel data — mapped from serviceTree categories ─── */
const TOPIC_PANELS = [
  {
    category: 'start',
    icon: 'fa-rocket',
    title: 'Start a business',
    description: 'Reserve a name, incorporate a company or LLP, and complete your post-setup filings.',
    learnHowText: 'How to register',
    fileNowPath: '/efiling/SPICe+',
  },
  {
    category: 'manage',
    icon: 'fa-gears',
    title: 'Manage your business',
    description: 'Appoint or remove directors, change capital, shift your registered office, and manage charges.',
    learnHowText: 'How to manage',
    fileNowPath: '/efiling/DIR-3',
  },
  {
    category: 'file',
    icon: 'fa-file-circle-check',
    title: 'File annual returns & comply',
    description: 'File financial statements, annual returns, and other statutory forms for companies and LLPs.',
    learnHowText: 'How to file',
    fileNowPath: '/efiling/AOC-4',
  },
  {
    category: 'close',
    icon: 'fa-door-open',
    title: 'Close a business or claim',
    description: 'Strike off a company, convert entity types, or claim unpaid dividends from the IEPF.',
    learnHowText: 'How to close',
    fileNowPath: '/efiling/STK-2',
  },
  {
    category: 'help',
    icon: 'fa-circle-question',
    title: 'Help & updates',
    description: 'Browse acts, rules, circulars, notifications, FAQs, and contact the MCA helpdesk.',
    learnHowText: 'How to get help',
    fileNowPath: '/help/faqs',
  },
]

/* ──────────────────────────────────────────────────────────────────────────── */

export default function Home() {
  const nav = useNavigate()
  const { user, isAuthenticated, roleConfig } = useAuth()

  return (
    <div className="bg-nzLightBg min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION — nzDarkTeal background
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-nzDarkTeal py-16 md:py-20" aria-label="MCA Register">
      <div className="max-w-4xl mx-auto px-4 text-center">
        {!isAuthenticated && (
            <Link
              to="/login"
              className="inline-block bg-nzCyan text-nzDarkTeal font-semibold text-sm px-8 py-3 hover:bg-white transition-colors"
            >
              Access your account
            </Link>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. LOGGED-IN: PERSONALISED DASHBOARD  |  LOGGED-OUT: TOPIC PANELS
         ═══════════════════════════════════════════════════════════════════ */}
      {isAuthenticated && roleConfig ? (
        /* ── Personalised Dashboard for logged-in users ── */
        <section className="py-12 bg-white" aria-label="Your dashboard">
          <div className="max-w-7xl mx-auto px-4">

            {/* Welcome + Role Badge */}
            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 bg-nzMediumTeal flex items-center justify-center" style={{ borderRadius: '50%' }}>
                <i className={`fa-solid ${roleConfig.icon} text-white text-lg`} />
              </div>
              <div>
                <h2 className="text-[28px] font-[200] text-nzBlack tracking-tight">
                  Welcome back, {user?.name || 'User'}
                </h2>
                <span className="inline-block mt-1 bg-nzMediumTeal text-white text-[11px] font-semibold uppercase tracking-wider px-3 py-1">
                  {roleConfig.label}
                </span>
              </div>
            </div>

            {/* Quick Actions Grid */}
            <h3 className="text-lg font-semibold text-nzDarkGrey mb-4">Quick actions</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
              {roleConfig.quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="flex items-center gap-3 bg-white border border-nzDivider p-4 transition-colors hover:border-nzPrimary group"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-nzMediumTeal/10 text-nzMediumTeal group-hover:bg-nzMediumTeal group-hover:text-white transition-colors">
                    <i className={`fa-solid ${action.icon} text-sm`} aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-nzBlack leading-tight">
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>

            {/* Notifications */}
            {roleConfig.notifications && roleConfig.notifications.length > 0 && (
              <div className="bg-nzYellowBg border border-nzYellow p-6 mb-10">
                <h3 className="text-lg font-semibold text-nzDarkGrey mb-3 flex items-center gap-2">
                  <i className="fa-solid fa-bell text-nzYellow" /> Notifications & reminders
                </h3>
                <ul className="space-y-2">
                  {roleConfig.notifications.map((note, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-nzBody">
                      <span className="text-nzMuted mt-0.5">&#8226;</span>
                      {note}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </section>
      ) : (
        /* ── Topic Panels for logged-out visitors ── */
        <section className="py-16 bg-nzLightBg" aria-label="What would you like to do">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-4xl md:text-[42px] font-[200] text-nzDarkGrey mb-12 text-center tracking-tight">
              What would you like to do?
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              {TOPIC_PANELS.map((panel) => (
                <div
                  key={panel.category}
                  className="flex flex-col bg-white border-b-2 border-nzDivider p-8 transition-colors hover:border-nzPrimary"
                >
                  <div className="flex items-center gap-5 mb-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-nzMediumTeal text-white text-lg">
                      <i className={`fa-solid ${panel.icon}`} aria-hidden="true" />
                    </span>
                    <h3 className="text-xl md:text-[22px] font-[200] text-nzBlack leading-snug">
                      {panel.title}
                    </h3>
                  </div>
                  <p className="text-base text-nzBody mb-6 leading-relaxed">
                    {panel.description}
                  </p>
                  <div className="mt-auto flex flex-wrap items-center gap-5">
                    <Link
                      to={`/help/${panel.category}`}
                      className="text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
                    >
                      {panel.learnHowText}
                    </Link>
                    <Link
                      to={panel.fileNowPath}
                      className="inline-block bg-nzPrimary text-white text-sm font-semibold px-6 py-3 transition-colors hover:bg-nzMediumTeal"
                    >
                      File now
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          3. LATEST NOTICES
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white" aria-label="Latest news and notices">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[36px] font-[200] text-nzBlack mb-8 tracking-tight">
            Latest news and notices
          </h2>
          <div className="divide-y divide-nzDivider border-t border-nzDivider">
            {circulars.slice(0, 5).map((c) => (
              <div key={c.id} className="py-5">
                <span className="block text-xs text-nzMuted mb-1.5">{c.date}</span>
                <h3 className="text-lg mb-2">
                  <Link
                    to={`/notices/${c.id}`}
                    className="text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
                  >
                    {c.title}
                  </Link>
                </h3>
                <span className="inline-block text-[11px] uppercase tracking-wider font-medium text-nzMuted bg-nzLightBg px-2 py-0.5 mb-2">
                  {c.category}
                </span>
                <div className="mt-2">
                  <Link
                    to={`/notices/${c.id}`}
                    className="text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
                  >
                    View this notice
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <Link
              to="/help/circulars"
              className="text-sm font-semibold text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
            >
              View all notices &rarr;
            </Link>
          </div>
        </div>
      </section>


    </div>
  )
}
