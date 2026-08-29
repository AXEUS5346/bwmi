import { Link } from 'react-router-dom'

const mockDocuments = [
  {
    name: 'AOC-4',
    title: 'Financial Statements & Accounts',
    company: 'Tech Solutions Pvt Ltd',
    cin: 'U74999DL2020PTC365012',
    filedDate: '28/09/2025',
    status: 'Approved',
  },
  {
    name: 'MGT-7',
    title: 'Annual Return',
    company: 'Tech Solutions Pvt Ltd',
    cin: 'U74999DL2020PTC365012',
    filedDate: '28/09/2025',
    status: 'Approved',
  },
  {
    name: 'CHG-1',
    title: 'Particulars of Charge',
    company: 'Green Energy Corp Ltd',
    cin: 'L72200MH2018PLC304567',
    filedDate: '15/07/2025',
    status: 'Approved',
  },
  {
    name: 'DIR-12',
    title: 'Particulars of Appointment of Directors',
    company: 'Pacific Traders Ltd',
    cin: 'U52100KA2019PLC128765',
    filedDate: '01/03/2025',
    status: 'Approved',
  },
  {
    name: 'INC-22',
    title: 'Change of Registered Office',
    company: 'Sunrise Innovations Pvt Ltd',
    cin: 'U74140DL2021PTC387654',
    filedDate: '20/06/2025',
    status: 'Approved',
  },
]

export default function ViewDocs() {
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
              Document Services
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-4">
          Document Services
        </h1>

        {/* Free access notice — NZ pattern */}
        <div className="bg-[#f0fdf4] border border-[#138808]/30 rounded-lg px-5 py-3 mb-8 flex items-start gap-3">
          <i
            className="fa-solid fa-circle-check text-[#138808] mt-0.5"
            aria-hidden="true"
          ></i>
          <p className="text-sm text-[#138808] font-medium">
            All public documents are available free of charge. You can view and download
            any publicly filed document without payment.
          </p>
        </div>

        {/* Search */}
        <div className="bg-white border border-slate-200 rounded-lg p-6 mb-8">
          <label htmlFor="doc-search" className="text-sm font-semibold text-[#0B2C5C] block mb-2">
            Search by CIN, Company Name, or Document Type
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <input
                id="doc-search"
                type="search"
                placeholder="e.g. U74999DL2020PTC365012 or Tech Solutions"
                className="w-full border border-slate-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0E7C7B] focus:border-[#0E7C7B] pr-10"
              />
              <i
                className="fa-solid fa-magnifying-glass absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs"
                aria-hidden="true"
              ></i>
            </div>
            <button className="bg-[#0B2C5C] text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-[#0B2C5C]/90 transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Document list */}
        <div className="bg-white border border-slate-200 rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
            <h2 className="font-bold text-[#0B2C5C]">Recently Filed Documents</h2>
            <span className="text-xs text-slate-500">{mockDocuments.length} documents</span>
          </div>

          {/* Desktop table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200">
                <tr className="text-xs text-slate-500">
                  <th scope="col" className="px-6 py-3 text-left font-medium">
                    Form
                  </th>
                  <th scope="col" className="px-6 py-3 text-left font-medium">
                    Description
                  </th>
                  <th scope="col" className="px-6 py-3 text-left font-medium">
                    Company
                  </th>
                  <th scope="col" className="px-6 py-3 text-left font-medium">
                    Filed
                  </th>
                  <th scope="col" className="px-6 py-3 text-left font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right font-medium">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {mockDocuments.map((doc, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-semibold text-[#0B2C5C]">{doc.name}</td>
                    <td className="px-6 py-4 text-slate-600">{doc.title}</td>
                    <td className="px-6 py-4">
                      <div className="text-slate-700">{doc.company}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{doc.cin}</div>
                    </td>
                    <td className="px-6 py-4 text-slate-500 text-xs whitespace-nowrap">
                      {doc.filedDate}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                        {doc.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-[#0E7C7B] hover:text-[#0B2C5C] transition-colors"
                        aria-label={`Download ${doc.name} for ${doc.company}`}
                      >
                        <i className="fa-solid fa-download text-sm" aria-hidden="true"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="md:hidden divide-y divide-slate-200">
            {mockDocuments.map((doc, i) => (
              <article key={i} className="px-6 py-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <span className="text-xs font-bold text-[#0B2C5C]">{doc.name}</span>
                    <h3 className="text-sm font-semibold text-slate-800">{doc.title}</h3>
                  </div>
                  <button
                    className="text-[#0E7C7B] hover:text-[#0B2C5C] transition-colors flex-shrink-0"
                    aria-label={`Download ${doc.name}`}
                  >
                    <i className="fa-solid fa-download text-sm" aria-hidden="true"></i>
                  </button>
                </div>
                <p className="text-xs text-slate-500">{doc.company}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-slate-400">{doc.filedDate}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-700 border border-green-200 font-medium">
                    {doc.status}
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
