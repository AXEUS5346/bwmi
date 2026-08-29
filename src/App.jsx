import { useEffect } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Search from './pages/Search'
import CompanyDetail from './pages/CompanyDetail'
import Catalog from './pages/Catalog'
import FormDetail from './pages/FormDetail'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Help from './pages/Help'
import AboutMCA from './pages/AboutMCA'
import ActsRules from './pages/ActsRules'
import AdditionalServices from './pages/AdditionalServices'
import DataReports from './pages/DataReports'
import ContactUs from './pages/ContactUs'
import ViewDocs from './pages/ViewDocs'
import FeeCalculator from './pages/FeeCalculator'
import MCAServices from './pages/MCAServices'
import SiteMap from './pages/SiteMap'

// BrowserRouter never resets scroll on navigation (<ScrollRestoration />
// requires a data router), so short pages render out of view after a click.
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center py-32 text-center">
      <h1 className="text-4xl font-light text-nzBlack">404 — Page not found</h1>
      <p className="text-nzBody mt-4 mb-6">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-block bg-nzPrimary text-white px-6 py-3 font-semibold hover:bg-nzMediumTeal transition-colors"
        style={{ borderRadius: 0 }}
      >
        Return to Home
      </Link>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Search */}
          <Route path="/search" element={<Search />} />
          <Route path="/search/company/:cin" element={<CompanyDetail />} />
          <Route path="/search/director/:din" element={<Search />} />

          {/* Services / Catalog */}
          <Route path="/services" element={<Catalog />} />
          <Route path="/services/online" element={<Catalog />} />
          <Route path="/services/view-docs" element={<ViewDocs />} />
          <Route path="/services/fee-calculator" element={<FeeCalculator />} />
          <Route path="/services/:formId" element={<FormDetail />} />

          {/* eFiling (aliases) */}
          <Route path="/efiling" element={<Catalog />} />
          <Route path="/efiling/:formId" element={<FormDetail />} />

          {/* Dashboard / Auth */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Login />} />

          {/* Information */}
          <Route path="/sitemap" element={<SiteMap />} />
          <Route path="/help" element={<Help />} />
          <Route path="/help/:id" element={<Help />} />
          <Route path="/about" element={<AboutMCA />} />
          <Route path="/acts-rules" element={<ActsRules />} />
          <Route path="/additional-services" element={<AdditionalServices />} />
          <Route path="/data-reports" element={<DataReports />} />
          <Route path="/contact" element={<ContactUs />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
