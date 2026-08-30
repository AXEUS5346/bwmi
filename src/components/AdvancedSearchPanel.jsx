// AdvancedSearchPanel — expandable structured search panel (NZ pattern)
// Contextual fields per category: forms (fee range), pages (section), circulars (date range)

export default function AdvancedSearchPanel({ activeCategory, filters, onChange, isOpen }) {
  if (!isOpen) return null

  const update = (key, val) => onChange({ ...filters, [key]: val })

  return (
    <div className="border border-nzDivider bg-nzLightBg p-5 mt-4 transition-all duration-200">
      <h3 className="text-sm font-bold text-nzDarkTeal mb-4">
        Advanced search options
      </h3>

      {activeCategory === 'forms' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Fee range</label>
            <select
              value={filters.feeRange || 'All'}
              onChange={e => update('feeRange', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-nzPrimary focus:outline-none"
            >
              <option value="All">All fees</option>
              <option value="Free">Free (₹0)</option>
              <option value="Under500">Under ₹500</option>
              <option value="500-1000">₹500 – ₹1,000</option>
              <option value="Over1000">Over ₹1,000</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Category</label>
            <select
              value={filters.category || 'All'}
              onChange={e => update('category', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-nzPrimary focus:outline-none"
            >
              <option value="All">All categories</option>
              <option value="Start">Start</option>
              <option value="Manage">Manage</option>
              <option value="File & Comply">File & Comply</option>
              <option value="Close & Claim">Close & Claim</option>
            </select>
          </div>
        </div>
      )}

      {activeCategory === 'pages' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Section</label>
            <select
              value={filters.section || 'All'}
              onChange={e => update('section', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-nzPrimary focus:outline-none"
            >
              <option value="All">All sections</option>
              <option value="Services">Services</option>
              <option value="Information">Information</option>
              <option value="Help">Help</option>
            </select>
          </div>
        </div>
      )}

      {activeCategory === 'circulars' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">Type</label>
            <select
              value={filters.type || 'All'}
              onChange={e => update('type', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-nzPrimary focus:outline-none"
            >
              <option value="All">All types</option>
              <option value="Circular">Circular</option>
              <option value="Notification">Notification</option>
              <option value="Amendment">Amendment</option>
              <option value="Update">Update</option>
              <option value="Notice">Notice</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">From date</label>
            <input
              type="date"
              value={filters.dateFrom || ''}
              onChange={e => update('dateFrom', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-nzPrimary focus:outline-none"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-600 mb-1.5">To date</label>
            <input
              type="date"
              value={filters.dateTo || ''}
              onChange={e => update('dateTo', e.target.value)}
              className="w-full border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-nzPrimary focus:outline-none"
            />
          </div>
        </div>
      )}
    </div>
  )
}
