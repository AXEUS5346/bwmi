// ponytail: mock data only, no backend — all flows use localStorage
export const companies = [
  { cin:"L24239MH1981PLC002195", name:"Infosys Limited", roc:"RoC-Bangalore", status:"Active", incorporationDate:"24-Jul-1981", authorizedCap:"1,100.00 Cr", paidUpCap:"2,074.00 Cr", category:"Company limited by Shares", subCategory:"Non-govt company", class:"Public", address:"Electronics City, Hosur Road, Bangalore - 560100", email:"investors@infosys.com", listing:"Listed", compliance:"Active Compliant", directors:["00012291","00012754","00030856"], charges:["CHG100123","CHG100654"], nzbn:"9429049827731", entityType:"Company limited by Shares", previousNames:[{name:"Infosys BPO Ltd",date:"2014"}], financialYearEnd:"31-Mar", activityCode:"62011" },
  { cin:"L22210MH1919PLC000526", name:"Tata Motors Limited", roc:"RoC-Mumbai", status:"Active", incorporationDate:"01-Sep-1945", authorizedCap:"3,500.00 Cr", paidUpCap:"2,100.00 Cr", category:"Company limited by Shares", class:"Public", address:"Bombay House, 24 Homi Mody Street, Mumbai - 400001", email:"inv_rel@tatamotors.com", directors:["00027696","001218"], charges:["CHG200123"], nzbn:"9129027234897", entityType:"Company limited by Shares", previousNames:[], financialYearEnd:"31-Mar", activityCode:"29100" },
  { cin:"L17100MH1973PLC019786", name:"Reliance Industries Limited", roc:"RoC-Mumbai", status:"Active", incorporationDate:"08-May-1973", authorizedCap:"15,000.00 Cr", paidUpCap:"6,700.00 Cr", address:"3rd Floor, Maker Chambers IV, 222 Nariman Point, Mumbai", email:"investor.relations@ril.com", directors:["00001695","00001982"], charges:["CHG3001","CHG3002","CHG3003"], nzbn:"9129015487632", entityType:"Company limited by Shares", previousNames:[{name:"Reliance Commercial Corporation",date:"1977"}], financialYearEnd:"31-Mar", activityCode:"19201" },
  { cin:"U72200KA2015PTC082345", name:"Spark AI Solutions Pvt Ltd", roc:"RoC-Bangalore", status:"Active", incorporationDate:"12-Jan-2023", authorizedCap:"15.00 L", paidUpCap:"10.00 L", class:"Private", address:"4th Floor, RMZ Ecoworld, Bangalore", email:"contact@sparkai.in", directors:["08423410","08423412"], charges:[], nzbn:"9429003871245", entityType:"Company limited by Shares", previousNames:[], financialYearEnd:"31-Mar", activityCode:"62011" },
  { cin:"U72900DL2020PTC367890", name:"FinEdge Technologies Pvt Ltd", roc:"RoC-Delhi", status:"Active", incorporationDate:"15-Mar-2020", authorizedCap:"50.00 L", paidUpCap:"50.00 L", class:"Private", address:"Connaught Place, Delhi - 110001", email:"hello@finedge.in", directors:["08423413"], charges:["CHG4001"], nzbn:"9129006734521", entityType:"Company limited by Shares", previousNames:[], financialYearEnd:"31-Mar", activityCode:"61900" },
  { cin:"U67120MH2005PTC154321", name:"Capital Trust Finance Pvt Ltd", roc:"RoC-Mumbai", status:"Active", incorporationDate:"20-Feb-2005", authorizedCap:"5.00 Cr", paidUpCap:"3.20 Cr", address:"Nariman Point, Mumbai", email:"info@capitaltrust.in", directors:["08423414"], charges:["CHG4002","CHG4003"], nzbn:"9129025678143", entityType:"Company limited by Shares", previousNames:[], financialYearEnd:"31-Mar", activityCode:"66190" },
  { cin:"L24230MH1999PLC120765", name:"Wipro Limited", roc:"RoC-Bangalore", status:"Active", incorporationDate:"29-Dec-1945", authorizedCap:"1,100.00 Cr", paidUpCap:"1,096.00 Cr", address:"Doddakannelli, Sarjapur Road, Bangalore", email:"info@wipro.com", directors:["00006782"], charges:[], nzbn:"9129019847256", entityType:"Company limited by Shares", previousNames:[{name:"Western India Vegetable Products Ltd",date:"1945"}], financialYearEnd:"31-Mar", activityCode:"62012" },
  { cin:"U74900KA2018PTC115432", name:"Aero Dynamics LLP", roc:"RoC-Bangalore", status:"Active", incorporationDate:"10-Oct-2018", authorizedCap:"10.00 L", paidUpCap:"10.00 L", class:"LLP", address:"Indiranagar, Bangalore", email:"contact@aerol.lp.in", directors:["08423415"], charges:[], nzbn:"9429007413682", entityType:"LLP", previousNames:[], financialYearEnd:"31-Mar", activityCode:"71120" },
  { cin:"L99999MH1994PLC081235", name:"Strike Ventures Pvt Ltd", roc:"RoC-Mumbai", status:"Under Liquidation", incorporationDate:"12-Dec-1994", authorizedCap:"1.00 Cr", paidUpCap:"90.00 L", address:"Andheri, Mumbai", email:"liquidator@strike.in", directors:["00099991"], charges:["CHG5001"], nzbn:"9129031258746", entityType:"Company limited by Shares", previousNames:[{name:"Strike Power Pvt Ltd",date:"2010"}], financialYearEnd:"31-Mar", activityCode:"41000" },
  { cin:"U72900TG2022PTC165432", name:"Hyderabad BioLabs Pvt Ltd", roc:"RoC-Hyderabad", status:"Strike Off", incorporationDate:"05-May-2022", authorizedCap:"10.00 L", paidUpCap:"10.00 L", address:"HITEC City, Hyderabad", email:"admin@hydbiolabs.in", directors:["08423416"], charges:[], nzbn:"9429005192384", entityType:"Company limited by Shares", previousNames:[], financialYearEnd:"31-Mar", activityCode:"72190" },
  // fill to 30 with synthetic
  ...Array.from({length:20}, (_,i)=>({
    cin:`U72900DL2021PTC${380000+i}`,
    name:`Mock Company ${i+11} Pvt Ltd`,
    roc:["RoC-Delhi","RoC-Mumbai","RoC-Bangalore","RoC-Chennai"][i%4],
    status: i%7===0?"Strike Off" : i%5===0?"Active Non-Compliant":"Active",
    incorporationDate:`0${(i%9)+1}-0${(i%9)+1}-202${i%3}`,
    authorizedCap:`${(i+1)*5}.00 L`,
    paidUpCap:`${(i+1)*5}.00 L`,
    class:"Private",
    category:"Company limited by Shares",
    address:`Sector ${i}, Delhi`,
    email:`contact@mock${i}.in`,
    listing: i%3===0?"Listed":"Unlisted",
    compliance: i%5===0?"Active Non-Compliant":"Active Compliant",
    directors:[`08423${417+i}`],
    charges: i%3===0?[`CHG6${i}`]:[]
  }))
]

export const directors = [
  { din:"00012291", name:"Narayana Murthy N.R.", status:"Approved", pan:"AAAPM1234A", email:"nrn@infosys.com", mobile:"98XXXXXX10", allottedFY:"1981-82", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["L24239MH1981PLC002195"], disqualified:false },
  { din:"00012754", name:"Nandan Nilekani", status:"Approved", pan:"AAAPN5678B", email:"nandan@infosys.com", mobile:"98XXXXXX11", allottedFY:"1981-82", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["L24239MH1981PLC002195"], disqualified:false },
  { din:"08423410", name:"Ramesh Kumar", status:"Approved", pan:"ABCDE1234F", email:"ramesh@sparkai.in", mobile:"90XXXXXX12", allottedFY:"2022-23", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["U72200KA2015PTC082345"], disqualified:false },
  { din:"08423412", name:"Priya Sharma", status:"Approved", pan:"FGHIJ5678G", email:"priya@sparkai.in", mobile:"90XXXXXX13", allottedFY:"2022-23", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["U72200KA2015PTC082345"], disqualified:false },
  { din:"08423413", name:"Amit Verma", status:"Deactivated due to non-filing of DIR-3 KYC", pan:"KLMNO9012H", email:"amit@finedge.in", mobile:"90XXXXXX14", allottedFY:"2019-20", lastKycFY:"2022-23", nextDue:"Overdue - Pay ₹5000", companies:["U72900DL2020PTC367890"], disqualified:false },
  { din:"00027696", name:"N. Chandrasekaran", status:"Approved", pan:"AAAPC4321C", email:"n.chandra@tatamotors.com", mobile:"98XXXXXX15", allottedFY:"2015-16", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["L22210MH1919PLC000526"], disqualified:false },
  { din:"00001695", name:"Mukesh Ambani", status:"Approved", pan:"AAAPA0000A", email:"mukesh@ril.com", mobile:"98XXXXXX16", allottedFY:"1977-78", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["L17100MH1973PLC019786"], disqualified:false },
  { din:"00099991", name:"Liquidator Strike", status:"Approved", pan:"ZZZLL0001L", email:"liquidator@strike.in", mobile:"98XXXXXX17", allottedFY:"2020-21", lastKycFY:"2024-25", nextDue:"30 Jun 2028", companies:["L99999MH1994PLC081235"], disqualified:true, disqualifyReason:"Sec 164(2) till 2028" },
  ...Array.from({length:12}, (_,i)=>({
    din:`08423${417+i}`,
    name:`Mock Director ${i+1}`,
    status: i%4===0?"Deactivated due to non-filing of DIR-3 KYC":"Approved",
    pan:`MOCKP${1000+i}A`,
    email:`mockdir${i}@test.in`,
    mobile:`90XXXXXX${20+i}`,
    allottedFY:`202${i%3}-2${i%3+1}`,
    lastKycFY: i%2===0?"2024-25":"2023-24",
    nextDue: i%4===0?"Overdue - Pay ₹5000":"30 Jun 2028",
    companies:[`U72900DL2021PTC${380000+i}`],
    disqualified: i%6===0
  }))
]

export const charges = [
  { id:"CHG100123", cin:"L24239MH1981PLC002195", holder:"State Bank of India", amount:"₹500 Cr", created:"22-Mar-2022", modified:"—", status:"Open", due:"2027", deed:"Deed_Hypothecation_SBI_500Cr.pdf", cersai:"CERSAI ID 998877" },
  { id:"CHG100654", cin:"L24239MH1981PLC002195", holder:"HDFC Bank", amount:"₹45 Cr", created:"10-Jan-2023", modified:"—", status:"Open", deed:"HDFC_Charge_2023.pdf" },
  { id:"CHG200123", cin:"L22210MH1919PLC000526", holder:"ICICI Bank", amount:"₹1,200 Cr", created:"15-Jun-2021", status:"Open" },
  { id:"CHG3001", cin:"L17100MH1973PLC019786", holder:"SBI", amount:"₹5,000 Cr", created:"01-Apr-2020", status:"Open" },
  { id:"CHG4001", cin:"U72900DL2020PTC367890", holder:"Axis Bank", amount:"₹10 Cr", created:"12-May-2024", status:"Open" },
  { id:"CHG4002", cin:"U67120MH2005PTC154321", holder:"SBI", amount:"₹50 Cr", created:"22-Mar-2022", status:"Open" },
  { id:"CHG4003", cin:"U67120MH2005PTC154321", holder:"HDFC Bank", amount:"₹45 Cr", created:"10-Jan-2023", status:"Satisfied", satisfied:"12-May-2024" },
]

export const formsCatalog = [
  { id:"RUN", title:"RUN — Reserve Unique Name", category:"Start", fee:"₹1000", desc:"Reserve company name prior to incorporation", steps:["Entity Type","Proposed Names (2) + Significance","Check Availability","Pay"], linked:"SPICe+ Part-A" },
  { id:"SPICe+", title:"SPICe+ (INC-32) — Incorporation", category:"Start", fee:"₹1313 + Stamp", desc:"Company + DIN + PAN/TAN + EPFO/ESIC/GST + Bank 7-in-1", steps:["Part-A: Name (2 options, NIC)","Part-B: Details (Capital, Subscribers, Directors, Address)","AGILE: GST/EPFO/ESIC","Bank: ICICI/HDFC","Attach MOA/AOA/INC-9","DSC & Pay"], badge:"7-in-1" },
  { id:"FiLLiP", title:"FiLLiP — LLP Incorporation", category:"Start", fee:"₹500", desc:"LLP with DPIN/DIN + PAN/TAN", steps:["Name","Partners (2)","DPIN","Address","Attach","Pay"] },
  { id:"INC-20A", title:"INC-20A — Commencement of Business", category:"Start", fee:"₹0", desc:"Declaration within 180 days", steps:["CIN","Declaration","Bank Account Proof","Pay"] },
  { id:"INC-22A", title:"INC-22A — ACTIVE", category:"Start", fee:"₹0", desc:"Active Company Tagging with geotagged photo", steps:["CIN","Photo (geotag)","Address","Pay"] },
  { id:"AOC-4", title:"AOC-4 — Financial Statements", category:"File & Comply", fee:"₹600 + Delay ₹100/day", desc:"Balance Sheet, P&L, Cash Flow, Board/Audit Report", steps:["Select CIN (pre-fill)","FY + AGM Date (GNL-1 SRN)","Linked: AOC-1, AOC-2, Board/Audit Extracts","Attach (10MB)","DSC & Fee","Pay → SRN"], badge:"Most filed" },
  { id:"AOC-4-CFS", title:"AOC-4 CFS — Consolidated Financials", category:"File & Comply", fee:"₹600", desc:"Consolidated statements", steps:["CIN","CFS Details","Attach","Pay"] },
  { id:"AOC-4-XBRL", title:"AOC-4 XBRL", category:"File & Comply", fee:"₹600", desc:"XBRL-tagged financials + Validation Tool V5.1", steps:["CIN","XBRL File Upload (Validation)","Attach","Pay"] },
  { id:"MGT-7", title:"MGT-7 — Annual Return", category:"File & Comply", fee:"₹600", desc:"Shareholding, directors, meetings (full)", steps:["CIN (pre-fill)","FY + AGM","Shareholder Excel (300MB)","Director/KMP","MGT-8 Cert","Pay"], badge:"Most filed" },
  { id:"MGT-7A", title:"MGT-7A — Abridged Return", category:"File & Comply", fee:"₹600", desc:"Small Co/OPC", steps:["CIN","FY","Abridged Details","Pay"] },
  { id:"MGT-14", title:"MGT-14 — Resolutions", category:"Manage", fee:"₹300", desc:"Board/shareholder resolutions", steps:["CIN","Resolution Type (Board/Shareholder)","Date + GNL-1 SRN","Attach","Pay"] },
  { id:"DIR-3", title:"DIR-3 — DIN Allotment", category:"Manage", fee:"₹500", desc:"New DIN", steps:["PAN + DIN Prefill","Personal Details","OTP","Attach DSC","Pay"] },
  { id:"DIR-3-KYC", title:"DIR-3 KYC / DIR-3 KYC-Web", category:"Manage", fee:"₹0 (₹5000 if late)", desc:"Triennial KYC by 30 Jun (from 2026)", steps:["DIN → OTP (email+sms/IVR)","Verify PAN/mobile/email","Address (Aadhaar)","DSC/Aadhaar OTP","Pay → STP"], badge:"Seasonal" },
  { id:"DIR-12", title:"DIR-12 — Appointment/Cessation", category:"Manage", fee:"₹300", desc:"Director/KMP changes", steps:["CIN","Director DIN","Appointment Date","Designation","Pay"] },
  { id:"SH-7", title:"SH-7 — Alter Capital", category:"Manage", fee:"₹600", desc:"Authorized capital change", steps:["CIN","Current vs New Capital","Resolution","MGT-14 SRN","Pay"] },
  { id:"PAS-3", title:"PAS-3 — Allotment Return", category:"Manage", fee:"₹300", desc:"Share allotment", steps:["CIN","Allotment Date","List of Allottees Excel","Pay"] },
  { id:"CHG-1", title:"CHG-1 — Create/Modify Charge", category:"Manage", fee:"₹300 + Amount slab", desc:"Other than debentures", steps:["CIN (pre-fill)","Holder + Amount + Property","Deed Date","Upload Deed 5MB","Fee → Pay"] },
  { id:"CHG-4", title:"CHG-4 — Satisfaction", category:"Manage", fee:"₹300", desc:"Satisfy charge", steps:["Charge ID + SRN CHG-1","Satisfaction Date","Pay"] },
  { id:"CHG-9", title:"CHG-9 — Debenture Charge", category:"Manage", fee:"₹300", desc:"Debentures", steps:["CIN","Holder","Amount","Trust Deed","Pay"] },
  { id:"DPT-3", title:"DPT-3 — Deposits Return", category:"File & Comply", fee:"₹0", desc:"Deposits/exempted", steps:["CIN","FY","Deposits Details Excel","Pay (₹0)"] },
  { id:"MSME-1", title:"MSME-1 — Outstanding to Micro/Small", category:"File & Comply", fee:"₹0", desc:"Half-yearly Apr/Oct", steps:["CIN","Outstanding Amount","Excel","Pay"] },
  { id:"BEN-2", title:"BEN-2 — SBO Declaration", category:"Manage", fee:"₹0", desc:"Significant Beneficial Owner u/s 90", steps:["Reporting Co. CIN","SBO Details","Excel","Pay"] },
  { id:"STK-2", title:"STK-2 — Strike-off", category:"Close & Claim", fee:"₹10000", desc:"Application to strike off", steps:["CIN","Grounds + Affidavit","NOC","Pay"] },
  { id:"IEPF-1", title:"IEPF-1 / 1A / 2 / 4", category:"Close & Claim", fee:"₹0", desc:"Company → IEPF transfer", steps:["CIN","Amounts + Excel 200MB (40×5MB)","Validate","Pay"] },
  { id:"IEPF-5", title:"IEPF-5 — Investor Claim", category:"Close & Claim", fee:"₹0", desc:"Claim unpaid amounts/shares", steps:["SRN IEPF-1","Claim Details","Dispatch Proof","Pay"] },
  { id:"IEPF-5-EVR", title:"IEPF-5 EVR — Nodal", category:"Close & Claim", fee:"₹0", desc:"Link-form to IEPF-5", steps:["Login as Nodal (Switch Role)","Access IEPF-5","e-Verification Report","Submit"] },
  { id:"GNL-2", title:"GNL-2 — Addendum", category:"File & Comply", fee:"₹300", desc:"Submission of docs to RoC", steps:["CIN","Purpose (50 options)","Docs","Pay"] },
  { id:"Form-11", title:"Form 11 — LLP Annual Return", category:"File & Comply", fee:"₹50/day delay", desc:"Due 30 May", steps:["LLPIN","FY","Partners","Pay"] },
  { id:"Form-8", title:"Form 8 — LLP Solvency", category:"File & Comply", fee:"₹50/day", desc:"Due 30 Oct", steps:["LLPIN","Solvency Statement","Charge Details","Pay"] },
  { id:"ADT-1", title:"ADT-1 — Auditor Appointment", category:"Manage", fee:"₹300", desc:"Intimation", steps:["CIN","Auditor Details","Consent","Pay"] },
  { id:"INC-22", title:"INC-22 — Registered Office", category:"Manage", fee:"₹300", desc:"Change office", steps:["CIN","New Address + Proof","NOC","Pay"] },
  { id:"INC-23", title:"INC-23 — Shifting (RD)", category:"Manage", fee:"₹1000", desc:"Inter-state shifting", steps:["CIN","New State","RD Approval","Pay"] },
  { id:"RUN-LLP", title:"RUN-LLP — LLP Name", category:"Start", fee:"₹200", desc:"Reserve LLP name", steps:["Proposed Names","Significance","Pay"] },
  { id:"Form-3", title:"Form 3 — LLP Agreement", category:"Manage", fee:"₹50", desc:"File LLP Agreement within 30 days of incorporation. Also file when amending the agreement.", steps:["LLPIN","Agreement Details","Partner Consent","Attach Agreement","Pay"] },
  { id:"Form-4", title:"Form 4 — Change in Partners", category:"Manage", fee:"₹300", desc:"Intimation of change in partners, designated partners, or their particulars (cessation, admission, change in contribution)", steps:["LLPIN","Existing Partners","New/Changed Partner Details","Effective Date","Partner Consent","Pay"] },
  { id:"Form-5", title:"Form 5 — Change of Name", category:"Manage", fee:"₹200", desc:"Application for conversion of LLP name or change of LLP name after RUN-LLP approval", steps:["LLPIN","RUN-LLP SRN","New Name Approval","Resolution/Consent","Pay"] },
  { id:"Form-12", title:"Form 12 — Intimation of Address", category:"File & Comply", fee:"₹50", desc:"Intimation of change in situation of registered office of LLP within the same ROC jurisdiction", steps:["LLPIN","New Address","Proof of Address","Effective Date","Pay"] },
  { id:"Form-15", title:"Form 15 — Change of Registered Office", category:"Manage", fee:"₹300", desc:"Notice of change in the situation of registered office from one ROC to another (inter-state)", steps:["LLPIN","Current Office","New Office (Different State)","NOC from Partners","RD Approval","Pay"] },
  { id:"Form-22", title:"Form 22 — Intimation of Order", category:"File & Comply", fee:"₹0", desc:"Intimation of order passed by Court, Tribunal, or Appellate Tribunal affecting the LLP", steps:["LLPIN","Court/Tribunal Details","Order Date & Copy","Effect on LLP","Pay"] },
  { id:"Form-23", title:"Form 23 — Application for Name Change", category:"Manage", fee:"₹200", desc:"Application to the Registrar for approval of new name or reservation of name for LLP under Section 17", steps:["LLPIN","Proposed New Name (2 options)","Name Significance","RUN-LLP SRN","Pay"] },
  { id:"Form-25", title:"Form 25 — Reservation of Name", category:"Start", fee:"₹200", desc:"Application for reservation of name by a limited liability partnership or proposed LLP", steps:["Proposed Names (2)","Name Significance","Entity Type","Pay"] },
  { id:"Form-27", title:"Form 27 — Registration by Foreign LLP", category:"Start", fee:"₹500", desc:"Application for registration of a Foreign Limited Liability Partnership (FLLP) established outside India", steps:["FLLP Details","Country of Incorporation","Registered Address Abroad","Authorized Representative in India","MOA/Agreement","Pay"] },
  { id:"Form-24", title:"Form 24 — LLP Strike-off", category:"Close & Claim", fee:"₹0", desc:"Application for striking off the name of LLP from the Register under Section 55", steps:["LLPIN","Grounds for Strike-off","Consent of Partners","Affidavit & Indemnity","Pay"] },
]

export const filings = [
  { srn:"T12345678", formId:"AOC-4", cin:"L24239MH1981PLC002195", companyName:"Infosys Limited", status:"Approved", filingDate:"12-Oct-2024", amount:"₹600", timeline:["Fee Paid","Pending DSC","Under Processing","Approved"], downloadUrl:"#" },
  { srn:"T12345679", formId:"MGT-7", cin:"L24239MH1981PLC002195", companyName:"Infosys Limited", status:"Resubmission", filingDate:"10-Nov-2024", amount:"₹600", remarks:"Clarify SH-7 mismatch with MGT-7 share capital", downloadUrl:"#" },
  { srn:"T12345680", formId:"DIR-3-KYC", cin:"—", companyName:"DIN 08423412", status:"Approved", filingDate:"15-Sep-2024", amount:"₹0", timeline:["OTP Verified","STP Approved"], downloadUrl:"#" },
  { srn:"T12345681", formId:"CHG-1", cin:"U72200KA2015PTC082345", companyName:"Spark AI Solutions", status:"Under Processing", filingDate:"12-May-2024", amount:"₹300", timeline:["Fee Paid","Under Processing"], downloadUrl:"#" },
  { srn:"T12345682", formId:"SPICe+", cin:"U72900DL2021PTC380000", companyName:"Mock Company 11", status:"Pending DSC Upload", filingDate:"01-Aug-2026", amount:"₹2313", timeline:["Fee Paid","Pending DSC"], downloadUrl:"#" },
]

export const circulars = [
  { id:"CIR/09/2024", date:"15-Feb-2026", title:"ROC bifurcation: Delhi split into Delhi I/II, Haryana", category:"Notification", important:true },
  { id:"CIR/01/2026", date:"15-Apr-2026", title:"Companies Compliance Facilitation Scheme CCFS-2026 till 15 Jul 2026", category:"Circular", important:true },
  { id:"G.S.R.943(E)", date:"31-Dec-2025", title:"DIR-3 KYC triennial (every 3 FY) by 30 Jun — effective 31 Mar 2026", category:"Amendment", important:true },
  { id:"V3_FAQ", date:"18-Aug-2026", title:"Beta MCA Chatbot live (bottom-right)", category:"Update" },
  { id:"NOTIF/2025", date:"23-Oct-2025", title:"New RDs/ROCs effective 16 Feb 2026 — DR site switchover", category:"Notification" },
]

export const notices = [
  { id:"NOT-2026-001", date:"25-Aug-2026", title:"Company removed from register — CIN L99999MH1994PLC081235 (Strike Ventures Pvt Ltd)", category:"Company Removal", status:"Published" },
  { id:"NOT-2026-002", date:"18-Aug-2026", title:"Director convicted u/s 164 — DIN 00099991 disqualified for 5 years", category:"Director Disqualification", status:"Published" },
  { id:"NOT-2026-003", date:"10-Aug-2026", title:"NCLT order revoking winding-up — U72900TG2022PTC165432 (Hyderabad BioLabs Pvt Ltd)", category:"Court Order", status:"Published" },
  { id:"NOT-2026-004", date:"05-Aug-2026", title:"Annual filing default list — 2,340 companies failed to file AOC-4/MGT-7 by due date", category:"Compliance Default", status:"Published" },
  { id:"NOT-2026-005", date:"01-Aug-2026", title:"Name reservation approved — SPICe+ SRN T12345682 (Mock Company 11)", category:"Name Approval", status:"Published" },
]

export const stats = {
  totalCompanies:"21.5 Lakh",
  activeCompanies:"15.2 Lakh",
  llps:"2.8 Lakh",
  filings2024:"80.26 Lakh (Apr-Jan)",
  recordsViewed:"55.44 Lakh (2023-24)",
  companiesRegistered:"1.85 Lakh (2023-24)"
}
