import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: 'About MCA',
    links: [
      { label: 'About MCA', to: '/about' },
      { label: 'Image Gallery', to: '/about#gallery' },
      { label: 'Video Gallery', to: '/about#videos' },
      { label: 'Right to Information', to: '/about#rti' },
      { label: 'Newsletters', to: '/about#newsletters' },
      { label: 'Achievements', to: '/about#achievements' },
      { label: 'MCA Offices', to: '/about#offices' },
      { label: 'Affiliated Offices', to: '/about#affiliated' },
    ],
  },
  {
    title: 'Acts & Rules',
    links: [
      { label: 'Acts & Rules', to: '/acts-rules' },
    ],
  },
  {
    title: 'MCA Services',
    links: [
      { label: 'Master Data', to: '/search?type=company' },
      { label: 'Master Data Services', to: '/search' },
      { label: 'View Companies/Directors Under Prosecution', to: '/search?type=company' },
    ],
  },
  {
    title: 'LLP e-Filing',
    links: [
      { label: 'RUN-LLP (Reserve Unique Name)', to: '/efiling/RUN-LLP' },
      { label: 'FiLLiP (Incorporation of LLP)', to: '/efiling/FiLLiP' },
      { label: 'Form 3 - LLP Agreement', to: '/efiling/LLP-3' },
      { label: 'Form 4 - Change in Partners', to: '/efiling/LLP-4' },
      { label: 'Form 5 - Change of Name', to: '/efiling/LLP-5' },
      { label: 'Form 8 - Statement of Account & Solvency', to: '/efiling/LLP-8' },
      { label: 'Form 11 - Annual Return of LLP', to: '/efiling/LLP-11' },
      { label: 'Form 12 - Intimation of Address', to: '/efiling/LLP-12' },
      { label: 'Form 15 - Change of Registered Office', to: '/efiling/LLP-15' },
      { label: 'Form 22 - Intimation of Order', to: '/efiling/LLP-22' },
      { label: 'Form 23 - Application for Name Change', to: '/efiling/LLP-23' },
      { label: 'Form 24 - Striking Off', to: '/efiling/LLP-24' },
      { label: 'Form 25 - Reservation of Name', to: '/efiling/LLP-25' },
      { label: 'Form 27 - Registration by FLLP', to: '/efiling/LLP-27' },
    ],
  },
  {
    title: 'Company e-Filing',
    links: [
      { label: 'Reserve Name (RUN)', to: '/efiling/RUN' },
      { label: 'SPICe+ (Incorporation)', to: '/efiling/SPICe+' },
      { label: 'INC-12 (Section 8 Company)', to: '/efiling/INC-12' },
      { label: 'INC-20A (Post-Incorporation)', to: '/efiling/INC-20A' },
      { label: 'INC-22A (ACTIVE Compliance)', to: '/efiling/INC-22A' },
      { label: 'DIR-3 (DIN Allotment)', to: '/efiling/DIR-3' },
      { label: 'DIR-3 KYC-Web', to: '/efiling/DIR-3-KYC' },
      { label: 'DIR-6 (Change DIN Details)', to: '/efiling/DIR-6' },
      { label: 'DIR-12 (Director Appointment)', to: '/efiling/DIR-12' },
      { label: 'INC-4 (Change Company Name)', to: '/efiling/INC-4' },
      { label: 'INC-22 (Registered Office)', to: '/efiling/INC-22' },
      { label: 'SH-7 (Alter Share Capital)', to: '/efiling/SH-7' },
      { label: 'PAS-3 (Allotment of Shares)', to: '/efiling/PAS-3' },
      { label: 'MGT-14 (Board Resolutions)', to: '/efiling/MGT-14' },
      { label: 'ADT-1 (Auditor Appointment)', to: '/efiling/ADT-1' },
      { label: 'BEN-2 (Beneficial Ownership)', to: '/efiling/BEN-2' },
      { label: 'AOC-4 (Financial Statements)', to: '/efiling/AOC-4' },
      { label: 'AOC-4-CFS (Consolidated)', to: '/efiling/AOC-4-CFS' },
      { label: 'AOC-4-NBFC', to: '/efiling/AOC-4-NBFC' },
      { label: 'MGT-7 (Annual Return)', to: '/efiling/MGT-7' },
      { label: 'MGT-7A (Abridged)', to: '/efiling/MGT-7A' },
      { label: 'CHG-1 (Create/Modify Charge)', to: '/efiling/CHG-1' },
      { label: 'CHG-4 (Satisfy Charge)', to: '/efiling/CHG-4' },
      { label: 'CHG-6 (Receiver/Manager)', to: '/efiling/CHG-6' },
      { label: 'DPT-3 (Deposit Return)', to: '/efiling/DPT-3' },
      { label: 'MSME-1 (MSME Return)', to: '/efiling/MSME-1' },
      { label: 'STK-2 (Strike Off)', to: '/efiling/STK-2' },
      { label: 'INC-27 (Company Conversion)', to: '/efiling/INC-27' },
      { label: 'IEPF-1 (Transfer to IEPF)', to: '/efiling/IEPF-1' },
      { label: 'IEPF-5 (Investor Claim)', to: '/efiling/IEPF-5' },
    ],
  },
  {
    title: 'Help & FAQs',
    links: [
      { label: 'Help Centre', to: '/help' },
      { label: 'FAQs - Company Services', to: '/help/faqs' },
      { label: 'FAQs - LLP Services', to: '/help/faqs' },
      { label: 'User Registration & Login', to: '/help/registration' },
      { label: 'Payment', to: '/help/payment' },
      { label: 'List of Authorised Banks', to: '/help/payment#banks' },
      { label: 'Refund', to: '/help/payment#refund' },
      { label: 'Rates of Stamp Duty', to: '/help/payment#stamp-duty' },
      { label: 'DSC Services', to: '/help/dsc' },
      { label: 'DIN Related', to: '/help/din' },
      { label: 'DIR-3 KYC', to: '/help/dir-3-kyc' },
      { label: 'XBRL', to: '/help/xbrl' },
      { label: 'MCA Website', to: '/help/website' },
      { label: 'E-Consultation', to: '/help/consultation' },
      { label: 'E-Adjudication', to: '/help/adjudication' },
      { label: 'IEPF', to: '/help/iepf' },
      { label: 'CRC (Central Registration Center)', to: '/help/crc' },
      { label: 'C-PACE', to: '/help/c-pace' },
      { label: 'System Requirements', to: '/help/system-requirements' },
      { label: 'Important Documents', to: '/help/documents' },
      { label: 'e-Filing Help Kits', to: '/help/help-kits' },
      { label: 'Penalties & Offences', to: '/help/penalties' },
    ],
  },
  {
    title: 'Data & Reports',
    links: [
      { label: 'Data & Reports', to: '/data-reports' },
    ],
  },
  {
    title: 'Contact Us',
    links: [
      { label: 'Contact Us', to: '/contact' },
      { label: 'Grievance Cell', to: '/contact#grievance' },
      { label: 'Minister of Corporate Affairs', to: '/contact#minister' },
      { label: 'Minister of State', to: '/contact#minister-state' },
      { label: 'Officials at Headquarters', to: '/contact#hq' },
      { label: 'Regional Directors', to: '/contact#rd' },
      { label: 'Registrar of Companies', to: '/contact#roc' },
      { label: 'Official Liquidators', to: '/contact#liquidators' },
      { label: 'Cost Audit Branch', to: '/contact#cab' },
      { label: 'Investor Grievance Cell', to: '/contact#igc' },
      { label: 'Web Information Manager', to: '/contact#wim' },
    ],
  },
  {
    title: 'Your Account',
    links: [
      { label: 'Login / Register', to: '/login' },
      { label: 'My Applications', to: '/search?type=company' },
      { label: 'Company Search', to: '/search?type=company' },
      { label: 'Director Search', to: '/search?type=director' },
      { label: 'Charge Search', to: '/search?type=charge' },
      { label: 'View Public Documents', to: '/services/view-docs' },
      { label: 'Certified Copies', to: '/services/certified-copies' },
      { label: 'Fee Calculator', to: '/services/fee-calculator' },
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
