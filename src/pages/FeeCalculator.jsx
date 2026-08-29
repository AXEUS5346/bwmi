import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'

const feeSlabs = [
  { label: 'Up to ₹1 Lakh', fee: '₹100' },
  { label: '₹1 Lakh – ₹5 Lakh', fee: '₹200' },
  { label: '₹5 Lakh – ₹10 Lakh', fee: '₹300' },
  { label: '₹10 Lakh – ₹25 Lakh', fee: '₹500' },
  { label: 'Above ₹25 Lakh', fee: '₹1,000' },
]

function getNormalFee(capital) {
  if (capital <= 1) return 100
  if (capital <= 5) return 200
  if (capital <= 10) return 300
  if (capital <= 25) return 500
  return 1000
}

export default function FeeCalculator() {
  const [capital, setCapital] = useState(15)
  const [delayDays, setDelayDays] = useState(36)

  const normalFee = useMemo(() => getNormalFee(capital), [capital])
  const additionalFee = useMemo(() => delayDays * 100, [delayDays])
  const totalFee = useMemo(() => normalFee + additionalFee, [normalFee, additionalFee])

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
              Fee Calculator
            </li>
          </ol>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Page title */}
        <h1 className="text-2xl font-bold text-[#0B2C5C] border-b-2 border-[#FF9933] inline-block pb-2 mb-8">
          Fee Calculator
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Calculator */}
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="font-bold text-[#0B2C5C] mb-6">
              Calculate Filing Fees
            </h2>

            {/* Capital slider */}
            <div className="mb-8">
              <label htmlFor="capital-slider" className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Authorised Capital</span>
                <span className="text-sm font-mono font-bold text-[#0B2C5C] bg-slate-50 px-3 py-1 rounded">
                  ₹{capital} Lakh
                </span>
              </label>
              <input
                id="capital-slider"
                type="range"
                min={1}
                max={100}
                value={capital}
                onChange={(e) => setCapital(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#0B2C5C]"
                aria-valuenow={capital}
                aria-valuemin={1}
                aria-valuemax={100}
                aria-label={`Authorised capital: ₹${capital} Lakh`}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>₹1L</span>
                <span>₹25L</span>
                <span>₹50L</span>
                <span>₹75L</span>
                <span>₹1Cr</span>
              </div>
            </div>

            {/* Delay slider */}
            <div className="mb-8">
              <label htmlFor="delay-slider" className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-slate-700">Delay in Filing</span>
                <span className="text-sm font-mono font-bold text-slate-700 bg-slate-50 px-3 py-1 rounded">
                  {delayDays} days
                </span>
              </label>
              <input
                id="delay-slider"
                type="range"
                min={0}
                max={365}
                value={delayDays}
                onChange={(e) => setDelayDays(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer accent-[#FF9933]"
                aria-valuenow={delayDays}
                aria-valuemin={0}
                aria-valuemax={365}
                aria-label={`Delay: ${delayDays} days`}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>0 days</span>
                <span>180 days</span>
                <span>365 days</span>
              </div>
            </div>

            {/* Fee breakdown */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5">
              <h3 className="text-sm font-semibold text-[#0B2C5C] mb-4">Fee Breakdown</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">Normal Filing Fee</span>
                  <span className="text-sm font-mono font-medium text-slate-800">
                    ₹{normalFee.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600">
                    Additional Fee ({delayDays} days × ₹100)
                  </span>
                  <span className={`text-sm font-mono font-medium ${additionalFee > 0 ? 'text-amber-700' : 'text-slate-800'}`}>
                    ₹{additionalFee.toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-slate-200 pt-3 flex items-center justify-between">
                  <span className="text-base font-bold text-[#0B2C5C]">Total Payable</span>
                  <span className="text-lg font-mono font-bold text-[#0B2C5C]">
                    ₹{totalFee.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>

            {delayDays > 0 && (
              <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-xs text-amber-700 flex items-start gap-2">
                <i className="fa-solid fa-triangle-exclamation mt-0.5" aria-hidden="true"></i>
                <span>
                  Late filing attracts additional fees at ₹100 per day (max 6x the normal fee).
                  Maximum additional fee: ₹{Math.min(normalFee * 6, additionalFee).toLocaleString()}.
                </span>
              </div>
            )}
          </div>

          {/* Fee structure sidebar */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 h-fit">
            <h2 className="font-bold text-[#0B2C5C] mb-4">Fee Structure</h2>
            <p className="text-xs text-slate-500 mb-4">
              As per Companies (Registration Offices and Fees) Rules, 2014
            </p>

            <div className="space-y-2">
              {feeSlabs.map((slab, i) => (
                <div
                  key={i}
                  className={`flex items-center justify-between px-4 py-3 rounded-lg text-sm ${
                    getNormalFee(
                      slab.label.includes('1') && !slab.label.includes('5')
                        ? 1
                        : slab.label.includes('5') && !slab.label.includes('10')
                          ? 5
                          : slab.label.includes('10') && !slab.label.includes('25')
                            ? 10
                            : slab.label.includes('25')
                              ? 30
                              : 0
                    ) === normalFee
                      ? 'bg-[#0B2C5C]/5 border border-[#0B2C5C]/20'
                      : 'bg-slate-50'
                  }`}
                >
                  <span className="text-slate-600">{slab.label}</span>
                  <span className="font-mono font-bold text-[#0B2C5C]">{slab.fee}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Late Filing Fees
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Additional fee of ₹100 per day of delay, capped at 6 times the normal fee.
              </p>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-200">
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                Stamp Duty
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Stamp duty is payable as per the respective state Stamp Act and is
                separate from MCA filing fees.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
