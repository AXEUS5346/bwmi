import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import SearchBar from '../components/SearchBar'
import { circulars, stats } from '../data/mockData'
import { serviceTree } from '../data/serviceTree'
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
  const { isAuthenticated, roleConfig } = useAuth()
  const [activeFilter, setActiveFilter] = useState('company')

  /* ── SearchBar callback ── */
  const handleSearch = (query, type) => {
    if (!query.trim()) return
    nav(`/search?q=${encodeURIComponent(query.trim())}&type=${type}`)
  }

  /* ── Filter tab options (radio-tab-style under search) ── */
  const FILTER_TABS = [
    { key: 'company', label: 'Companies' },
    { key: 'director', label: 'Directors and shareholders' },
    { key: 'help', label: 'Help and updates' },
  ]

  return (
    <div className="bg-nzLightBg min-h-screen">

      {/* ═══════════════════════════════════════════════════════════════════
          1. HERO SECTION — nzDarkTeal background, single search
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-nzDarkTeal py-16 md:py-20" aria-label="Search the MCA register">
        <div className="max-w-4xl mx-auto px-4 text-center">
          {/* Title */}
          <h1 className="text-white font-[200] text-4xl md:text-[52px] leading-tight mb-3 tracking-tight">
            Ministry of Corporate Affairs
          </h1>

          {/* Subtitle */}
          <p className="text-white/80 text-lg mb-10 font-light">
            Empowering Business, Protecting Investors
          </p>

          {/* SINGLE SearchBar */}
          <SearchBar variant="hero" onSearch={handleSearch} />

          {/* Radio-tab-style filters below search */}
          <div className="flex justify-center items-center gap-4 mt-6 flex-wrap">
            {FILTER_TABS.map((tab) => (
              <label
                key={tab.key}
                className={`
                  inline-flex items-center gap-2 cursor-pointer text-sm transition-colors
                  ${activeFilter === tab.key
                    ? 'text-white font-semibold'
                    : 'text-white/60 hover:text-white/80 font-normal'
                  }
                `}
              >
                <span
                  className={`
                    inline-block w-3.5 h-3.5 border-2 transition-colors
                    ${activeFilter === tab.key
                      ? 'border-nzCyan bg-nzCyan'
                      : 'border-white/40 bg-transparent'
                    }
                  `}
                  style={{ borderRadius: '50%' }}
                  aria-hidden="true"
                />
                <input
                  type="radio"
                  name="heroFilter"
                  value={tab.key}
                  checked={activeFilter === tab.key}
                  onChange={() => setActiveFilter(tab.key)}
                  className="sr-only"
                />
                {tab.label}
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          2. TOPIC PANELS — "What would you like to do?"
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-nzLightBg" aria-label="What would you like to do">
        <div className="max-w-7xl mx-auto px-4">
          {/* Section heading */}
          <h2 className="text-4xl md:text-[42px] font-[200] text-nzDarkGrey mb-12 text-center tracking-tight">
            What would you like to do?
          </h2>

          {/* 2-col grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {TOPIC_PANELS.map((panel) => (
              <div
                key={panel.category}
                className="flex flex-col bg-white border-b-2 border-nzDivider p-8 transition-colors hover:border-nzPrimary"
              >
                {/* Icon circle */}
                <div className="flex items-center gap-5 mb-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-nzMediumTeal text-white text-lg">
                    <i className={`fa-solid ${panel.icon}`} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl md:text-[22px] font-[200] text-nzBlack leading-snug">
                    {panel.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base text-nzBody mb-6 leading-relaxed">
                  {panel.description}
                </p>

                {/* Learn how + File now */}
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

      {/* ═══════════════════════════════════════════════════════════════════
          3. ROLE-BASED QUICK ACTIONS (authenticated) / SIGN-IN CTA
         ═══════════════════════════════════════════════════════════════════ */}
      {isAuthenticated && roleConfig ? (
        <section className="py-12 bg-white" aria-label="Quick actions by role">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-[28px] font-[200] text-nzBlack mb-8 tracking-tight">
              Quick actions for {roleConfig.label}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
              {roleConfig.quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.href}
                  className="
                    flex items-center gap-3 bg-white border border-nzDivider p-4
                    transition-colors hover:border-nzPrimary group
                  "
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
          </div>
        </section>
      ) : (
        <section className="py-12 bg-white" aria-label="Sign in prompt">
          <div className="max-w-3xl mx-auto px-4 text-center">
            <h2 className="text-[28px] font-[200] text-nzBlack mb-4 tracking-tight">
              Personalise your experience
            </h2>
            <p className="text-base text-nzBody mb-6">
              Sign in to see quick actions tailored to your role and save your preferences.
            </p>
            <Link
              to="/login"
              className="
                inline-block bg-nzPrimary text-white text-sm font-semibold
                px-8 py-3 transition-colors hover:bg-nzMediumTeal
              "
            >
              Sign in
            </Link>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════
          4. LATEST NOTICES
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white" aria-label="Latest news and notices">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-[36px] font-[200] text-nzBlack mb-8 tracking-tight">
            Latest news and notices
          </h2>

          {/* Flat list — no tabs, no card shadows */}
          <div className="divide-y divide-nzDivider border-t border-nzDivider">
            {circulars.slice(0, 5).map((c) => (
              <div key={c.id} className="py-5">
                {/* Date */}
                <span className="block text-xs text-nzMuted mb-1.5">
                  {c.date}
                </span>

                {/* Title as linked h3 */}
                <h3 className="text-lg mb-2">
                  <Link
                    to={`/notices/${c.id}`}
                    className="text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
                  >
                    {c.title}
                  </Link>
                </h3>

                {/* Category badge */}
                <span className="inline-block text-[11px] uppercase tracking-wider font-medium text-nzMuted bg-nzLightBg px-2 py-0.5 mb-2">
                  {c.category}
                </span>

                {/* View this notice link */}
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

          {/* View all */}
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

      {/* ═══════════════════════════════════════════════════════════════════
          5. STATISTICS BAR — nzDarkTeal background
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-12 bg-nzDarkTeal text-white" aria-label="Key statistics">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl md:text-4xl font-bold tracking-tight">
                {stats.totalCompanies}
              </div>
              <div className="text-sm text-white/70 mt-2 font-light">
                Active Companies
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold tracking-tight">
                {stats.llps}
              </div>
              <div className="text-sm text-white/70 mt-2 font-light">
                Active LLPs
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold tracking-tight">
                {stats.filings2024}
              </div>
              <div className="text-sm text-white/70 mt-2 font-light">
                Filings 2024
              </div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold tracking-tight">
                {stats.companiesRegistered}
              </div>
              <div className="text-sm text-white/70 mt-2 font-light">
                New Registrations
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
