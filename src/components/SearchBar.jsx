import { useState, useRef, useEffect } from 'react'

/* ─── Tab configuration — site content categories ─── */
const TABS = [
  { key: 'all', label: 'All Content' },
  { key: 'forms', label: 'Forms & Filing' },
  { key: 'pages', label: 'Pages & Services' },
  { key: 'circulars', label: 'Circulars & Notices' },
]

/* ─── Placeholders per tab ─── */
const PLACEHOLDERS = {
  all: 'Search for forms, pages, services, or topics…',
  forms: 'Search forms by name or number (e.g., AOC-4, MGT-7, Form 11)',
  pages: 'Search pages and services (e.g., About, Help, Fee Calculator)',
  circulars: 'Search circulars and notifications',
}

/* ─── Filter options per tab ─── */
const FILTER_OPTIONS = {
  all: null,
  forms: {
    label: 'Form Category',
    options: ['All', 'Start', 'Manage', 'File & Comply', 'Close & Claim'],
  },
  pages: {
    label: 'Section',
    options: ['All', 'Services', 'Information', 'Help'],
  },
  circulars: {
    label: 'Type',
    options: ['All', 'Notification', 'Circular', 'Amendment', 'Update'],
  },
}

/**
 * SearchBar — NZ-style reusable search component for site content.
 *
 * @param {object}  props
 * @param {'hero'|'compact'} props.variant     - Visual variant (default "hero")
 * @param {function}          props.onSearch   - Callback (query, type)
 * @param {'all'|'forms'|'pages'|'circulars'} props.initialType - Starting tab
 */
export default function SearchBar({
  variant = 'hero',
  onSearch,
  initialType = 'all',
}) {
  const [activeTab, setActiveTab] = useState(initialType)
  const [query, setQuery] = useState('')
  const [showFilters, setShowFilters] = useState(false)
  const [filters, setFilters] = useState({ category: 'All' })

  const inputRef = useRef(null)

  /* ── Focus input on mount (hero) ── */
  useEffect(() => {
    if (variant === 'hero' && inputRef.current) {
      const timer = setTimeout(() => inputRef.current?.focus(), 150)
      return () => clearTimeout(timer)
    }
  }, [variant])

  /* ── Reset filters when tab changes ── */
  useEffect(() => {
    setFilters({ category: 'All' })
    setShowFilters(false)
  }, [activeTab])

  /* ── Submit handler ── */
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim() && !showFilters) return
    if (onSearch) {
      onSearch(query.trim(), activeTab, showFilters ? { ...filters } : null)
    }
  }

  /* ── Filter change helper ── */
  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  /* ── Current filter config ── */
  const filterConfig = FILTER_OPTIONS[activeTab]

  /* ────────────────────────── VARIANT CLASSES ────────────────────────── */
  const isHero = variant === 'hero'

  const wrapperClass = isHero
    ? 'bg-mcaNavy rounded-xl p-6 md:p-8'
    : 'bg-white border border-slate-200 rounded-xl p-4 shadow-sm'

  const headingClass = isHero ? 'text-center mb-5' : 'mb-3'

  const tabListBg = isHero ? 'bg-mcaNavy/80' : 'bg-slate-100'
  const tabActiveBg = isHero ? 'bg-white text-mcaNavy' : 'bg-mcaNavy text-white'
  const tabInactiveText = isHero
    ? 'text-white/70 hover:text-white hover:bg-white/10'
    : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/60'

  const inputSizeClass = isHero
    ? 'py-3.5 px-5 text-base md:text-lg'
    : 'py-2.5 px-4 text-sm'

  const btnSizeClass = isHero
    ? 'px-6 py-3.5 text-sm md:text-base'
    : 'px-4 py-2.5 text-sm'

  /* ────────────────────────── RENDER ────────────────────────── */
  return (
    <section
      className={`${wrapperClass} w-full`}
      role="search"
      aria-label="Search the MCA portal"
    >
      {/* ── Heading (hero only) ── */}
      {isHero && (
        <div className={headingClass}>
          <h1 className="text-xl md:text-2xl font-bold text-white mb-1">
            Search the MCA Portal
          </h1>
          <p className="text-white/60 text-sm md:text-base">
            Find forms, pages, services, and updates across the Ministry of Corporate Affairs
          </p>
        </div>
      )}

      {/* ── Tab selector ── */}
      <div className="mb-4">
        <div
          role="tablist"
          aria-label="Search category"
          className={`flex ${tabListBg} rounded-lg p-1 gap-1`}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key
            return (
              <button
                key={tab.key}
                type="button"
                role="tab"
                id={`search-tab-${tab.key}`}
                aria-selected={isActive}
                aria-controls={`search-panel-${tab.key}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.key)}
                className={`
                  flex-1 rounded-md px-3 py-2 text-xs sm:text-sm font-semibold
                  transition-all duration-150 whitespace-nowrap
                  focus:outline-none focus:ring-2 focus:ring-mcaTeal/60 focus:ring-offset-1
                  ${isActive ? tabActiveBg : tabInactiveText}
                `}
              >
                {tab.label}
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Search form ── */}
      <form
        onSubmit={handleSubmit}
        aria-label={`${TABS.find((t) => t.key === activeTab)?.label} search`}
      >
        <div
          className={`flex rounded-lg overflow-hidden ${
            isHero
              ? 'bg-white ring-1 ring-white/20 shadow-lg'
              : 'bg-slate-50 ring-1 ring-slate-300 shadow-sm'
          }`}
        >
          {/* Search icon */}
          <div className="flex items-center pl-4">
            <i
              className="fa-solid fa-magnifying-glass text-slate-400 text-base"
              aria-hidden="true"
            />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            id={`search-input-${activeTab}`}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={PLACEHOLDERS[activeTab]}
            aria-label={`Search ${TABS.find((t) => t.key === activeTab)?.label.toLowerCase()}`}
            autoComplete="off"
            className={`
              flex-1 bg-transparent outline-none
              text-slate-900 placeholder-slate-400
              ${inputSizeClass}
            `}
          />

          {/* Clear button */}
          {query && (
            <button
              type="button"
              onClick={() => {
                setQuery('')
                inputRef.current?.focus()
              }}
              className="px-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 rounded"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
            </button>
          )}

          {/* Submit button */}
          <button
            type="submit"
            className={`
              bg-mcaTeal text-white font-semibold
              flex items-center gap-2 whitespace-nowrap
              hover:bg-mcaTeal/90 active:bg-mcaTeal/80
              transition-colors
              focus:outline-none focus:ring-2 focus:ring-mcaTeal focus:ring-inset
              ${btnSizeClass}
            `}
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Screen reader live region */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {query
            ? `Searching for ${query} in ${TABS.find((t) => t.key === activeTab)?.label}`
            : ''}
        </div>
      </form>

      {/* ── Filter toggle (only when filters exist for this tab) ── */}
      {filterConfig && (
        <div className={`mt-3 ${isHero ? 'text-center' : ''}`}>
          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className={`
              inline-flex items-center gap-1.5 text-xs font-medium
              transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 rounded px-2 py-1
              ${isHero
                ? 'text-white/60 hover:text-white'
                : 'text-slate-500 hover:text-mcaNavy'
              }
            `}
            aria-expanded={showFilters}
            aria-controls="search-filters-panel"
          >
            <i
              className={`fa-solid fa-sliders text-[10px] transition-transform ${showFilters ? 'rotate-0' : ''}`}
              aria-hidden="true"
            />
            {showFilters ? 'Fewer options' : 'Filter by category'}
            <i
              className={`fa-solid fa-chevron-down text-[10px] transition-transform duration-200 ${
                showFilters ? 'rotate-180' : ''
              }`}
              aria-hidden="true"
            />
          </button>
        </div>
      )}

      {/* ── Expandable filters ── */}
      {filterConfig && (
        <div
          id="search-filters-panel"
          role="region"
          aria-label="Search filters"
          className={`
            overflow-hidden transition-all duration-250 ease-in-out
            ${showFilters ? 'max-h-60 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
        >
          <div
            className={`
              rounded-lg p-4
              ${isHero
                ? 'bg-white/10 border border-white/10'
                : 'bg-slate-50 border border-slate-200'
              }
            `}
          >
            <div className="flex flex-col sm:flex-row sm:items-end gap-4">
              <div className="flex-1">
                <label
                  htmlFor={`filter-category-${activeTab}`}
                  className={`
                    block text-xs font-semibold uppercase tracking-wider mb-1.5
                    ${isHero ? 'text-white/70' : 'text-slate-500'}
                  `}
                >
                  {filterConfig.label}
                </label>
                <select
                  id={`filter-category-${activeTab}`}
                  value={filters.category}
                  onChange={(e) => updateFilter('category', e.target.value)}
                  className={`
                    w-full rounded-md px-3 py-2 text-sm font-medium
                    transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40
                    ${isHero
                      ? 'bg-white/15 text-white border border-white/20 hover:border-white/40 [&>option]:text-slate-900 [&>option]:bg-white'
                      : 'bg-white text-slate-800 border border-slate-300 hover:border-slate-400'
                    }
                  `}
                  aria-label={`Filter by ${filterConfig.label.toLowerCase()}`}
                >
                  {filterConfig.options.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              <div className="shrink-0">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`
                    w-full sm:w-auto rounded-md font-semibold
                    transition-colors
                    focus:outline-none focus:ring-2 focus:ring-mcaTeal focus:ring-inset
                    ${isHero
                      ? 'bg-mcaTeal text-white px-5 py-2 hover:bg-mcaTeal/90'
                      : 'bg-mcaNavy text-white px-5 py-2 hover:bg-mcaNavy/90'
                    }
                  `}
                  aria-label="Apply filter and search"
                >
                  Apply &amp; Search
                </button>
              </div>
            </div>

            {/* Active filter tag */}
            {filters.category !== 'All' && (
              <div
                className={`flex flex-wrap gap-2 mt-3 pt-3 border-t ${
                  isHero ? 'border-white/10' : 'border-slate-200'
                }`}
              >
                <span
                  className={`
                    inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-1
                    ${isHero
                      ? 'bg-mcaTeal/20 text-mcaTeal border border-mcaTeal/30'
                      : 'bg-mcaNavy/10 text-mcaNavy border border-mcaNavy/20'
                    }
                  `}
                >
                  {filterConfig.label}: {filters.category}
                  <button
                    type="button"
                    onClick={() => updateFilter('category', 'All')}
                    className="hover:opacity-70 transition-opacity focus:outline-none"
                    aria-label={`Remove filter: ${filters.category}`}
                  >
                    <i className="fa-solid fa-xmark text-[10px]" aria-hidden="true" />
                  </button>
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  )
}
