// QuickActions — landing page quick-access cards + recent circulars
import { Link } from 'react-router-dom'
import { circulars, notices } from '../data/mockData'

const CARDS = [
  {
    title: 'Register a Company',
    desc: 'Reserve a name and incorporate with SPICe+ or FiLLiP',
    icon: 'fa-rocket',
    color: 'bg-nzDarkTeal',
    href: '/online-services',
  },
  {
    title: 'File Annual Return',
    desc: 'AOC-4 financials, MGT-7 annual return, LLP Form 11',
    icon: 'fa-file-circle-check',
    color: 'bg-nzPrimary',
    href: '/efiling/MGT-7',
  },
  {
    title: 'Fee Calculator',
    desc: 'Calculate filing fees based on authorised capital',
    icon: 'fa-calculator',
    color: 'bg-nzCyan',
    href: '/services/fee-calculator',
  },
  {
    title: 'Help & FAQs',
    desc: 'Searchable guides, PDFs, and video walkthroughs',
    icon: 'fa-circle-question',
    color: 'bg-mcaSaffron',
    href: '/help/faqs',
  },
]

// Merge and sort recent circulars + notices by date (newest first)
const recentUpdates = [...circulars, ...notices]
  .sort((a, b) => {
    const parse = (d) => { const p = d.date.split('-'); return new Date(`${p[2]}-${p[1]}-${p[0]}`) }
    return parse(b) - parse(a)
  })
  .slice(0, 3)

export default function QuickActions() {
  return (
    <div className="py-10">
      {/* Action cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {CARDS.map(card => (
          <Link
            key={card.title}
            to={card.href}
            className="group border border-nzDivider bg-white p-5 hover:shadow-md transition-shadow"
          >
            <div className={`w-10 h-10 ${card.color} text-white flex items-center justify-center mb-3`}>
              <i className={`fa-solid ${card.icon}`} />
            </div>
            <h3 className="text-sm font-bold text-nzDarkTeal mb-1 group-hover:text-nzPrimary transition-colors">
              {card.title}
            </h3>
            <p className="text-xs text-nzBody leading-relaxed">{card.desc}</p>
          </Link>
        ))}
      </div>

      {/* Recent updates */}
      <div className="border border-nzDivider bg-white p-5">
        <h3 className="text-sm font-bold text-nzDarkTeal mb-4 flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-mcaSaffron" />
          Recent Updates
        </h3>
        <ul className="divide-y divide-slate-100">
          {recentUpdates.map(item => (
            <li key={item.id} className="py-2.5">
              <Link to="/help/circulars" className="group block">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 text-[11px] font-mono text-nzMuted w-20 pt-0.5">{item.id}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-slate-800 group-hover:text-nzPrimary transition-colors line-clamp-2">
                      {item.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-[11px] text-nzMuted">{item.date}</span>
                      {item.important && (
                        <span className="text-[10px] font-bold text-mcaRed uppercase">Important</span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/help/circulars"
          className="inline-flex items-center gap-1 text-xs font-semibold text-nzPrimary hover:text-nzDarkTeal mt-4 transition-colors"
        >
          View all circulars &rarr;
        </Link>
      </div>
    </div>
  )
}
