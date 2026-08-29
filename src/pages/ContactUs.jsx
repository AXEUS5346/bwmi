import { Link } from 'react-router-dom'

const contactCards = [
  {
    title: 'Helpdesk',
    icon: 'fa-headset',
    details: [
      { label: 'Phone', value: '1800-11-0030 (Toll Free)', icon: 'fa-phone' },
      { label: 'Phone', value: '0120-4832500', icon: 'fa-phone' },
      { label: 'Email', value: 'appl.helpdesk@mca.gov.in', icon: 'fa-envelope' },
    ],
  },
  {
    title: 'CRC (Company Relation Cell)',
    icon: 'fa-building-columns',
    details: [
      { label: 'Phone', value: '0120-4832500', icon: 'fa-phone' },
      { label: 'Phone', value: '1800 202 3454 (Toll Free)', icon: 'fa-phone' },
      { label: 'Email', value: 'crc.escalation@mca.gov.in', icon: 'fa-envelope' },
    ],
  },
  {
    title: 'E-Governance',
    icon: 'fa-laptop',
    details: [
      { label: 'Contact', value: 'Sh. Vivek, Deputy Director', icon: 'fa-user' },
      { label: 'Phone', value: '011-23073017', icon: 'fa-phone' },
      { label: 'Email', value: 'ddegov@mca.gov.in', icon: 'fa-envelope' },
    ],
  },
  {
    title: 'Head Office',
    icon: 'fa-location-dot',
    details: [
      { label: 'Address', value: "5th Floor, 'A' Wing, Shastri Bhawan", icon: 'fa-location-dot' },
      { label: '', value: 'New Delhi – 110001', icon: '' },
    ],
  },
]

export default function ContactUs() {
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
              Contact Us
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          Contact Us
        </h1>

        {/* Contact cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {contactCards.map((card) => (
            <article
              key={card.title}
              className="bg-white border border-slate-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#0B2C5C] text-white rounded-lg flex items-center justify-center">
                  <i className={`fa-solid ${card.icon} text-sm`} aria-hidden="true"></i>
                </div>
                <h2 className="font-bold text-[#0B2C5C]">{card.title}</h2>
              </div>
              <div className="space-y-3">
                {card.details.map((detail, i) => (
                  <div key={i} className="flex items-start gap-3">
                    {detail.icon && (
                      <i
                        className={`fa-solid ${detail.icon} text-[#0E7C7B] text-xs mt-0.5 w-4 text-center`}
                        aria-hidden="true"
                      ></i>
                    )}
                    <div>
                      {detail.label && (
                        <span className="text-xs text-slate-400 block">{detail.label}</span>
                      )}
                      <span className="text-sm text-slate-700">{detail.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* FAQ link */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 text-center">
          <p className="text-sm text-slate-600">
            Looking for answers? Check our{' '}
            <Link to="/help" className="text-[#0E7C7B] hover:underline font-medium">
              Help Centre
            </Link>{' '}
            for frequently asked questions.
          </p>
        </div>
      </main>
    </div>
  )
}
