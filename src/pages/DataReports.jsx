import { Link } from 'react-router-dom'

const reportCards = [
  {
    title: 'Company Statistics',
    icon: 'fa-chart-bar',
    description:
      'Monthly and yearly statistics on company incorporations, closures, and active companies across India.',
    link: '/efiling',
    items: [
      'Companies incorporated or closed during the month',
      'PUC (Paid-Up Capital) range-wise data',
      'CSR data and summary reports',
    ],
  },
  {
    title: 'Monthly Bulletin',
    icon: 'fa-newspaper',
    description:
      'The Monthly Information Bulletin published by MCA covering corporate sector developments.',
    link: '/efiling',
    items: [
      'Incorporation and closure data',
      'Filing compliance statistics',
      'Regulatory updates and trends',
    ],
  },
  {
    title: 'Annual Reports',
    icon: 'fa-book-open',
    description:
      'Annual reports on the working and administration of the Companies Act 2013 and 1956.',
    link: '/efiling',
    items: [
      'Annual Report of MCA',
      'Expert Committee reports on company law',
      'CSR compendium and working reports',
    ],
  },
  {
    title: 'ROC Information',
    icon: 'fa-building',
    description:
      'Registrar of Companies data including struck-off companies, strike-off notices, and public notices.',
    link: '/efiling',
    items: [
      'List of companies struck-off by RoCs (STK-7)',
      'Notice of strike-off under Section 248',
      'Public notices (STK-5, STK-6)',
    ],
  },
  {
    title: 'Company Alerts',
    icon: 'fa-triangle-exclamation',
    description:
      'Data on companies flagged for alerts including MLM companies, vanishing companies, and disqualified directors.',
    link: '/efiling',
    items: [
      'MLM and vanishing companies',
      'Disqualified directors',
      'Dormant and defaulter companies',
    ],
  },
  {
    title: 'RD Orders',
    icon: 'fa-gavel',
    description:
      'Regional Director and Registrar of Companies adjudication and compounding orders.',
    link: '/efiling',
    items: [
      'RD adjudication orders',
      'RD compounding orders',
      'ROC adjudication orders',
    ],
  },
]

export default function DataReports() {
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
              Data & Reports
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          Data & Reports
        </h1>

        {/* Report cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reportCards.map((card) => (
            <Link
              key={card.title}
              to={card.link}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md hover:border-[#0E7C7B] transition-all group block"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0B2C5C] text-white rounded-lg flex items-center justify-center group-hover:bg-[#0E7C7B] transition-colors">
                  <i className={`fa-solid ${card.icon} text-sm`} aria-hidden="true"></i>
                </div>
                <h2 className="font-bold text-[#0B2C5C] group-hover:text-[#0E7C7B] transition-colors">
                  {card.title}
                </h2>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed mb-4">
                {card.description}
              </p>
              <ul className="space-y-1.5">
                {card.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                    <i
                      className="fa-solid fa-circle text-[4px] text-slate-300 mt-1.5 flex-shrink-0"
                      aria-hidden="true"
                    ></i>
                    {item}
                  </li>
                ))}
              </ul>
              <span className="text-[#0E7C7B] text-xs font-medium mt-4 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                View reports <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </main>
    </div>
  )
}
