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
    title: 'Charges & Borrowings',
    icon: 'fa-link',
    description: 'Create, modify, or satisfaction of charges (CHG-1, CHG-9).',
    link: '/efiling',
    fee: 'From ₹100',
  },
  {
    title: 'Document Services',
    icon: 'fa-file-lines',
    description: 'View public documents, get certified copies, and download filings.',
    link: '/services/view-docs',
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
    <div className="min-h-screen bg-nzLightBg">
      <main className="max-w-7xl mx-auto px-4 py-12">
        {/* Page title — centered, thin weight, matching Home */}
        <h1 className="text-4xl md:text-[42px] font-[200] text-nzDarkGrey mb-4 text-center tracking-tight">
          Browse All Online Services
        </h1>

        {/* Redirect notice — bottom-bordered card, no rounded corners */}
        <div className="bg-white border-b-2 border-nzDivider p-6 mb-10">
          <div className="flex items-start gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-nzMediumTeal text-white text-lg">
              <i className="fa-solid fa-arrow-right-from-bracket" aria-hidden="true" />
            </span>
            <div>
              <p className="text-base text-nzBody leading-relaxed">
                All MCA online services are available through our e-Filing portal. Browse the categories
                below or visit the full catalogue directly.
              </p>
              <Link
                to="/efiling"
                className="inline-block mt-3 text-sm font-medium text-nzPrimary underline underline-offset-2 hover:text-nzMediumTeal transition-colors"
              >
                Go to e-Filing Portal &rarr;
              </Link>
            </div>
          </div>
        </div>

        {/* Service category cards — bottom-bordered, no rounded, teal icons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {serviceCategories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="flex flex-col bg-white border-b-2 border-nzDivider p-8 transition-colors hover:border-nzPrimary group"
            >
              <div className="flex items-center gap-5 mb-5">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-nzMediumTeal text-white text-lg">
                  <i className={`fa-solid ${cat.icon}`} aria-hidden="true" />
                </span>
                <h2 className="text-xl md:text-[22px] font-[200] text-nzBlack leading-snug">
                  {cat.title}
                </h2>
              </div>
              <p className="text-base text-nzBody mb-6 leading-relaxed">
                {cat.description}
              </p>
              <div className="mt-auto flex flex-wrap items-center gap-5">
                <span className="text-sm text-nzMuted">{cat.fee}</span>
                <span className="text-sm font-medium text-nzPrimary underline underline-offset-2 group-hover:text-nzMediumTeal transition-colors">
                  Browse services &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick links — same bottom-bordered card style */}
        <div className="mt-10 bg-white border-b-2 border-nzDivider p-8">
          <h2 className="text-[36px] font-[200] text-nzBlack mb-6 tracking-tight">Quick Links</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Fee Calculator', link: '/services/fee-calculator', icon: 'fa-calculator' },
              { label: 'View Documents', link: '/services/view-docs', icon: 'fa-file-lines' },
              { label: 'Company Search', link: '/search', icon: 'fa-magnifying-glass' },
              { label: 'Contact Support', link: '/contact', icon: 'fa-phone' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="flex items-center gap-3 px-4 py-3 border-b border-nzDivider hover:border-nzPrimary transition-colors text-sm text-nzBody"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center bg-nzMediumTeal text-white text-sm">
                  <i className={`fa-solid ${item.icon}`} aria-hidden="true" />
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
