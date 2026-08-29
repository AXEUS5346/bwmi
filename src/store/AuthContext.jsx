import { createContext, useContext, useState, useEffect } from 'react'

/**
 * Role-based mock auth context.
 * After login, user picks a role → homepage shows role-specific content.
 * No backend — all state in localStorage.
 */

const AuthContext = createContext(null)

/* ── Role definitions with personalized quick actions ── */
export const ROLES = {
  entrepreneur: {
    id: 'entrepreneur',
    label: 'Entrepreneur / Founder',
    icon: 'fa-rocket',
    tagline: 'Start and grow your business',
    quickActions: [
      { label: 'Reserve Name (RUN)', icon: 'fa-tag', href: '/efiling/RUN', formId: 'RUN' },
      { label: 'Incorporate (SPICe+)', icon: 'fa-building', href: '/efiling/SPICe+', formId: 'SPICe+' },
      { label: 'Commencement (INC-20A)', icon: 'fa-flag-checkered', href: '/efiling/INC-20A', formId: 'INC-20A' },
      { label: 'Fee Calculator', icon: 'fa-calculator', href: '/services/fee-calculator' },
      { label: 'Track Application', icon: 'fa-clock-rotate-left', href: '/search?type=company' },
    ],
    notifications: [
      'File INC-20A within 180 days of incorporation',
      'Annual compliance due within 30 days of AGM',
    ],
  },
  ca_cs: {
    id: 'ca_cs',
    label: 'CA / CS Professional',
    icon: 'fa-briefcase',
    tagline: 'Manage compliance for your clients',
    quickActions: [
      { label: 'Financial Statements (AOC-4)', icon: 'fa-file-invoice-dollar', href: '/efiling/AOC-4', formId: 'AOC-4' },
      { label: 'Annual Return (MGT-7)', icon: 'fa-file-circle-check', href: '/efiling/MGT-7', formId: 'MGT-7' },
      { label: 'Director KYC (DIR-3)', icon: 'fa-id-card', href: '/efiling/DIR-3-KYC', formId: 'DIR-3-KYC' },
      { label: 'Create Charge (CHG-1)', icon: 'fa-landmark', href: '/efiling/CHG-1', formId: 'CHG-1' },
      { label: 'My Applications', icon: 'fa-folder-open', href: '/search?type=company' },
    ],
    notifications: [
      'AOC-4 due for 12 clients by 30 Sep',
      'MGT-7 due for 8 clients by 15 Oct',
      'DIR-3 KYC deadline: 30 Jun (triennial)',
    ],
  },
  attorney: {
    id: 'attorney',
    label: 'Attorney / Legal',
    icon: 'fa-gavel',
    tagline: 'Search records and track filings',
    quickActions: [
      { label: 'Company Search', icon: 'fa-magnifying-glass', href: '/search?type=company' },
      { label: 'View Public Documents', icon: 'fa-file-lines', href: '/services/view-docs' },
      { label: 'Track SRN Status', icon: 'fa-timeline', href: '/search?type=company' },
      { label: 'File MGT-14 (Resolutions)', icon: 'fa-file-contract', href: '/efiling/MGT-14', formId: 'MGT-14' },
      { label: 'Acts & Rules', icon: 'fa-scale-balanced', href: '/help/acts' },
    ],
    notifications: [
      'New circular: ROC bifurcation Delhi',
      'Companies Act Amendment effective 1 Mar 2026',
    ],
  },
  director: {
    id: 'director',
    label: 'Director',
    icon: 'fa-user-tie',
    tagline: 'Manage your DIN and company roles',
    quickActions: [
      { label: 'DIN KYC Status', icon: 'fa-id-card', href: '/efiling/DIR-3-KYC', formId: 'DIR-3-KYC' },
      { label: 'My Companies', icon: 'fa-building', href: '/search?type=company' },
      { label: 'DSC Management', icon: 'fa-key', href: '/efiling/DSC' },
      { label: 'File AOC-4', icon: 'fa-file-invoice-dollar', href: '/efiling/AOC-4', formId: 'AOC-4' },
      { label: 'Resubmission', icon: 'fa-rotate', href: '/search?type=company' },
    ],
    notifications: [
      'DIN 003067 KYC due by 30 Jun 2028',
      'AOC-4 resubmission required for U72900MH2020PLC123456',
    ],
  },
  investor: {
    id: 'investor',
    label: 'Investor / Bank',
    icon: 'fa-chart-line',
    tagline: 'Verify companies and charges',
    quickActions: [
      { label: 'Company Search', icon: 'fa-magnifying-glass', href: '/search?type=company' },
      { label: 'Charge Search', icon: 'fa-landmark', href: '/search?type=charge' },
      { label: 'View Documents', icon: 'fa-file-lines', href: '/services/view-docs' },
      { label: 'IEPF-5 Claim', icon: 'fa-hand-holding-dollar', href: '/efiling/IEPF-5', formId: 'IEPF-5' },
      { label: 'Statistics & Reports', icon: 'fa-chart-bar', href: '/data-reports' },
    ],
    notifications: [
      'New charge registered: Infosys Ltd — ₹500 Cr (SBI)',
      'IEPF refund window open for unclaimed dividends',
    ],
  },
  citizen: {
    id: 'citizen',
    label: 'General Public',
    icon: 'fa-user',
    tagline: 'Search and verify company information',
    quickActions: [
      { label: 'Company Search', icon: 'fa-magnifying-glass', href: '/search?type=company' },
      { label: 'Fee Calculator', icon: 'fa-calculator', href: '/services/fee-calculator' },
      { label: 'Help Centre', icon: 'fa-circle-question', href: '/help' },
      { label: 'Reserve Name (RUN)', icon: 'fa-tag', href: '/efiling/RUN', formId: 'RUN' },
      { label: 'View Documents', icon: 'fa-file-lines', href: '/services/view-docs' },
    ],
    notifications: [
      'ROC bifurcation: Delhi split into Delhi I/II, Haryana',
    ],
  },
}

/* ── Mock user accounts ── */
const MOCK_USERS = [
  { email: 'bmwi@aeos.com', name: 'BMW Aeos', role: 'entrepreneur' },
  { email: 'rahul@cafirm.com', name: 'Rahul Mehta, CA', role: 'ca_cs' },
  { email: 'priya@legal.co', name: 'Priya Verma, Advocate', role: 'attorney' },
  { email: 'neha@corp.co', name: 'Neha Kapoor', role: 'director' },
  { email: 'suresh@bank.in', name: 'Suresh Kumar', role: 'investor' },
  { email: 'public@mca.gov.in', name: 'Guest User', role: 'citizen' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  /* Restore from localStorage on mount */
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mca_auth')
      if (saved) {
        const parsed = JSON.parse(saved)
        setUser(parsed.user)
        setRole(parsed.role)
      }
    } catch { /* ignore */ }
    setLoading(false)
  }, [])

  /* Login with mock email (any email works — picks matching role or defaults to citizen) */
  const login = (email) => {
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase())
    const mockUser = found || { email, name: email.split('@')[0], role: 'citizen' }
    setUser(mockUser)
    setRole(mockUser.role)
    localStorage.setItem('mca_auth', JSON.stringify({ user: mockUser, role: mockUser.role }))
    return mockUser
  }

  /* Switch role */
  const switchRole = (newRole) => {
    if (!ROLES[newRole]) return
    setRole(newRole)
    if (user) {
      const updated = { ...user, role: newRole }
      setUser(updated)
      localStorage.setItem('mca_auth', JSON.stringify({ user: updated, role: newRole }))
    }
  }

  /* Logout */
  const logout = () => {
    setUser(null)
    setRole(null)
    localStorage.removeItem('mca_auth')
  }

  const value = {
    user,
    role,
    roleConfig: role ? ROLES[role] : null,
    loading,
    isAuthenticated: !!user,
    login,
    logout,
    switchRole,
    allRoles: ROLES,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}

export default AuthContext
