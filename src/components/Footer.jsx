import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16">
      {/* ─── Main Footer ─── */}
      <div className="bg-nzBody text-white pt-16 pb-0">
        <div className="max-w-[79rem] mx-auto px-8">
          {/* ── Emblem ── */}
          <div className="mb-10 flex items-center gap-3">
            <span className="text-2xl text-amber-400">★</span>
            <span className="text-[11px] font-semibold uppercase tracking-[0.15em] text-white/50">
              Indian National Emblem
            </span>
          </div>

          {/* ── Two-Column Layout ── */}
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr] gap-12">
            {/* ── Left Column ── */}
            <div>
              <h3 className="text-[14.2px] font-black text-white uppercase tracking-wide mb-5">
                Companies Register
              </h3>
              <ul className="space-y-2.5">
                {[
                  { label: 'Home', to: '/' },
                  { label: 'Online services', to: '/services' },
                  { label: 'Help centre', to: '/help' },
                  { label: 'News and notices', to: '/news' },
                  { label: 'Statistics', to: '/statistics' },
                  { label: 'Site map', to: '/sitemap' },
                ].map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className="text-[16px] font-light text-white no-underline hover:text-nzMediumTeal transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Right Column ── */}
            <div>
              <h3 className="text-[14.2px] font-black text-white uppercase tracking-wide mb-5">
                About
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link
                    to="/help/contact"
                    className="text-[16px] font-light text-white no-underline hover:text-nzMediumTeal transition-colors"
                  >
                    Contact us
                  </Link>
                </li>
              </ul>

              {/* ── Social Icons ── */}
              <div className="flex items-center gap-4 mt-6">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="text-white hover:text-nzMediumTeal transition-colors"
                >
                  <i className="fa-brands fa-facebook-f text-[20px]"></i>
                </a>
                <a
                  href="#"
                  aria-label="LinkedIn"
                  className="text-white hover:text-nzMediumTeal transition-colors"
                >
                  <i className="fa-brands fa-linkedin-in text-[20px]"></i>
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="text-white hover:text-nzMediumTeal transition-colors"
                >
                  <i className="fa-brands fa-youtube text-[20px]"></i>
                </a>
                <a
                  href="#"
                  aria-label="X / Twitter"
                  className="text-white hover:text-nzMediumTeal transition-colors"
                >
                  <i className="fa-brands fa-x-twitter text-[20px]"></i>
                </a>
              </div>
            </div>
          </div>

          {/* ── Government Logos Area ── */}
          <div className="flex items-center gap-4 mt-12 pb-12">
            <div className="border border-white/20 px-6 py-3">
              <span className="text-[13px] font-semibold text-white/80 uppercase tracking-wide">
                Digital India
              </span>
            </div>
            <div className="border border-white/20 px-6 py-3">
              <span className="text-[13px] font-semibold text-white/80 uppercase tracking-wide">
                Government of India
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Bottom Bar ─── */}
      <div className="bg-nzBody text-white">
        <div className="max-w-[79rem] mx-auto px-8 border-t border-white/15 pt-6 pb-6">
          {/* ── Top row: Legal text + links ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <span className="text-[14px] text-white/60">
              Legal information and copyright
            </span>
            <div className="flex items-center gap-4 text-[14px]">
              <Link
                to="/privacy"
                className="text-white/60 no-underline hover:text-white transition-colors"
              >
                Privacy
              </Link>
              <Link
                to="/copyright"
                className="text-white/60 no-underline hover:text-white transition-colors"
              >
                Copyright
              </Link>
              <Link
                to="/terms"
                className="text-white/60 no-underline hover:text-white transition-colors"
              >
                Terms of use
              </Link>
            </div>
          </div>

          {/* ── Bottom row: Crown / Govt copyright ── */}
          <p className="mt-4 text-[12px] text-white/40">
            Government of India &copy; 2026
          </p>
        </div>
      </div>
    </footer>
  )
}
