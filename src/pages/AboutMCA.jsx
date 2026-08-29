import { Link } from 'react-router-dom'

const missionCards = [
  {
    title: 'Our Mission',
    icon: 'fa-bullseye',
    description:
      'To administer the Companies Act 2013 and allied Acts, ensuring transparent, efficient, and technology-driven regulation of the corporate sector in India.',
  },
  {
    title: 'Our Role',
    icon: 'fa-landmark',
    description:
      'MCA is primarily responsible for the regulation of the corporate sector, administration of the Companies Act, 2013, and oversight of limited liability partnerships.',
  },
  {
    title: 'Key Functions',
    icon: 'fa-list-check',
    description:
      'Administration of company incorporation, compliance monitoring, enforcement actions, investor protection through IEPF, and policy development for the corporate sector.',
  },
]

const affiliatedOrgs = [
  {
    name: 'National Company Law Tribunal (NCLT)',
    abbr: 'NCLT',
    description: 'Adjudicates disputes arising under the Companies Act and other corporate laws.',
    link: '/efiling',
  },
  {
    name: 'National Company Law Appellate Tribunal (NCLAT)',
    abbr: 'NCLAT',
    description: 'Hears appeals against orders of the NCLT, CCI, and IEPF Authority.',
    link: '/efiling',
  },
  {
    name: 'Competition Commission of India (CCI)',
    abbr: 'CCI',
    description: 'Enforces competition law and prevents anti-competitive practices.',
    link: '/efiling',
  },
  {
    name: 'Insolvency and Bankruptcy Board of India (IBBI)',
    abbr: 'IBBI',
    description: 'Regulates the insolvency resolution process for companies and individuals.',
    link: '/efiling',
  },
  {
    name: 'Institute of Chartered Accountants of India (ICAI)',
    abbr: 'ICAI',
    description: 'Regulates the profession of chartered accountancy in India.',
    link: '/efiling',
  },
  {
    name: 'Institute of Company Secretaries of India (ICSI)',
    abbr: 'ICSI',
    description: 'Regulates the profession of company secretaries in India.',
    link: '/efiling',
  },
  {
    name: 'Institute of Cost Accountants of India (ICMAI)',
    abbr: 'ICMAI',
    description: 'Regulates the profession of cost and management accountancy.',
    link: '/efiling',
  },
  {
    name: 'Serious Fraud Investigation Office (SFIO)',
    abbr: 'SFIO',
    description: 'Investigates serious corporate fraud referred by the Central Government.',
    link: '/efiling',
  },
]

export default function AboutMCA() {
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
              About MCA
            </li>
          </ol>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          About Ministry of Corporate Affairs
        </h1>

        {/* Mission cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {missionCards.map((card) => (
            <article
              key={card.title}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0B2C5C] text-white rounded-lg flex items-center justify-center">
                  <i className={`fa-solid ${card.icon} text-sm`}></i>
                </div>
                <h2 className="font-bold text-[#0B2C5C]">{card.title}</h2>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed">{card.description}</p>
            </article>
          ))}
        </div>

        {/* Key details */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-10">
          <h2 className="text-lg font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-4">
            Key Details
          </h2>
          <div className="grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <span className="text-slate-500 block mb-1">Established</span>
              <span className="text-slate-800 font-medium">
                31st May 2018 (under Companies Act, 2013)
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Parent Ministry</span>
              <span className="text-slate-800 font-medium">
                Ministry of Corporate Affairs, Government of India
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Headquarters</span>
              <span className="text-slate-800 font-medium">
                5th Floor, 'A' Wing, Shastri Bhawan, New Delhi
              </span>
            </div>
            <div>
              <span className="text-slate-500 block mb-1">Website</span>
              <a
                href="https://www.mca.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0E7C7B] hover:underline"
              >
                www.mca.gov.in
              </a>
            </div>
          </div>
        </div>

        {/* Affiliated organizations */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-6">
            Affiliated Organizations
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {affiliatedOrgs.map((org) => (
              <Link
                key={org.abbr}
                to={org.link}
                className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md hover:border-[#0E7C7B] transition-all group"
              >
                <div className="text-xs font-bold text-[#0B2C5C] mb-1">{org.abbr}</div>
                <h3 className="text-sm font-semibold text-slate-800 mb-2 group-hover:text-[#0E7C7B] transition-colors">
                  {org.name}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{org.description}</p>
                <span className="text-[#0E7C7B] text-xs font-medium mt-3 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Learn more <span aria-hidden="true">→</span>
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}
