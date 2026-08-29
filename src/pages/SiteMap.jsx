import { Link } from 'react-router-dom'

/**
 * SiteMap — NZ-style sitemap page with all portal links organized by category.
 * Matches NZ Companies Register sitemap pattern: flat lists under category headings.
 */

const SECTIONS = [
  {
    title: 'Search & Discovery',
    links: [
      { label: 'Company / LLP Search', to: '/search?type=company' },
      { label: 'Director Search', to: '/search?type=director' },
      { label: 'Charge Search', to: '/search?type=charge' },
      { label: 'Advanced Search', to: '/search' },
      { label: 'Company Detail (Example)', to: '/search/company/L24239MH1981PLC002195' },
    ],
  },
  {
    title: 'Register a Company',
    links: [
      { label: 'Reserve Name (RUN)', to: '/efiling/RUN' },
      { label: 'Incorporate — SPICe+ (7-in-1)', to: '/efiling/SPICe+' },
      { label: 'Incorporate LLP — FiLLiP', to: '/efiling/FiLLiP' },
      { label: 'Section 8 Company — INC-12', to: '/efiling/INC-12' },
      { label: 'Post-Incorporation — INC-20A', to: '/efiling/INC-20A' },
      { label: 'ACTIVE Compliance — INC-22A', to: '/efiling/INC-22A' },
    ],
  },
  {
    title: 'Maintain a Company',
    links: [
      { label: 'Director KYC — DIR-3 KYC-Web', to: '/efiling/DIR-3-KYC' },
      { label: 'Director Appointment — DIR-12', to: '/efiling/DIR-12' },
      { label: 'Change DIN Details — DIR-6', to: '/efiling/DIR-6' },
      { label: 'Change Company Name — INC-4', to: '/efiling/INC-4' },
      { label: 'Registered Office — INC-22', to: '/efiling/INC-22' },
      { label: 'Alter Share Capital — SH-7', to: '/efiling/SH-7' },
      { label: 'Allotment of Shares — PAS-3', to: '/efiling/PAS-3' },
      { label: 'Board Resolutions — MGT-14', to: '/efiling/MGT-14' },
      { label: 'Auditor Appointment — ADT-1', to: '/efiling/ADT-1' },
      { label: 'Beneficial Ownership — BEN-2', to: '/efiling/BEN-2' },
    ],
  },
  {
    title: 'File & Comply',
    links: [
      { label: 'Financial Statements — AOC-4', to: '/efiling/AOC-4' },
      { label: 'AOC-4 (Consolidated)', to: '/efiling/AOC-4-CFS' },
      { label: 'AOC-4 (NBFC)', to: '/efiling/AOC-4-NBFC' },
      { label: 'Annual Return — MGT-7', to: '/efiling/MGT-7' },
      { label: 'Annual Return — MGT-7A (Abridged)', to: '/efiling/MGT-7A' },
      { label: 'LLP Annual Return — Form 11', to: '/efiling/LLP-11' },
      { label: 'LLP Solvency — Form 8', to: '/efiling/LLP-8' },
      { label: 'Deposit Return — DPT-3', to: '/efiling/DPT-3' },
      { label: 'MSME Return — MSME-1', to: '/efiling/MSME-1' },
      { label: 'XBRL Validation Tool', to: '/efiling/XBRL' },
    ],
  },
  {
    title: 'Charges & Borrowings',
    links: [
      { label: 'Create / Modify Charge — CHG-1', to: '/efiling/CHG-1' },
      { label: 'Satisfy Charge — CHG-4', to: '/efiling/CHG-4' },
      { label: 'Receiver / Manager — CHG-6', to: '/efiling/CHG-6' },
    ],
  },
  {
    title: 'Close & Claim',
    links: [
      { label: 'Strike Off — STK-2', to: '/efiling/STK-2' },
      { label: 'LLP Strike Off — Form 24', to: '/efiling/LLP-24' },
      { label: 'Company Conversion — INC-27', to: '/efiling/INC-27' },
      { label: 'IEPF-1 (Transfer to IEPF)', to: '/efiling/IEPF-1' },
      { label: 'IEPF-5 (Investor Claim)', to: '/efiling/IEPF-5' },
      { label: 'Search Unclaimed Amounts', to: '/iepf/search' },
    ],
  },
  {
    title: 'DSC & Identity',
    links: [
      { label: 'Acquire DSC', to: '/efiling/DSC-ACQUIRE' },
      { label: 'Associate DSC', to: '/efiling/DSC' },
      { label: 'DIN Allotment — DIR-3', to: '/efiling/DIR-3' },
      { label: 'Verify DIN / PAN', to: '/services/verify-din' },
    ],
  },
  {
    title: 'Document Services',
    links: [
      { label: 'View Public Documents', to: '/services/view-docs' },
      { label: 'Certified Copies', to: '/services/certified-copies' },
      { label: 'Fee Calculator', to: '/services/fee-calculator' },
    ],
  },
  {
    title: 'Information & Help',
    links: [
      { label: 'Help Centre', to: '/help' },
      { label: 'FAQs', to: '/help/faqs' },
      { label: 'Acts & Rules', to: '/help/acts' },
      { label: 'Notifications & Circulars', to: '/help/circulars' },
      { label: 'Data & Reports', to: '/data-reports' },
      { label: 'About MCA', to: '/about' },
      { label: 'Contact Us', to: '/contact' },
    ],
  },
  {
    title: 'Your Account',
    links: [
      { label: 'Login / Register', to: '/login' },
      { label: 'Dashboard', to: '/dashboard' },
      { label: 'My Applications', to: '/dashboard' },
      { label: 'Saved Drafts', to: '/dashboard' },
    ],
  },
]

export default function SiteMap() {
  return (
    <div className="bg-white min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-nzDivider">
        <div className="max-w-[79rem] mx-auto px-8 py-3">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-nzBody">
            <Link to="/" className="hover:text-nzPrimary transition-colors">Home</Link>
            <span className="text-nzMuted" aria-hidden="true">&rsaquo;</span>
            <span className="text-nzDarkGrey font-medium">Site Map</span>
          </nav>
        </div>
      </div>

      {/* Page title */}
      <div className="max-w-[79rem] mx-auto px-8 py-8">
        <h1 className="text-3xl font-light text-nzBlack mb-2">Site Map</h1>
        <p className="text-nzBody text-lg mb-8">
          A complete list of all services and information available on the MCA portal.
        </p>

        {/* Two-column sitemap grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="text-lg font-bold text-nzBlack border-b-2 border-nzPrimary pb-2 mb-4">
                {section.title}
              </h2>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-nzPrimary hover:text-nzDarkTeal underline text-[15px] transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        {/* Bottom navigation */}
        <div className="mt-12 pt-8 border-t border-nzDivider">
          <Link
            to="/"
            className="text-nzPrimary hover:text-nzDarkTeal font-semibold text-sm underline transition-colors"
          >
            &larr; Back to Companies Register
          </Link>
        </div>
      </div>
    </div>
  )
}
