// searchConfig.js — centralized search constants (single source of truth)
// Eliminates duplication between SearchBar and Search filter chips

export const SEARCH_CATEGORIES = [
  {
    key: 'forms',
    label: 'Forms & Filing',
    icon: 'fa-file-circle-check',
    placeholder: 'Search forms by name or number (e.g., AOC-4, MGT-7, Form 11)',
    emptyTitle: 'No forms found',
    emptyDesc: 'We couldn’t find any forms matching',
    emptyAction: { label: 'Browse e-Filing catalogue', href: '/efiling' },
    filterChips: ['All', 'Start', 'Manage', 'File & Comply', 'Close & Claim'],
  },
  {
    key: 'pages',
    label: 'Pages & Services',
    icon: 'fa-layer-group',
    placeholder: 'Search pages and services (e.g., About, Help, Fee Calculator)',
    emptyTitle: 'No pages found',
    emptyDesc: 'We couldn’t find any pages matching',
    emptyAction: { label: 'View site map', href: '/sitemap' },
    filterChips: ['All', 'Services', 'Information', 'Help'],
  },
  {
    key: 'circulars',
    label: 'Circulars & Notices',
    icon: 'fa-bullhorn',
    placeholder: 'Search circulars, notifications, and regulatory updates',
    emptyTitle: 'No circulars or notices found',
    emptyDesc: 'We couldn’t find any circulars or notices matching',
    emptyAction: { label: 'View all circulars', href: '/help/circulars' },
    filterChips: ['All', 'Circular', 'Notification', 'Amendment', 'Update', 'Notice'],
  },
]

export const getCategoryByKey = (key) =>
  SEARCH_CATEGORIES.find(c => c.key === key) || SEARCH_CATEGORIES[0]

export const getFilterOptions = (key) =>
  getCategoryByKey(key).filterChips
