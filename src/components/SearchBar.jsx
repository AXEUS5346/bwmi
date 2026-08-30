import { useState, useRef, useEffect } from 'react'
import { SEARCH_CATEGORIES } from '../data/searchConfig'
import FilterChips from './FilterChips'

/**
 * SearchBar — NZ-style radio-tab search with inline filter chips.
 * No hero/compact duality. Parent controls URL; this is a controlled leaf.
 *
 * @param {object}  props
 * @param {function}          props.onSearch     - (query, categoryKey, activeFilters) => void
 * @param {'forms'|'pages'|'circulars'} props.initialType - starting category
 * @param {string}            props.initialQuery - pre-filled query
 */
export default function SearchBar({ onSearch, onFilterChange, onTabChange, initialType = 'forms', initialQuery = '' }) {
  const [activeTab, setActiveTab] = useState(initialType)
  const [query, setQuery] = useState(initialQuery)
  const [activeChip, setActiveChip] = useState('All')
  const inputRef = useRef(null)

  const cat = SEARCH_CATEGORIES.find(c => c.key === activeTab) || SEARCH_CATEGORIES[0]

  /* Autofocus input */
  useEffect(() => {
    const t = setTimeout(() => inputRef.current?.focus(), 150)
    return () => clearTimeout(t)
  }, [])

  /* Reset chip when tab changes */
  useEffect(() => {
    setActiveChip('All')
  }, [activeTab])

  /* Sync initialType from parent */
  useEffect(() => {
    if (initialType && initialType !== activeTab) setActiveTab(initialType)
  }, [initialType])

  /* Sync initialQuery from parent */
  useEffect(() => {
    setQuery(initialQuery)
  }, [initialQuery])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!query.trim() && activeChip === 'All') return
    if (onSearch) {
      const filters = activeChip !== 'All' ? { category: activeChip } : null
      onSearch(query.trim(), activeTab, filters)
    }
  }

  return (
    <section className="w-full" role="search" aria-label="Search the MCA portal">
      {/* ── Radio-tab category selector (NZ pattern) ── */}
      <div className="mb-4">
        <div role="radiogroup" aria-label="Search category" className="flex flex-wrap gap-0 border border-nzDivider bg-nzLightBg">
          {SEARCH_CATEGORIES.map(c => {
            const isActive = activeTab === c.key
            return (
              <button
                key={c.key}
                type="button"
                role="radio"
                aria-checked={isActive}
                onClick={() => { setActiveTab(c.key); onTabChange?.(c.key) }}
                className={`
                  flex items-center gap-2 px-4 py-2.5 text-sm font-semibold
                  border-r border-nzDivider last:border-r-0
                  transition-colors
                  focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nzCyan
                  ${isActive
                    ? 'bg-nzDarkTeal text-white'
                    : 'bg-white text-slate-600 hover:bg-slate-50 hover:text-nzDarkTeal'
                  }
                `}
              >
                <i className={`fa-solid ${c.icon} text-xs`} aria-hidden="true" />
                <span className="hidden sm:inline">{c.label}</span>
                <span className="sm:hidden">{c.label.split(' ')[0]}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* ── Search form ── */}
      <form onSubmit={handleSubmit} aria-label={`${cat.label} search`}>
        <div className="flex border border-nzDivider bg-white shadow-sm overflow-hidden">
          {/* Search icon */}
          <div className="flex items-center pl-4">
            <i className="fa-solid fa-magnifying-glass text-slate-400 text-base" aria-hidden="true" />
          </div>

          {/* Input */}
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder={cat.placeholder}
            aria-label={`Search ${cat.label.toLowerCase()}`}
            autoComplete="off"
            className="flex-1 bg-transparent px-3 py-3 text-sm text-slate-900 placeholder-slate-400 outline-none"
          />

          {/* Clear */}
          {query && (
            <button
              type="button"
              onClick={() => { setQuery(''); inputRef.current?.focus() }}
              className="px-2 text-slate-400 hover:text-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-nzCyan/40"
              aria-label="Clear search"
            >
              <i className="fa-solid fa-xmark text-sm" aria-hidden="true" />
            </button>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-nzDarkTeal text-white px-5 py-3 text-sm font-semibold hover:bg-nzDarkTeal/90 transition-colors focus:outline-none focus:ring-2 focus:ring-inset focus:ring-nzCyan flex items-center gap-2 whitespace-nowrap"
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass text-sm" aria-hidden="true" />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>

        {/* Screen reader live region */}
        <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
          {query ? `Searching for ${query} in ${cat.label}` : ''}
        </div>
      </form>

      {/* ── Inline filter chips (NZ pattern — always visible, not hidden) ── */}
      <div className="mt-3">
        <FilterChips
          options={cat.filterChips}
          value={activeChip}
          onChange={v => { setActiveChip(v); onFilterChange?.(v) }}
          label={`Filter by ${cat.label}`}
          size="sm"
        />
      </div>
    </section>
  )
}
