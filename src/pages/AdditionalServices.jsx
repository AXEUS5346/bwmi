import { Link } from 'react-router-dom'

const services = [
  {
    title: 'Enforcement',
    icon: 'fa-shield-halved',
    description:
      'Enforcement actions against companies and directors for non-compliance, including investigation and prosecution under the Companies Act, 2013.',
    link: '/efiling',
  },
  {
    title: 'E-Adjudication',
    icon: 'fa-scale-balanced',
    description:
      'Online adjudication of penalties for default under various sections of the Companies Act and allied rules.',
    link: '/efiling',
  },
  {
    title: 'Appeal',
    icon: 'fa-right-to-bracket',
    description:
      'File appeals against orders of the Regional Director or Adjudicating Officer before the National Company Law Tribunal (NCLT).',
    link: '/efiling',
  },
  {
    title: 'E-Consultation',
    icon: 'fa-comments',
    description:
      'Participate in public consultations on proposed amendments to rules and regulations under the Companies Act.',
    link: '/efiling',
  },
]

export default function AdditionalServices() {
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
              Additional Services
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          Additional Services
        </h1>

        {/* Service cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service) => (
            <article
              key={service.title}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 bg-[#0B2C5C] text-white rounded-lg flex items-center justify-center flex-shrink-0">
                  <i className={`fa-solid ${service.icon} text-sm`} aria-hidden="true"></i>
                </div>
                <div>
                  <h2 className="font-bold text-[#0B2C5C]">{service.title}</h2>
                </div>
              </div>
              <p className="text-sm text-slate-600 leading-relaxed mb-4">
                {service.description}
              </p>
              <Link
                to={service.link}
                className="text-[#0E7C7B] text-sm font-medium inline-flex items-center gap-1 hover:gap-2 hover:underline transition-all"
              >
                Learn more <span aria-hidden="true">→</span>
              </Link>
            </article>
          ))}
        </div>
      </main>
    </div>
  )
}
