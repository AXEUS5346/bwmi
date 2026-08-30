import { useState, useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

/* ── FAQ data ──────────────────────────────────────────────────────────── */
const faqs = [
  {
    category: 'Getting Started',
    q: 'What is V3 vs V2?',
    a: 'V2 was PDF download → upload with batch validation after 30 fields. V3 is web-based, pre-fill from CIN, real-time field validation, Save Draft for 15 days, Email login + OTP. V2 was discontinued on 18 Jun 2025.',
  },
  {
    category: 'Director Services',
    q: 'What is the DIR-3 KYC due date?',
    a: 'Triennial from 31 Mar 2026: File DIR-3 KYC-Web once every 3 FY by 30 Jun. FY2024-25 complied → next due 30 Jun 2028. Mobile/email change within 30 days does NOT reset the clock. Fee on-time ₹0, late ₹5,000.',
  },
  {
    category: 'Technical Help',
    q: 'I get a "DSC not associated" error. What do I do?',
    a: 'DSC must be Associated with a role (Director / Professional / Manager / Nodal) before filing. Only 1 DSC per User ID is allowed. Use FO Services → Associate DSC → emSigner 2.1 (V3). Ensure browser pop-up is enabled.',
  },
  {
    category: 'Fees & Payments',
    q: 'Is Pay Later available for V3 forms?',
    a: 'V3 Miscellaneous fee service is only for IEPFA (not Bharat Kosh). Offline Pay Later is stopped for V3 forms — use Net Banking / Card / UPI / Wallet. Track Payment Status after 10 min.',
  },
  {
    category: 'Annual Filing',
    q: 'How do I handle resubmission remarks?',
    a: 'Go to My Application → View Remarks against SRN marked RSUB → read the BO comment, then resubmit within 15 days.',
  },
  {
    category: 'Charges & Securities',
    q: 'How do I file a charge creation form (CHG-1)?',
    a: 'Log in to V3 portal → Online Filing → Charges → CHG-1. Ensure the company CIN is valid, charges are registered with CERSAI, and the debenture holder details are complete. Filing fee is ₹500.',
  },
  {
    category: 'Company Changes',
    q: 'How do I change the registered office address?',
    a: 'For short-distance changes within the same city: File INC-22 (fee ₹1,000). For inter-state or ROC changes: File INC-23 with Regional Director approval. Board resolution + special resolution required.',
  },
  {
    category: 'Closure & Exit',
    q: 'What is the process for voluntary strike-off?',
    a: 'File Form STK-2 with ₹10,000 fee. Company must have no assets/liabilities, no outstanding filings. Board + special resolution required. Publication in newspapers (English + vernacular) for 30 days before filing.',
  },
  {
    category: 'Legal & Compliance',
    q: 'Where can I find the latest MCA circulars?',
    a: 'Visit MCA Home → News & Notices → Circulars, Notifications & Orders. Circulars are searchable by date, company type, and form number. All circulars from 2013 onwards are available.',
  },
  {
    category: 'Getting Started',
    q: 'How do I register on the MCA V3 portal?',
    a: 'Visit mca.gov.in → Register → Choose Individual/Director or Professional → Enter email, mobile, PAN → Verify OTP → Set password → Associate DSC. Registration is free.',
  },
]

/* ── Category definitions ──────────────────────────────────────────────── */
const categories = [
  {
    title: 'Getting Started',
    icon: 'fa-rocket',
    desc: 'Account setup, first filing, understanding CIN',
    color: 'bg-blue-50 text-blue-600 border-blue-200',
    iconBg: 'bg-blue-100',
  },
  {
    title: 'Annual Filing',
    icon: 'fa-calendar',
    desc: 'AOC-4, MGT-7, deadlines, penalties',
    color: 'bg-emerald-50 text-emerald-600 border-emerald-200',
    iconBg: 'bg-emerald-100',
  },
  {
    title: 'Director Services',
    icon: 'fa-user',
    desc: 'DIN, KYC, appointment, resignation',
    color: 'bg-violet-50 text-violet-600 border-violet-200',
    iconBg: 'bg-violet-100',
  },
  {
    title: 'Charges & Securities',
    icon: 'fa-building-columns',
    desc: 'CHG forms, CERSAI',
    color: 'bg-amber-50 text-amber-600 border-amber-200',
    iconBg: 'bg-amber-100',
  },
  {
    title: 'Company Changes',
    icon: 'fa-pen',
    desc: 'Name change, address, capital, conversion',
    color: 'bg-pink-50 text-pink-600 border-pink-200',
    iconBg: 'bg-pink-100',
  },
  {
    title: 'Closure & Exit',
    icon: 'fa-door-open',
    desc: 'Strike-off, liquidation, IEPF',
    color: 'bg-red-50 text-red-600 border-red-200',
    iconBg: 'bg-red-100',
  },
  {
    title: 'Fees & Payments',
    icon: 'fa-credit-card',
    desc: 'Fee calculator, payment methods, refunds',
    color: 'bg-teal-50 text-teal-600 border-teal-200',
    iconBg: 'bg-teal-100',
  },
  {
    title: 'Technical Help',
    icon: 'fa-laptop',
    desc: 'DSC setup, browser requirements, common errors',
    color: 'bg-slate-50 text-slate-600 border-slate-200',
    iconBg: 'bg-slate-100',
  },
  {
    title: 'Legal & Compliance',
    icon: 'fa-scale-balanced',
    desc: 'Acts, rules, circulars, penalties',
    color: 'bg-indigo-50 text-indigo-600 border-indigo-200',
    iconBg: 'bg-indigo-100',
  },
]

/* ── Component ─────────────────────────────────────────────────────────── */
export default function Help() {
  const { id } = useParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedFaq, setExpandedFaq] = useState(null)
  const [activeCategory, setActiveCategory] = useState(null)

  /* filter FAQs in real-time */
  const filteredFaqs = useMemo(() => {
    const query = searchQuery.toLowerCase().trim()
    let list = faqs

    if (activeCategory) {
      list = list.filter((f) => f.category === activeCategory)
    }

    if (!query) return list
    return list.filter(
      (f) =>
        f.q.toLowerCase().includes(query) ||
        f.a.toLowerCase().includes(query) ||
        f.category.toLowerCase().includes(query),
    )
  }, [searchQuery, activeCategory])

  /* top 5 most relevant popular articles (pick representative ones) */
  const popularArticles = useMemo(() => {
    if (searchQuery) return filteredFaqs.slice(0, 5)
    const popular = [
      faqs.find((f) => f.q.includes('V3 vs V2')),
      faqs.find((f) => f.q.includes('DIR-3 KYC')),
      faqs.find((f) => f.q.includes('DSC not associated')),
      faqs.find((f) => f.q.includes('Pay Later')),
      faqs.find((f) => f.q.includes('resubmission')),
    ]
    return popular.filter(Boolean)
  }, [searchQuery, filteredFaqs])

  const toggleFaq = (idx) => setExpandedFaq(expandedFaq === idx ? null : idx)

  const handleCategoryClick = (title) => {
    setActiveCategory(activeCategory === title ? null : title)
    setSearchQuery('')
    setExpandedFaq(null)
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:border focus:border-[#0B2C5C] focus:rounded-lg focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      <main id="main-content" className="max-w-[1280px] mx-auto px-4 py-6">
        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex items-center gap-1.5 text-xs text-slate-500">
            <li>
              <Link to="/" className="hover:text-[#0E7C7B] transition-colors">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-slate-300">
              ›
            </li>
            <li className="font-medium text-[#0B2C5C]" aria-current="page">
              Help Centre
            </li>
          </ol>
        </nav>

        {/* ── Hero search ───────────────────────────────────────────── */}
        <section className="bg-[#0B2C5C] rounded-xl p-6 sm:p-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Help Centre
          </h1>
          <p className="text-sm text-slate-300 mb-6 max-w-xl mx-auto">
            Find answers to your questions about company registration, annual
            filings, director services, and more.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <label htmlFor="help-search" className="sr-only">
              Search help articles
            </label>
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              id="help-search"
              type="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setExpandedFaq(null)
                if (e.target.value) setActiveCategory(null)
              }}
              placeholder="Search help articles, forms, and guides"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm text-slate-800 bg-white border border-slate-200 shadow-lg focus:outline-none focus:ring-2 focus:ring-[#0E7C7B] focus:border-[#0E7C7B] transition-shadow"
              aria-label="Search help articles, forms, and guides"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setExpandedFaq(null)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
          </div>

          {(searchQuery || activeCategory) && (
            <p className="mt-3 text-xs text-slate-300">
              {filteredFaqs.length} result{filteredFaqs.length !== 1 ? 's' : ''}{' '}
              found
              {activeCategory && (
                <span>
                  {' '}
                  in{' '}
                  <span className="font-semibold text-white">
                    {activeCategory}
                  </span>
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="ml-1.5 underline hover:text-[#FF9933] transition-colors"
                  >
                    (clear filter)
                  </button>
                </span>
              )}
            </p>
          )}
        </section>

        {/* ── Category grid ─────────────────────────────────────────── */}
        <section className="mt-8" aria-label="Help categories">
          <h2 className="text-lg font-bold text-[#0B2C5C] mb-4">
            Browse by Topic
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((cat) => {
              const count = faqs.filter((f) => f.category === cat.title).length
              const isActive = activeCategory === cat.title
              return (
                <button
                  key={cat.title}
                  onClick={() => handleCategoryClick(cat.title)}
                  className={`group text-left border rounded-xl p-4 transition-all duration-150 ${
                    isActive
                      ? 'border-[#0B2C5C] bg-white shadow-md ring-1 ring-[#0B2C5C]/20'
                      : 'border-slate-200 bg-white hover:border-[#0B2C5C]/40 hover:shadow-sm'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center ${cat.iconBg}`}
                    >
                      <i
                        className={`fa-solid ${cat.icon} text-sm ${
                          cat.color.split(' ')[1]
                        }`}
                      />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-[#0B2C5C] group-hover:text-[#0E7C7B] transition-colors">
                          {cat.title}
                        </h3>
                        <span className="text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-1.5 py-0.5">
                          {count}
                        </span>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {cat.desc}
                      </p>
                    </div>
                    {isActive && (
                      <i className="fa-solid fa-check-circle text-[#138808] text-sm mt-0.5 flex-shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <div className="mt-8 grid lg:grid-cols-3 gap-6">
          {/* ── Left: Popular articles / search results ─────────────── */}
          <div className="lg:col-span-2">
            <section aria-label="Help articles">
              <h2 className="text-lg font-bold text-[#0B2C5C] mb-4">
                {searchQuery
                  ? 'Search Results'
                  : activeCategory
                  ? `${activeCategory}`
                  : 'Popular Articles'}
              </h2>

              {filteredFaqs.length === 0 ? (
                /* Empty state */
                <div className="bg-white border border-slate-200 rounded-xl p-8 text-center">
                  <i className="fa-solid fa-circle-question text-3xl text-slate-300 mb-3" />
                  <h3 className="text-sm font-semibold text-slate-600 mb-1">
                    We couldn't find any results
                  </h3>
                  <p className="text-xs text-slate-400 max-w-sm mx-auto">
                    Try different keywords or browse the categories above. If you
                    need more help, contact our helpdesk.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory(null)
                    }}
                    className="mt-4 text-xs font-medium text-[#0E7C7B] hover:underline"
                  >
                    View all articles
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  {filteredFaqs.map((faq, i) => {
                    const isOpen = expandedFaq === i
                    return (
                      <details
                        key={`${faq.q}-${i}`}
                        open={isOpen}
                        className="bg-white border border-slate-200 rounded-xl overflow-hidden group"
                      >
                        <summary
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFaq(i)
                          }}
                          className="px-4 py-3.5 cursor-pointer flex items-center justify-between gap-3 hover:bg-slate-50 transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <i
                              className={`fa-solid ${
                                isOpen
                                  ? 'fa-chevron-down'
                                  : 'fa-chevron-right'
                              } text-[10px] text-slate-400 flex-shrink-0 transition-transform`}
                            />
                            <span className="text-sm font-medium text-[#0B2C5C] leading-snug">
                              {faq.q}
                            </span>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-medium text-slate-400 bg-slate-100 rounded-full px-2 py-0.5 hidden sm:block">
                            {faq.category}
                          </span>
                        </summary>
                        <div className="px-4 pb-4 pl-11 text-sm text-slate-700 leading-relaxed border-t border-slate-100 bg-[#F8FAFC] pt-3">
                          {faq.a}
                          <div className="mt-3 flex items-center gap-3 text-xs">
                            <span className="text-slate-400">
                              Was this helpful?
                            </span>
                            <button className="text-[#138808] hover:underline font-medium">
                              <i className="fa-solid fa-thumbs-up mr-1" />
                              Yes
                            </button>
                            <button className="text-red-400 hover:underline font-medium">
                              <i className="fa-solid fa-thumbs-down mr-1" />
                              No
                            </button>
                          </div>
                        </div>
                      </details>
                    )
                  })}
                </div>
              )}
            </section>
          </div>

          {/* ── Right sidebar ───────────────────────────────────────── */}
          <div className="space-y-4">
            {/* Quick Guides */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="font-semibold text-[#0B2C5C] mb-3 flex items-center gap-2">
                <i className="fa-solid fa-book-open text-xs text-[#0E7C7B]" />
                Quick Guides
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'System Requirements for MCA Portal', icon: 'fa-desktop', to: '/help/faqs' },
                  { label: 'User Registration Flow', icon: 'fa-user-plus', to: '/help/faqs' },
                  { label: 'DSC Procurement & Registration', icon: 'fa-key', to: '/help/faqs' },
                  { label: 'Making a Payment on V3', icon: 'fa-indian-rupee-sign', to: '/help/faqs' },
                  { label: 'Understanding Your SRN Status', icon: 'fa-file-lines', to: '/help/faqs' },
                ].map((g) => (
                  <li key={g.label}>
                    <Link
                      to={g.to}
                      className="flex items-center gap-2 text-xs text-[#0E7C7B] hover:text-[#0B2C5C] transition-colors group"
                    >
                      <i
                        className={`fa-solid ${g.icon} text-[10px] text-slate-400 group-hover:text-[#0E7C7B]`}
                      />
                      {g.label}
                      <i className="fa-solid fa-arrow-right text-[8px] text-slate-300 group-hover:text-[#0E7C7B] ml-auto" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information Corner */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="font-semibold text-[#0B2C5C] mb-3 flex items-center gap-2">
                <i className="fa-solid fa-gavel text-xs text-[#0E7C7B]" />
                Information Corner
              </h3>
              <ul className="space-y-2">
                {[
                  { label: 'Acts & Rules (Companies 2013, LLP 2008, IBC)', to: '/help/acts' },
                  { label: 'Circulars, Notifications & Orders', to: '/help/circulars' },
                  { label: 'Reports, Parliament Q&A, Tenders', to: '/help/reports' },
                  { label: 'E-Consultation on Draft Rules', to: '/help/econsultation' },
                ].map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0E7C7B] transition-colors group"
                    >
                      <i className="fa-solid fa-chevron-right text-[8px] text-slate-300 group-hover:text-[#0E7C7B]" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-[#0B2C5C] text-white rounded-xl p-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <i className="fa-solid fa-headset text-sm text-[#FF9933]" />
                Contact Support
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-phone text-[#FF9933] mt-0.5" />
                  <div>
                    <p className="font-semibold">Helpdesk (Toll-Free)</p>
                    <p className="text-slate-300">1800-XXX-XXXX</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-envelope text-[#FF9933] mt-0.5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-slate-300">helpdesk@mca.gov.in</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-ticket text-[#FF9933] mt-0.5" />
                  <div>
                    <p className="font-semibold">Raise a Ticket</p>
                    <Link
                      to="/contact"
                      className="text-[#FF9933] hover:underline transition-colors"
                    >
                      Open support ticket →
                    </Link>
                  </div>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-[11px] font-medium rounded-lg px-3 py-1.5 transition-colors"
                >
                  <i className="fa-solid fa-comment-dots" />
                  Live Chat (Beta)
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 border border-white/20 hover:bg-white/10 text-white text-[11px] font-medium rounded-lg px-3 py-1.5 transition-colors"
                >
                  <i className="fa-solid fa-flag" />
                  Grievance
                </Link>
              </div>
            </div>

            {/* Video Demos */}
            <div className="bg-white border border-slate-200 rounded-xl p-4">
              <h3 className="font-semibold text-[#0B2C5C] mb-3 flex items-center gap-2">
                <i className="fa-solid fa-play-circle text-xs text-[#FF9933]" />
                Video Demos & Webinars
              </h3>
              <ul className="space-y-2">
                {[
                  'V3 Login & Registration Walkthrough',
                  '56 Forms — Full Presentation',
                  'DSC Setup in 5 Minutes',
                  'Webinar: 80 Slides, Searchable',
                ].map((v) => (
                  <li key={v}>
                    <a
                      href="#"
                      className="flex items-center gap-2 text-xs text-slate-600 hover:text-[#0E7C7B] transition-colors group"
                    >
                      <i className="fa-solid fa-play text-[8px] text-[#DC2626] group-hover:text-[#0E7C7B]" />
                      {v}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Last updated */}
            <p className="text-[11px] text-slate-400 text-center">
              Last updated: 29 Aug 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
