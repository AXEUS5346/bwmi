import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function MyApplicationPage() {
  const navigate = useNavigate()

  useEffect(() => {
    // Redirect to dashboard after a brief moment
    const timer = setTimeout(() => {
      navigate('/', { replace: true })
    }, 2000)
    return () => clearTimeout(timer)
  }, [navigate])

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
              My Applications
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="max-w-lg mx-auto">
          {/* Redirect card */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 text-center">
            <div className="w-16 h-16 bg-[#0B2C5C] text-white rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-arrow-right-from-bracket text-xl" aria-hidden="true"></i>
            </div>
            <h1 className="text-lg font-bold text-[#0B2C5C] mb-2">
              My Applications has moved
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed mb-6">
              This page has been consolidated. You will be
              redirected automatically in a few seconds.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-nzPrimary text-white px-6 py-2.5 text-sm font-medium hover:bg-nzMediumTeal transition-colors"
            >
              Go to Home <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}
