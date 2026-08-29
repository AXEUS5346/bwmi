import { Link } from 'react-router-dom'

const serviceCategories = [
  {
    title: 'Start a Company',
    icon: 'fa-rocket',
    description: 'Register a new company or LLP with SPICe+ or FiLLiP.',
    link: '/efiling',
    fee: 'From ₹500',
  },
  {
    title: 'Maintain a Company',
    icon: 'fa-gears',
    description: 'File annual returns, financial statements, and manage company details.',
    link: '/efiling',
    fee: 'From ₹100',
  },
  {
    title: 'Directors & Partners',
    icon: 'fa-user-tie',
    description: 'Apply for DIN, DIR-3 KYC, or appoint/resign directors.',
    link: '/efiling',
    fee: 'Free – ₹500',
  },
  {
    title: 'Charges & Charges',
    icon: 'fa-link',
    description: 'Create, modify, or satisfaction of charges (CHG-1, CHG-9).',
    link: '/efiling',
    fee: 'From ₹100',
  },
  {
    title: 'Document Services',
    icon: 'fa-file-lines',
    description: 'View public documents, get certified copies, and download filings.',
    link: '/view-docs',
    fee: 'Free',
  },
  {
    title: 'Help & Support',
    icon: 'fa-circle-question',
    description: 'Find answers to common questions and get in touch with support.',
    link: '/contact',
    fee: 'Free',
  },
]

export default function MCAServices() {
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
              Online Services
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          Browse All Online Services
        </h1>

        {/* Redirect notice */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-[#0E7C7B] text-white rounded-lg flex items-center justify-center flex-shrink-0">
              <i className="fa-solid fa-arrow-right-from-bracket text-sm" aria-hidden="true"></i>
            </div>
            <div>
              <p className="text-sm text-slate-600 leading-relaxed">
                All MCA online services are available through our e-Filing portal. Browse the categories
                below or visit the full catalogue directly.
              </p>
              <Link
                to="/efiling"
                className="inline-flex items-center gap-2 mt-3 text-sm font-medium text-[#0E7C7B] hover:text-[#0B2C5C] hover:underline transition-colors"
              >
                Go to e-Filing Portal <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Service category cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md hover:border-[#0E7C7B] transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 bg-[#0B2C5C] text-white rounded-lg flex items-center justify-center group-hover:bg-[#0E7C7B] transition-colors">
                  <i className={`fa-solid ${cat.icon} text-sm`} aria-hidden="true"></i>
                </div>
                <span className="text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded">
                  {cat.fee}
                </span>
              </div>
              <h2 className="text-sm font-bold text-[#0B2C5C] mb-2 group-hover:text-[#0E7C7B] transition-colors">
                {cat.title}
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">{cat.description}</p>
              <span className="text-[#0E7C7B] text-xs font-medium inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Browse services <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>

        {/* Quick links */}
        <div className="mt-10 bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="font-bold text-[#0B2C5C] mb-4">Quick Links</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { label: 'Fee Calculator', link: '/fee-calculator', icon: 'fa-calculator' },
              { label: 'View Documents', link: '/view-docs', icon: 'fa-file-lines' },
              { label: 'Company Search', link: '/search', icon: 'fa-magnifying-glass' },
              { label: 'Contact Support', link: '/contact', icon: 'fa-phone' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="flex items-center gap-3 px-4 py-3 border border-slate-200 rounded-lg hover:border-[#0E7C7B] hover:bg-slate-50 transition-all text-sm text-slate-700"
              >
                <i className={`fa-solid ${item.icon} text-[#0E7C7B] text-xs`} aria-hidden="true"></i>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
