import { useState } from 'react'
import { Link } from 'react-router-dom'

const acts = [
  {
    name: 'Companies Act, 2013',
    year: 2013,
    description: 'Primary legislation governing the incorporation, management, and dissolution of companies in India.',
  },
  {
    name: 'Companies Act, 1956',
    year: 1956,
    description: 'Predecessor Act, applicable to companies incorporated before the Companies Act, 2013.',
  },
  {
    name: 'Limited Liability Partnership Act, 2008',
    year: 2008,
    description: 'Governs the formation and regulation of limited liability partnerships in India.',
  },
  {
    name: 'Insolvency and Bankruptcy Code, 2016',
    year: 2016,
    description: 'Consolidation of laws relating to reorganization and insolvency resolution of corporate persons.',
  },
  {
    name: 'Competition Act, 2002',
    year: 2002,
    description: 'Provides the framework for prevention of practices having adverse effect on competition.',
  },
  {
    name: 'Partnership Act, 1932',
    year: 1932,
    description: 'Defines and amends the law relating to partnerships in India.',
  },
  {
    name: 'Chartered Accountants Act, 1949',
    year: 1949,
    description: 'An Act to make provision for the regulation of the profession of chartered accountants.',
  },
  {
    name: 'Cost Accountants Act, 1959',
    year: 1959,
    description: 'An Act to regulate the profession of cost and management accountants.',
  },
  {
    name: 'Company Secretaries Act, 1980',
    year: 1980,
    description: 'An Act to provide for the regulation of the profession of company secretaries.',
  },
  {
    name: 'Societies Registration Act, 1860',
    year: 1860,
    description: 'An Act for the registration of literary, scientific, and charitable societies.',
  },
]

const rules = [
  {
    name: 'Companies (Incorporation) Rules, 2014',
    description: 'Rules relating to incorporation of companies, name approval, and registered office.',
  },
  {
    name: 'Companies (Prospectus and Allotment of Securities) Rules, 2014',
    description: 'Rules governing issuance of prospectus and allotment of securities by companies.',
  },
  {
    name: 'Companies (Accounts) Rules, 2014',
    description: 'Rules relating to preparation and maintenance of books of accounts by companies.',
  },
  {
    name: 'Companies (Auditor Report) Order, 2015',
    description: 'Order issued by the Central Government prescribing matters to be included in auditor reports.',
  },
  {
    name: 'Companies (Registration of Charges) Rules, 2014',
    description: 'Rules relating to registration of charges, modification, and satisfaction of charges.',
  },
  {
    name: 'Companies (Removal of Names of Companies) Rules, 2016',
    description: 'Rules governing removal of names of companies from the Registrar of Companies.',
  },
  {
    name: 'Companies (Adjudication of Penalties) Rules, 2014',
    description: 'Rules relating to adjudication of penalties for contravention of provisions of the Act.',
  },
  {
    name: 'Companies (Registration Offices and Fees) Rules, 2014',
    description: 'Rules governing registration offices, fees for filings, and procedural requirements.',
  },
]

const circulars = [
  {
    date: '08/07/2026',
    title: 'General Circular No.03/2026 - Extension of CCFS-2026 up to 31st Aug 2026',
    type: 'Circular',
  },
  {
    date: '19/06/2026',
    title: 'General Circular No.02/2026 - Relaxation for DPT-3 FY ended 31 Mar 2026 up to 31 Jul',
    type: 'Circular',
  },
  {
    date: '16/06/2026',
    title: 'S.O. 3140(E) - Notification w.r.t. New Development Bank',
    type: 'Notification',
  },
  {
    date: '24/02/2026',
    title: 'General Circular No.01/2026 - CCFS-2026',
    type: 'Circular',
  },
  {
    date: '30/12/2025',
    title: 'General Circular No.08/2025 - Relaxation for Financial Statements',
    type: 'Circular',
  },
  {
    date: '15/12/2025',
    title: 'General Circular No.07/2025 - Clarification on applicability of Section 135',
    type: 'Circular',
  },
  {
    date: '01/11/2025',
    title: 'General Circular No.06/2025 - Further relaxation for DIR-3 KYC',
    type: 'Circular',
  },
  {
    date: '15/09/2025',
    title: 'General Circular No.05/2025 - Extension for holding of AGM',
    type: 'Circular',
  },
]

const tabs = ['Acts', 'Rules', 'Circulars']

export default function ActsRules() {
  const [activeTab, setActiveTab] = useState('Acts')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredCirculars = circulars.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.date.includes(searchQuery)
  )

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <ol className="flex items-center gap-2 text-sm text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#0B2C5C] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li aria-current="page" className="text-slate-800 font-medium">
              Acts & Rules
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          Acts, Rules & Regulations
        </h1>

        {/* Intro text */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-6">
          <p className="text-sm text-slate-600 leading-relaxed">
            The Ministry of Corporate Affairs administers the Companies Act 2013, the Limited Liability
            Partnership Act 2008, the Insolvency and Bankruptcy Code 2016, and other allied Acts, rules
            and regulations framed for regulating the corporate sector in accordance with law.
          </p>
        </div>

        {/* Tab navigation */}
        <div className="flex border-b border-slate-200 mb-6" role="tablist" aria-label="Acts and Rules sections">
          {tabs.map((tab) => (
            <button
              key={tab}
              role="tab"
              aria-selected={activeTab === tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors -mb-px ${
                activeTab === tab
                  ? 'text-[#0B2C5C] border-[#0B2C5C]'
                  : 'text-slate-500 border-transparent hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Acts tab */}
        {activeTab === 'Acts' && (
          <section role="tabpanel" aria-label="Acts">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-bold text-[#0B2C5C]">
                  List of Acts ({acts.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-200">
                {acts.map((act) => (
                  <article key={act.name} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-[#0B2C5C]">{act.name}</h3>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{act.description}</p>
                      </div>
                      <span className="text-xs text-slate-400 whitespace-nowrap mt-0.5">
                        {act.year}
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Rules tab */}
        {activeTab === 'Rules' && (
          <section role="tabpanel" aria-label="Rules">
            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50">
                <h2 className="font-bold text-[#0B2C5C]">
                  List of Rules ({rules.length})
                </h2>
              </div>
              <div className="divide-y divide-slate-200">
                {rules.map((rule) => (
                  <article key={rule.name} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                    <h3 className="text-sm font-semibold text-[#0B2C5C]">{rule.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 leading-relaxed">{rule.description}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Circulars tab */}
        {activeTab === 'Circulars' && (
          <section role="tabpanel" aria-label="Circulars">
            {/* Search */}
            <div className="mb-4">
              <label htmlFor="circular-search" className="sr-only">
                Search circulars
              </label>
              <div className="relative max-w-md">
                <input
                  id="circular-search"
                  type="search"
                  placeholder="Search circulars..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B] focus:border-[#0E7C7B] pr-10"
                />
                <i className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs" aria-hidden="true"></i>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
                <h2 className="font-bold text-[#0B2C5C]">
                  Circulars & Notifications
                </h2>
                <span className="text-xs text-slate-500">
                  {filteredCirculars.length} results
                </span>
              </div>
              {filteredCirculars.length === 0 ? (
                <div className="px-6 py-12 text-center">
                  <p className="text-sm text-slate-500">No circulars match your search.</p>
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mt-2 text-sm text-[#0E7C7B] hover:underline"
                  >
                    Clear search
                  </button>
                </div>
              ) : (
                <div className="divide-y divide-slate-200">
                  {filteredCirculars.map((c, i) => (
                    <article key={i} className="px-6 py-4 hover:bg-slate-50 transition-colors">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#0B2C5C] text-white rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                          <i className="fa-regular fa-file-pdf text-xs" aria-hidden="true"></i>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-[#0B2C5C] leading-snug">
                            {c.title}
                          </h3>
                          <div className="flex items-center gap-3 mt-1.5">
                            <span className="text-xs text-slate-400">{c.date}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                              {c.type}
                            </span>
                          </div>
                        </div>
                        <button
                          className="text-[#0E7C7B] hover:text-[#0B2C5C] transition-colors flex-shrink-0"
                          aria-label={`Download ${c.title}`}
                        >
                          <i className="fa-solid fa-download text-sm" aria-hidden="true"></i>
                        </button>
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}
      </main>
    </div>
  )
}
