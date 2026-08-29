import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { companies } from '../data/mockData'

const TABS = [
  { key: 'summary', label: 'Company Summary' },
  { key: 'directors', label: 'Directors' },
  { key: 'charges', label: 'Charges' },
  { key: 'filing', label: 'Filing History' },
  { key: 'documents', label: 'Documents' },
]

const STATUS_COLOR = {
  Active: 'text-nzGreen',
  Registered: 'text-nzGreen',
  'Strike Off': 'text-nzRed',
  'Under Liquidation': 'text-[#FCD358]',
  'Under Process': 'text-nzPrimary',
  Inactive: 'text-nzMuted',
  Deactivated: 'text-nzRed',
  Dissolved: 'text-nzRed',
}

function DataRow({ label, value, link }) {
  return (
    <div className="flex border-b border-nzDivider last:border-b-0">
      <div className="w-[160px] shrink-0 py-3 px-4 text-[13px] font-medium text-nzDarkGrey uppercase tracking-wide">
        {label}
      </div>
      <div className="flex-1 py-3 px-4 text-sm text-nzBlack">
        {link ? (
          <Link to={link} className="text-appPrimary underline hover:text-nzPrimary transition-colors">
            {value}
          </Link>
        ) : (
          value || '—'
        )}
      </div>
    </div>
  )
}

export default function CompanyDetail() {
  const { cin } = useParams()
  const company = companies.find((c) => c.cin === cin)
  const [activeTab, setActiveTab] = useState('summary')
  const [expandedFiling, setExpandedFiling] = useState(null)

  if (!company) {
    return (
      <div className="bg-nzLightBg min-h-screen">
        <div className="max-w-[79rem] mx-auto px-8 py-12">
          <nav className="flex items-center gap-2 text-sm text-nzBody mb-8">
            <Link to="/" className="text-nzPrimary underline hover:text-nzDarkTeal">Home</Link>
            <span className="text-nzMuted">&rsaquo;</span>
            <Link to="/search" className="text-nzPrimary underline hover:text-nzDarkTeal">Search</Link>
            <span className="text-nzMuted">&rsaquo;</span>
            <span className="text-nzDarkGrey font-medium">Not Found</span>
          </nav>
          <div className="bg-white border border-nzDivider p-12 text-center">
            <h1 className="text-2xl font-light text-nzBlack mb-4">Company not found</h1>
            <p className="text-nzBody mb-6">
              We could not find a company with CIN <strong>{cin}</strong>.
            </p>
            <Link
              to="/search"
              className="inline-block bg-nzPrimary text-white px-6 py-3 font-semibold hover:bg-nzMediumTeal transition-colors"
              style={{ borderRadius: 0 }}
            >
              Search the register
            </Link>
          </div>
        </div>
      </div>
    )
  }

  const statusClass = STATUS_COLOR[company.status] || 'text-nzMuted'
  const openCharges = company.charges?.filter((ch) => ch.status === 'Open').length || 0
  const satisfiedCharges = company.charges?.filter((ch) => ch.status === 'Satisfied').length || 0

  const tabCount = {
    directors: company.directors?.length || 0,
    charges: company.charges?.length || 0,
    filing: company.filings?.length || 0,
    documents: company.filings?.length || 0,
  }

  return (
    <div className="bg-nzLightBg min-h-screen">
      {/* ── BREADCRUMB ── */}
      <div className="border-b border-nzDivider bg-white">
        <div className="max-w-[79rem] mx-auto px-8 py-3">
          <nav className="flex items-center gap-2 text-sm text-nzBody">
            <Link to="/" className="text-nzPrimary underline hover:text-nzDarkTeal">Home</Link>
            <span className="text-nzMuted">&rsaquo;</span>
            <Link to="/search" className="text-nzPrimary underline hover:text-nzDarkTeal">Search</Link>
            <span className="text-nzMuted">&rsaquo;</span>
            <span className="text-nzDarkGrey font-medium">{company.name}</span>
          </nav>
        </div>
      </div>

      {/* ── COMPANY HEADER BAR ── */}
      <div className="bg-nzMediumTeal text-white">
        <div className="max-w-[79rem] mx-auto px-8 py-6">
          <Link
            to="/search"
            className="inline-block text-[11px] uppercase tracking-widest font-semibold text-white border border-white px-4 py-2 hover:bg-white/10 transition-colors mb-4"
            style={{ borderRadius: 0 }}
          >
            Back to Search Results
          </Link>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="text-xl text-appPrimary underline font-normal mb-1">
                <Link to={`/search/company/${company.cin}`} className="hover:text-white transition-colors">
                  {company.name}
                </Link>
              </h1>
              <p className="text-xl italic font-light text-white">{company.status}</p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to="/efiling/MGT-7"
                className="bg-nzPrimary text-white px-5 py-2.5 text-sm font-semibold hover:bg-[#005f8a] transition-colors"
                style={{ borderRadius: 0 }}
              >
                File Annual Return
              </Link>
              <Link
                to="/services/view-docs"
                className="border border-white text-white px-5 py-2.5 text-sm font-semibold hover:bg-white/10 transition-colors"
                style={{ borderRadius: 0 }}
              >
                View Documents
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── TAB BAR ── */}
      <div className="bg-appDarkBg sticky top-0 z-30">
        <div className="max-w-[79rem] mx-auto px-8">
          <nav className="flex overflow-x-auto" role="tablist">
            {TABS.map((tab) => {
              const count = tabCount[tab.key]
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-5 py-3.5 text-[13px] font-medium whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? 'text-white border-nzCyan'
                      : 'text-white/60 border-transparent hover:text-white/80 hover:border-white/30'
                  }`}
                >
                  {tab.label}
                  {count !== undefined && (
                    <span className="ml-1.5 text-[11px] opacity-70">({count})</span>
                  )}
                </button>
              )
            })}
          </nav>
        </div>
      </div>

      {/* ── TAB CONTENT ── */}
      <div className="max-w-[79rem] mx-auto px-8 py-8">
        {/* ── Company Summary ── */}
        {activeTab === 'summary' && (
          <div className="bg-white border border-nzDivider">
            <div className="border-b border-nzDivider px-6 py-4">
              <h2 className="text-lg font-light text-nzBlack">Company Summary</h2>
            </div>
            <DataRow label="Company Number" value={company.cin} />
            <DataRow
              label="Company Name"
              value={company.name}
              link={`/search/company/${company.cin}`}
            />
            <DataRow label="NZBN / LLPIN" value={company.nzbn || company.cin} />
            <DataRow label="Incorporation Date" value={company.incorporationDate} />
            <DataRow label="Entity Type" value={company.entityType} />
            <DataRow
              label="Entity Status"
              value={<span className={statusClass}>{company.status}</span>}
            />
            <DataRow label="Class of Company" value={company.classOfCompany || '—'} />
            <DataRow label="ROC" value={company.roc} />
            <DataRow label="Category" value={company.category} />
            <DataRow label="Authorized Capital" value={company.authorizedCapital} />
            <DataRow label="Paid-up Capital" value={company.paidUpCapital} />
            <DataRow label="Registered Address" value={company.registeredAddress} />
            <DataRow label="Email" value={company.email} />
            <DataRow label="Listed Status" value={company.listedStatus} />
            {company.previousNames?.length > 0 && (
              <div className="px-6 py-4 border-t border-nzDivider">
                <h3 className="text-sm font-semibold text-nzDarkGrey mb-2">Previous Names</h3>
                {company.previousNames.map((pn, i) => (
                  <div key={i} className="text-sm text-nzBody">
                    {pn.name} — effective {pn.date}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ── Directors ── */}
        {activeTab === 'directors' && (
          <div className="bg-white border border-nzDivider">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#362B36] text-white text-[13px]">
                    <th className="text-left px-6 py-3 font-semibold">DIN / Name</th>
                    <th className="text-left px-6 py-3 font-semibold">Designation</th>
                    <th className="text-left px-6 py-3 font-semibold">Appointment Date</th>
                    <th className="text-left px-6 py-3 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {company.directors?.map((dir, i) => (
                    <tr
                      key={dir.din || i}
                      className={`border-b border-nzDivider ${i % 2 === 1 ? 'bg-[#F4F4F4]' : 'bg-white'}`}
                    >
                      <td className="px-6 py-3">
                        <Link
                          to={`/search/director/${dir.din}`}
                          className="text-appPrimary underline hover:text-nzPrimary font-medium"
                        >
                          {dir.name}
                        </Link>
                        <div className="text-[11px] text-nzMuted mt-0.5">DIN: {dir.din}</div>
                      </td>
                      <td className="px-6 py-3 text-nzBody">{dir.designation}</td>
                      <td className="px-6 py-3 text-nzBody">{dir.appointmentDate}</td>
                      <td className="px-6 py-3">
                        <span className={STATUS_COLOR[dir.status] || 'text-nzMuted'}>
                          {dir.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(!company.directors || company.directors.length === 0) && (
              <div className="px-6 py-12 text-center text-nzMuted">
                No director information available.
              </div>
            )}
          </div>
        )}

        {/* ── Charges ── */}
        {activeTab === 'charges' && (
          <div>
            {/* Summary bar */}
            <div className="bg-white border border-nzDivider mb-6 px-6 py-4 flex flex-wrap gap-6">
              <div>
                <span className="text-[13px] text-nzMuted uppercase tracking-wide">Total Charges</span>
                <span className="ml-2 text-lg font-semibold text-nzBlack">{company.charges?.length || 0}</span>
              </div>
              <div>
                <span className="text-[13px] text-nzMuted uppercase tracking-wide">Open</span>
                <span className="ml-2 text-lg font-semibold text-nzPrimary">{openCharges}</span>
              </div>
              <div>
                <span className="text-[13px] text-nzMuted uppercase tracking-wide">Satisfied</span>
                <span className="ml-2 text-lg font-semibold text-nzGreen">{satisfiedCharges}</span>
              </div>
              <div className="ml-auto flex gap-3">
                <Link
                  to="/efiling/CHG-1"
                  className="bg-nzPrimary text-white px-4 py-2 text-sm font-semibold hover:bg-[#005f8a] transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  Create Charge
                </Link>
                <Link
                  to="/efiling/CHG-4"
                  className="border border-nzDivider text-nzBody px-4 py-2 text-sm font-semibold hover:bg-nzLightBg transition-colors"
                  style={{ borderRadius: 0 }}
                >
                  Satisfy Charge
                </Link>
              </div>
            </div>

            {/* Charges table */}
            <div className="bg-white border border-nzDivider">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-[#362B36] text-white text-[13px]">
                      <th className="text-left px-6 py-3 font-semibold">Charge ID</th>
                      <th className="text-left px-6 py-3 font-semibold">Holder</th>
                      <th className="text-left px-6 py-3 font-semibold">Amount</th>
                      <th className="text-left px-6 py-3 font-semibold">Created</th>
                      <th className="text-left px-6 py-3 font-semibold">Status</th>
                      <th className="text-left px-6 py-3 font-semibold">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {company.charges?.map((ch, i) => (
                      <tr
                        key={ch.id || i}
                        className={`border-b border-nzDivider ${i % 2 === 1 ? 'bg-[#F4F4F4]' : 'bg-white'}`}
                      >
                        <td className="px-6 py-3 text-appPrimary font-medium">{ch.id}</td>
                        <td className="px-6 py-3 text-nzBody">{ch.holder}</td>
                        <td className="px-6 py-3 text-nzBlack font-medium">{ch.amount}</td>
                        <td className="px-6 py-3 text-nzBody">{ch.createdDate}</td>
                        <td className="px-6 py-3">
                          <span className={STATUS_COLOR[ch.status] || 'text-nzMuted'}>
                            {ch.status}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <Link to="/efiling/CHG-4" className="text-nzPrimary underline text-xs hover:text-nzDarkTeal">
                            Satisfy
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {(!company.charges || company.charges.length === 0) && (
                <div className="px-6 py-12 text-center text-nzMuted">
                  No charges registered for this company.
                </div>
              )}
            </div>

            <div className="mt-4">
              <a
                href="https://www.cersai.org.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-nzPrimary underline text-sm hover:text-nzDarkTeal"
              >
                View on CERSAI (External link) &rarr;
              </a>
            </div>
          </div>
        )}

        {/* ── Filing History ── */}
        {activeTab === 'filing' && (
          <div>
            <div className="bg-white border border-nzDivider mb-6 px-6 py-4">
              <p className="text-sm text-nzBody">
                <i className="fa-solid fa-circle-info text-nzPrimary mr-2" />
                All filing history is free to access.
              </p>
            </div>

            <div className="bg-white border border-nzDivider">
              {company.filings?.map((filing, i) => (
                <div key={filing.srn || i} className="border-b border-nzDivider last:border-b-0">
                  <button
                    onClick={() => setExpandedFiling(expandedFiling === i ? null : i)}
                    className="w-full flex items-center justify-between px-6 py-4 hover:bg-nzLightBg/50 transition-colors text-left"
                  >
                    <div className="flex items-center gap-6 flex-wrap">
                      <span className="text-sm font-mono text-nzBlack">{filing.srn}</span>
                      <span className="text-sm font-semibold text-nzBlack">{filing.form}</span>
                      <span className="text-sm text-nzBody">{filing.filedDate}</span>
                      <span className="text-sm text-nzBody">{filing.fee}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-sm font-medium ${STATUS_COLOR[filing.status] || 'text-nzMuted'}`}>
                        {filing.status}
                      </span>
                      <svg
                        className={`w-4 h-4 text-nzMuted transition-transform ${expandedFiling === i ? 'rotate-180' : ''}`}
                        fill="none" stroke="currentColor" viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {expandedFiling === i && filing.timeline && (
                    <div className="bg-nzLightBg/50 px-6 py-4 border-t border-nzDivider">
                      <h4 className="text-xs font-semibold text-nzDarkGrey uppercase tracking-wide mb-3">Filing Timeline</h4>
                      <div className="space-y-2">
                        {filing.timeline.map((step, j) => (
                          <div key={j} className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${step.completed ? 'bg-nzGreen' : 'bg-nzMuted/30 border border-nzMuted'}`} />
                            <span className={`text-sm ${step.completed ? 'text-nzBlack' : 'text-nzMuted'}`}>
                              {step.label}
                            </span>
                            <span className="text-xs text-nzMuted ml-auto">{step.date}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {(!company.filings || company.filings.length === 0) && (
              <div className="bg-white border border-nzDivider px-6 py-12 text-center text-nzMuted">
                No filing history available.
              </div>
            )}
          </div>
        )}

        {/* ── Documents ── */}
        {activeTab === 'documents' && (
          <div className="bg-white border border-nzDivider">
            <div className="px-6 py-4 border-b border-nzDivider">
              <h2 className="text-lg font-light text-nzBlack">Public Documents</h2>
              <p className="text-sm text-nzMuted mt-1">
                All public documents are available for free viewing and download.
              </p>
            </div>

            {company.filings?.map((filing, i) => (
              <div
                key={filing.srn || i}
                className={`flex items-center justify-between px-6 py-3 border-b border-nzDivider last:border-b-0 ${i % 2 === 1 ? 'bg-[#F4F4F4]' : 'bg-white'}`}
              >
                <div>
                  <span className="text-sm font-semibold text-nzBlack">{filing.form}</span>
                  <span className="text-sm text-nzMuted ml-3">Filed: {filing.filedDate}</span>
                </div>
                <Link
                  to={`/services/view-docs`}
                  className="text-nzPrimary underline text-sm hover:text-nzDarkTeal font-medium"
                >
                  View Document
                </Link>
              </div>
            ))}

            {(!company.filings || company.filings.length === 0) && (
              <div className="px-6 py-12 text-center text-nzMuted">
                No documents available.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
