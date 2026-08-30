import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import { companies, directors, charges } from '../data/mockData'

/* ─── Static help topics ─── */
const helpTopics = [
  { title: 'How to register a new company', category: 'Getting Started', icon: 'fa-plus-circle', desc: 'Step-by-step guide to incorporate using SPICe+ (INC-32)' },
  { title: 'File your annual return (MGT-7)', category: 'Filing Guides', icon: 'fa-file-alt', desc: 'How to prepare and file MGT-7 before the AGM deadline' },
  { title: 'Director KYC — DIR-3 KYC deadlines', category: 'Compliance', icon: 'fa-user-check', desc: 'Triennial KYC due 30 Jun every 3 years — avoid ₹5,000 penalty' },
  { title: 'Understanding CIN numbers', category: 'FAQs', icon: 'fa-question-circle', desc: 'What a CIN is, how to read it, and where to find it' },
  { title: 'How to search company filings', category: 'FAQs', icon: 'fa-search', desc: 'Free public access to company documents — no payment required' },
  { title: 'Start an LLP (FiLLiP)', category: 'Getting Started', icon: 'fa-handshake', desc: 'Limited Liability Partnership incorporation in 6 steps' },
  { title: 'CCFS-2026 compliance scheme', category: 'Circulars', icon: 'fa-bullhorn', desc: 'Companies Compliance Facilitation Scheme — reduced penalties until Jul 2026' },
  { title: 'Check director disqualification', category: 'FAQs', icon: 'fa-ban', desc: 'Section 164(2) disqualifications and how to check DIN status' },
]

const MAX_RESULTS = 15

export default function Search() {
  const [params, setParams] = useSearchParams()
  const q = params.get('q') || ''
  const type = params.get('type') || 'company'

  const [sort, setSort] = useState('relevance')
  const [companyStatus, setCompanyStatus] = useState('All')
  const [directorStatus, setDirectorStatus] = useState('All')
  const [showAll, setShowAll] = useState(false)

  /* ── Search handler for SearchBar ── */
  const handleSearch = (query, searchType) => {
    setParams({ q: query, type: searchType })
    setShowAll(false)
    setCompanyStatus('All')
    setDirectorStatus('All')
    setSort('relevance')
  }

  /* ── Filtered & sorted companies ── */
  const filteredCompanies = useMemo(() => {
    let list = companies
    if (q) {
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q.toLowerCase()) ||
          c.cin.toLowerCase().includes(q.toLowerCase())
      )
    }
    if (companyStatus !== 'All') {
      list = list.filter((c) => c.status === companyStatus)
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'status') {
      list = [...list].sort((a, b) => a.status.localeCompare(b.status))
    }
    return list
  }, [q, companyStatus, sort])

  /* ── Filtered & sorted directors ── */
  const filteredDirectors = useMemo(() => {
    let list = directors
    if (q) {
      list = list.filter(
        (d) =>
          d.name.toLowerCase().includes(q.toLowerCase()) ||
          d.din.includes(q)
      )
    }
    if (directorStatus !== 'All') {
      const s = directorStatus === 'Deactivated' ? 'Deactivated' : 'Approved'
      list = list.filter((d) => d.status.includes(s))
    }
    if (sort === 'name') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [q, directorStatus, sort])

  /* ── Filtered charges ── */
  const filteredCharges = useMemo(() => {
    let list = charges
    if (q) {
      list = list.filter(
        (ch) =>
          ch.holder.toLowerCase().includes(q.toLowerCase()) ||
          ch.cin.toLowerCase().includes(q.toLowerCase()) ||
          ch.id.toLowerCase().includes(q.toLowerCase())
      )
    }
    return list
  }, [q])

  /* ── Filtered help topics ── */
  const filteredHelp = useMemo(() => {
    if (!q) return helpTopics
    return helpTopics.filter(
      (h) =>
        h.title.toLowerCase().includes(q.toLowerCase()) ||
        h.category.toLowerCase().includes(q.toLowerCase()) ||
        h.desc.toLowerCase().includes(q.toLowerCase())
    )
  }, [q])

  /* ── Status badge component ── */
  const StatusBadge = ({ status }) => {
    let cls = 'bg-slate-100 text-slate-600 border-slate-200'
    if (
      status === 'Active' ||
      status === 'Active Compliant' ||
      status === 'Approved' ||
      status === 'Open'
    ) {
      cls = 'bg-green-50 text-green-700 border-green-200'
    } else if (status === 'Strike Off' || status.includes('Deactivated')) {
      cls = 'bg-red-50 text-red-700 border-red-200'
    } else if (
      status === 'Under Liquidation' ||
      status === 'Active Non-Compliant' ||
      status === 'Satisfied'
    ) {
      cls = 'bg-amber-50 text-amber-700 border-amber-200'
    }
    return (
      <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-semibold border ${cls}`}>
        {status}
      </span>
    )
  }

  /* ── Total results count ── */
  const resultCount =
    type === 'company'
      ? filteredCompanies.length
      : type === 'director'
        ? filteredDirectors.length
        : type === 'charge'
          ? filteredCharges.length
          : filteredHelp.length

  /* ── Visible companies (max 15 or all) ── */
  const visibleCompanies = showAll
    ? filteredCompanies
    : filteredCompanies.slice(0, MAX_RESULTS)

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
                <option value="relevance">Relevance</option>
                <option value="name">Name A–Z</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        )}

        {/* ───────────── COMPANY RESULTS ───────────── */}
        {type === 'company' && (
          <>
            {/* Status filter chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['All', 'Active', 'Strike Off', 'Under Liquidation'].map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setCompanyStatus(s)
                    setShowAll(false)
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 ${
                    companyStatus === s
                      ? 'bg-[#0B2C5C] text-white border-[#0B2C5C]'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-[#0B2C5C] hover:text-[#0B2C5C]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {filteredCompanies.length === 0 ? (
              <EmptyState query={q} />
            ) : (
              <>
                {/* ── Desktop table ── */}
                <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm" role="table">
                    <thead className="bg-[#0B2C5C] text-white text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 text-left">Company Name + CIN</th>
                        <th className="px-4 py-3 text-left">ROC</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-right">Paid-Up Capital</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleCompanies.map((c, i) => (
                        <tr
                          key={c.cin}
                          className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${
                            i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="px-4 py-3">
                            <div className="font-medium text-[#0B2C5C]">{c.name}</div>
                            <div className="text-xs text-slate-400 font-mono mt-0.5">
                              {c.cin}
                            </div>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">{c.roc}</td>
                          <td className="px-4 py-3 text-center">
                            <StatusBadge status={c.status} />
                          </td>
                          <td className="px-4 py-3 text-right text-xs text-slate-700 font-medium">
                            {c.paidUpCap}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Link
                              to={`/search/company/${c.cin}`}
                              className="text-[#0E7C7B] font-semibold text-xs hover:underline focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 rounded"
                            >
                              View details →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile cards ── */}
                <div className="md:hidden space-y-3">
                  {visibleCompanies.map((c) => (
                    <div
                      key={c.cin}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#0B2C5C] text-sm leading-snug">
                            {c.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{c.cin}</p>
                        </div>
                        <StatusBadge status={c.status} />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <span className="text-slate-500">ROC</span>
                        <span className="text-slate-700 text-right">{c.roc}</span>
                        <span className="text-slate-500">Paid-Up Capital</span>
                        <span className="text-slate-700 text-right font-medium">
                          {c.paidUpCap}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <Link
                          to={`/search/company/${c.cin}`}
                          className="text-[#0E7C7B] font-semibold text-xs hover:underline"
                        >
                          View details →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>

                {/* ── Show more button ── */}
                {!showAll && filteredCompanies.length > MAX_RESULTS && (
                  <div className="text-center mt-5">
                    <button
                      onClick={() => setShowAll(true)}
                      className="px-6 py-2.5 bg-white border border-[#0B2C5C] text-[#0B2C5C] text-sm font-semibold rounded-lg hover:bg-[#0B2C5C] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
                    >
                      Show more ({filteredCompanies.length - MAX_RESULTS} remaining)
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}

        {/* ───────────── DIRECTOR RESULTS ───────────── */}
        {type === 'director' && (
          <>
            {/* Director status filter chips */}
            <div className="flex flex-wrap gap-2 mb-5">
              {['All', 'Approved', 'Deactivated'].map((s) => (
                <button
                  key={s}
                  onClick={() => setDirectorStatus(s)}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 ${
                    directorStatus === s
                      ? 'bg-[#0B2C5C] text-white border-[#0B2C5C]'
                      : 'bg-white text-slate-600 border-slate-300 hover:border-[#0B2C5C] hover:text-[#0B2C5C]'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            {filteredDirectors.length === 0 ? (
              <EmptyState query={q} />
            ) : (
              <>
                {/* ── Desktop table ── */}
                <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm" role="table">
                    <thead className="bg-[#0B2C5C] text-white text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 text-left">DIN</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-left">KYC Due</th>
                        <th className="px-4 py-3 text-left">Companies</th>
                        <th className="px-4 py-3 text-center">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredDirectors.map((d, i) => (
                        <tr
                          key={d.din}
                          className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${
                            i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-slate-700">{d.din}</td>
                          <td className="px-4 py-3 font-medium text-[#0B2C5C]">{d.name}</td>
                          <td className="px-4 py-3 text-center">
                            <StatusBadge
                              status={
                                d.status.includes('Deactivated')
                                  ? 'Deactivated'
                                  : d.status
                              }
                            />
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">{d.nextDue}</td>
                          <td className="px-4 py-3 text-xs text-slate-500 font-mono">
                            {d.companies.join(', ')}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <Link
                              to={`/search/director/${d.din}`}
                              className="text-[#0E7C7B] font-semibold text-xs hover:underline focus:outline-none focus:ring-2 focus:ring-mcaTeal/40 rounded"
                            >
                              View profile →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile cards ── */}
                <div className="md:hidden space-y-3">
                  {filteredDirectors.map((d) => (
                    <div
                      key={d.din}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[#0B2C5C] text-sm leading-snug">
                            {d.name}
                          </h3>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">DIN: {d.din}</p>
                        </div>
                        <StatusBadge
                          status={
                            d.status.includes('Deactivated') ? 'Deactivated' : d.status
                          }
                        />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <span className="text-slate-500">KYC Due</span>
                        <span className="text-slate-700 text-right">{d.nextDue}</span>
                        <span className="text-slate-500">Companies</span>
                        <span className="text-slate-700 text-right font-mono text-[11px]">
                          {d.companies.join(', ')}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        <Link
                          to={`/search/director/${d.din}`}
                          className="text-[#0E7C7B] font-semibold text-xs hover:underline"
                        >
                          View profile →
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ───────────── CHARGE RESULTS ───────────── */}
        {type === 'charge' && (
          <>
            {filteredCharges.length === 0 ? (
              <EmptyState query={q} />
            ) : (
              <>
                {/* ── Desktop table ── */}
                <div className="hidden md:block bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                  <table className="w-full text-sm" role="table">
                    <thead className="bg-[#0B2C5C] text-white text-xs uppercase tracking-wider">
                      <tr>
                        <th className="px-4 py-3 text-left">Charge ID</th>
                        <th className="px-4 py-3 text-left">Company CIN</th>
                        <th className="px-4 py-3 text-left">Holder</th>
                        <th className="px-4 py-3 text-right">Amount</th>
                        <th className="px-4 py-3 text-center">Status</th>
                        <th className="px-4 py-3 text-center">CERSAI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredCharges.map((ch, i) => (
                        <tr
                          key={ch.id}
                          className={`border-t border-slate-100 hover:bg-slate-50 transition-colors ${
                            i % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <td className="px-4 py-3 font-mono text-xs text-slate-700">
                            {ch.id}
                          </td>
                          <td className="px-4 py-3 font-mono text-xs text-slate-600">
                            {ch.cin}
                          </td>
                          <td className="px-4 py-3 text-slate-700">{ch.holder}</td>
                          <td className="px-4 py-3 text-right font-medium text-slate-700">
                            {ch.amount}
                          </td>
                          <td className="px-4 py-3 text-center">
                            <StatusBadge status={ch.status} />
                          </td>
                          <td className="px-4 py-3 text-center">
                            {ch.cersai ? (
                              <span
                                className="text-[#0E7C7B] font-semibold text-xs"
                                title={ch.cersai}
                              >
                                {ch.cersai}
                              </span>
                            ) : (
                              <span className="text-xs text-slate-400">—</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* ── Mobile cards ── */}
                <div className="md:hidden space-y-3">
                  {filteredCharges.map((ch) => (
                    <div
                      key={ch.id}
                      className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-medium text-slate-700 text-sm">{ch.holder}</h3>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">{ch.id}</p>
                        </div>
                        <StatusBadge status={ch.status} />
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                        <span className="text-slate-500">CIN</span>
                        <span className="text-slate-700 text-right font-mono">{ch.cin}</span>
                        <span className="text-slate-500">Amount</span>
                        <span className="text-slate-700 text-right font-medium">
                          {ch.amount}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-slate-100">
                        {ch.cersai ? (
                          <a
                            href="#"
                            className="text-[#0E7C7B] font-semibold text-xs hover:underline"
                          >
                            CERSAI →
                          </a>
                        ) : (
                          <span className="text-xs text-slate-400">No CERSAI record</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}

        {/* ───────────── HELP RESULTS ───────────── */}
        {type === 'help' && (
          <>
            {filteredHelp.length === 0 ? (
              <EmptyState query={q} />
            ) : (
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
                <div className="px-5 py-3 bg-[#F8FAFC] border-b border-slate-200">
                  <h2 className="text-sm font-semibold text-[#0B2C5C]">
                    Help &amp; Resources
                  </h2>
                </div>
                <div className="divide-y divide-slate-100">
                  {filteredHelp.map((topic) => (
                    <div
                      key={topic.title}
                      className="px-5 py-4 hover:bg-slate-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 w-8 h-8 rounded-full bg-[#0E7C7B]/10 flex items-center justify-center shrink-0">
                          <i
                            className={`fa-solid ${topic.icon} text-[#0E7C7B] text-xs`}
                            aria-hidden="true"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-sm font-semibold text-[#0B2C5C]">
                            {topic.title}
                          </h3>
                          <p className="text-xs text-slate-500 mt-0.5">{topic.desc}</p>
                          <span className="inline-block mt-1.5 text-[10px] font-semibold uppercase tracking-wider text-mcaTeal bg-mcaTeal/10 rounded px-2 py-0.5">
                            {topic.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

/* ─── Empty State (NZ-style) ─── */
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
        Check your spelling, try fewer keywords, or search by CIN/DIN number.
      </p>
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
        <Link
          to="/"
          className="px-5 py-2.5 bg-[#0B2C5C] text-white text-sm font-semibold rounded-lg hover:bg-[#0B2C5C]/90 transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
        >
          Back to Home
        </Link>
        <Link
          to="/search?type=company&q="
          className="px-5 py-2.5 border border-[#0B2C5C] text-[#0B2C5C] text-sm font-semibold rounded-lg hover:bg-[#0B2C5C] hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-mcaTeal/40"
        >
          Advanced Search
        </Link>
      </div>
    </div>
  )
}
