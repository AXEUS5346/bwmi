import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { formsCatalog } from '../data/mockData'

const PAGE_SIZE = 12

const CATEGORIES = ['All', 'Start', 'Manage', 'File & Comply', 'Close & Claim', 'Other']

const CATEGORY_COLORS = {
  'Start':           { bg: 'bg-emerald-50',   text: 'text-emerald-700',   border: 'border-emerald-200' },
  'Manage':          { bg: 'bg-blue-50',      text: 'text-blue-700',      border: 'border-blue-200' },
  'File & Comply':   { bg: 'bg-amber-50',     text: 'text-amber-700',     border: 'border-amber-200' },
  'Close & Claim':   { bg: 'bg-rose-50',      text: 'text-rose-700',      border: 'border-rose-200' },
  'Other':           { bg: 'bg-slate-50',     text: 'text-slate-600',     border: 'border-slate-200' },
}

const BADGE_STYLES = {
  'Most filed': { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-300', icon: '★' },
  '7-in-1':    { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-300', icon: '⚡' },
  'Seasonal':  { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300', icon: '📅' },
}

function getCategoryColor(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS['Other']
}

function getBadgeStyle(badge) {
  return BADGE_STYLES[badge] || null
}

export default function Catalog() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCat = searchParams.get('cat') || 'All'
  const initialQ = searchParams.get('q') || ''

  const [query, setQuery] = useState(initialQ)
  const [activeCategory, setActiveCategory] = useState(initialCat)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat)
    setVisibleCount(PAGE_SIZE)
    const next = new URLSearchParams(searchParams)
    if (cat === 'All') next.delete('cat')
    else next.set('cat', cat)
    setSearchParams(next)
  }

  const handleSearchChange = (value) => {
    setQuery(value)
    setVisibleCount(PAGE_SIZE)
    const next = new URLSearchParams(searchParams)
    if (!value) next.delete('q')
    else next.set('q', value)
    setSearchParams(next)
  }

  const filtered = useMemo(() => {
    let list = [...formsCatalog]

    // Category filter
    if (activeCategory !== 'All') {
      if (activeCategory === 'Other') {
        const known = ['Start', 'Manage', 'File & Comply', 'Close & Claim']
        list = list.filter(f => !known.includes(f.category))
      } else {
        list = list.filter(f => f.category === activeCategory)
      }
    }

    // Search filter
    if (query.trim()) {
      const q = query.toLowerCase()
      list = list.filter(f =>
        f.title.toLowerCase().includes(q) ||
        f.id.toLowerCase().includes(q) ||
        f.desc.toLowerCase().includes(q)
      )
    }

    return list
  }, [query, activeCategory])

  const visibleForms = filtered.slice(0, visibleCount)
  const hasMore = visibleCount < filtered.length

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Breadcrumb ── */}
        <nav className="flex items-center gap-1.5 text-sm text-slate-500 mb-4">
          <Link to="/" className="hover:text-mcaTeal transition-colors">Home</Link>
          <span className="text-slate-300">›</span>
          <span className="text-slate-700 font-medium">Online Services</span>
        </nav>

        {/* ── Header ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900">Online Services</h1>
          <p className="mt-1.5 text-slate-500">File forms, make changes, and manage your company online</p>
        </div>

        {/* ── Search & Filter Bar ── */}
        <div className="bg-white border border-slate-200 rounded-xl p-4 sm:p-5 mb-6 shadow-sm">
          {/* Search input */}
          <div className="relative mb-4">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search forms by name or number..."
              className="w-full pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mcaTeal/30 focus:border-mcaTeal transition-colors"
            />
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap gap-2 mb-3">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full border transition-all duration-150 ${
                    isActive
                      ? 'bg-mcaNavy text-white border-mcaNavy shadow-sm'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {cat}
                  {isActive && (
                    <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-xs bg-white/20 rounded-full">
                      {filtered.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Results count */}
          <p className="text-sm text-slate-500">
            Showing <span className="font-semibold text-slate-700">{Math.min(visibleCount, filtered.length)}</span> of{' '}
            <span className="font-semibold text-slate-700">{filtered.length}</span> online services
          </p>
        </div>

        {/* ── Service Cards Grid ── */}
        {visibleForms.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {visibleForms.map((form) => {
                const catColor = getCategoryColor(form.category)
                const badgeStyle = getBadgeStyle(form.badge)
                const cleanTitle = form.title.replace(form.id + ' — ', '').replace(form.id, '').trim() || form.title

                return (
                  <div
                    key={form.id}
                    className="bg-white border border-slate-200 rounded-xl p-5 hover:shadow-lg hover:border-mcaTeal/30 transition-all duration-200 group flex flex-col"
                  >
                    {/* Top row: Form ID + Category badge */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <span className="font-mono text-xs font-bold text-mcaTeal bg-mcaTeal/5 border border-mcaTeal/20 px-2.5 py-1 rounded-md">
                        {form.id}
                      </span>
                      <span className={`text-[11px] px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${catColor.bg} ${catColor.text} ${catColor.border}`}>
                        {form.category}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className="font-semibold text-sm text-slate-800 leading-snug group-hover:text-mcaNavy transition-colors">
                      {cleanTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-500 mt-1.5 leading-relaxed flex-1">
                      {form.desc}
                    </p>

                    {/* Fee */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-sm font-semibold text-mcaNavy">{form.fee}</span>
                      {badgeStyle && (
                        <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-medium ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                          <span>{badgeStyle.icon}</span>
                          {form.badge}
                        </span>
                      )}
                    </div>

                    {/* Step count indicator */}
                    <div className="mt-3">
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">
                        <svg className="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {form.steps.length} steps
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                      <Link
                        to={`/efiling/${form.id}`}
                        className="text-sm font-medium text-mcaTeal hover:text-mcaTeal/80 transition-colors"
                      >
                        Learn how →
                      </Link>
                      <Link
                        to={`/efiling/${form.id}`}
                        className="text-sm font-medium text-white bg-mcaNavy hover:bg-[#0e3a7a] px-4 py-1.5 rounded-lg transition-colors shadow-sm"
                      >
                        File now →
                      </Link>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* ── Pagination — Show More ── */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                  className="px-6 py-2.5 text-sm font-medium text-mcaNavy border-2 border-mcaNavy rounded-lg hover:bg-mcaNavy hover:text-white transition-all duration-200"
                >
                  Show more ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        ) : (
          /* ── Empty State ── */
          <div className="bg-white border border-slate-200 rounded-xl p-12 text-center">
            <svg className="mx-auto w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-semibold text-slate-700 mb-1">No forms match your search.</h3>
            <p className="text-sm text-slate-500">Try different keywords.</p>
            <button
              onClick={() => { setQuery(''); handleCategoryChange('All') }}
              className="mt-4 text-sm font-medium text-mcaTeal hover:underline"
            >
              Clear search and filters
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
