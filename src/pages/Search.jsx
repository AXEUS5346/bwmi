import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import EmptyState from '../components/EmptyState'
import QuickActions from '../components/QuickActions'
import AdvancedSearchPanel from '../components/AdvancedSearchPanel'
import { getCategoryByKey } from '../data/searchConfig'
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

/* ─── Relevance scoring ─── */
function relevanceScore(item, query) {
  if (!query) return 0
  const ql = query.toLowerCase()
  const idMatch = item.id?.toLowerCase().includes(ql) ? 3 : 0
  const titleMatch = item.title?.toLowerCase().includes(ql) ? 2 : 0
  const descMatch = item.desc?.toLowerCase().includes(ql) ? 1 : 0
  return idMatch + titleMatch + descMatch
}

/* ─── Parse date for circulars sort ─── */
function parseDate(dateStr) {
  const p = dateStr.split('-')
  return new Date(`${p[2]}-${p[1]}-${p[0]}`)
}

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const type = params.get('type') || 'forms'

  const [sort, setSort] = useState('relevance')
  const [showAllFlags, setShowAllFlags] = useState({ forms: false, pages: false, circulars: false })
  const [advancedOpen, setAdvancedOpen] = useState(false)
  const [advancedFilters, setAdvancedFilters] = useState({})

  /* ── Active chip filters (from SearchBar inline chips) ── */
  const [formChip, setFormChip] = useState('All')
  const [pageChip, setPageChip] = useState('All')
  const [circularChip, setCircularChip] = useState('All')

  /* ── Search handler for SearchBar ── */
  const handleSearch = (query, searchType, filters) => {
    setParams({ q: query, type: searchType })
    setSort('relevance')
    setShowAllFlags({ forms: false, pages: false, circulars: false })
    setAdvancedOpen(false)
    setAdvancedFilters({})
    // Reset all chips
    setFormChip('All')
    setPageChip('All')
    setCircularChip('All')
    // Apply chip from SearchBar
    if (filters?.category) {
      if (searchType === 'forms') setFormChip(filters.category)
      else if (searchType === 'pages') setPageChip(filters.category)
      else if (searchType === 'circulars') setCircularChip(filters.category)
    }
  }

  /* ── Filtered forms ─── */
  const filteredForms = useMemo(() => {
    let list = formsCatalog
    if (q) {
      const ql = q.toLowerCase()
      list = list.filter(f =>
        f.id.toLowerCase().includes(ql) ||
        f.title.toLowerCase().includes(ql) ||
        f.desc.toLowerCase().includes(ql) ||
        f.category.toLowerCase().includes(ql)
      )
    }
    const chipFilter = formChip !== 'All' ? formChip : advancedFilters.category
    if (chipFilter && chipFilter !== 'All') {
      list = list.filter(f => f.category === chipFilter)
    }
    // Fee range filter from advanced panel
    if (advancedFilters.feeRange && advancedFilters.feeRange !== 'All') {
      list = list.filter(f => {
        const feeNum = parseInt(f.fee.replace(/[^\d]/g, '')) || 0
        switch (advancedFilters.feeRange) {
          case 'Free': return feeNum === 0
          case 'Under500': return feeNum > 0 && feeNum < 500
          case '500-1000': return feeNum >= 500 && feeNum <= 1000
          case 'Over1000': return feeNum > 1000
          default: return true
        }
      })
    }
    // Sort
    if (sort === 'relevance' && q) {
      list = [...list].sort((a, b) => relevanceScore(b, q) - relevanceScore(a, q))
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    } else if (sort === 'category') {
      list = [...list].sort((a, b) => a.category.localeCompare(b.category))
    }
    return list
  }, [q, formChip, sort, advancedFilters])

  /* ── Filtered pages ─── */
  const filteredPages = useMemo(() => {
    let list = PAGES
    if (q) {
      const ql = q.toLowerCase()
      list = list.filter(p =>
        p.title.toLowerCase().includes(ql) ||
        p.desc.toLowerCase().includes(ql) ||
        p.section.toLowerCase().includes(ql)
      )
    }
    const chipFilter = pageChip !== 'All' ? pageChip : advancedFilters.section
    if (chipFilter && chipFilter !== 'All') {
      list = list.filter(p => p.section === chipFilter)
    }
    if (sort === 'relevance' && q) {
      list = [...list].sort((a, b) => relevanceScore(b, q) - relevanceScore(a, q))
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    }
    return list
  }, [q, pageChip, sort, advancedFilters])

  /* ── Filtered circulars & notices ─── */
  const filteredCirculars = useMemo(() => {
    const allItems = [
      ...circulars.map(c => ({ ...c, _kind: 'circular' })),
      ...notices.map(n => ({ ...n, _kind: 'notice' })),
    ]
    let list = allItems
    if (q) {
      const ql = q.toLowerCase()
      list = list.filter(c =>
        c.title.toLowerCase().includes(ql) ||
        c.category.toLowerCase().includes(ql) ||
        c.id.toLowerCase().includes(ql)
      )
    }
    // Unified filter using _searchType
    const chipFilter = circularChip !== 'All' ? circularChip : advancedFilters.type
    if (chipFilter && chipFilter !== 'All') {
      list = list.filter(c => c._searchType === chipFilter)
    }
    // Date range from advanced panel
    if (advancedFilters.dateFrom) {
      const from = new Date(advancedFilters.dateFrom)
      list = list.filter(c => parseDate(c.date) >= from)
    }
    if (advancedFilters.dateTo) {
      const to = new Date(advancedFilters.dateTo)
      list = list.filter(c => parseDate(c.date) <= to)
    }
    if (sort === 'relevance' && q) {
      list = [...list].sort((a, b) => relevanceScore(b, q) - relevanceScore(a, q))
    } else if (sort === 'date') {
      list = [...list].sort((a, b) => parseDate(b.date) - parseDate(a.date))
    } else if (sort === 'name') {
      list = [...list].sort((a, b) => a.title.localeCompare(b.title))
    }
    return list
  }, [q, circularChip, sort, advancedFilters])

  /* ── Visible results (per-tab showAll) ─── */
  const visibleForms = showAllFlags.forms ? filteredForms : filteredForms.slice(0, MAX_RESULTS)
  const visiblePages = showAllFlags.pages ? filteredPages : filteredPages.slice(0, MAX_RESULTS)
  const visibleCirculars = showAllFlags.circulars ? filteredCirculars : filteredCirculars.slice(0, MAX_RESULTS)

  /* ── Sort options per tab ─── */
  const sortOptions = {
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

  /* ── Result count ─── */
  const resultCount =
    type === 'forms' ? filteredForms.length
    : type === 'pages' ? filteredPages.length
    : type === 'circulars' ? filteredCirculars.length
    : filteredForms.length + filteredPages.length + filteredCirculars.length

  const activeCat = getCategoryByKey(type)
  const hasQuery = q.trim().length > 0
  const showForms = hasQuery && (type === 'all' || type === 'forms')
  const showPages = hasQuery && (type === 'all' || type === 'pages')
  const showCirculars = hasQuery && (type === 'all' || type === 'circulars')

  return (
    <div className="min-h-screen bg-nzLightBg">
      {/* ── Search Header ── */}
      <div className="bg-white border-b border-nzDivider">
        <div className="max-w-7xl mx-auto px-4 py-5">
          <SearchBar
            onSearch={handleSearch}
            onTabChange={tab => {
              setParams({ q, type: tab })
              setSort('relevance')
              setShowAllFlags({ forms: false, pages: false, circulars: false })
              setAdvancedOpen(false)
              setAdvancedFilters({})
              setFormChip('All')
              setPageChip('All')
              setCircularChip('All')
            }}
            onFilterChange={chip => {
              if (type === 'forms') setFormChip(chip)
              else if (type === 'pages') setPageChip(chip)
              else if (type === 'circulars') setCircularChip(chip)
              setShowAllFlags(f => ({ ...f, [type]: false }))
            }}
            initialType={type}
            initialQuery={q}
          />
          {/* Advanced search toggle */}
          <button
            type="button"
            onClick={() => setAdvancedOpen(o => !o)}
            className="mt-3 inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-nzDarkTeal transition-colors focus:outline-none focus:ring-2 focus:ring-nzCyan/40 px-2 py-1"
            aria-expanded={advancedOpen}
          >
            <i className={`fa-solid fa-sliders text-[10px] transition-transform ${advancedOpen ? 'rotate-0' : ''}`} aria-hidden="true" />
            Advanced search options
            <i className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${advancedOpen ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
          {/* Advanced search panel */}
          <AdvancedSearchPanel
            activeCategory={type}
            filters={advancedFilters}
            onChange={setAdvancedFilters}
            isOpen={advancedOpen}
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* ── Breadcrumb ── */}
        <nav className="text-sm text-slate-500 mb-4" aria-label="Breadcrumb">
          <Link to="/" className="hover:text-nzPrimary transition-colors">Home</Link>
          <span className="mx-1.5 text-slate-400">&rsaquo;</span>
          <span className="text-nzDarkGrey font-medium">Search Results</span>
        </nav>

        {/* ── Results header ── */}
        {q && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
            <p className="text-sm text-slate-500">
              Showing{' '}
              <span className="font-semibold text-slate-700">{resultCount}</span>{' '}
              results for{' '}
              <span className="font-semibold text-nzDarkTeal">&ldquo;{q}&rdquo;</span>
            </p>
            <div className="flex items-center gap-2">
              <label htmlFor="sort-select" className="text-xs text-slate-500 whitespace-nowrap">Sort by:</label>
              <select
                id="sort-select"
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="text-sm border border-slate-300 px-3 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-nzCyan/40 focus:border-nzPrimary"
              >
                {(sortOptions[type] || sortOptions.forms).map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* ═══════════════ FORMS RESULTS ═══════════════ */}
        {showForms && filteredForms.length > 0 && (
          <section className="mb-8" aria-label="Forms and filing">
            {type === 'all' && (
              <h2 className="text-sm font-bold text-nzDarkTeal uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-file-circle-check text-nzCyan" aria-hidden="true" />
                Forms &amp; Filing
                <span className="text-slate-400 font-normal normal-case tracking-normal">
                  ({filteredForms.length} result{filteredForms.length !== 1 ? 's' : ''})
                </span>
              </h2>
            )}

            {/* Desktop table */}
            <div className="hidden md:block bg-white border border-nzDivider overflow-hidden shadow-sm">
              <table className="w-full text-sm" role="table">
                <thead className="bg-nzDarkTeal text-white text-xs uppercase tracking-wider">
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
                    <tr key={f.id} className={`border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}`}>
                      <td className="px-4 py-3">
                        <Link to={`/efiling/${f.id}`} className="font-medium text-nzDarkTeal hover:underline focus:outline-none focus:ring-2 focus:ring-nzCyan/40">{f.id}</Link>
                        <Link to={`/efiling/${f.id}`} className="block text-xs text-slate-400 mt-0.5 hover:text-nzDarkTeal hover:underline focus:outline-none focus:ring-2 focus:ring-nzCyan/40">{f.title}</Link>
                      </td>
                      <td className="px-4 py-3 pointer-events-none">
                        <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-nzCyan/10 text-nzCyan">
                          {f.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-slate-600 max-w-xs truncate pointer-events-none">{f.desc}</td>
                      <td className="px-4 py-3 text-right text-xs text-slate-700 font-medium whitespace-nowrap pointer-events-none">{f.fee}</td>
                      <td className="px-4 py-3 text-center">
                        <Link to={`/efiling/${f.id}`} className="text-nzCyan font-semibold text-xs hover:underline focus:outline-none focus:ring-2 focus:ring-nzCyan/40">
                          File now &rarr;
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-3">
              {visibleForms.map(f => (
                <div key={f.id} className="bg-white border border-nzDivider p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Link to={`/efiling/${f.id}`} className="font-semibold text-nzDarkTeal text-sm leading-snug hover:underline focus:outline-none focus:ring-2 focus:ring-nzCyan/40">{f.id}</Link>
                      <p className="text-xs text-slate-500 mt-0.5">{f.title}</p>
                    </div>
                    <span className="inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-nzCyan/10 text-nzCyan shrink-0">
                      {f.category}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">{f.desc}</p>
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-700 font-medium">{f.fee}</span>
                    <Link to={`/efiling/${f.id}`} className="text-nzCyan font-semibold text-xs hover:underline">
                      File now &rarr;
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Show more (per-tab) */}
            {!showAllFlags.forms && filteredForms.length > MAX_RESULTS && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAllFlags(f => ({ ...f, forms: true }))}
                  className="px-6 py-2.5 bg-white border border-nzDarkTeal text-nzDarkTeal text-sm font-semibold hover:bg-nzDarkTeal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-nzCyan/40"
                >
                  Show more ({filteredForms.length - MAX_RESULTS} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════ PAGES RESULTS ═══════════════ */}
        {showPages && filteredPages.length > 0 && (
          <section className="mb-8" aria-label="Pages and services">
            {type === 'all' && (
              <h2 className="text-sm font-bold text-nzDarkTeal uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-layer-group text-nzCyan" aria-hidden="true" />
                Pages &amp; Services
                <span className="text-slate-400 font-normal normal-case tracking-normal">
                  ({filteredPages.length} result{filteredPages.length !== 1 ? 's' : ''})
                </span>
              </h2>
            )}

            <div className="bg-white border border-nzDivider overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {visiblePages.map(p => (
                  <Link key={p.href} to={p.href} className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="mt-0.5 w-9 h-9 bg-nzCyan/10 flex items-center justify-center shrink-0 group-hover:bg-nzCyan transition-colors">
                      <i className={`fa-solid ${p.icon} text-nzCyan text-xs group-hover:text-white transition-colors`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-nzDarkTeal group-hover:text-nzCyan transition-colors">{p.title}</h3>
                        <span className="inline-block text-[10px] font-semibold uppercase tracking-wider text-nzCyan bg-nzCyan/10 px-2 py-0.5">{p.section}</span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{p.desc}</p>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-300 text-xs mt-2 group-hover:text-nzCyan transition-colors" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {!showAllFlags.pages && filteredPages.length > MAX_RESULTS && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAllFlags(f => ({ ...f, pages: true }))}
                  className="px-6 py-2.5 bg-white border border-nzDarkTeal text-nzDarkTeal text-sm font-semibold hover:bg-nzDarkTeal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-nzCyan/40"
                >
                  Show more ({filteredPages.length - MAX_RESULTS} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════ CIRCULARS RESULTS ═══════════════ */}
        {showCirculars && filteredCirculars.length > 0 && (
          <section className="mb-8" aria-label="Circulars and notices">
            {type === 'all' && (
              <h2 className="text-sm font-bold text-nzDarkTeal uppercase tracking-wider mb-3 flex items-center gap-2">
                <i className="fa-solid fa-bullhorn text-mcaSaffron" aria-hidden="true" />
                Circulars &amp; Notices
                <span className="text-slate-400 font-normal normal-case tracking-normal">
                  ({filteredCirculars.length} result{filteredCirculars.length !== 1 ? 's' : ''})
                </span>
              </h2>
            )}

            <div className="bg-white border border-nzDivider overflow-hidden shadow-sm">
              <div className="divide-y divide-slate-100">
                {visibleCirculars.map(c => (
                  <Link key={c.id} to="/help/circulars" className="flex items-start gap-4 px-5 py-4 hover:bg-slate-50 transition-colors group">
                    <div className="mt-0.5 w-9 h-9 bg-mcaSaffron/10 flex items-center justify-center shrink-0 group-hover:bg-mcaSaffron transition-colors">
                      <i className={`fa-solid ${c._kind === 'notice' ? 'fa-file-lines' : 'fa-bullhorn'} text-mcaSaffron text-xs group-hover:text-white transition-colors`} aria-hidden="true" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-mono text-slate-400">{c.id}</span>
                        <span className="text-[10px] text-slate-400">&bull;</span>
                        <span className="text-[10px] text-slate-400">{c.date}</span>
                        {c.important && (
                          <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-white bg-mcaRed rounded px-1.5 py-0.5">Important</span>
                        )}
                      </div>
                      <h3 className="text-sm font-semibold text-nzDarkTeal mt-1 group-hover:text-nzCyan transition-colors leading-snug">{c.title}</h3>
                      <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-nzCyan bg-nzCyan/10 rounded px-2 py-0.5">{c.category}</span>
                    </div>
                    <i className="fa-solid fa-arrow-right text-slate-300 text-xs mt-2 group-hover:text-nzCyan transition-colors" aria-hidden="true" />
                  </Link>
                ))}
              </div>
            </div>

            {!showAllFlags.circulars && filteredCirculars.length > MAX_RESULTS && (
              <div className="text-center mt-5">
                <button
                  onClick={() => setShowAllFlags(f => ({ ...f, circulars: true }))}
                  className="px-6 py-2.5 bg-white border border-nzDarkTeal text-nzDarkTeal text-sm font-semibold hover:bg-nzDarkTeal hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-nzCyan/40"
                >
                  Show more ({filteredCirculars.length - MAX_RESULTS} remaining)
                </button>
              </div>
            )}
          </section>
        )}

        {/* ═══════════════ EMPTY STATE ═══════════════ */}
        {resultCount === 0 && q && <EmptyState query={q} category={type} />}

        {/* ═══════════════ NO QUERY — QUICK ACTIONS ═══════════════ */}
        {!q && <QuickActions />}
      </div>
    </div>
  )
}
