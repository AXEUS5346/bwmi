// MCA Service Tree — drives header mega-menu, home tiles, catalog, wizard
// Complete replica: every service from MCA_PORTAL_SERVICES.md collapsed into 6 verbs
// NZ-style dual-link: learnHow (learn) + doItNow (act) on each category
export const serviceTree = [
  {
    id: "discover",
    label: "Discover",
    labelHi: "खोजें",
    desc: "Public search — no login",
    icon: "fa-magnifying-glass",
    color: "#0B2C5C",
    learnHow: "Find out how to search company records, check director status, and access public documents",
    doItNow: "/search?type=company",
    cols: [
      {
        title: "Search Master Data",
        items: [
          { id: "company-search", label: "Company / LLP Search", sub: "By CIN/LLPIN or Name", href: "/search?type=company", count: "5.5M views", fee: "₹0", complexity: "simple" },
          { id: "director-search", label: "Director Search", sub: "By DIN/DPIN or Name", href: "/search?type=director", fee: "₹0", complexity: "simple" },
          { id: "charge-search", label: "Charge Search", sub: "CERSAI-linked Index", href: "/search?type=charge", fee: "₹0", complexity: "simple" },
        ]
      },
      {
        title: "Documents",
        items: [
          { id: "view-docs", label: "View Public Documents", sub: "Inspection → Certified Copies", href: "/services/view-docs", fee: "₹100/doc", complexity: "simple" },
          { id: "certified", label: "Get Certified Copies", href: "/services/view-docs", fee: "₹100/doc", complexity: "medium" },
          { id: "scanned", label: "Request Scanned Docs", href: "/services/view-docs", fee: "₹100/doc", complexity: "simple" },
        ]
      },
      {
        title: "Insights",
        items: [
          { id: "stats", label: "Company Statistics", href: "/services/stats", fee: "₹0", complexity: "simple" },
          { id: "reports", label: "Monthly Bulletin & Reports", href: "/services/reports", fee: "₹0", complexity: "simple" },
        ]
      }
    ]
  },
  {
    id: "start",
    label: "Start",
    desc: "New business — one-time",
    icon: "fa-rocket",
    learnHow: "Learn how to reserve a company name, incorporate with SPICe+, and complete post-setup filings",
    doItNow: "/efiling/RUN",
    cols: [
      {
        title: "Name Reservation",
        items: [
          { id: "run", label: "RUN — Reserve Unique Name", form: "RUN", href: "/efiling/RUN", fee: "₹1000", complexity: "medium" },
          { id: "run-llp", label: "RUN-LLP", form: "RUN-LLP", href: "/efiling/RUN-LLP", fee: "₹200", complexity: "medium" },
          { id: "form25", label: "Form 25 — LLP Name Reservation", sub: "New LLP or name change", href: "/efiling/Form-25", fee: "₹200", complexity: "medium" },
        ]
      },
      {
        title: "Incorporation",
        items: [
          { id: "spice", label: "SPICe+ (INC-32)", sub: "Company + PAN/TAN/EPFO/ESIC/GST/Bank", form: "SPICe+", href: "/efiling/SPICe+", badge: "7-in-1", fee: "₹1313 + Stamp", complexity: "complex" },
          { id: "fillip", label: "FiLLiP — LLP Incorporation", form: "FiLLiP", href: "/efiling/FiLLiP", fee: "₹500", complexity: "complex" },
          { id: "form27", label: "Form 27 — Foreign LLP Registration", sub: "FLLP registered in India", href: "/efiling/Form-27", fee: "₹500", complexity: "complex" },
        ]
      },
      {
        title: "Post-Setup",
        items: [
          { id: "inc20a", label: "INC-20A — Commencement", href: "/efiling/INC-20A", fee: "₹0", complexity: "simple" },
          { id: "inc22a", label: "INC-22A — ACTIVE", href: "/efiling/INC-22A", fee: "₹0", complexity: "simple" },
          { id: "inc12", label: "INC-12 — Sec 8 License", href: "/efiling/INC-12", fee: "₹0", complexity: "medium" },
        ]
      }
    ]
  },
  {
    id: "manage",
    label: "Manage",
    desc: "Changes during lifecycle",
    icon: "fa-gears",
    learnHow: "Understand how to appoint directors, change capital, shift offices, and manage charges during your company's lifecycle",
    doItNow: "/efiling/DIR-3",
    cols: [
      {
        title: "People & DSC",
        items: [
          { id: "dir3", label: "DIR-3 — DIN Allotment", href: "/efiling/DIR-3", fee: "₹500", complexity: "medium" },
          { id: "dir3kyc", label: "DIR-3 KYC / Web", sub: "Triennial till 30 Jun 2028", href: "/efiling/DIR-3-KYC", badge: "Seasonal", fee: "₹0", complexity: "medium" },
          { id: "dir6", label: "DIR-6 — Change DIN", href: "/efiling/DIR-6", fee: "₹300", complexity: "simple" },
          { id: "dir12", label: "DIR-12 — Appointment/Cessation", href: "/efiling/DIR-12", fee: "₹300", complexity: "medium" },
          { id: "ben2", label: "BEN-2 / MGT-6 — SBO", href: "/efiling/BEN-2", fee: "₹0", complexity: "medium" },
          { id: "dsc", label: "DSC Association", href: "/services/dsc", fee: "₹0", complexity: "simple" },
        ]
      },
      {
        title: "Structure",
        items: [
          { id: "sh7", label: "SH-7 — Alter Capital", href: "/efiling/SH-7", fee: "₹600", complexity: "medium" },
          { id: "pas3", label: "PAS-3 — Allotment", href: "/efiling/PAS-3", fee: "₹300", complexity: "medium" },
          { id: "inc22", label: "INC-22 — Registered Office", href: "/efiling/INC-22", fee: "₹300", complexity: "medium" },
          { id: "inc23", label: "INC-23 — Shifting (RD)", href: "/efiling/INC-23", fee: "₹1000", complexity: "complex" },
          { id: "inc24", label: "INC-24 — Name Change", href: "/efiling/INC-24", fee: "₹300", complexity: "medium" },
          { id: "mgt14", label: "MGT-14 — Resolutions", href: "/efiling/MGT-14", fee: "₹300", complexity: "medium" },
          { id: "adt1", label: "ADT-1 — Auditor", href: "/efiling/ADT-1", fee: "₹300", complexity: "medium" },
          { id: "form5", label: "Form 5 — LLP Name Change", sub: "After RUN-LLP approval", href: "/efiling/Form-5", fee: "₹200", complexity: "medium" },
          { id: "form15", label: "Form 15 — LLP Office Change", sub: "Inter-state (RD)", href: "/efiling/Form-15", fee: "₹300", complexity: "complex" },
          { id: "form23", label: "Form 23 — LLP Name Application", sub: "Under Section 17", href: "/efiling/Form-23", fee: "₹200", complexity: "medium" },
        ]
      },
      {
        title: "Borrowings",
        items: [
          { id: "chg1", label: "CHG-1 — Create/Modify", href: "/efiling/CHG-1", fee: "₹300", complexity: "complex" },
          { id: "chg4", label: "CHG-4 — Satisfaction", href: "/efiling/CHG-4", fee: "₹300", complexity: "simple" },
          { id: "chg6", label: "CHG-6 — Receiver", href: "/efiling/CHG-6", fee: "₹300", complexity: "medium" },
          { id: "chg8", label: "CHG-8 — Extension", href: "/efiling/CHG-8", fee: "₹300", complexity: "medium" },
          { id: "chg9", label: "CHG-9 — Debentures", href: "/efiling/CHG-9", fee: "₹300", complexity: "complex" },
        ]
      }
    ]
  },
  {
    id: "file",
    label: "File & Comply",
    desc: "Annual & recurring",
    icon: "fa-file-circle-check",
    learnHow: "Learn about annual filing deadlines for companies and LLPs, required attachments, and compliance return schedules",
    doItNow: "/efiling/AOC-4",
    cols: [
      {
        title: "Company Annual",
        items: [
          { id: "aoc4", label: "AOC-4 — Financials", sub: "Standalone", href: "/efiling/AOC-4", badge: "Most filed", fee: "₹600", complexity: "complex" },
          { id: "aoc4cfs", label: "AOC-4 CFS", sub: "Consolidated", href: "/efiling/AOC-4-CFS", fee: "₹600", complexity: "complex" },
          { id: "aoc4xbrl", label: "AOC-4 XBRL", sub: "+ CRA-4", href: "/efiling/AOC-4-XBRL", fee: "₹600", complexity: "complex" },
          { id: "mgt7", label: "MGT-7 — Annual Return", href: "/efiling/MGT-7", badge: "Most filed", fee: "₹600", complexity: "complex" },
          { id: "mgt7a", label: "MGT-7A — Small/OPC", href: "/efiling/MGT-7A", fee: "₹600", complexity: "medium" },
        ]
      },
      {
        title: "LLP Annual",
        items: [
          { id: "form11", label: "Form 11 — LLP Return", sub: "Due 30 May", href: "/efiling/Form-11", fee: "₹0", complexity: "medium" },
          { id: "form8", label: "Form 8 — Solvency", sub: "Due 30 Oct", href: "/efiling/Form-8", fee: "₹0", complexity: "medium" },
          { id: "form3", label: "Form 3 — LLP Agreement", sub: "Within 30 days", href: "/efiling/Form-3", fee: "₹50", complexity: "simple" },
          { id: "form4", label: "Form 4 — Partner Change", sub: "Admission/Cessation", href: "/efiling/Form-4", fee: "₹300", complexity: "medium" },
          { id: "form12", label: "Form 12 — Intimation of Address", sub: "Same ROC", href: "/efiling/Form-12", fee: "₹50", complexity: "simple" },
          { id: "form22", label: "Form 22 — Intimation of Order", sub: "Court/Tribunal", href: "/efiling/Form-22", fee: "₹0", complexity: "simple" },
        ]
      },
      {
        title: "Other Returns",
        items: [
          { id: "dpt3", label: "DPT-3 — Deposits", href: "/efiling/DPT-3", fee: "₹0", complexity: "medium" },
          { id: "msme1", label: "MSME-1 — Outstanding", sub: "Half-yearly", href: "/efiling/MSME-1", fee: "₹0", complexity: "medium" },
          { id: "gnl2", label: "GNL-2 — Addendum", href: "/efiling/GNL-2", fee: "₹300", complexity: "medium" },
          { id: "cra4", label: "CRA-4 — Cost Audit", href: "/efiling/CRA-4", fee: "₹300", complexity: "medium" },
        ]
      }
    ]
  },
  {
    id: "close",
    label: "Close & Claim",
    desc: "Exit & investor",
    icon: "fa-door-open",
    learnHow: "Understand the process to strike off a company, convert entity types, and claim IEPF refunds as an investor",
    doItNow: "/efiling/STK-2",
    cols: [
      {
        title: "Exit",
        items: [
          { id: "stk2", label: "STK-2 — Strike-off", href: "/efiling/STK-2", fee: "₹10000", complexity: "complex" },
          { id: "form24", label: "Form 24 — LLP Strike-off", href: "/efiling/Form-24", fee: "₹0", complexity: "medium" },
        ]
      },
      {
        title: "Conversion",
        items: [
          { id: "inc27", label: "INC-27 — Conversion", href: "/efiling/INC-27", fee: "₹300", complexity: "medium" },
          { id: "form17", label: "Form 17 — Firm→LLP", href: "/efiling/Form-17", fee: "₹0", complexity: "medium" },
          { id: "form18", label: "Form 18 — Co→LLP", href: "/efiling/Form-18", fee: "₹0", complexity: "medium" },
        ]
      },
      {
        title: "IEPF",
        items: [
          { id: "iepf1", label: "IEPF-1 / 1A / 2 / 4", sub: "Company→IEPF", href: "/efiling/IEPF-1", fee: "₹0", complexity: "complex" },
          { id: "iepf5", label: "IEPF-5 — Claim", sub: "Investor←IEPF", href: "/efiling/IEPF-5", badge: "Investor", fee: "₹0", complexity: "medium" },
          { id: "iepf5evr", label: "IEPF-5 EVR — Nodal", sub: "Link-form", href: "/efiling/IEPF-5-EVR", fee: "₹0", complexity: "medium" },
        ]
      }
    ]
  },
  {
    id: "help",
    label: "Help",
    desc: "Law & support",
    icon: "fa-circle-question",
    learnHow: "Browse the Companies Act, LLP Act, MCA circulars, notifications, and get guidance from FAQs and webinars",
    doItNow: "/help/faqs",
    cols: [
      {
        title: "Law Library",
        items: [
          { id: "acts", label: "Acts & Rules", sub: "Companies 2013, LLP 2008", href: "/help/acts", fee: "₹0", complexity: "simple" },
          { id: "circulars", label: "Circulars & Notifications", href: "/help/circulars", fee: "₹0", complexity: "simple" },
          { id: "orders", label: "Orders & General Circulars", href: "/help/circulars", fee: "₹0", complexity: "simple" },
        ]
      },
      {
        title: "Updates",
        items: [
          { id: "whatsnew", label: "What's New Ticker", href: "/help/whats-new", fee: "₹0", complexity: "simple" },
          { id: "econsult", label: "E-Consultation", href: "/help/econsultation", fee: "₹0", complexity: "simple" },
          { id: "reports", label: "Reports / Tenders / Vacancies", href: "/help/reports", fee: "₹0", complexity: "simple" },
        ]
      },
      {
        title: "Support",
        items: [
          { id: "faqs", label: "FAQs & Guides Hub", sub: "Searchable 12 PDFs", href: "/help/faqs", fee: "₹0", complexity: "simple" },
          { id: "videos", label: "Videos & Webinars", href: "/help/videos", fee: "₹0", complexity: "simple" },
          { id: "helpdesk", label: "Helpdesk Ticket + Chatbot", href: "/help/helpdesk", fee: "₹0", complexity: "simple" },
        ]
      }
    ]
  }
]

export const quickActionsByRole = {
  citizen: ["company-search","view-docs","stats","faqs"],
  startup: ["company-search","run","spice","inc20a"],
  entrepreneur: ["run","spice","inc20a","view-docs"],
  professional: ["aoc4","mgt7","dir3kyc","chg1","stk2"],
  governance: ["dir12","mgt14","adt1","ben2"],
  attorney: ["company-search","view-docs","mgt14","acts","circulars"],
  director: ["dir3kyc","dsc","aoc4","mgt7"],
  investor: ["company-search","charge-search","view-docs","iepf5","stats"],
  bank: ["company-search","charge-search","view-docs","chg1","stats"]
}
