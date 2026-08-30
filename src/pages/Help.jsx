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
  { title: 'Getting Started', icon: 'fa-rocket', desc: 'Account setup, first filing, understanding CIN' },
  { title: 'Annual Filing', icon: 'fa-calendar', desc: 'AOC-4, MGT-7, deadlines, penalties' },
  { title: 'Director Services', icon: 'fa-user', desc: 'DIN, KYC, appointment, resignation' },
  { title: 'Charges & Securities', icon: 'fa-building-columns', desc: 'CHG forms, CERSAI' },
  { title: 'Company Changes', icon: 'fa-pen', desc: 'Name change, address, capital, conversion' },
  { title: 'Closure & Exit', icon: 'fa-door-open', desc: 'Strike-off, liquidation, IEPF' },
  { title: 'Fees & Payments', icon: 'fa-credit-card', desc: 'Fee calculator, payment methods, refunds' },
  { title: 'Technical Help', icon: 'fa-laptop', desc: 'DSC setup, browser requirements, common errors' },
  { title: 'Legal & Compliance', icon: 'fa-scale-balanced', desc: 'Acts, rules, circulars, penalties' },
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
    <div className="min-h-screen bg-nzLightBg">
      {/* Skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:border focus:border-nzPrimary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold"
      >
        Skip to main content
      </a>

      {/* ── Hero search ───────────────────────────────────────────── */}
      <section className="bg-nzDarkTeal py-14 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-[42px] font-[200] text-white mb-3 tracking-tight">
            Help Centre
          </h1>
          <p className="text-sm text-white/70 mb-8 max-w-xl mx-auto">
            Find answers to your questions about company registration, annual
            filings, director services, and more.
          </p>

          <div className="max-w-2xl mx-auto relative">
            <label htmlFor="help-search" className="sr-only">
              Search help articles
            </label>
            <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-nzMuted text-sm" />
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
              className="w-full pl-11 pr-10 py-3.5 text-sm text-nzBlack bg-white border border-nzDivider focus:outline-none focus:ring-2 focus:ring-nzPrimary transition-shadow"
              aria-label="Search help articles, forms, and guides"
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('')
                  setExpandedFaq(null)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-nzMuted hover:text-nzDarkGrey p-1"
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark text-sm" />
              </button>
            )}
          </div>

          {(searchQuery || activeCategory) && (
            <p className="mt-4 text-xs text-white/70">
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
                    className="ml-1.5 underline text-mcaSaffron hover:text-white transition-colors"
                  >
                    (clear filter)
                  </button>
                </span>
              )}
            </p>
          )}
        </div>
      </section>

      <main id="main-content" className="max-w-7xl mx-auto px-4 py-10">

        {/* ── Category grid ─────────────────────────────────────────── */}
        <section className="mb-10" aria-label="Help categories">
          <h2 className="text-[36px] font-[200] text-nzBlack tracking-tight mb-6">
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
                  className={`group text-left border-b-2 p-5 transition-colors ${
                    isActive
                      ? 'bg-nzPrimary text-white border-nzPrimary'
                      : 'bg-white border-nzDivider hover:border-nzPrimary'
                  }`}
                  aria-pressed={isActive}
                >
                  <div className="flex items-start gap-4">
                    <span
                      className={`flex-shrink-0 w-10 h-10 flex items-center justify-center ${
                        isActive ? 'bg-white/20 text-white' : 'bg-nzMediumTeal text-white'
                      }`}
                    >
                      <i className={`fa-solid ${cat.icon} text-sm`} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3
                          className={`text-sm font-semibold ${
                            isActive ? 'text-white' : 'text-nzDarkGrey group-hover:text-nzPrimary'
                          } transition-colors`}
                        >
                          {cat.title}
                        </h3>
                        <span
                          className={`text-[10px] font-medium px-2 py-0.5 ${
                            isActive
                              ? 'text-white/80 bg-white/15'
                              : 'text-nzMuted bg-nzLightBg'
                          }`}
                        >
                          {count}
                        </span>
                      </div>
                      <p
                        className={`text-xs mt-1 ${
                          isActive ? 'text-white/80' : 'text-nzMuted'
                        }`}
                      >
                        {cat.desc}
                      </p>
                    </div>
                    {isActive && (
                      <i className="fa-solid fa-check-circle text-white text-sm mt-0.5 flex-shrink-0" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* ── Left: Popular articles / search results ─────────────── */}
          <div className="lg:col-span-2">
            <section aria-label="Help articles">
              <h2 className="text-[36px] font-[200] text-nzBlack tracking-tight mb-6">
                {searchQuery
                  ? 'Search Results'
                  : activeCategory
                  ? `${activeCategory}`
                  : 'Popular Articles'}
              </h2>

              {filteredFaqs.length === 0 ? (
                /* Empty state */
                <div className="bg-white border-b-2 border-nzDivider p-10 text-center">
                  <i className="fa-solid fa-circle-question text-3xl text-nzMuted mb-3" />
                  <h3 className="text-sm font-semibold text-nzDarkGrey mb-1">
                    We couldn't find any results
                  </h3>
                  <p className="text-xs text-nzMuted max-w-sm mx-auto">
                    Try different keywords or browse the categories above. If you
                    need more help, contact our helpdesk.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('')
                      setActiveCategory(null)
                    }}
                    className="mt-4 text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal"
                  >
                    View all articles
                  </button>
                </div>
              ) : (
                <div>
                  {filteredFaqs.map((faq, i) => {
                    const isOpen = expandedFaq === i
                    return (
                      <details
                        key={`${faq.q}-${i}`}
                        open={isOpen}
                        className="bg-white border-b-2 border-nzDivider group"
                      >
                        <summary
                          onClick={(e) => {
                            e.preventDefault()
                            toggleFaq(i)
                          }}
                          className="px-5 py-4 cursor-pointer flex items-center justify-between gap-3 hover:bg-nzLightBg transition-colors"
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <i
                              className={`fa-solid ${
                                isOpen
                                  ? 'fa-chevron-down'
                                  : 'fa-chevron-right'
                              } text-[10px] text-nzMuted flex-shrink-0 transition-transform`}
                            />
                            <span className="text-sm font-medium text-nzDarkGrey leading-snug">
                              {faq.q}
                            </span>
                          </div>
                          <span className="flex-shrink-0 text-[10px] font-medium text-nzMuted bg-nzLightBg px-2.5 py-0.5 hidden sm:block">
                            {faq.category}
                          </span>
                        </summary>
                        <div className="px-5 pb-5 pl-11 text-sm text-nzBody leading-relaxed bg-nzLightBg pt-3">
                          {faq.a}
                          <div className="mt-3 flex items-center gap-3 text-xs">
                            <span className="text-nzMuted">
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
          <div className="space-y-5">
            {/* Quick Guides */}
            <div className="bg-white border-b-2 border-nzDivider p-5">
              <h3 className="text-lg font-semibold text-nzDarkGrey mb-3 flex items-center gap-2">
                <i className="fa-solid fa-book-open text-xs text-nzMediumTeal" />
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
                      className="flex items-center gap-2 text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors group"
                    >
                      <i
                        className={`fa-solid ${g.icon} text-[10px] text-nzMuted group-hover:text-nzMediumTeal`}
                      />
                      {g.label}
                      <i className="fa-solid fa-arrow-right text-[8px] text-nzMuted group-hover:text-nzMediumTeal ml-auto" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information Corner */}
            <div className="bg-white border-b-2 border-nzDivider p-5">
              <h3 className="text-lg font-semibold text-nzDarkGrey mb-3 flex items-center gap-2">
                <i className="fa-solid fa-gavel text-xs text-nzMediumTeal" />
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
                      className="flex items-center gap-2 text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors group"
                    >
                      <i className="fa-solid fa-chevron-right text-[8px] text-nzMuted group-hover:text-nzMediumTeal" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Support */}
            <div className="bg-nzDarkTeal text-white p-5">
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <i className="fa-solid fa-headset text-sm text-mcaSaffron" />
                Contact Support
              </h3>
              <ul className="space-y-3 text-xs leading-relaxed">
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-phone text-mcaSaffron mt-0.5" />
                  <div>
                    <p className="font-semibold">Helpdesk (Toll-Free)</p>
                    <p className="text-white/70">1800-XXX-XXXX</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-envelope text-mcaSaffron mt-0.5" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-white/70">helpdesk@mca.gov.in</p>
                  </div>
                </li>
                <li className="flex items-start gap-2.5">
                  <i className="fa-solid fa-ticket text-mcaSaffron mt-0.5" />
                  <div>
                    <p className="font-semibold">Raise a Ticket</p>
                    <Link
                      to="/contact"
                      className="text-mcaSaffron hover:underline transition-colors"
                    >
                      Open support ticket →
                    </Link>
                  </div>
                </li>
              </ul>

              <div className="mt-4 pt-3 border-t border-white/10 flex flex-wrap gap-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 bg-nzPrimary hover:bg-nzMediumTeal text-white text-[11px] font-medium px-3 py-1.5 transition-colors"
                >
                  <i className="fa-solid fa-comment-dots" />
                  Live Chat (Beta)
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 border border-white/30 hover:bg-white/10 text-white text-[11px] font-medium px-3 py-1.5 transition-colors"
                >
                  <i className="fa-solid fa-flag" />
                  Grievance
                </Link>
              </div>
            </div>

            {/* Video Demos */}
            <div className="bg-white border-b-2 border-nzDivider p-5">
              <h3 className="text-lg font-semibold text-nzDarkGrey mb-3 flex items-center gap-2">
                <i className="fa-solid fa-play-circle text-xs text-mcaSaffron" />
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
                      className="flex items-center gap-2 text-sm text-nzBody hover:text-nzPrimary transition-colors group"
                    >
                      <i className="fa-solid fa-play text-[8px] text-[#DC2626] group-hover:text-nzPrimary" />
                      {v}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Last updated */}
            <p className="text-[11px] text-nzMuted text-center">
              Last updated: 29 Aug 2026
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
