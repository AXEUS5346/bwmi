import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { formsCatalog } from '../data/mockData'

const PAGE_SIZE = 12

const CATEGORIES = ['All', 'Start', 'Manage', 'File & Comply', 'Close & Claim', 'Other']

const CATEGORY_COLORS = {
  'Start':           { bg: 'bg-nzMediumTeal/10',   text: 'text-nzMediumTeal',   border: 'border-nzMediumTeal/20' },
  'Manage':          { bg: 'bg-nzMediumTeal/10',   text: 'text-nzMediumTeal',   border: 'border-nzMediumTeal/20' },
  'File & Comply':   { bg: 'bg-amber-50',          text: 'text-amber-700',      border: 'border-amber-200' },
  'Close & Claim':   { bg: 'bg-rose-50',           text: 'text-rose-700',       border: 'border-rose-200' },
  'Other':           { bg: 'bg-nzLightBg',         text: 'text-nzMuted',        border: 'border-nzDivider' },
}

const BADGE_STYLES = {
  'Most filed': { bg: 'bg-nzMediumTeal/10', text: 'text-nzMediumTeal', border: 'border-nzMediumTeal/20', icon: '★' },
  '7-in-1':    { bg: 'bg-purple-50',       text: 'text-purple-700',   border: 'border-purple-200',      icon: '⚡' },
  'Seasonal':  { bg: 'bg-amber-50',        text: 'text-amber-700',    border: 'border-amber-200',       icon: '📅' },
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
    <div className="min-h-screen bg-nzLightBg">

      {/* ═══════════════════════════════════════════════════════════════════
          HERO — Page header
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-nzLightBg" aria-label="Online Services">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-[42px] font-[200] text-nzDarkGrey tracking-tight">
            Online Services
          </h1>
          <p className="mt-3 text-nzBody text-lg max-w-2xl mx-auto">
            File forms, make changes, and manage your company online
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SEARCH & FILTER BAR
         ═══════════════════════════════════════════════════════════════════ */}
      <section className="bg-white border-b-2 border-nzDivider" aria-label="Search and filter">
        <div className="max-w-7xl mx-auto px-4 py-8">

          {/* Search input */}
          <div className="relative mb-6 max-w-2xl mx-auto">
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-nzMuted pointer-events-none"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              value={query}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search forms by name or number..."
              className="w-full pl-12 pr-4 py-3 border border-nzDivider text-sm bg-white text-nzBlack placeholder:text-nzMuted focus:outline-none focus:border-nzPrimary transition-colors"
            />
          </div>

          {/* Category filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-4">
            {CATEGORIES.map(cat => {
              const isActive = activeCategory === cat
              return (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={`px-5 py-2 text-sm font-medium border transition-colors duration-150 ${
                    isActive
                      ? 'bg-nzPrimary text-white border-nzPrimary'
                      : 'bg-white text-nzBody border-nzDivider hover:border-nzPrimary hover:text-nzPrimary'
                  }`}
                >
                  {cat}
                  {isActive && cat !== 'All' && (
                    <span className="ml-1.5 inline-flex items-center justify-center w-5 h-5 text-[11px] bg-white/20">
                      {filtered.length}
                    </span>
                  )}
                </button>
              )
            })}
          </div>

          {/* Results count */}
          <p className="text-sm text-nzMuted text-center">
            Showing <span className="font-semibold text-nzDarkGrey">{Math.min(visibleCount, filtered.length)}</span> of{' '}
            <span className="font-semibold text-nzDarkGrey">{filtered.length}</span> online services
          </p>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SERVICE CARDS
         ═══════════════════════════════════════════════════════════════════ */}
      {visibleForms.length > 0 ? (
        <section className="bg-white" aria-label="Service catalog">
          <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="divide-y divide-nzDivider border-t border-nzDivider">
              {visibleForms.map((form) => {
                const catColor = getCategoryColor(form.category)
                const badgeStyle = getBadgeStyle(form.badge)
                const cleanTitle = form.title.replace(form.id + ' — ', '').replace(form.id, '').trim() || form.title

                return (
                  <div
                    key={form.id}
                    className="py-6 group"
                  >
                    {/* Top row: Icon + Form ID + Category badge */}
                    <div className="flex items-center gap-4 mb-3">
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-nzMediumTeal text-white text-lg">
                        <i className="fa-solid fa-file-lines" aria-hidden="true" />
                      </span>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs font-bold text-nzMediumTeal bg-nzMediumTeal/5 border border-nzMediumTeal/20 px-2.5 py-1">
                          {form.id}
                        </span>
                        <span className={`text-[11px] px-2 py-0.5 border font-medium whitespace-nowrap ${catColor.bg} ${catColor.text} ${catColor.border}`}>
                          {form.category}
                        </span>
                        {badgeStyle && (
                          <span className={`inline-flex items-center gap-1 text-[11px] px-2 py-0.5 border font-medium ${badgeStyle.bg} ${badgeStyle.text} ${badgeStyle.border}`}>
                            <span>{badgeStyle.icon}</span>
                            {form.badge}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-[200] text-nzBlack leading-snug mb-1.5 ml-16">
                      {cleanTitle}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-nzBody leading-relaxed ml-16 mb-3">
                      {form.desc}
                    </p>

                    {/* Meta row: Fee + Steps */}
                    <div className="flex items-center gap-4 ml-16 mb-4">
                      <span className="text-sm font-semibold text-nzPrimary">{form.fee}</span>
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-nzMuted bg-nzLightBg px-2.5 py-1">
                        <svg className="w-3.5 h-3.5 text-nzMuted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        {form.steps.length} steps
                      </span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-5 ml-16">
                      <Link
                        to={`/efiling/${form.id}`}
                        className="text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
                      >
                        Learn how →
                      </Link>
                      <Link
                        to={`/efiling/${form.id}`}
                        className="inline-block bg-nzPrimary text-white text-sm font-semibold px-6 py-3 transition-colors hover:bg-nzMediumTeal"
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
              <div className="mt-10 flex justify-center">
                <button
                  onClick={() => setVisibleCount(prev => prev + PAGE_SIZE)}
                  className="px-6 py-3 text-sm font-medium text-nzPrimary border-2 border-nzPrimary hover:bg-nzPrimary hover:text-white transition-colors duration-200"
                >
                  Show more ({filtered.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </div>
        </section>
      ) : (
        /* ── Empty State ── */
        <section className="bg-white" aria-label="No results">
          <div className="max-w-7xl mx-auto px-4 py-20 text-center border-t border-nzDivider">
            <div className="flex justify-center mb-6">
              <span className="flex h-16 w-16 items-center justify-center bg-nzLightBg text-nzMuted">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </span>
            </div>
            <h3 className="text-lg font-[200] text-nzDarkGrey mb-2">No forms match your search.</h3>
            <p className="text-sm text-nzMuted mb-6">Try different keywords or browse all categories.</p>
            <button
              onClick={() => { setQuery(''); handleCategoryChange('All') }}
              className="inline-block bg-nzPrimary text-white text-sm font-semibold px-6 py-3 transition-colors hover:bg-nzMediumTeal"
            >
              Clear search and filters
            </button>
          </div>
        </section>
      )}
    </div>
  )
}
