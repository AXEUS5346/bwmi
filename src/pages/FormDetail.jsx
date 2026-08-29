import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Link, useNavigate } from 'react-router-dom'
import { companies, formsCatalog } from '../data/mockData'

const WIZARD_STEPS = [
  { num: 1, label: 'Company Details', icon: 'fa-solid fa-building' },
  { num: 2, label: 'Form Details',   icon: 'fa-solid fa-file-lines' },
  { num: 3, label: 'Documents',      icon: 'fa-solid fa-cloud-arrow-up' },
  { num: 4, label: 'Review & Submit', icon: 'fa-solid fa-clipboard-check' },
  { num: 5, label: 'Payment & SRN',  icon: 'fa-solid fa-credit-card' },
]

export default function FormDetail() {
  const { formId } = useParams()
  const [searchParams] = useSearchParams()
  const nav = useNavigate()
  const form = formsCatalog.find(f => f.id.toLowerCase() === formId.toLowerCase()) || formsCatalog[0]

  /* ── wizard state ─────────────────────────── */
  const [step, setStep]           = useState(1)
  const [company, setCompany]     = useState(null)
  const [cin, setCin]             = useState(searchParams.get('cin') || '')
  const [errors, setErrors]       = useState({})
  const [draftSaved, setDraftSaved] = useState(false)

  /* step-2 dynamic fields */
  const [formData, setFormData]   = useState({ fy: '', agmDate: '', notes: '', din: '' })

  /* step-3 files */
  const [files, setFiles]         = useState([])

  /* step-5 payment */
  const [payMode, setPayMode]     = useState('UPI')

  /* post-submit */
  const [srn, setSrn]             = useState('')
  const [showSuccess, setShowSuccess] = useState(false)

  /* ── helpers ──────────────────────────────── */
  const setField = (k, v) => setFormData(p => ({ ...p, [k]: v }))

  const feeNum = (s = '') => {
    const m = s.replace(/[^0-9]/g, '').match(/^(\d+)/)
    return m ? parseInt(m[1], 10) : 0
  }

  /* ── auto-prefill from ?cin= ─────────────── */
  useEffect(() => {
    const cParam = searchParams.get('cin')
    if (cParam && cParam !== cin) {
      setCin(cParam)
      const c = companies.find(x => x.cin.toLowerCase() === cParam.toLowerCase())
      if (c) {
        setCompany(c)
        setErrors(p => { const { cin: _, ...r } = p; return r })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /* ── live CIN lookup ─────────────────────── */
  const lookupCin = val => {
    setCin(val)
    if (val.length >= 6) {
      const c = companies.find(x => x.cin.toLowerCase() === val.toLowerCase())
      if (c) {
        if (c.status !== 'Active') {
          setErrors({ cin: `Company is "${c.status}" — filing not available for non-active entities.` })
          setCompany(null)
        } else {
          setCompany(c)
          setErrors(p => { const { cin: _, ...r } = p; return r })
        }
      } else {
        setCompany(null)
      }
    } else {
      setCompany(null)
    }
  }

  /* ── validation ──────────────────────────── */
  const validate = () => {
    const e = {}
    if (step === 1) {
      if (!cin.trim())                       e.cin = 'CIN / LLPIN is required'
      else if (!company)                     e.cin = 'Company not found — check the CIN'
      else if (company.status !== 'Active')  e.cin = `Company is "${company.status}" — cannot file`
    }
    if (step === 2) {
      if (!formData.fy) e.fy = 'Please select a Financial Year'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ── navigation ──────────────────────────── */
  const next = () => { if (validate()) setStep(s => Math.min(s + 1, 5)) }
  const prev = () => setStep(s => Math.max(s - 1, 1))
  const goTo = s => {
    if (s < step) setStep(s)
    else { if (validate()) setStep(s) }
  }

  /* ── file management ─────────────────────── */
  const addFiles = incoming => {
    const arr = Array.from(incoming)
    setFiles(prev => [...prev, ...arr.map(f => ({ id: `${Date.now()}-${Math.random().toString(36).slice(2,7)}`, file: f }))])
  }

  const removeFile = id => setFiles(prev => prev.filter(f => f.id !== id))

  const dropHandler = e => { e.preventDefault(); addFiles(e.dataTransfer.files) }

  /* ── save draft ──────────────────────────── */
  const saveDraft = () => {
    const key = `draft_${form.id}_${Date.now()}`
    try {
      localStorage.setItem(key, JSON.stringify({
        formId: form.id,
        cin, company: company ? { cin: company.cin, name: company.name } : null,
        formData,
        step,
        savedAt: new Date().toISOString(),
      }))
      setDraftSaved(true)
      setTimeout(() => setDraftSaved(false), 2200)
    } catch { /* quota exceeded — silent */ }
  }

  /* ── submit / pay ────────────────────────── */
  const payForm = () => {
    if (!validate()) return
    const nsrn = 'T' + String(Math.floor(10_000_000 + Math.random() * 90_000_000))
    setSrn(nsrn)
    setShowSuccess(true)
    try {
      const filings = JSON.parse(localStorage.getItem('mca_filings') || '[]')
      filings.unshift({
        srn: nsrn, formId: form.id,
        cin: cin || '—', companyName: company?.name || '—',
        status: form.id.includes('KYC') ? 'Approved' : 'Under Processing',
        filingDate: new Date().toLocaleDateString('en-IN'),
        amount: form.fee,
      })
      localStorage.setItem('mca_filings', JSON.stringify(filings.slice(0, 50)))
    } catch { /* quota exceeded */ }
  }

  /* ── computed values ─────────────────────── */
  const base = feeNum(form.fee)
  const delayDays = 36
  const delayFee  = base > 0 ? delayDays * 100 : 0
  const totalFee  = base + delayFee

  const incompleteDrafts = step < 5

  /* ═══════════════════════════════════════════
     SUCCESS SCREEN
  ═══════════════════════════════════════════ */
  if (showSuccess) {
    return (
      <div className="max-w-[820px] mx-auto px-4 py-8 md:py-12">
        <div className="bg-white border border-slate-200 rounded-xl p-6 md:p-10 text-center shadow-sm">

          {/* green check */}
          <div className="w-18 h-18 w-[72px] h-[72px] bg-green-100 text-mcaGreen rounded-full flex items-center justify-center mx-auto text-3xl">
            <i className="fa-solid fa-check" aria-hidden="true" />
          </div>

          <h1 className="text-2xl font-bold text-mcaNavy mt-5">
            Your form has been submitted successfully
          </h1>
          <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
            As per V3 flow, SRN is generated after DSC and payment verification. Track the status in My Application.
          </p>

          {/* SRN card */}
          <div className="mt-6 bg-slate-50 border border-slate-200 rounded-lg p-5 text-left inline-block min-w-[300px]">
            <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-3 text-sm">
              <span className="text-slate-500">SRN</span>
              <span className="font-mono font-bold text-mcaNavy text-base flex items-center gap-2">
                {srn}
                <button
                  onClick={() => navigator.clipboard.writeText(srn)}
                  className="text-mcaTeal hover:underline text-xs font-medium"
                  aria-label="Copy SRN to clipboard"
                >
                  <i className="fa-regular fa-copy" /> Copy
                </button>
              </span>

              <span className="text-slate-500">Form</span>
              <span className="font-semibold">{form.id} — {form.title}</span>

              <span className="text-slate-500">Company</span>
              <span className="font-mono text-xs">{cin || '—'}</span>

              {company && <>
                <span className="text-slate-500">Name</span>
                <span className="font-medium">{company.name}</span>
              </>}

              <span className="text-slate-500">Amount Paid</span>
              <span className="font-semibold">₹{totalFee.toLocaleString('en-IN')} ({payMode})</span>

              <span className="text-slate-500">Date</span>
              <span>{new Date().toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' })}</span>
            </div>
          </div>

          {/* timeline */}
          <div className="mt-7 text-left bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="text-xs font-semibold text-amber-800 mb-2 uppercase tracking-wide">Application Timeline</div>
            <div className="flex flex-wrap items-center gap-2 text-xs">
              {['Fee Paid', 'Pending DSC', 'Under Processing',
                form.id.includes('KYC') ? 'Approved (STP)' : 'Approved'].map((t, i) => (
                <span key={t} className="flex items-center gap-2">
                  <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium border
                    ${i === 0
                      ? 'bg-green-100 text-green-800 border-green-300'
                      : 'bg-slate-100 text-slate-500 border-slate-200'}`}>
                    {i === 0 && <i className="fa-solid fa-check text-[10px]" />}
                    {i > 0 && <i className="fa-regular fa-clock text-[10px]" />}
                    {t}
                  </span>
                  {i < 3 && <i className="fa-solid fa-arrow-right text-slate-300 text-[10px]" />}
                </span>
              ))}
            </div>
          </div>

          {/* actions */}
          <div className="flex flex-col sm:flex-row justify-center gap-3 mt-8">
            <Link
              to="/"
              className="bg-nzPrimary text-white px-7 py-2.5 font-semibold hover:bg-nzMediumTeal transition text-center"
            >
              Back to Home
            </Link>
            <button
              onClick={() => {
                setShowSuccess(false); setStep(1); setCompany(null); setCin('')
                setFormData({ fy:'', agmDate:'', notes:'', din:'' }); setFiles([]); setSrn('')
              }}
              className="border border-mcaNavy text-mcaNavy bg-white px-7 py-2.5 rounded-lg font-semibold hover:bg-slate-50 transition"
            >
              File Another Form
            </button>
          </div>

          <p className="text-[11px] text-slate-400 mt-5">
            SRN {srn} — Date {new Date().toLocaleDateString('en-IN')} — Amount ₹{totalFee.toLocaleString('en-IN')} — this is a mock receipt for prototype purposes only.
          </p>
        </div>
      </div>
    )
  }

  /* ═══════════════════════════════════════════
     WIZARD
  ═══════════════════════════════════════════ */
  return (
    <div className="max-w-[1100px] mx-auto px-4 py-6">

      {/* ── breadcrumb ───────────────────────── */}
      <nav className="text-xs text-slate-500 mb-3" aria-label="Breadcrumb">
        <ol className="flex flex-wrap items-center gap-1">
          <li><Link to="/"  className="hover:text-mcaTeal hover:underline">Home</Link></li>
          <li aria-hidden="true" className="text-slate-300">›</li>
          <li><Link to="/efiling" className="hover:text-mcaTeal hover:underline">eFiling</Link></li>
          <li aria-hidden="true" className="text-slate-300">›</li>
          <li className="text-slate-700 font-medium">{form.id}</li>
        </ol>
      </nav>

      {/* ── form header ──────────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 mb-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-xs font-bold bg-mcaNavy text-white px-2.5 py-1 rounded-md">
                {form.id}
              </span>
              <span className="text-xs bg-slate-100 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-full">
                {form.category}
              </span>
              {form.badge && (
                <span className="text-xs bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded-full font-medium">
                  {form.badge}
                </span>
              )}
            </div>
            <h1 className="text-lg md:text-xl font-bold text-mcaNavy mt-2 leading-snug">{form.title}</h1>
            <p className="text-sm text-slate-600 mt-1.5">{form.desc}</p>
          </div>

          <div className="flex flex-col items-end gap-1.5 shrink-0">
            <div className="text-right">
              <div className="text-xs text-slate-500">Filing Fee</div>
              <div className="font-mono font-bold text-mcaNavy text-base">{form.fee}</div>
            </div>
            <button
              onClick={saveDraft}
              className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition
                ${draftSaved
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              aria-label="Save current progress as draft"
            >
              {draftSaved ? (
                <><i className="fa-solid fa-check mr-1" />Draft Saved</>
              ) : (
                <><i className="fa-regular fa-floppy-disk mr-1" />Save Draft</>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ── wizard progress ──────────────────── */}
      <nav className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 mb-6 shadow-sm" aria-label="Filing wizard progress">

        {/* desktop / tablet: full 5-step bar */}
        <ol className="hidden md:flex items-center justify-between" role="list">
          {WIZARD_STEPS.map((s, i) => {
            const done  = step > s.num
            const active = step === s.num
            const upcoming = step < s.num
            return (
              <li key={s.num} className="flex items-center flex-1 last:flex-none" role="listitem">
                <button
                  onClick={() => goTo(s.num)}
                  className="flex flex-col items-center gap-1.5 group focus:outline-none focus-visible:ring-2 focus-visible:ring-mcaTeal rounded-lg px-1"
                  aria-current={active ? 'step' : undefined}
                  aria-label={`Step ${s.num}: ${s.label}${done ? ' (completed)' : active ? ' (current)' : ' (upcoming)'}`}
                >
                  <span className={`flex items-center justify-center w-9 h-9 rounded-full text-xs font-bold border-2 transition
                    ${done    ? 'bg-mcaGreen text-white border-mcaGreen'  :
                       active ? 'bg-mcaNavy text-white border-mcaNavy'  :
                                'bg-slate-100 text-slate-400 border-slate-200 group-hover:border-slate-300'}`}>
                    {done
                      ? <i className="fa-solid fa-check text-xs" aria-hidden="true" />
                      : s.num}
                  </span>
                  <span className={`text-[11px] leading-tight text-center max-w-[100px]
                    ${active ? 'font-bold text-mcaNavy' :
                       done  ? 'text-mcaGreen font-medium' :
                               'text-slate-400'}`}>
                    {s.label}
                  </span>
                </button>

                {i < WIZARD_STEPS.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 rounded-full transition-colors
                    ${done ? 'bg-mcaGreen' : 'bg-slate-200'}`}
                    aria-hidden="true" />
                )}
              </li>
            )
          })}
        </ol>

        {/* mobile: current step only */}
        <div className="md:hidden flex items-center gap-3">
          <span className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-bold
            bg-mcaNavy text-white shrink-0`}>
            {step}
          </span>
          <div className="min-w-0">
            <div className="text-sm font-bold text-mcaNavy truncate">
              Step {step}: {WIZARD_STEPS[step - 1].label}
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              {step} of {WIZARD_STEPS.length}
            </div>
          </div>
          <div className="ml-auto flex gap-1" aria-hidden="true">
            {WIZARD_STEPS.map((_, i) => (
              <span key={i} className={`w-2 h-2 rounded-full transition
                ${i + 1 === step ? 'bg-mcaNavy' : i + 1 < step ? 'bg-mcaGreen' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>
      </nav>

      {/* ═══════════════════════════════════════
          STEP CONTENT
      ═══════════════════════════════════════ */}
      <div className="bg-white border border-slate-200 rounded-xl p-5 md:p-6 shadow-sm min-h-[340px]">

        {/* ── STEP 1 : Company Details ──────── */}
        {step === 1 && (
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-4">
              <span className="w-7 h-7 rounded-full bg-mcaNavy text-white text-xs font-bold flex items-center justify-center">1</span>
              <h2 className="font-bold text-mcaNavy text-base">Company Details</h2>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Enter your company's CIN or LLPIN. Data is auto-pulled from ROC Master Data — no manual entry required.
            </p>

            <label htmlFor="cin-input" className="text-sm font-medium text-slate-700">
              CIN / LLPIN / FCRN <span className="text-mcaRed">*</span>
            </label>
            <input
              id="cin-input"
              value={cin}
              onChange={e => lookupCin(e.target.value)}
              placeholder="e.g. L24239MH1981PLC002195  or  U72200KA2015PTC082345"
              className={`w-full border rounded-lg px-3.5 py-2.5 mt-1.5 font-mono text-sm
                transition focus:outline-none focus:ring-2 focus:ring-mcaTeal/30 focus:border-mcaTeal
                ${errors.cin ? 'border-mcaRed bg-red-50' : 'border-slate-300'}`}
              aria-invalid={!!errors.cin}
              aria-describedby={errors.cin ? 'cin-error' : undefined}
            />
            {errors.cin && (
              <p id="cin-error" className="text-xs text-mcaRed mt-1.5 flex items-center gap-1">
                <i className="fa-solid fa-circle-exclamation text-[10px]" aria-hidden="true" />
                {errors.cin}
              </p>
            )}

            {/* company auto-fill card */}
            {company && (
              <div className="mt-4 bg-green-50/50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <span className="w-8 h-8 rounded-full bg-green-100 text-mcaGreen flex items-center justify-center shrink-0 mt-0.5">
                    <i className="fa-solid fa-check text-xs" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-mcaNavy text-sm">{company.name}</div>
                    <div className="text-xs text-slate-600 font-mono mt-1 break-all">
                      {company.cin}
                    </div>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 mt-2 text-xs text-slate-600">
                      <div><span className="text-slate-500">ROC:</span> {company.roc}</div>
                      <div><span className="text-slate-500">Status:</span> <span className="text-mcaGreen font-medium">{company.status}</span></div>
                      <div><span className="text-slate-500">Auth Capital:</span> {company.authorizedCap}</div>
                      <div><span className="text-slate-500">Category:</span> {company.category || company.entityType}</div>
                      {company.incorporationDate && (
                        <div><span className="text-slate-500">Incorporated:</span> {company.incorporationDate}</div>
                      )}
                    </div>
                    <p className="text-[11px] text-mcaGreen mt-2">
                      <i className="fa-solid fa-circle-check mr-1" aria-hidden="true" />
                      Auto-filled from ROC Master Data — as per V3 (replaces manual entry in V2)
                    </p>
                  </div>
                </div>
              </div>
            )}

            {!company && cin.length > 5 && !errors.cin && (
              <div className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
                <i className="fa-solid fa-circle-info mr-1" aria-hidden="true" />
                No company found for this CIN. Please verify the number and try again.
              </div>
            )}

            {!company && cin.length <= 5 && (
              <p className="text-xs text-slate-500 mt-3">
                <i className="fa-solid fa-circle-info mr-1 opacity-50" aria-hidden="true" />
                V2: Download PDF → Fill offline.  V3: Enter CIN → auto-pre-fill company name, ROC, capital, address, directors from Master Data.
              </p>
            )}
          </div>
        )}

        {/* ── STEP 2 : Form Details ──────────── */}
        {step === 2 && (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-mcaNavy text-white text-xs font-bold flex items-center justify-center">2</span>
              <h2 className="font-bold text-mcaNavy text-base">Form Details</h2>
            </div>
            <p className="text-xs text-slate-500">
              Fields adapt to the form type. All fields support real-time inline validation.
            </p>

            {/* Financial Year — required */}
            <div>
              <label htmlFor="fy-select" className="text-sm font-medium text-slate-700">
                Financial Year / Period <span className="text-mcaRed">*</span>
              </label>
              <select
                id="fy-select"
                value={formData.fy}
                onChange={e => setField('fy', e.target.value)}
                className={`w-full border rounded-lg px-3.5 py-2.5 mt-1.5 text-sm
                  focus:outline-none focus:ring-2 focus:ring-mcaTeal/30 focus:border-mcaTeal
                  ${errors.fy ? 'border-mcaRed bg-red-50' : 'border-slate-300'}`}
                aria-invalid={!!errors.fy}
                aria-describedby={errors.fy ? 'fy-error' : undefined}
              >
                <option value="">Select Financial Year</option>
                <option>FY 2022-23</option>
                <option>FY 2023-24</option>
                <option>FY 2024-25</option>
                <option>FY 2025-26</option>
              </select>
              {errors.fy && (
                <p id="fy-error" className="text-xs text-mcaRed mt-1 flex items-center gap-1">
                  <i className="fa-solid fa-circle-exclamation text-[10px]" aria-hidden="true" />
                  {errors.fy}
                </p>
              )}
            </div>

            {/* AGM Date + GNL-1 SRN row */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="agm-date" className="text-sm font-medium text-slate-700">
                  AGM Date
                  <span className="text-xs text-slate-400 font-normal ml-1">(if applicable)</span>
                </label>
                <input
                  id="agm-date"
                  type="date"
                  value={formData.agmDate}
                  onChange={e => setField('agmDate', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 mt-1.5 text-sm
                    focus:outline-none focus:ring-2 focus:ring-mcaTeal/30 focus:border-mcaTeal"
                />
              </div>
              <div>
                <label htmlFor="gnl1-srn" className="text-sm font-medium text-slate-700">
                  SRN of GNL-1
                  <span className="text-xs text-slate-400 font-normal ml-1">(AGM extension, if any)</span>
                </label>
                <input
                  id="gnl1-srn"
                  placeholder="Optional — T..."
                  value={formData.notes}
                  onChange={e => setField('notes', e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 mt-1.5 text-sm font-mono
                    focus:outline-none focus:ring-2 focus:ring-mcaTeal/30 focus:border-mcaTeal"
                />
              </div>
            </div>

            {/* ── DIR-3-KYC specific ─── */}
            {form.id === 'DIR-3-KYC' && (
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs leading-relaxed">
                  <div className="font-bold text-blue-900 mb-1 flex items-center gap-1.5">
                    <i className="fa-solid fa-circle-info text-blue-600" aria-hidden="true" />
                    Triennial KYC — Effective 31 Mar 2026
                  </div>
                  <p className="text-blue-800">
                    DIN allotted on/before 31 Mar 2025 + KYC FY 2024-25 → next due <strong>30 Jun 2028</strong>.
                    Updating mobile/email/address within 30 days does <strong>not</strong> reset the 3-year cycle.
                  </p>
                  <p className="text-blue-700 mt-1.5">
                    Fee: On-time ₹0 · Late ₹5,000 · Second mobile update ₹500.
                    See <span className="underline font-medium">G.S.R.943(E)</span>.
                  </p>
                </div>
                <div>
                  <label htmlFor="din-input" className="text-sm font-medium text-slate-700">
                    DIN (Director Identification Number) <span className="text-mcaRed">*</span>
                  </label>
                  <input
                    id="din-input"
                    placeholder="e.g. 00012291"
                    value={formData.din}
                    onChange={e => setField('din', e.target.value)}
                    className="w-full border border-slate-300 rounded-lg px-3.5 py-2.5 mt-1.5 text-sm font-mono
                      focus:outline-none focus:ring-2 focus:ring-mcaTeal/30 focus:border-mcaTeal"
                  />
                </div>
              </div>
            )}

            {/* ── AOC-4 linked forms checklist ─── */}
            {form.id === 'AOC-4' && (
              <div className="bg-white border border-slate-200 rounded-lg p-4">
                <div className="text-sm font-semibold text-mcaNavy mb-2 flex items-center gap-1.5">
                  <i className="fa-solid fa-link text-mcaTeal" aria-hidden="true" />
                  Linked Forms (new in V3: up to 14 attachments)
                </div>
                <div className="grid sm:grid-cols-2 gap-2 text-sm">
                  {[
                    { label: 'AOC-1 — Subsidiary financial statements', checked: true },
                    { label: 'AOC-2 — Related party disclosures', checked: true },
                    { label: 'Extract of Board Report', checked: true },
                    { label: 'Extract of Audit Report', checked: true },
                  ].map(item => (
                    <label key={item.label} className="flex items-center gap-2 cursor-pointer hover:bg-slate-50 rounded px-2 py-1.5 transition">
                      <input type="checkbox" defaultChecked={item.checked}
                        className="w-4 h-4 rounded border-slate-300 text-mcaTeal focus:ring-mcaTeal/30" />
                      <span className="text-xs text-slate-700">{item.label}</span>
                    </label>
                  ))}
                </div>
                <p className="text-[11px] text-slate-500 mt-2">
                  Removal of attachments via Board/Audit extracts is a V3 improvement — no manual re-upload.
                </p>
              </div>
            )}

            {/* ── MGT-7 specific note ─── */}
            {form.id === 'MGT-7' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs leading-relaxed text-blue-800">
                <i className="fa-solid fa-file-excel mr-1" aria-hidden="true" />
                <strong>MGT-7:</strong> Upload the shareholder list as an Excel file. Maximum 300 MB (up to 15 files × 20 MB each).
                Real-time validation ensures share capital matches AOC-4 — errors shown inline, not after submit.
              </div>
            )}

            {/* generic notes */}
            <p className="text-xs text-slate-500 pt-1">
              <i className="fa-solid fa-circle-info mr-1 opacity-50" aria-hidden="true" />
              Real-time inline validation: share capital must match MGT-7; currency absolute (no rounding);
              DIN must be <em>Approved</em> status — errors flagged before submission per V3 standard.
            </p>
          </div>
        )}

        {/* ── STEP 3 : Document Upload ───────── */}
        {step === 3 && (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-mcaNavy text-white text-xs font-bold flex items-center justify-center">3</span>
              <h2 className="font-bold text-mcaNavy text-base">Document Upload</h2>
            </div>
            <p className="text-xs text-slate-500">
              Upload all required attachments. Accepted formats: PDF, XLSX, XLS. Maximum 10 MB per file unless otherwise specified.
            </p>

            {/* drag-and-drop zone */}
            <div
              onDragOver={e => e.preventDefault()}
              onDrop={dropHandler}
              className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center bg-slate-50/50 hover:border-mcaTeal hover:bg-mcaTeal/5 transition cursor-pointer group"
              role="button"
              tabIndex={0}
              aria-label="Drop files here or click to browse"
              onClick={e => {
                const inp = e.currentTarget.querySelector('input[type=file]')
                if (inp) inp.click()
              }}
              onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') e.currentTarget.click() }}
            >
              <div className="text-slate-400 text-3xl mb-3 group-hover:text-mcaTeal transition">
                <i className="fa-solid fa-cloud-arrow-up" aria-hidden="true" />
              </div>
              <div className="text-sm font-medium text-slate-700">
                Drag &amp; drop files here or{' '}
                <span className="text-mcaTeal underline font-semibold">Browse</span>
              </div>
              <p className="text-xs text-slate-500 mt-1.5">
                {form.id === 'MGT-7'
                  ? 'MGT-7 shareholder list Excel — up to 300 MB (15 × 20 MB)'
                  : form.id === 'IEPF-1'
                    ? 'IEPF Excel upload — 200 MB max (40 × 5 MB); must validate before payment'
                    : 'Board Report / Audit Report / MOA / AOA — 10 MB per file, 2 MB for MGT-7A'}
              </p>
              <input
                type="file"
                multiple
                className="hidden"
                accept=".pdf,.xlsx,.xls,.csv"
                onChange={e => addFiles(e.target.files)}
              />
            </div>

            {/* uploaded files list */}
            {files.length > 0 && (
              <div className="border border-slate-200 rounded-lg divide-y divide-slate-100">
                {files.map(f => (
                  <div key={f.id} className="flex items-center justify-between gap-3 px-4 py-2.5 text-sm hover:bg-slate-50 transition">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <i className="fa-solid fa-file text-slate-400 shrink-0" aria-hidden="true" />
                      <span className="truncate text-slate-700">{f.file.name}</span>
                      <span className="text-xs text-slate-400 shrink-0">
                        ({(f.file.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                    </div>
                    <button
                      onClick={() => removeFile(f.id)}
                      className="text-mcaRed hover:text-red-800 text-xs font-medium shrink-0 px-2 py-1 rounded hover:bg-red-50 transition"
                      aria-label={`Remove ${f.file.name}`}
                    >
                      <i className="fa-solid fa-trash-can" aria-hidden="true" /> Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {files.length === 0 && (
              <p className="text-xs text-slate-500 text-center">
                No files uploaded yet. Add all required documents before proceeding to review.
              </p>
            )}

            {/* DSC association mock */}
            <div className="bg-white border border-slate-200 rounded-lg p-4">
              <div className="text-sm font-semibold text-mcaNavy flex items-center gap-2">
                <i className="fa-solid fa-certificate text-amber-600" aria-hidden="true" />
                DSC Association
              </div>
              <p className="text-xs text-slate-600 mt-1.5">
                Associate your DSC with a role (Director / Professional / Manager) before filing.
                Only 1 DSC per User ID. In production this triggers emSigner 2.1 check.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-xs">
                <span className="bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
                  <i className="fa-solid fa-check mr-1" aria-hidden="true" />DSC Associated
                </span>
                <span className="bg-slate-50 text-slate-600 border border-slate-200 px-2.5 py-1 rounded-full font-mono">
                  PAN: ABCDE1234F
                </span>
              </div>
            </div>
          </div>
        )}

        {/* ── STEP 4 : Review & Submit ───────── */}
        {step === 4 && (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-mcaNavy text-white text-xs font-bold flex items-center justify-center">4</span>
              <h2 className="font-bold text-mcaNavy text-base">Review &amp; Submit</h2>
            </div>
            <p className="text-xs text-slate-500">
              Please review all details below. Click <strong>Edit</strong> to go back and make changes before submission.
            </p>

            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  {/* company rows */}
                  <tr className="border-b border-slate-100">
                    <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium w-[180px]">CIN / LLPIN</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs">{cin || '—'}</span>
                        <button onClick={() => goTo(1)} className="text-mcaTeal text-xs underline hover:text-mcaNavy transition">Edit</button>
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">Company Name</td>
                    <td className="px-4 py-2.5 font-medium">{company?.name || '—'}</td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">ROC / Status</td>
                    <td className="px-4 py-2.5">
                      {company ? (
                        <span>{company.roc} · <span className="text-mcaGreen font-medium">{company.status}</span></span>
                      ) : '—'}
                    </td>
                  </tr>

                  <tr className="border-b border-slate-100">
                    <td colSpan={2} className="bg-slate-50/80 px-4 py-2 text-xs font-bold text-mcaNavy uppercase tracking-wide">
                      Form Details
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">Financial Year</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span>{formData.fy || '—'}</span>
                        <button onClick={() => goTo(2)} className="text-mcaTeal text-xs underline hover:text-mcaNavy transition">Edit</button>
                      </div>
                    </td>
                  </tr>
                  {formData.agmDate && (
                    <tr className="border-b border-slate-100">
                      <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">AGM Date</td>
                      <td className="px-4 py-2.5">{formData.agmDate}</td>
                    </tr>
                  )}
                  {form.id === 'DIR-3-KYC' && formData.din && (
                    <tr className="border-b border-slate-100">
                      <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">DIN</td>
                      <td className="px-4 py-2.5 font-mono">{formData.din}</td>
                    </tr>
                  )}
                  {formData.notes && (
                    <tr className="border-b border-slate-100">
                      <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">GNL-1 SRN</td>
                      <td className="px-4 py-2.5 font-mono text-xs">{formData.notes}</td>
                    </tr>
                  )}

                  <tr className="border-b border-slate-100">
                    <td colSpan={2} className="bg-slate-50/80 px-4 py-2 text-xs font-bold text-mcaNavy uppercase tracking-wide">
                      Documents
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">Uploaded Files</td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs">
                          {files.length > 0
                            ? <>{files.length} file{files.length > 1 ? 's' : ''}: {files.map(f => f.file.name).join(', ')}</>
                            : 'No files uploaded'}
                        </span>
                        <button onClick={() => goTo(3)} className="text-mcaTeal text-xs underline hover:text-mcaNavy transition shrink-0">Edit</button>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <td colSpan={2} className="bg-slate-50/80 px-4 py-2 text-xs font-bold text-mcaNavy uppercase tracking-wide">
                      Filing Fee
                    </td>
                  </tr>
                  <tr>
                    <td className="bg-slate-50 px-4 py-2.5 text-slate-500 font-medium">Total Payable</td>
                    <td className="px-4 py-2.5 font-bold font-mono text-mcaNavy">₹{totalFee.toLocaleString('en-IN')}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-[11px] text-slate-500">
              Once you click "Proceed to Payment", you will be taken to the payment step.
              The SRN will be generated after payment confirmation.
            </p>
          </div>
        )}

        {/* ── STEP 5 : Payment & SRN ────────── */}
        {step === 5 && (
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="w-7 h-7 rounded-full bg-mcaNavy text-white text-xs font-bold flex items-center justify-center">5</span>
              <h2 className="font-bold text-mcaNavy text-base">Payment &amp; SRN Generation</h2>
            </div>
            <p className="text-xs text-slate-500">
              Fee is calculated as per the Companies (Registration Offices and Fees) Rules, 2014.
            </p>

            {/* fee breakdown */}
            <div className="border border-slate-200 rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2.5 text-slate-600">Base Filing Fee</td>
                    <td className="px-4 py-2.5 text-right font-mono font-medium text-slate-800">
                      ₹{base.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="border-b border-slate-100">
                    <td className="px-4 py-2.5 text-slate-600">
                      Delay Penalty ({delayDays} days × ₹100/day)
                    </td>
                    <td className="px-4 py-2.5 text-right font-mono font-medium text-amber-700">
                      ₹{delayFee.toLocaleString('en-IN')}
                    </td>
                  </tr>
                  <tr className="bg-slate-50">
                    <td className="px-4 py-3 font-bold text-mcaNavy">Total Payable</td>
                    <td className="px-4 py-3 text-right font-mono font-bold text-mcaNavy text-base">
                      ₹{totalFee.toLocaleString('en-IN')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* payment methods */}
            <div>
              <div className="text-sm font-semibold text-mcaNavy mb-2">Select Payment Method</div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2" role="radiogroup" aria-label="Payment method">
                {[
                  { key: 'UPI',          label: 'UPI',          icon: 'fa-solid fa-mobile-screen' },
                  { key: 'Card',         label: 'Card',         icon: 'fa-solid fa-credit-card' },
                  { key: 'Net Banking',  label: 'Net Banking',  icon: 'fa-solid fa-building-columns' },
                  { key: 'MCA Wallet',   label: 'MCA Wallet',   icon: 'fa-solid fa-wallet' },
                ].map(m => (
                  <button
                    key={m.key}
                    onClick={() => setPayMode(m.key)}
                    className={`border rounded-lg p-3 text-center text-xs font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-mcaTeal
                      ${payMode === m.key
                        ? 'bg-mcaNavy text-white border-mcaNavy shadow-sm'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
                    role="radio"
                    aria-checked={payMode === m.key}
                  >
                    <i className={`${m.icon} text-base mb-1 block`} aria-hidden="true" />
                    {m.label}
                  </button>
                ))}
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                <i className="fa-solid fa-circle-info mr-1 opacity-50" aria-hidden="true" />
                UPI is preloaded via wallet in V3. Pay Later (offline challan) is no longer available.
              </p>
            </div>

            {/* disclaimer */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-xs text-amber-800">
              <i className="fa-solid fa-triangle-exclamation mr-1" aria-hidden="true" />
              A pop-up is required for the payment receipt. In this prototype, the receipt is shown inline after payment.
            </div>
          </div>
        )}
      </div>

      {/* ── bottom navigation ────────────────── */}
      <div className="bg-white border border-slate-200 rounded-xl p-4 md:p-5 mt-4 shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between gap-3">

          {/* previous */}
          <button
            onClick={prev}
            disabled={step === 1}
            className={`flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-sm border transition
              ${step === 1
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'}`}
            aria-label="Go to previous step"
          >
            <i className="fa-solid fa-arrow-left text-xs" aria-hidden="true" />
            Previous
          </button>

          {/* save draft + next / pay */}
          <div className="flex gap-2">
            <button
              onClick={saveDraft}
              className={`px-4 py-2.5 rounded-lg border text-sm font-medium transition
                ${draftSaved
                  ? 'bg-green-50 text-green-700 border-green-200'
                  : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'}`}
              aria-label="Save draft"
            >
              {draftSaved ? (
                <><i className="fa-solid fa-check mr-1" />Saved</>
              ) : (
                <><i className="fa-regular fa-floppy-disk mr-1" />Save Draft</>
              )}
            </button>

            {step < 5 ? (
              <button
                onClick={next}
                className="bg-mcaNavy text-white px-7 py-2.5 rounded-lg font-semibold hover:opacity-90 transition text-sm flex items-center gap-2"
                aria-label={`Continue to step ${step + 1}`}
              >
                Next
                <i className="fa-solid fa-arrow-right text-xs" aria-hidden="true" />
              </button>
            ) : (
              <button
                onClick={payForm}
                className="bg-mcaGreen text-white px-7 py-2.5 rounded-lg font-semibold hover:opacity-90 transition text-sm flex items-center gap-2 shadow-sm"
                aria-label="Pay and submit form"
              >
                <i className="fa-solid fa-lock text-xs" aria-hidden="true" />
                Pay ₹{totalFee.toLocaleString('en-IN')} &amp; Submit
              </button>
            )}
          </div>
        </div>

        {/* step-specific hints */}
        <div className="mt-3 text-[11px] text-slate-500 text-center">
          {step === 1 && 'V2: Manual entry.  V3: CIN auto-prefills — company details pulled from ROC Master Data.'}
          {step === 2 && 'Fields adapt per form type — real-time inline validation before payment (V3 improvement).'}
          {step === 3 && `${files.length} file${files.length !== 1 ? 's' : ''} uploaded · Accepted: PDF, XLSX, XLS — 10 MB per file (2 MB for MGT-7A).`}
          {step === 4 && 'Review all details above. Click Edit on any section to go back and make changes.'}
          {step === 5 && 'V2: Download PDF → Pay offline challan.  V3: Web-based payment → SRN generated instantly.'}
        </div>
      </div>
    </div>
  )
}
