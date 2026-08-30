import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { formsCatalog, circulars, notices } from '../data/mockData'

/* ─── Portal pages index ─── */
const PAGES = [
  { title: 'Home', section: 'Information', icon: 'fa-house', desc: 'MCA portal landing page — topic panels, quick actions, and latest notices', href: '/' },
  { title: 'Company / LLP Search', section: 'Services', icon: 'fa-magnifying-glass', desc: 'Search companies and LLPs by CIN, LLPIN, or name', href: '/search' },
  { title: 'Fee Calculator', section: 'Services', icon: 'fa-calculator', desc: 'Calculate filing fees for any MCA form based on authorized capital', href: '/services/fee-calculator' },
  { title: 'View Public Documents', section: 'Services', icon: 'fa-file-lines', desc: 'Inspect and download certified copies of company filings', href: '/services/view-docs' },
  { title: 'Online Services', section: 'Services', icon: 'fa-laptop', desc: 'Browse all MCA online services — Start, Manage, File & Comply, Close', href: '/online-services' },
  { title: 'e-Filing Catalogue', section: 'Services', icon: 'fa-folder-open', desc: 'Full catalogue of e-Filing forms — companies and LLPs', href: '/efiling' },
  { title: 'Dashboard', section: 'Services', icon: 'fa-gauge-high', desc: 'Your personal filing dashboard — drafts, submissions, and compliance timeline', href: '/dashboard' },
  { title: 'About MCA', section: 'Information', icon: 'fa-building-columns', desc: 'Ministry of Corporate Affairs — mission, organisation structure, and mandate', href: '/about' },
  { title: 'Acts & Rules', section: 'Information', icon: 'fa-gavel', desc: 'Companies Act 2013, LLP Act 2008, rules, and amendments', href: '/acts-rules' },
  { title: 'Data & Reports', section: 'Information', icon: 'fa-chart-bar', desc: 'Company statistics, monthly bulletins, and MCA publications', href: '/data-reports' },
  { title: 'Additional Services', section: 'Information', icon: 'fa-puzzle-piece', desc: 'DSC, valuation, and other ancillary services', href: '/additional-services' },
  { title: 'Help & FAQs', section: 'Help', icon: 'fa-circle-question', desc: 'Frequently asked questions, quick guides, and downloadable help PDFs', href: '/help/faqs' },
  { title: 'Circulars & Notifications', section: 'Help', icon: 'fa-bullhorn', desc: 'Latest MCA circulars, notifications, and regulatory updates', href: '/help/circulars' },
  { title: "What's New", section: 'Help', icon: 'fa-newspaper', desc: 'Recent updates and announcements from MCA', href: '/help/whats-new' },
  { title: 'Videos & Webinars', section: 'Help', icon: 'fa-video', desc: 'Training videos and recorded webinars on MCA filings', href: '/help/videos' },
  { title: 'E-Consultation', section: 'Help', icon: 'fa-comments', desc: 'Public consultation on draft rules and amendments', href: '/help/econsultation' },
  { title: 'Contact Us', section: 'Help', icon: 'fa-phone', desc: 'MCA helpdesk, regional offices, and grievance redressal', href: '/contact' },
  { title: 'Helpdesk & Chatbot', section: 'Help', icon: 'fa-headset', desc: 'Raise a support ticket or chat with the MCA virtual assistant', href: '/help/helpdesk' },
  { title: 'Site Map', section: 'Information', icon: 'fa-sitemap', desc: 'Full site map of the MCA portal — every page and service at a glance', href: '/sitemap' },
]

const MAX_RESULTS = 15

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const type = params.get('type') || 'all'

  const [sort, setSort] = useState('relevance')
  const [formCategory, setFormCategory] = useState('All')
  const [pageSection, setPageSection] = useState('All')
  const [circularType, setCircularType] = useState('All')
  const [showAll, setShowAll] = useState(false)

  /* ── Search handler for SearchBar ── */
  const handleSearch = (query, searchType, filters) => {
    setParams({ q: query, type: searchType })
    setShowAll(false)
    setSort('relevance')
    setFormCategory('All')
    setPageSection('All')
    setCircularType('All')
    if (filters?.category) {
      if (searchType === 'forms') setFormCategory(filters.category)
      else if (searchType === 'pages') setPageSection(filters.category)
      else if (searchType === 'circulars') setCircularType(filters.category)
    }
  }

  /* ── Filtered forms ── */
  const filteredForms = useMemo(() => {
    let list = formsCatalog
    if (q) {
      const ql = q.toLowerCase()
      list = list.filter(
        (f) =>
          f.id.toLowerCase().includes(ql) ||
          f.title.toLowerCase().includes(ql) ||
          f.desc.toLowerCase().includes(ql) ||
          f.category.toLowerCase().includes(ql)
      )
    }
    if (formCategory !== 'All') {
      list = list.filter((f) => f.category === formCategory)
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'category') {
      list = [...list].sort((a, b) => a.category.localeCompare(b.category))
    }
    return list
  }, [q, formCategory, sort])

  /* ── Filtered pages ── */
  const filteredPages = useMemo(() => {
    let list = PAGES
    if (q) {
      const ql = q.toLowerCase()
      list = list.filter(
        (p) =>
          p.title.toLowerCase().includes(ql) ||
          p.desc.toLowerCase().includes(ql) ||
          p.section.toLowerCase().includes(ql)
      )
    }
    if (pageSection !== 'All') {
      list = list.filter((p) => p.section === pageSection)
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    }
    return list
  }, [q, pageSection, sort])

  /* ── Filtered circulars & notices ── */
  const filteredCirculars = useMemo(() => {
    const allItems = [
      ...circulars.map((c) => ({ ...c, _kind: 'circular' })),
      ...notices.map((n) => ({ ...n, _kind: 'notice' })),
    ]
    let list = allItems
    if (q) {
      const ql = q.toLowerCase()
      list = list.filter(
        (c) =>
          c.title.toLowerCase().includes(ql) ||
          c.category.toLowerCase().includes(ql) ||
          c.id.toLowerCase().includes(ql)
      )
    }
    if (circularType !== 'All') {
      list = list.filter((c) => c.category === circularType)
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'date') {
      list = [...list].sort((a, b) => new Date(b.date) - new Date(a.date))
    }
    return list
  }, [q, circularType, sort])

  /* ── Visible results (max 15 or all) ── */
  const visibleForms = showAll ? filteredForms : filteredForms.slice(0, MAX_RESULTS)
  const visiblePages = showAll ? filteredPages : filteredPages.slice(0, MAX_RESULTS)
  const visibleCirculars = showAll ? filteredCirculars : filteredCirculars.slice(0, MAX_RESULTS)

  /* ── Sort options per tab ── */
  const sortOptions = {
    all: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'name', label: 'Name A–Z' },
    ],
    forms: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'name', label: 'Name A–Z' },
      { value: 'category', label: 'Category' },
    ],
    pages: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'name', label: 'Name A–Z' },
    ],
    circulars: [
      { value: 'relevance', label: 'Relevance' },
      { value: 'date', label: 'Newest first' },
      { value: 'name', label: 'Name A–Z' },
    ],
  }

  /* ── Total results count ── */
  const resultCount =
    type === 'forms'
      ? filteredForms.length
      : type === 'pages'
        ? filteredPages.length
        : type === 'circulars'
          ? filteredCirculars.length
          : filteredForms.length + filteredPages.length + filteredCirculars.length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Search Header ── */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <SearchBar variant="compact" onSearch={handleSearch} initialType={type} />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-mcaTeal transition-colors">
            Home
          </Link>
          <span className="mx-1.5">›</span>
          <span className="text-slate-700 font-medium">Search Results</span>
        </nav>

        {/* ── Results header ── */}
        {q && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-700">{resultCount}</span>{' '}
              results for{' '}
              <span className="font-semibold text-[#0B2C5C]">"{q}"</span>
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-slate-500 whitespace-nowrap">
                Sort by:
              </label>
              <select
                id="sort-select"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border border-slate-300 rounded-md px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 focus:border-mcaTeal"
              >
                {(sortOptions[type] || sortOptions.all).map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ═══════════════ ALL / FORMS RESULTS ═══════════════ */}
        {(type === 'all' || type === 'forms') && filteredForms.length > 0 && (
          <section className="mb-8" aria-label="Forms and filing">
            {type === 'all' && (
              <h2 className="text-sm font-bold text-[#0B2C5C] uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-file-circle-check text-[#0E7C7B]" aria-hidden="true" />
                Forms &amp; Filing
                <span className="text-slate-400 font-normal normal-case tracking-normal">
                  ({filteredForms.length} result{filteredForms.length !== 1 ? 's' : ''})
                </span>
              </h2>
            )}

            {/* Category chips (only in forms tab) */}
            {type === 'forms' && (
              <div className="flex flex-wrap gap-2 mb-5">
                {['All', 'Start', 'Manage', 'File & Comply', 'Close & Claim'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setFormCategory(s)
                      setShowAll(false)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 ${
                      formCategory === s
                        ? 'bg-[#0B2C5C] text-white border-[#0B2C5C]'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-[#0B2C5C] hover:text-[#0B2C5C]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            {/* Desktop table */}
            <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm" role="table">
                <thead className="bg-[#0B2C5C] text-white text-xs uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 text-left">Form</th>
                    <th className="px-4 py-3 text-left">Category</th>
                    <th className="px-4 py-3 text-left">Description</th>
                    <th className="px-4 py-3 text-right">Fee</th>
                    <th className="px-4 py-3 text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {visibleForms.map((f, i) => (
                    <tr
                      key={f.id}
                      className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${
                        i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-[#0B2C5C]">{f.id}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{f.title}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B]">
                          {f.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-xs truncate">{f.desc}</td>
                      <td className="px-4 py-3 text-right text-xs text-slate-700 font-medium whitespace-nowrap">{f.fee}</td>
                      <td className="px-4 py-3 text-center">
                        <Link
                          to={`/efiling/${f.id}`}
                          className="text-[#0E7C7B] font-semibold text-xs hover:underline focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 rounded"
                        >
                          File now →
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {visibleForms.map((f) => (
                <div
                  key={f.id}
                  className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-[#0B2C5C] text-sm leading-snug">{f.id}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{f.title}</p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-[#0E7C7B]/10 text-[#0E7C7B] shrink-0">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-700 font-medium">{f.fee}</span>
                    <Link
                      to={`/efiling/${f.id}`}
                      className="text-[#0E7C7B] font-semibold text-xs hover:underline"
                    >
                      File now →
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more */}
            {!showAll && filteredForms.length > MAX_RESULTS && type === 'forms' && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-2.5 bg-white border border-[#0B2C5C] text-[#0B2C5C] text-sm font-semibold rounded-lg hover:bg-[#0B2C5C] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
                >
                  Show more ({filteredForms.length - MAX_RESULTS} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════ ALL / PAGES RESULTS ═══════════════ */}
        {(type === 'all' || type === 'pages') && filteredPages.length > 0 && (
          <section className="mb-8" aria-label="Pages and services">
            {type === 'all' && (
              <h2 className="text-sm font-bold text-[#0B2C5C] uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-[#0E7C7B]" aria-hidden="true" />
                Pages &amp; Services
                <span className="text-slate-400 font-normal normal-case tracking-normal">
                  ({filteredPages.length} result{filteredPages.length !== 1 ? 's' : ''})
                </span>
              </h2>
            )}

            {/* Section chips (only in pages tab) */}
            {type === 'pages' && (
              <div className="flex flex-wrap gap-2 mb-5">
                {['All', 'Services', 'Information', 'Help'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setPageSection(s)
                      setShowAll(false)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 ${
                      pageSection === s
                        ? 'bg-[#0B2C5C] text-white border-[#0B2C5C]'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-[#0B2C5C] hover:text-[#0B2C5C]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {visiblePages.map((p) => (
                  <Link
                    key={p.href}
                    to={p.href}
                    className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="mt-0.5 w-9 h-9 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center shrink-0 group-hover:bg-[#0E7C7B] transition-colors">
                      <i
                        className={`fa-solid ${p.icon} text-[#0E7C7B] text-xs group-hover:text-white transition-colors`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#0B2C5C] group-hover:text-[#0E7C7B] transition-colors">
                          {p.title}
                        </h3>
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-[#0E7C7B] bg-[#0E7C7B]/10 rounded px-2 py-0.5">
                          {p.section}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-300 text-xs mt-2 group-hover:text-[#0E7C7B] transition-colors" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Show more */}
            {!showAll && filteredPages.length > MAX_RESULTS && type === 'pages' && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-2.5 bg-white border border-[#0B2C5C] text-[#0B2C5C] text-sm font-semibold rounded-lg hover:bg-[#0B2C5C] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
                >
                  Show more ({filteredPages.length - MAX_RESULTS} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════ ALL / CIRCULARS RESULTS ═══════════════ */}
        {(type === 'all' || type === 'circulars') && filteredCirculars.length > 0 && (
          <section className="mb-8" aria-label="Circulars and notices">
            {type === 'all' && (
              <h2 className="text-sm font-bold text-[#0B2C5C] uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-bullhorn text-[#0E7C7B]" aria-hidden="true" />
                Circulars &amp; Notices
                <span className="text-slate-400 font-normal normal-case tracking-normal">
                  ({filteredCirculars.length} result{filteredCirculars.length !== 1 ? 's' : ''})
                </span>
              </h2>
            )}

            {/* Type chips (only in circulars tab) */}
            {type === 'circulars' && (
              <div className="flex flex-wrap gap-2 mb-5">
                {['All', 'Notification', 'Circular', 'Amendment', 'Update'].map((s) => (
                  <button
                    key={s}
                    onClick={() => {
                      setCircularType(s)
                      setShowAll(false)
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 ${
                      circularType === s
                        ? 'bg-[#0B2C5C] text-white border-[#0B2C5C]'
                        : 'bg-white text-slate-600 border-slate-300 hover:border-[#0B2C5C] hover:text-[#0B2C5C]'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {visibleCirculars.map((c) => (
                  <Link
                    key={c.id}
                    to="/help/circulars"
                    className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group"
                  >
                    <div className="mt-0.5 w-9 h-9 rounded-full bg-[#FF9933]/10 flex items-center justify-center shrink-0 group-hover:bg-[#FF9933] transition-colors">
                      <i
                        className={`fa-solid ${c._kind === 'notice' ? 'fa-file-lines' : 'fa-bullhorn'} text-[#FF9933] text-xs group-hover:text-white transition-colors`}
                        aria-hidden="true"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono text-slate-400">{c.id}</span>
                        <span className="text-[10px] text-slate-400">•</span>
                        <span className="text-[10px] text-slate-400">{c.date}</span>
                        {c.important && (
                          <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-white bg-red-500 rounded px-1.5 py-0.5">
                            Important
                          </span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-[#0B2C5C] mt-1 group-hover:text-[#0E7C7B] transition-colors leading-snug">
                        {c.title}
                      </h3>
                      <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#0E7C7B] bg-[#0E7C7B]/10 rounded px-2 py-0.5">
                        {c.category}
                      </span>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-300 text-xs mt-2 group-hover:text-[#0E7C7B] transition-colors" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Show more */}
            {!showAll && filteredCirculars.length > MAX_RESULTS && type === 'circulars' && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAll(true)}
                  className="px-6 py-2.5 bg-white border border-[#0B2C5C] text-[#0B2C5C] text-sm font-semibold rounded-lg hover:bg-[#0B2C5C] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
                >
                  Show more ({filteredCirculars.length - MAX_RESULTS} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════ EMPTY STATE ═══════════════ */}
        {resultCount === 0 && q && <EmptyState query={q} />}

        {/* ═══════════════ NO QUERY — SHOW LANDING ═══════════════ */}
        {!q && (
          <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center">
              <i className="fa-solid fa-magnifying-glass text-[#0E7C7B] text-xl" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-[#0B2C5C] mb-2">
              Search the MCA Portal
            </h2>
            <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
              Find e-Filing forms, portal pages, circulars, and more. Use the tabs above
              to narrow your search, or type a keyword to get started.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs">
              <Link to="/efiling" className="px-4 py-2 bg-[#0B2C5C] text-white rounded-lg font-semibold hover:bg-[#0B2C5C]/90 transition-colors">
                Browse all forms
              </Link>
              <Link to="/help/faqs" className="px-4 py-2 border border-[#0B2C5C] text-[#0B2C5C] rounded-lg font-semibold hover:bg-[#0B2C5C] hover:text-white transition-colors">
                Visit Help &amp; FAQs
              </Link>
              <Link to="/sitemap" className="px-4 py-2 border border-slate-300 text-slate-600 rounded-lg font-semibold hover:border-[#0B2C5C] hover:text-[#0B2C5C] transition-colors">
                View Site Map
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* ─── Empty State ─── */
function EmptyState({ query }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
      <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
        <i className="fa-solid fa-magnifying-glass text-slate-400 text-xl" aria-hidden="true" />
      </div>
      <h3 className="text-lg font-semibold text-[#0B2C5C] mb-2">
        We couldn't find any results
        {query && (
          <>
            {' '}
            for <span className="text-[#0E7C7B]">"{query}"</span>
          </>
        )}
      </h3>
      <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
        Check your spelling, try fewer keywords, or browse by category using the tabs above.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#0B2C5C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B2C5C]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
        >
          Back to Home
        </Link>
        <Link
          to="/sitemap"
          className="px-5 py-2.5 border border-[#0B2C5C] text-[#0B2C5C] text-sm font-semibold rounded-lg hover:bg-[#0B2C5C] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
        >
          Browse Site Map
        </Link>
      </div>
    </div>
  )
}
