import { useEffect, useMemo, useState } from "react"

// --- Types ---
type UserCategory = "Registered User" | "Business User"

type FormData = {
  // Step 1
  userCategory: UserCategory
  userRole: string
  pan: string
  // Step 2
  firstName: string
  middleName: string
  lastName: string
  dob: string
  gender: "Male" | "Female" | "Other" | ""
  profession: string
  industry: string
  // Step 3
  address1: string
  address2: string
  country: string
  pinCode: string
  state: string
  city: string
  area: string
  telRes: string
  telOff: string
  mobile: string
  mobileCode: string
  email: string
  // Step 4
  password: string
  confirmPassword: string
  smsAlert: "Yes" | "No"
  terms: boolean
}

const initialData: FormData = {
  userCategory: "Registered User",
  userRole: "Individual",
  pan: "",
  firstName: "ANUSURI",
  middleName: "DURGA",
  lastName: "AVINASH",
  dob: "13/05/2007",
  gender: "Male",
  profession: "Businessperson",
  industry: "Real estate activities",
  address1: "",
  address2: "",
  country: "",
  pinCode: "",
  state: "",
  city: "",
  area: "",
  telRes: "",
  telOff: "",
  mobile: "",
  mobileCode: "+91",
  email: "",
  password: "",
  confirmPassword: "",
  smsAlert: "Yes",
  terms: false,
}

const ROLES = ["Individual", "HUF", "Company Director", "Manager", "Partner", "Proprietor"]
const PROFESSIONS = ["Businessperson", "Professional - CA/CS/CMA", "Government Employee", "Private Employee", "Retired", "Student", "Other"]
const INDUSTRIES = ["Real estate activities", "Manufacturing", "Information Technology", "Finance & Insurance", "Construction", "Education", "Healthcare", "Agriculture", "Professional Services", "Other"]
const COUNTRIES = ["India", "United States", "United Kingdom", "Singapore", "UAE", "Australia", "Canada"]
const STATES: Record<string, string[]> = {
  India: ["Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Delhi","Goa","Gujarat","Haryana","Karnataka","Kerala","Maharashtra","Tamil Nadu","Telangana","Uttar Pradesh","West Bengal"],
  "United States": ["California","New York","Texas"],
  "United Kingdom": ["England","Scotland","Wales"],
}
const CITIES: Record<string, string[]> = {
  Maharashtra: ["Mumbai","Pune","Nagpur"],
  Karnataka: ["Bengaluru","Mysuru"],
  Delhi: ["New Delhi","Dwarka"],
  "Tamil Nadu": ["Chennai","Coimbatore"],
}

function validateStep(step: number, d: FormData) {
  const e: Record<string,string> = {}
  if (step === 1) {
    if (!d.userCategory) e.userCategory = "Select a category"
    if (!d.userRole) e.userRole = "Select a role"
    if (!d.pan) e.pan = "PAN is required"
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(d.pan.toUpperCase())) e.pan = "PAN should be 5 letters, 4 digits, 1 letter (e.g. ABCDE1234F)"
  }
  if (step === 2) {
    if (!d.firstName.trim()) e.firstName = "Required"
    if (!d.dob) e.dob = "Date of birth is required"
    if (!d.gender) e.gender = "Select gender"
    if (!d.profession) e.profession = "Select profession"
  }
  if (step === 3) {
    if (!d.address1.trim()) e.address1 = "Address Line 1 is required"
    if (!d.country) e.country = "Country is required"
    if (!d.pinCode) e.pinCode = "PIN is required"
    else if (d.country==="India" && !/^\d{6}$/.test(d.pinCode)) e.pinCode = "6-digit PIN required"
    if (!d.state) e.state = "State is required"
    if (!d.city) e.city = "City is required"
    if (!d.area) e.area = "Area/Locality is required"
    if (!d.mobile) e.mobile = "Mobile is required"
    else if (!/^\d{10}$/.test(d.mobile.replace(/\D/g,""))) e.mobile = "Enter 10-digit mobile"
    if (!d.email) e.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter valid email"
  }
  if (step === 4) {
    if (!d.password) e.password = "Password is required"
    else {
      if (d.password.length < 6 || d.password.length > 15) e.password = "6 to 15 characters"
      else if (!/(?=.*[A-Za-z])(?=.*\d)/.test(d.password)) e.password = "Must be alphanumeric"
      else if (!/[!@#$%^&*()~]/.test(d.password)) e.password = "Add one special char (! @ # $ % ^ & * ( ) ~)"
    }
    if (d.confirmPassword !== d.password) e.confirmPassword = "Passwords do not match"
    if (!d.terms) e.terms = "You must agree to Terms"
  }
  return e
}

export default function App() {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<FormData>(initialData)
  const [touched, setTouched] = useState<Record<string,boolean>>({})
  const [showPass, setShowPass] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [animateStep, setAnimateStep] = useState(1)

  useEffect(()=>{ setAnimateStep(step) },[step])

  const errors = useMemo(()=> validateStep(step, data), [step, data])
  const stepErrors = (field:string) => touched[field] ? errors[field] : undefined

  void validateStep; // keep helper referenced
  const canNext = Object.keys(validateStep(step, data)).length===0
  void canNext

  const handleNext = () => {
    const errs = validateStep(step, data)
    if (Object.keys(errs).length) {
      setTouched(prev=> ({...prev, ...Object.fromEntries(Object.keys(errs).map(k=>[k,true]))}))
      // Mark all fields of step as touched
      const all = step===1?["userCategory","userRole","pan"]: step===2?["firstName","dob","gender","profession"]: step===3?["address1","country","pinCode","state","city","area","mobile","email"]:["password","confirmPassword","terms"]
      setTouched(p=>({...p, ...Object.fromEntries(all.map(k=>[k,true]))}))
      return
    }
    if (step<4) setStep(s=> s+1)
    else setCompleted(true)
    window.scrollTo({top:0, behavior:"smooth"})
  }

  const handleBack = () => {
    if (step>1) setStep(s=> s-1)
    window.scrollTo({top:0, behavior:"smooth"})
  }

  // Password policy live
  const pwChecks = useMemo(()=> ({
    alphanum: /(?=.*[A-Za-z])(?=.*\d)/.test(data.password),
    length: data.password.length>=6 && data.password.length<=15,
    special: /[!@#$%^&*()~]/.test(data.password),
    caseSensitive: data.password.length>0
  }), [data.password])

  const progress = ((step-1)/3)*100

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* Top tricolor hairline */}
      <div className="h-[3px] w-full bg-gradient-to-r from-[#FF6B2C] via-white to-[#0E793C]" />

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-xl border-b border-slate-200">
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 h-[64px] flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-white grid place-items-center shadow-sm overflow-hidden">
              <span className="font-serif font-extrabold text-[10px] tracking-[0.12em] leading-none">सत्यमेव<br/>जयते</span>
            </div>
            <div className="leading-tight">
              <div className="font-display font-bold text-[13px] tracking-tight text-slate-900 flex items-center gap-2">
                Ministry of Corporate Affairs <span className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold tracking-wide">GOVT. OF INDIA</span>
              </div>
              <div className="text-[11px] font-medium text-slate-500 hidden sm:block">mca.gov.in • One-stop compliance for Companies &amp; LLPs</div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden lg:inline-flex items-center gap-2 text-[12px] font-semibold text-slate-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              MCA21 V3 • Secure
            </span>
            <a href="#" className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold hover:bg-slate-50 transition">Help &amp; FAQs</a>
            <a href="#" className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-black transition">Sign in</a>
          </div>
        </div>
      </header>

      {/* Page head */}
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 lg:px-8 pt-8 pb-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 shadow-sm px-3 py-1.5">
              <span className="w-2 h-2 rounded-full bg-[#FF6B2C]" />
              <span className="text-[11px] font-bold tracking-[0.14em] text-slate-500">MCA PORTAL • SECURE REGISTRATION</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="hidden sm:inline text-[11px] font-medium text-slate-600">346 verified routes • V3 mandatory</span>
            </div>
            <h1 className="mt-4 font-display font-[700] text-[30px] sm:text-[36px] leading-[0.95] tracking-[-0.03em] text-slate-900">
              Create your <span className="font-serif italic font-[800] text-[#0f2a6b]">MCA</span> account
            </h1>
            <p className="mt-3 max-w-[640px] text-[13.5px] leading-6 text-slate-600">
              One account for SPICe+ incorporation, annual filings (AOC-4 / MGT-7), DIN-KYC, DSC signing and master-data search. Takes ~3 minutes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-semibold">
              <span className="px-2.5 py-1 rounded-full bg-slate-900 text-white">🔒 PAN-verified</span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700">DSC-ready</span>
              <span className="px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700">SRN tracking</span>
              <span className="hidden sm:inline-flex px-2.5 py-1 rounded-full bg-orange-50 border border-orange-200 text-orange-700">FO Services stay free</span>
            </div>
          </div>
          <div className="hidden lg:flex flex-col items-end gap-2 min-w-[280px]">
            <div className="rounded-2xl bg-white border border-slate-200 shadow-sm p-4 w-full">
              <div className="text-[11px] font-bold tracking-widest text-slate-400">NEED HELP?</div>
              <div className="mt-2 text-sm font-semibold leading-snug">New to MCA? Start as <span className="text-[#0f2a6b]">Registered User</span>. Professionals choose Business User.</div>
              <a href="#" className="mt-2 inline-flex text-xs font-bold text-sky-700 hover:underline">View help kit → SPICe+ &amp; linked filings</a>
            </div>
          </div>
        </div>
      </div>

      {/* Stepper */}
      <div className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8">
        <div className="rounded-[24px] bg-white border border-slate-200 shadow-sm overflow-hidden">
          {/* progress bar */}
          <div className="h-1 w-full bg-slate-100">
            <div className="h-full bg-gradient-to-r from-[#0f2a6b] to-[#FF6B2C] transition-all duration-700 ease-out" style={{width: `${progress}%`}} />
          </div>
          <div className="px-4 sm:px-6 lg:px-8 py-5">
            <div className="grid grid-cols-4 gap-2 sm:gap-3">
              {[
                {n:1, label:"User Category", sub:"PAN & role"},
                {n:2, label:"Personal Details", sub:"Identity"},
                {n:3, label:"Contact Details", sub:"Address & mobile"},
                {n:4, label:"Login Details", sub:"Password & alerts"},
              ].map(s=> {
                const state = s.n < step ? "done" : s.n===step ? "active" : "todo"
                return (
                  <div key={s.n} className="relative flex flex-col items-center text-center">
                    {s.n < 4 && (
                      <div className={`hidden sm:block absolute top-[16px] left-[58%] w-[84%] h-[2px] ${s.n < step ? "bg-[#0f2a6b]" : "bg-slate-200"}`} />
                    )}
                    <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full grid place-items-center text-[13px] font-bold border-2 transition
                      ${state==="done" ? "bg-[#0f2a6b] border-[#0f2a6b] text-white" : state==="active" ? "bg-[#0f2a6b] border-[#0f2a6b] text-white shadow-[0_6px_16px_rgba(15,42,107,0.25)]" : "bg-white border-slate-300 text-slate-500"}`}>
                      {state==="done" ? "✓" : s.n}
                    </div>
                    <div className={`mt-2 text-[12px] sm:text-[13px] font-bold leading-tight ${state==="active" ? "text-[#0f2a6b]" : state==="done" ? "text-slate-800" : "text-slate-500"}`}>{s.label}</div>
                    <div className="hidden sm:block text-[11px] font-medium text-slate-400">{s.sub}</div>
                    {state==="active" && <div className="mt-1 hidden sm:block h-1 w-8 rounded-full bg-[#FF8A3D]" />}
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Form Card */}
      <main className="mx-auto max-w-[1120px] px-4 sm:px-6 lg:px-8 mt-6 pb-10">
        <div className="rounded-[24px] sm:rounded-[28px] bg-white border border-slate-200 shadow-[0_16px_40px_rgba(15,23,42,0.08),0_4px_12px_rgba(15,23,42,0.06)] overflow-hidden">
          {/* Card header accent */}
          <div className="h-[4px] w-full bg-gradient-to-r from-[#FF6B2C] via-[#0f2a6b] to-[#0E793C]" />
          <div className="px-6 sm:px-8 lg:px-10 pt-7 pb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#fff7ed] border border-orange-200 grid place-items-center text-orange-600">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <h2 className="font-display font-bold text-[16px] leading-none tracking-tight text-slate-900">
                    {step===1 && "User Details"} {step===2 && "Personal Details"} {step===3 && "Contact Details"} {step===4 && "Login Details"}
                  </h2>
                  <p className="text-xs font-medium text-slate-500 mt-1">All fields marked <span className="text-red-600 font-bold">*</span> are mandatory • Step {step} of 4</p>
                </div>
              </div>
              <span className="inline-flex self-start sm:self-center px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold tracking-wide">V3 • Web-form, no DSC upload</span>
            </div>

            {/* orange rule */}
            <div className="mt-5 h-px w-full bg-slate-100 relative overflow-hidden">
              <div className="absolute inset-y-0 left-0 w-28 bg-[#FF8A3D]" />
            </div>

            {/* Animated step content */}
            <div key={animateStep} className="mt-6 animate-[in_0.45s_cubic-bezier(0.16,1,0.3,1)]" style={{animationName: "in"}}>
              <style>{`@keyframes in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>

              {/* STEP 1 */}
              {step===1 && (
                <div className="space-y-7">
                  <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 items-start">
                    <div className="space-y-6">
                      <Fieldset label="User Category *">
                        <div className="flex flex-wrap gap-3 mt-1">
                          {(["Registered User","Business User"] as UserCategory[]).map(v=> (
                            <label key={v} className={`group flex items-center gap-3 px-4 py-3 rounded-2xl border-2 cursor-pointer transition ${data.userCategory===v ? "bg-[#0f2a6b] border-[#0f2a6b] text-white shadow-md" : "bg-white border-slate-200 hover:border-slate-300 text-slate-700"}`}>
                              <span className={`w-4 h-4 rounded-full border-2 grid place-items-center ${data.userCategory===v ? "border-white" : "border-slate-300"}`}>
                                {data.userCategory===v && <span className="w-2 h-2 rounded-full bg-white" />}
                              </span>
                              <input type="radio" name="userCategory" value={v} checked={data.userCategory===v} onChange={()=> setData({...data, userCategory: v})} className="sr-only" />
                              <span className="text-sm font-semibold">{v}</span>
                            </label>
                          ))}
                        </div>
                        <div className="mt-2 text-[11px] leading-5 text-slate-500 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2">
                          <b className="text-slate-700">Tip:</b> Choose <b>Registered User</b> for personal filings, DIN services, and company search. <b>Business User</b> for practicing professionals (CA/CS/CMA) needing DSC association.
                        </div>
                      </Fieldset>

                      <div className="grid sm:grid-cols-2 gap-5">
                        <Field label="User Role *" error={stepErrors("userRole")} hint="Pick the closest match">
                          <div className="relative">
                            <select value={data.userRole} onChange={e=> setData({...data, userRole: e.target.value})} onBlur={()=> setTouched(p=>({...p,userRole:true}))}
                              className={`w-full h-11 rounded-xl border bg-white px-3 pr-9 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("userRole")?"border-red-300 bg-red-50":"border-slate-200"}`}>
                              {ROLES.map(r=> <option key={r}>{r}</option>)}
                            </select>
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                          </div>
                        </Field>

                        <Field label="Income Tax PAN *" error={stepErrors("pan")} hint="As on PAN card • e.g. ABCDE1234F">
                          <input value={data.pan} onChange={e=> setData({...data, pan: e.target.value.toUpperCase().slice(0,10)})} onBlur={()=> setTouched(p=>({...p,pan:true}))}
                            placeholder="Enter PAN" maxLength={10}
                            className={`w-full h-11 rounded-xl border px-3 text-sm font-semibold tracking-widest uppercase placeholder:normal-case placeholder:tracking-normal placeholder:font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("pan")?"border-red-300 bg-red-50 focus:border-red-400 focus:ring-red-50":"border-slate-200 bg-white"}`} />
                        </Field>
                      </div>

                      {stepErrors("pan") && <p className="text-xs font-semibold text-red-600 -mt-3">{stepErrors("pan")}</p>}

                      <div className="rounded-2xl bg-[#f0f6ff] border border-sky-200 p-4 flex gap-3">
                        <span className="w-8 h-8 rounded-full bg-white border border-sky-200 grid place-items-center shrink-0">🛡️</span>
                        <div className="text-xs leading-5 text-sky-900">
                          <b>Why PAN?</b> PAN is verified with Income Tax records and pre-fills your name/DOB on the next step. No DSC needed at this stage.
                        </div>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-5">
                      <div className="text-xs font-bold tracking-[0.14em] text-slate-400">WHAT YOU GET</div>
                      <h3 className="mt-2 font-bold text-sm leading-snug">One login for incorporation → filing → payment → document download</h3>
                      <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
                        <li className="flex gap-2"><span className="text-emerald-600">✓</span> SPICe+ company incorporation &amp; FiLLiP for LLPs</li>
                        <li className="flex gap-2"><span className="text-emerald-600">✓</span> Track SRN • Resubmit • Pay fees • View public docs</li>
                        <li className="flex gap-2"><span className="text-emerald-600">✓</span> Upgrade to Business User &amp; associate DSC later</li>
                      </ul>
                      <div className="mt-4 rounded-xl bg-white border border-slate-200 p-3 text-xs leading-5">
                        <b>Already filed on V2?</b> After registration, merge your V2 ID when prompted — don’t create a duplicate.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2 */}
              {step===2 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="First Name" hint="As per PAN" error={stepErrors("firstName")}>
                      <input value={data.firstName} onChange={e=> setData({...data, firstName: e.target.value})} onBlur={()=> setTouched(p=>({...p,firstName:true}))}
                        className={`w-full h-11 rounded-xl border px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("firstName")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} placeholder="As per PAN" />
                    </Field>
                    <Field label="Middle Name" >
                      <input value={data.middleName} onChange={e=> setData({...data, middleName: e.target.value})}
                        className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]" placeholder="Optional" />
                    </Field>
                    <Field label="Last Name">
                      <input value={data.lastName} onChange={e=> setData({...data, lastName: e.target.value})}
                        className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]" placeholder="Optional" />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="Date Of Birth *" error={stepErrors("dob")}>
                      <div className="relative">
                        <input value={data.dob} onChange={e=> setData({...data, dob: e.target.value})} onBlur={()=> setTouched(p=>({...p,dob:true}))}
                          placeholder="DD/MM/YYYY" inputMode="numeric"
                          className={`w-full h-11 rounded-xl border pl-3 pr-10 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("dob")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 rounded-lg bg-white border border-slate-200 grid place-items-center text-slate-500">📅</span>
                      </div>
                    </Field>

                    <Field label="Gender *" error={stepErrors("gender")}>
                      <div className="flex items-center gap-2 mt-1">
                        {["Male","Female","Other"].map(g=> (
                          <label key={g} className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl border-2 cursor-pointer text-sm font-semibold transition ${data.gender===g ? "border-[#0f2a6b] bg-[#0f2a6b] text-white" : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"}`}>
                            <input type="radio" name="gender" value={g} checked={data.gender===g} onChange={()=> setData({...data, gender: g as any})} onBlur={()=> setTouched(p=>({...p,gender:true}))} className="sr-only" />
                            <span className={`w-3 h-3 rounded-full border ${data.gender===g?"border-white bg-white":"border-slate-300"}`} />{g}
                          </label>
                        ))}
                      </div>
                    </Field>

                    <Field label="Profession *" error={stepErrors("profession")}>
                      <div className="relative">
                        <select value={data.profession} onChange={e=> setData({...data, profession: e.target.value})} onBlur={()=> setTouched(p=>({...p,profession:true}))}
                          className={`w-full h-11 rounded-xl border bg-white px-3 pr-8 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("profession")?"border-red-300 bg-red-50":"border-slate-200"}`}>
                          {PROFESSIONS.map(p=> <option key={p}>{p}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                      </div>
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="Industry Of Operation">
                      <div className="relative">
                        <select value={data.industry} onChange={e=> setData({...data, industry: e.target.value})}
                          className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 pr-8 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]">
                          {INDUSTRIES.map(i=> <option key={i}>{i}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                      </div>
                    </Field>
                    <div className="md:col-span-2">
                      <div className="rounded-2xl bg-amber-50 border border-amber-200 p-3.5 text-xs leading-5 text-amber-900 flex gap-2">
                        <span className="shrink-0">💡</span>
                        <span><b>Heads up:</b> Name is auto-validated against PAN. If it mismatches, update PAN first — MCA won’t let you proceed otherwise.</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3 */}
              {step===3 && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="Address Line 1 *" error={stepErrors("address1")}>
                      <input value={data.address1} onChange={e=> setData({...data, address1: e.target.value})} onBlur={()=> setTouched(p=>({...p,address1:true}))}
                        placeholder="House no., street" className={`w-full h-11 rounded-xl border px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("address1")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                    </Field>
                    <Field label="Address Line 2">
                      <input value={data.address2} onChange={e=> setData({...data, address2: e.target.value})}
                        placeholder="Apartment, suite (optional)" className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]" />
                    </Field>
                    <Field label="Country *" error={stepErrors("country")}>
                      <div className="relative">
                        <select value={data.country} onChange={e=> setData({...data, country: e.target.value, state:"", city:"", area:""})} onBlur={()=> setTouched(p=>({...p,country:true}))}
                          className={`w-full h-11 rounded-xl border bg-white px-3 pr-8 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("country")?"border-red-400 bg-red-50 ring-2 ring-red-100":"border-slate-200"}`}>
                          <option value="">Select Country</option>
                          {COUNTRIES.map(c=> <option key={c}>{c}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                      </div>
                      {stepErrors("country") && <p className="mt-1 text-[11px] font-bold text-red-600">This is required field</p>}
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="PIN Code *" error={stepErrors("pinCode")}>
                      <input value={data.pinCode} onChange={e=> setData({...data, pinCode: e.target.value.replace(/\D/g,"").slice(0,6)})} onBlur={()=> setTouched(p=>({...p,pinCode:true}))}
                        placeholder="Enter PIN Code" inputMode="numeric"
                        className={`w-full h-11 rounded-xl border px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("pinCode")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                    </Field>
                    <Field label="State *" error={stepErrors("state")}>
                      <div className="relative">
                        <select value={data.state} onChange={e=> setData({...data, state: e.target.value, city:""})} onBlur={()=> setTouched(p=>({...p,state:true}))}
                          disabled={!data.country} className={`w-full h-11 rounded-xl border bg-white px-3 pr-8 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] disabled:bg-slate-100 disabled:text-slate-400 ${stepErrors("state")?"border-red-300 bg-red-50":"border-slate-200"}`}>
                          <option value="">{data.country ? "Select State" : "Enter State"}</option>
                          {(STATES[data.country]||[]).map(s=> <option key={s}>{s}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                      </div>
                    </Field>
                    <Field label="City *" error={stepErrors("city")}>
                      <div className="relative">
                        <select value={data.city} onChange={e=> setData({...data, city: e.target.value, area:""})} onBlur={()=> setTouched(p=>({...p,city:true}))}
                          disabled={!data.state} className={`w-full h-11 rounded-xl border bg-white px-3 pr-8 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] disabled:bg-slate-100 ${stepErrors("city")?"border-red-300 bg-red-50":"border-slate-200"}`}>
                          <option value="">Select City</option>
                          {(CITIES[data.state]||["Mumbai","Pune","Delhi","Chennai"]).map(c=> <option key={c}>{c}</option>)}
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                      </div>
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="Area / Locality *" error={stepErrors("area")}>
                      <div className="relative">
                        <select value={data.area} onChange={e=> setData({...data, area: e.target.value})} onBlur={()=> setTouched(p=>({...p,area:true}))}
                          disabled={!data.city} className={`w-full h-11 rounded-xl border bg-white px-3 pr-8 text-sm font-medium outline-none appearance-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] disabled:bg-slate-100 ${stepErrors("area")?"border-red-300 bg-red-50":"border-slate-200"}`}>
                          <option value="">Select area/locality</option>
                          <option>Bandra West</option><option>Andheri</option><option>Connaught Place</option>
                        </select>
                        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">▾</span>
                      </div>
                    </Field>
                    <Field label="Telephone - Residence">
                      <input value={data.telRes} onChange={e=> setData({...data, telRes: e.target.value})} placeholder="Enter here (with STD)" className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]" />
                    </Field>
                    <Field label="Telephone - Office (incl. STD code)">
                      <input value={data.telOff} onChange={e=> setData({...data, telOff: e.target.value})} placeholder="Enter here" className="w-full h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]" />
                    </Field>
                  </div>

                  <div className="grid md:grid-cols-3 gap-5">
                    <Field label="Mobile *" error={stepErrors("mobile")}>
                      <div className="flex gap-2">
                        <select value={data.mobileCode} onChange={e=> setData({...data, mobileCode: e.target.value})} className="h-11 rounded-xl border border-slate-200 bg-white px-2 text-sm font-semibold outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b]">
                          <option>+91</option><option>+1</option><option>+44</option>
                        </select>
                        <input value={data.mobile} onChange={e=> setData({...data, mobile: e.target.value.replace(/\D/g,"").slice(0,10)})} onBlur={()=> setTouched(p=>({...p,mobile:true}))}
                          placeholder="Enter here" inputMode="numeric"
                          className={`flex-1 h-11 rounded-xl border px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("mobile")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                      </div>
                    </Field>
                    <Field label="Email ID *" error={stepErrors("email")} hint="OTP will be sent here">
                      <input value={data.email} onChange={e=> setData({...data, email: e.target.value})} onBlur={()=> setTouched(p=>({...p,email:true}))}
                        placeholder="Enter Email ID" type="email"
                        className={`w-full h-11 rounded-xl border px-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("email")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                    </Field>
                    <div className="hidden md:block self-end">
                      <div className="rounded-xl bg-emerald-50 border border-emerald-200 px-3 py-3 text-xs leading-5 text-emerald-900">
                        <b>Privacy:</b> Mobile &amp; email are used only for OTP, SRN updates and MCA notices.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4 */}
              {step===4 && (
                <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8">
                  <div className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field label="Password *" error={stepErrors("password")}>
                        <div className="relative">
                          <input type={showPass ? "text":"password"} value={data.password} onChange={e=> setData({...data, password: e.target.value})} onBlur={()=> setTouched(p=>({...p,password:true}))}
                            className={`w-full h-11 rounded-xl border pr-10 pl-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("password")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                          <button type="button" onClick={()=> setShowPass(v=>!v)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-lg hover:bg-slate-100 text-slate-500">
                            {showPass ? "🙈" : "👁️"}
                          </button>
                        </div>
                      </Field>
                      <Field label="Confirm Password *" error={stepErrors("confirmPassword")}>
                        <div className="relative">
                          <input type={showConfirm ? "text":"password"} value={data.confirmPassword} onChange={e=> setData({...data, confirmPassword: e.target.value})} onBlur={()=> setTouched(p=>({...p,confirmPassword:true}))}
                            className={`w-full h-11 rounded-xl border pr-10 pl-3 text-sm font-medium outline-none focus:ring-4 focus:ring-indigo-50 focus:border-[#0f2a6b] ${stepErrors("confirmPassword")?"border-red-300 bg-red-50":"border-slate-200 bg-white"}`} />
                          <button type="button" onClick={()=> setShowConfirm(v=>!v)} className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 grid place-items-center rounded-lg hover:bg-slate-100 text-slate-500">
                            {showConfirm ? "🙈" : "👁️"}
                          </button>
                        </div>
                      </Field>
                    </div>

                    <div className="rounded-2xl bg-slate-50 border border-slate-200 p-4">
                      <div className="text-xs font-bold tracking-wide text-slate-700">Password Policy</div>
                      <ul className="mt-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs leading-5">
                        {[
                          {k:"alphanum", label:"Alphanumeric (letters + numbers)"},
                          {k:"length", label:"Minimum 6 and maximum 15 characters"},
                          {k:"special", label:"At least one special char (! @ # $ % ^ & * ( ) ~)"},
                          {k:"caseSensitive", label:'Case sensitive — “A” ≠ “a”'},
                        ].map(it=> (
                          <li key={it.k} className={`flex gap-2 items-center ${ (pwChecks as any)[it.k] ? "text-emerald-700 font-semibold" : "text-slate-600"}`}>
                            <span className={`w-5 h-5 rounded-full grid place-items-center text-[11px] border ${ (pwChecks as any)[it.k] ? "bg-emerald-600 border-emerald-600 text-white" : "bg-white border-slate-300"}`}>{(pwChecks as any)[it.k] ? "✓" : "•"}</span>
                            {it.label}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <Fieldset label="Whether you wish to avail SMS alert Facility">
                      <div className="flex gap-3 mt-2">
                        {(["Yes","No"] as const).map(v=> (
                          <label key={v} className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 cursor-pointer text-sm font-bold transition ${data.smsAlert===v ? "bg-slate-900 border-slate-900 text-white" : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"}`}>
                            <input type="radio" name="sms" value={v} checked={data.smsAlert===v} onChange={()=> setData({...data, smsAlert: v})} className="sr-only" />
                            <span className={`w-3 h-3 rounded-full border-2 ${data.smsAlert===v?"border-white bg-white":"border-slate-400"}`} /> {v}
                          </label>
                        ))}
                      </div>
                      <div className="mt-3 text-xs leading-5 text-slate-600 bg-white border border-slate-200 rounded-xl p-3">
                        <div className="font-bold text-slate-700">This facility is applicable for:</div>
                        <ol className="list-decimal pl-5 mt-1 space-y-0.5">
                          <li>Updates on filing of forms</li><li>Registration alert</li><li>Login alerts</li><li>Account details related updates</li><li>MCA updates</li>
                        </ol>
                      </div>
                    </Fieldset>

                    <label className={`flex gap-3 p-4 rounded-2xl border-2 cursor-pointer transition ${stepErrors("terms")?"border-red-300 bg-red-50":"border-slate-200 bg-slate-50 hover:bg-white"}`}>
                      <input type="checkbox" checked={data.terms} onChange={e=> setData({...data, terms: e.target.checked})} onBlur={()=> setTouched(p=>({...p,terms:true}))} className="mt-0.5 w-4 h-4 rounded accent-slate-900" />
                      <span className="text-xs leading-5 text-slate-700">By clicking on <b>Create My Account</b>, you agree to our <a href="#" className="font-bold text-sky-700 hover:underline">Terms and Conditions</a> and consent to receive MCA notices on your registered email &amp; mobile.</span>
                    </label>
                    {stepErrors("terms") && <p className="text-xs font-bold text-red-600 -mt-2">{stepErrors("terms")}</p>}
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-2xl bg-[#0f2a6b] text-white p-5 shadow-lg overflow-hidden relative">
                      <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-white/10 blur-2xl" />
                      <div className="text-xs font-bold tracking-[0.14em] text-white/70">WHAT HAPPENS NEXT?</div>
                      <h3 className="mt-2 font-bold text-[15px] leading-snug">Verify email &amp; mobile → Login → associate DSC (if needed) → start filing</h3>
                      <div className="mt-3 space-y-2 text-xs leading-5 text-white/80">
                        <div className="flex gap-2"><span>1.</span> OTPs sent to {data.email || "your email"} &amp; {data.mobile ? `+91 ${data.mobile}` : "mobile"}</div>
                        <div className="flex gap-2"><span>2.</span> Sign in with User ID (PAN / email) and set password</div>
                        <div className="flex gap-2"><span>3.</span> Upgrade to Business User later if you need DSC</div>
                      </div>
                      <div className="mt-4 flex gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-white/15 border border-white/20 text-[11px] font-bold">SRN on every filing</span>
                        <span className="px-2.5 py-1 rounded-full bg-white text-[#0f2a6b] text-[11px] font-bold">V3 only</span>
                      </div>
                    </div>

                    <div className="rounded-2xl bg-white border border-slate-200 p-4">
                      <div className="flex items-center justify-between">
                        <div className="text-xs font-bold tracking-wide text-slate-500">ACCOUNT SUMMARY</div>
                        <span className="text-[11px] font-bold px-2 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700">Ready to create</span>
                      </div>
                      <div className="mt-3 space-y-2 text-sm">
                        <Row k="Category" v={`${data.userCategory} • ${data.userRole}`} />
                        <Row k="PAN" v={data.pan || "—"} mono />
                        <Row k="Name" v={`${data.firstName} ${data.middleName} ${data.lastName}`.replace(/\s+/g," ").trim() || "—"} />
                        <Row k="Email" v={data.email || "—"} />
                        <Row k="Mobile" v={data.mobile ? `+91 ${data.mobile}` : "—"} />
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-t border-slate-100 pt-6">
              <div className="text-xs font-medium text-slate-500">
                {step>1 ? <span>Step <b className="text-slate-900">{step}</b> of 4 • <button onClick={()=> setStep(1)} className="underline hover:text-slate-900">Start over</button></span> : <span>Secure • Encrypted • Govt. of India</span>}
              </div>
              <div className="flex gap-2 justify-end">
                {step>1 && <button onClick={handleBack} className="h-11 px-6 rounded-xl border-2 border-slate-900 bg-white text-slate-900 text-sm font-bold hover:bg-slate-50 active:scale-[0.98] transition">Back</button>}
                <button onClick={handleNext} className="h-11 px-7 rounded-xl bg-[#0f6bff] hover:bg-[#0958d9] text-white text-sm font-bold shadow-[0_8px_20px_rgba(15,107,255,0.25)] active:scale-[0.98] transition flex items-center gap-2">
                  {step===4 ? "Create My Account" : "Next"} <span className="hidden sm:inline">→</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Partner logos - faithful to screenshot but cleaned */}
        <div className="mt-8 rounded-[24px] bg-white border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between gap-4">
            <div className="text-[11px] font-bold tracking-[0.14em] text-slate-400">IN ASSOCIATION WITH</div>
            <span className="text-[11px] font-medium text-slate-500 hidden sm:block">Regulators &amp; partner portals</span>
          </div>
          <div className="mt-4 grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-7 gap-4 sm:gap-6 items-center">
            {[
              {name:"Azadi Ka\nAmrit Mahotsav", abbr:"75"},
              {name:"SFIO\nSerious Fraud", abbr:"SFIO"},
              {name:"IEPF", abbr:"IEPF"},
              {name:"IICA", abbr:"IICA"},
              {name:"CCI", abbr:"CCI"},
              {name:"IBBI", abbr:"IBBI"},
              {name:"NFRA", abbr:"NFRA"},
              {name:"NCLAT", abbr:"NCLAT"},
              {name:"NCLT", abbr:"NCLT"},
              {name:"National CSR", abbr:"CSR"},
              {name:"NFCG", abbr:"NFCG"},
              {name:"india.gov.in", abbr:"india.gov.in"},
              {name:"CDM", abbr:"CDM"},
              {name:"MCA21", abbr:"MCA"},
            ].map(b=> (
              <div key={b.name} className="group flex flex-col items-center gap-2 opacity-80 hover:opacity-100 transition">
                <div className="w-full h-[54px] rounded-xl bg-slate-50 border border-slate-200 grid place-items-center group-hover:bg-white group-hover:border-slate-300 group-hover:shadow-sm transition">
                  <span className="text-[11px] font-extrabold tracking-wide text-slate-700 text-center leading-tight px-2">{b.abbr}</span>
                </div>
                <span className="text-[10px] font-semibold leading-tight text-slate-500 text-center whitespace-pre-line hidden sm:block">{b.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center text-[11px] font-medium text-slate-400">
          © Ministry of Corporate Affairs, Govt. of India • <a href="#" className="underline hover:text-slate-600">Privacy</a> • <a href="#" className="underline hover:text-slate-600">Terms</a> • <a href="#" className="underline hover:text-slate-600">Grievance</a>
        </div>
      </main>

      {/* Success */}
      {completed && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-slate-900/60 backdrop-blur-sm" onClick={()=> setCompleted(false)}>
          <div onClick={e=> e.stopPropagation()} className="w-full max-w-[560px] rounded-[24px] bg-white shadow-2xl border border-slate-200 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div className="p-8 text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-100 border border-emerald-200 grid place-items-center mx-auto text-emerald-700 text-xl">✓</div>
              <h3 className="mt-4 font-display font-bold text-xl tracking-tight">Account created successfully</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">We’ve sent OTPs to <b>{data.email}</b> and <b>+91 {data.mobile}</b>. Verify to activate your login. Your User ID is your PAN: <span className="font-mono font-bold tracking-widest bg-slate-100 border px-2 py-1 rounded-lg">{data.pan || "—"}</span></p>
              <div className="mt-6 flex gap-2 justify-center">
                <button onClick={()=> setCompleted(false)} className="h-11 px-6 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-black transition">Go to Login</button>
                <button onClick={()=> setCompleted(false)} className="h-11 px-6 rounded-xl border border-slate-200 bg-white text-sm font-bold hover:bg-slate-50 transition">Close</button>
              </div>
              <p className="mt-4 text-[11px] font-medium text-slate-400">Demo only — no data was sent to MCA. Wire this to /foportal/register when ready.</p>
            </div>
          </div>
        </div>
      )}

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');`}</style>
    </div>
  )
}

function Field({label, children, error, hint}:{label:string, children:React.ReactNode, error?:string, hint?:string}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-2">
        <span className="text-[12.5px] font-bold tracking-tight text-slate-800">{label}</span>
        {hint && !error && <span className="text-[11px] font-medium text-slate-400 hidden sm:block">{hint}</span>}
      </div>
      <div className="mt-1.5">{children}</div>
      {error && <p className="mt-1.5 text-[11px] font-bold text-red-600 flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-red-600 text-white grid place-items-center text-[9px]">!</span>{error}</p>}
    </label>
  )
}
function Fieldset({label, children}:{label:string, children:React.ReactNode}) {
  return (
    <fieldset className="block">
      <legend className="text-[12.5px] font-bold tracking-tight text-slate-800">{label} <span className="ml-1 inline-flex w-4 h-4 rounded-full bg-slate-900 text-white text-[10px] font-bold place-items-center justify-center align-middle">i</span></legend>
      {children}
    </fieldset>
  )
}
function Row({k,v,mono}:{k:string, v:string, mono?:boolean}) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 border-b border-dashed border-slate-100 last:border-0">
      <span className="text-xs font-semibold tracking-wide text-slate-500">{k}</span>
      <span className={`text-xs font-bold text-slate-900 max-w-[60%] truncate ${mono?"font-mono tracking-widest":""}`}>{v}</span>
    </div>
  )
}
