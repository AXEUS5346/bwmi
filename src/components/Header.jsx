import { useState, useRef, useEffect, createContext, useContext } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import { serviceTree } from '../data/serviceTree'

/* ─── Language Context ─── */
export const LanguageContext = createContext()
export const useLanguage = () => useContext(LanguageContext)

const TRANSLATIONS = {
  en: {
    home: 'Home',
    registerCompany: 'Register a Company',
    maintainCompany: 'Maintain a Company',
    onlineServices: 'Online Services',
    helpCentre: 'Help Centre',
    search: 'Search forms, pages, services…',
    accessAccount: 'Access your account',
    logout: 'Logout',
    siteMap: 'Site map',
    governmentOfIndia: 'Government of India',
  },
  hi: {
    home: 'होम',
    registerCompany: 'कंपनी रजिस्टर करें',
    maintainCompany: 'कंपनी बनाए रखें',
    onlineServices: 'ऑनलाइन सेवाएं',
    helpCentre: 'सहायता केंद्र',
    search: 'कंपनी, निदेशक, फॉर्म खोजें...',
    accessAccount: 'अपने खाते तक पहुंचें',
    logout: 'लॉग आउट',
    siteMap: 'साइट मैप',
    governmentOfIndia: 'भारत सरकार',
  },
}

const NAV_KEYS = ['home', 'registerCompany', 'maintainCompany', 'onlineServices', 'helpCentre']
const NAV_TREE_IDS = [null, 'start', 'manage', 'file', 'help']

function getPrimaryNav(t) {
  return NAV_KEYS.map((key, i) => ({
    label: t[key],
    href: i === 0 ? '/' : undefined,
    treeId: NAV_TREE_IDS[i],
  }))
}

function getMegaCols(treeId) {
  const node = serviceTree.find((s) => s.id === treeId)
  return node?.cols || []
}

  export default function Header() {
    const [mobileOpen, setMobileOpen] = useState(false)
    const [megaId, setMegaId] = useState(null)
    const [q, setQ] = useState('')
    const [fontSize, setFontSize] = useState(() => parseInt(localStorage.getItem('fontSize') || '16'))
    const [lang, setLang] = useState(() => localStorage.getItem('lang') || 'en')
    const nav = useNavigate()
    const { user, logout } = useAuth()
    const megaRef = useRef(null)
    const megaTimer = useRef(null)
    const t = TRANSLATIONS[lang]

    useEffect(() => {
      document.documentElement.style.fontSize = `${fontSize}px`
    }, [fontSize])

    useEffect(() => {
      const handler = (e) => {
        const navBar = document.getElementById('primary-nav')
        if (megaRef.current && !megaRef.current.contains(e.target) && !(navBar && navBar.contains(e.target))) {
          setMegaId(null)
        }
      }
      document.addEventListener('mousedown', handler)
      return () => document.removeEventListener('mousedown', handler)
    }, [])

    const location = useLocation()
    useEffect(() => {
      setMegaId(null)
      setMobileOpen(false)
    }, [location.pathname])

    const megaEnter = (id) => { clearTimeout(megaTimer.current); setMegaId(id) }
    const megaLeave = () => { megaTimer.current = setTimeout(() => setMegaId(null), 180) }

    const PRIMARY_NAV = getPrimaryNav(t)
      const doSearch = (e) => {
      e.preventDefault()
      if (!q.trim()) return
      nav(`/search?q=${encodeURIComponent(q.trim())}&type=forms`)
      setQ('')
    }

    const cycleFontSize = (dir) => {
      setFontSize(prev => {
        const next = Math.min(24, Math.max(12, prev + (dir === 'up' ? 2 : -2)))
        localStorage.setItem('fontSize', next)
        return next
      })
    }

    const toggleLang = () => {
      setLang(prev => {
        const next = prev === 'en' ? 'hi' : 'en'
        localStorage.setItem('lang', next)
        return next
      })
    }

    return (
    <LanguageContext.Provider value={{ lang, t, fontSize }}>
    <header className="sticky top-0 z-50" role="banner">
      {/* Tricolor Bar */}
      <div className="tricolor-bar" aria-hidden="true">
        <div className="bg-mcaSaffron" />
        <div className="bg-white" />
        <div className="bg-mcaGreen" />
      </div>

      {/* Utility Bar */}
      <div className="bg-nzDarkTeal text-white text-xs">
        <div className="max-w-[79rem] mx-auto px-4 sm:px-6 flex items-center justify-between h-10">
          <div className="flex items-center gap-2">
            <span className="text-mcaSaffron text-sm" aria-hidden="true">&#10022;</span>
            <span className="font-medium tracking-wide">{t.governmentOfIndia}</span>
            <span className="w-px h-4 bg-white/30 mx-1" aria-hidden="true" />
            <Link to="/sitemap" className="flex items-center gap-1 px-2 py-0.5 bg-mcaSaffron text-white text-[11px] font-semibold hover:bg-[#E88A2E] transition-colors">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
              {t.siteMap}
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" onClick={toggleLang} className="flex items-center gap-1 px-2 py-1 hover:bg-white/10 transition-colors">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
              </svg>
              <span>{lang === 'en' ? 'हिन्दी' : 'English'}</span>
            </button>
            <span className="w-px h-4 bg-white/30" aria-hidden="true" />
            <div className="flex items-center gap-1">
              <span className="text-[10px] opacity-70">A</span>
              <button type="button" onClick={() => cycleFontSize('down')} className="w-5 h-5 bg-white/15 hover:bg-white/25 flex items-center justify-center text-[11px] font-bold">A&minus;</button>
              <button type="button" onClick={() => cycleFontSize('up')} className="w-5 h-5 bg-white/15 hover:bg-white/25 flex items-center justify-center text-[11px] font-bold">A+</button>
            </div>
            <span className="w-px h-4 bg-white/30" aria-hidden="true" />
          </div>
        </div>
      </div>

      {/* Brand Header — Logo + Title + Search + Account */}
      <div className="bg-white border-b border-nzDivider">
        <div className="max-w-[79rem] mx-auto px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20 gap-4">
          {/* Left: Logo + Title */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <span className="text-sm sm:text-base font-semibold text-nzDarkTeal">Ministry of Corporate Affairs</span>
          </Link>

          {/* Center: Search Bar — hidden on /search page (has its own) */}
          {!location.pathname.startsWith('/search') && (
          <form onSubmit={doSearch} className="hidden md:flex flex-1 max-w-xl items-center" role="search">
            <div className="relative w-full">
              <input
                type="search"
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder={t.search}
                className="w-full border border-nzDivider bg-nzLightBg px-4 py-2.5 pr-12 text-sm text-nzDarkTeal placeholder-nzMuted focus:border-nzPrimary focus:outline-none transition-colors"
                style={{ borderRadius: 0 }}
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-nzMuted hover:text-nzPrimary transition-colors" aria-label="Search">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
              </button>
            </div>
          </form>
          )}

          {/* Right: Account */}
          <div className="flex items-center gap-3 shrink-0">
            {user ? (
              <>
                <span className="hidden sm:flex items-center gap-1.5 text-sm text-nzDarkTeal font-medium">Hello {user.name || user.email}</span>
                <button type="button" onClick={logout} className="text-xs border border-nzDarkTeal text-nzDarkTeal px-3 py-1.5 hover:bg-nzDarkTeal hover:text-white transition-colors">{t.logout}</button>
              </>
            ) : (
              <Link to="/login" className="flex items-center gap-2 bg-nzPrimary text-white px-5 py-2 text-sm font-semibold hover:bg-[#005f8a] transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" /></svg>
                {t.accessAccount}
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Nav Bar — 5 items, no search button */}
      <nav id="primary-nav" className="bg-nzMediumTeal text-white relative" aria-label="Primary navigation">
        <div className="max-w-[79rem] mx-auto px-4 sm:px-6 flex items-center">
          <ul className="hidden md:flex items-center w-full" role="menubar">
            {PRIMARY_NAV.map((item) => (
              <li key={item.label} className="relative" role="none">
                {item.href ? (
                  <Link to={item.href} role="menuitem" className="flex items-center gap-1 px-[36px] py-[28px] text-[16px] font-medium bg-white/15 border-b-[3px] border-white transition-colors">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0h4" /></svg>
                    {item.label}
                  </Link>
                ) : (
                  <button type="button" role="menuitem" aria-haspopup="true" aria-expanded={megaId === item.treeId} onClick={() => setMegaId(prev => prev === item.treeId ? null : item.treeId)} className={`flex items-center gap-1.5 px-[36px] py-[28px] text-[16px] font-medium transition-colors ${megaId === item.treeId ? 'bg-white/10' : 'hover:bg-white/10'}`}>
                    {item.label}
                    <svg className={`w-3 h-3 text-nzCyan transition-transform ${megaId === item.treeId ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                  </button>
                )}
              </li>
            ))}
          </ul>

          {/* Mobile hamburger + mobile search */}
          <div className="md:hidden flex items-center ml-auto gap-2">
            <button type="button" onClick={() => nav('/search')} className="p-2 hover:bg-white/10 transition-colors" aria-label="Search">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M11 19a8 8 0 100-16 8 8 0 000 16z" /></svg>
            </button>
            <button type="button" onClick={() => setMobileOpen(o => !o)} className="p-2 hover:bg-white/10 transition-colors" aria-label="Menu">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} /></svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mega Menu */}
      {megaId && (
        <div ref={megaRef} className="hidden md:block absolute left-0 right-0 z-40 bg-nzDarkTeal border-b border-white/10 shadow-xl">
          <div className="max-w-[79rem] mx-auto px-6 py-6">
            <div className="grid grid-cols-3 gap-8">
              {getMegaCols(megaId).map((col) => (
                <div key={col.title}>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[#96B5C4] mb-3 pb-2 border-b border-white/10">{col.title}</h3>
                  <ul className="space-y-1">
                    {col.items.map((item) => (
                      <li key={item.id}>
                        <Link to={item.href} onClick={() => setMegaId(null)} className="group flex flex-col px-3 py-2.5 hover:bg-white transition-colors">
                          <span className="text-sm font-medium text-white group-hover:text-nzDarkTeal transition-colors">{item.label}</span>
                          {item.sub && <span className="text-xs text-nzMuted group-hover:text-nzBody mt-0.5">{item.sub}</span>}
                          <span className="flex items-center gap-3 mt-1.5">
                            {item.fee && <span className="text-[11px] font-semibold text-nzMuted group-hover:text-nzBody">{item.fee}</span>}
                            <span className="text-nzCyan text-xs font-semibold group-hover:text-nzPrimary group-hover:underline">Learn how &rarr;</span>
                            <span className="text-nzPrimary text-xs font-semibold group-hover:underline">File now &rarr;</span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
          <div className="relative w-80 max-w-[85vw] bg-white h-full overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between bg-nzDarkTeal text-white px-4 py-3">
              <span className="font-semibold text-sm">Menu</span>
              <button type="button" onClick={() => setMobileOpen(false)} className="p-1 hover:bg-white/10" aria-label="Close">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
            <nav aria-label="Mobile navigation">
              <ul>
                {PRIMARY_NAV.map((item) => (
                  <li key={item.label} className="border-b border-slate-100">
                    {item.href ? (
                      <Link to={item.href} onClick={() => setMobileOpen(false)} className="flex items-center gap-3 px-4 py-3.5 text-sm font-semibold text-nzDarkTeal bg-nzLightBg/60 hover:bg-nzLightBg transition-colors">
                        {item.label}
                      </Link>
                    ) : (
                      <MobileNavItem item={item} onNavigate={() => setMobileOpen(false)} />
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </header>
    </LanguageContext.Provider>
  )
}

function MobileNavItem({ item, onNavigate }) {
  const [open, setOpen] = useState(false)
  const cols = getMegaCols(item.treeId)

  return (
    <>
      <button type="button" onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between px-4 py-3.5 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors" aria-expanded={open}>
        <span>{item.label}</span>
        <svg className={`w-4 h-4 text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
      </button>
      {open && (
        <div className="bg-slate-50 px-4 pb-3">
          {cols.map((col) => (
            <div key={col.title} className="mb-3 last:mb-0">
              <h4 className="text-[11px] font-bold uppercase tracking-wider text-nzDarkTeal/70 mb-1.5">{col.title}</h4>
              <ul className="space-y-0.5">
                {col.items.map((sub) => (
                  <li key={sub.id}>
                    <Link to={sub.href} onClick={onNavigate} className="block px-3 py-2 text-sm text-slate-700 hover:bg-white hover:text-nzPrimary transition-colors">
                      <span className="font-medium">{sub.label}</span>
                      {sub.sub && <span className="ml-2 text-xs text-slate-400">{sub.sub}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </>
  )
}
