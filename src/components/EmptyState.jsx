// EmptyState — category-specific empty results with contextual copy
import { Link } from 'react-router-dom'
import { getCategoryByKey } from '../data/searchConfig'

export default function EmptyState({ query, category }) {
  const cat = getCategoryByKey(category)

  return (
    <div className="text-center py-16">
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-5">
        <i className="fa-solid fa-magnifying-glass text-slate-400 text-2xl" />
      </div>
      <h3 className="text-xl font-semibold text-nzDarkTeal mb-2">
        {cat.emptyTitle || 'No results found'}
      </h3>
      <p className="text-nzBody mb-6 max-w-md mx-auto">
        {cat.emptyDesc || 'We couldn’t find anything matching'} &ldquo;{query}&rdquo;
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {cat.emptyAction && (
          <Link
            to={cat.emptyAction.href}
            className="inline-flex items-center gap-2 bg-nzDarkTeal text-white px-5 py-2.5 text-sm font-semibold hover:bg-nzDarkTeal/90 transition-colors"
          >
            {cat.emptyAction.label}
          </Link>
        )}
        {category !== 'all' && cat.emptyAction?.href !== '/' && (
          <Link
            to="/"
            className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-5 py-2.5 text-sm font-semibold hover:border-nzDarkTeal hover:text-nzDarkTeal transition-colors"
          >
            Back to Home
          </Link>
        )}
        {category === 'all' && (
          <>
            <Link
              to="/sitemap"
              className="inline-flex items-center gap-2 border border-slate-300 text-slate-700 px-5 py-2.5 text-sm font-semibold hover:border-nzDarkTeal hover:text-nzDarkTeal transition-colors"
            >
              View site map
            </Link>
          </>
        )}
      </div>
    </div>
  )
}
