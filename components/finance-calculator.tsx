"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import { ChevronRight, Minus, Plus } from "lucide-react"

// ── Brand constants ────────────────────────────────────────────────────────────
const BRAND_NAVY = "#0f2044"
const BRAND_ACCENT = "#e8001d" // red – payment figure display only
const BRAND_YELLOW = "#f5c518"  // yellow – buttons, active pills, Apply Now

// ── Finance constants ──────────────────────────────────────────────────────────
const APR = 0.119
const monthlyRate = Math.pow(1 + APR, 1 / 12) - 1
const OPTION_FEE = 10
const MIN_PRICE = 2000
const MAX_PRICE = 100_000
const MIN_CREDIT = 2000

// ── URL constants (update these) ───────────────────────────────────────────────
const APPLY_URL = "https://www.octanefinance.co.uk" // TODO: replace with actual apply URL
const STOCK_URL = "/used-cars"

// ── Helpers ───────────────────────────────────────────────────────────────────
const gbp = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 2 })
const gbpRounded = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 })

function formatPayment(amount: number): { pounds: string; pence: string } {
  const fixed = amount.toFixed(2)
  const [whole, dec] = fixed.split(".")
  const pounds = new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP", minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(Number(whole))
  return { pounds, pence: `.${dec}` }
}

// ── Stepper input ─────────────────────────────────────────────────────────────
function Stepper({
  label,
  value,
  onChange,
  step,
  min,
  max,
  prefix = "£",
  note,
  compact,
}: {
  label: string
  value: number
  onChange: (v: number) => void
  step: number
  min: number
  max: number
  prefix?: string
  note?: string
  compact?: boolean
}) {
  return (
    <div className={compact ? "mb-2" : "mb-5"}>
      <label className="block text-sm font-semibold mb-1.5" style={{ color: BRAND_NAVY }}>
        {label}
      </label>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - step))}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
          aria-label={`Decrease ${label}`}
        >
          <Minus size={16} />
        </button>
        <div className="flex items-center border border-gray-300 rounded-lg bg-white flex-1 min-w-0 h-10 px-3 gap-1">
          <span className="text-gray-500 text-sm">{prefix}</span>
          <input
            type="number"
            value={value}
            min={min}
            max={max}
            onChange={(e) => {
              const v = Number(e.target.value)
              if (!isNaN(v)) onChange(Math.min(max, Math.max(min, v)))
            }}
            className="flex-1 min-w-0 outline-none text-sm font-medium bg-transparent"
            aria-label={label}
          />
        </div>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + step))}
          className="flex items-center justify-center w-10 h-10 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 active:bg-gray-100 transition-colors flex-shrink-0"
          aria-label={`Increase ${label}`}
        >
          <Plus size={16} />
        </button>
      </div>
      {note && <p className="text-xs text-amber-600 mt-1">{note}</p>}
    </div>
  )
}

// ── Breakdown row ─────────────────────────────────────────────────────────────
function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="py-2.5 flex justify-between text-sm border-t border-gray-100 first:border-t-0">
      <span className="text-gray-600">{label}</span>
      <span className="font-medium" style={{ color: BRAND_NAVY }}>{value}</span>
    </div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
interface FinanceCalculatorProps {
  initialPrice?: number
  vehicleName?: string
  compact?: boolean
}

export default function FinanceCalculator({ initialPrice = 10_000, vehicleName, compact = false }: FinanceCalculatorProps) {
  const [tab, setTab] = useState<"monthly" | "afford">("monthly")

  // Monthly tab state
  const [price, setPrice] = useState(Math.min(MAX_PRICE, Math.max(MIN_PRICE, initialPrice)))
  const [deposit, setDeposit] = useState(0)
  const [term, setTerm] = useState(48)

  // Afford tab state
  const [budget, setBudget] = useState(250)
  const [affordDeposit, setAffordDeposit] = useState(0)
  const [affordTerm, setAffordTerm] = useState(48)

  const maxDeposit = Math.floor(price * 0.5 / 50) * 50
  const depositCapped = deposit > maxDeposit
  const safeDeposit = Math.min(deposit, maxDeposit)

  // Monthly payments calculation
  const monthlyResults = useMemo(() => {
    const credit = price - safeDeposit
    if (credit < MIN_CREDIT) return null
    const payment = (credit * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -term))
    const totalRepayable = payment * term + safeDeposit + OPTION_FEE
    const totalCostOfCredit = payment * term - credit + OPTION_FEE
    return { payment, totalRepayable, totalCostOfCredit, credit }
  }, [price, safeDeposit, term])

  // Afford calculation
  const affordResults = useMemo(() => {
    const credit = (budget * (1 - Math.pow(1 + monthlyRate, -affordTerm))) / monthlyRate
    const maxPrice = credit + affordDeposit
    const totalRepayable = budget * affordTerm + affordDeposit + OPTION_FEE
    const totalCostOfCredit = budget * affordTerm - credit + OPTION_FEE
    return { maxPrice, totalRepayable, totalCostOfCredit, credit }
  }, [budget, affordDeposit, affordTerm])

  const terms = [24, 36, 48, 60]

  return (
    <div className="w-full">
      {/* Above-card header — hidden in compact mode */}
      {!compact && (
        <div className="text-center mb-4">
          <p className="text-base font-semibold" style={{ color: BRAND_NAVY }}>
            Representative 11.9% APR
          </p>
          <p className="text-sm font-bold" style={{ color: BRAND_NAVY }}>
            Epping Car Sales is a credit broker, not a lender.
          </p>
        </div>
      )}

      {/* Main calculator card */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-md overflow-hidden">
        {!compact && (
          <div className="px-5 pt-4 pb-0">
            <p className="text-xs italic text-gray-400">For illustration purposes only</p>
          </div>
        )}

        <div className={`${compact ? "p-4" : "p-5 md:p-6"} flex flex-col md:flex-row gap-4`}>
          {/* ── Left: inputs ── */}
          <div className="flex-1 min-w-0">
            {/* Tabs */}
            <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-xl">
              {(["monthly", "afford"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="flex-1 py-2 px-3 rounded-lg text-sm font-semibold transition-all"
                  style={
                    tab === t
                      ? { backgroundColor: BRAND_YELLOW, color: "#000" }
                      : { backgroundColor: "transparent", color: BRAND_NAVY }
                  }
                >
                  {t === "monthly" ? "Monthly payments" : "What can I afford"}
                </button>
              ))}
            </div>

            {tab === "monthly" ? (
              <>
                <Stepper
                  label="Vehicle Price"
                  value={price}
                  onChange={setPrice}
                  step={250}
                  min={MIN_PRICE}
                  max={MAX_PRICE}
                  compact={compact}
                />
                <Stepper
                  label="Deposit"
                  value={safeDeposit}
                  onChange={setDeposit}
                  step={50}
                  min={0}
                  max={maxDeposit}
                  note={depositCapped ? `Deposit capped at 50% of vehicle price (${gbp.format(maxDeposit)})` : undefined}
                  compact={compact}
                />
                <div className={compact ? "mb-2" : "mb-5"}>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: BRAND_NAVY }}>
                    Finance Term (Months)
                  </label>
                  <div className="flex gap-2">
                    {terms.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setTerm(t)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all"
                        style={
                          term === t
                            ? { backgroundColor: BRAND_YELLOW, color: "#000", borderColor: BRAND_YELLOW }
                            : { backgroundColor: "white", color: BRAND_NAVY, borderColor: "#d1d5db" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <Stepper
                  label="Monthly Budget"
                  value={budget}
                  onChange={setBudget}
                  step={10}
                  min={100}
                  max={1000}
                  compact={compact}
                />
                <Stepper
                  label="Deposit"
                  value={affordDeposit}
                  onChange={setAffordDeposit}
                  step={50}
                  min={0}
                  max={50000}
                  compact={compact}
                />
                <div className={compact ? "mb-2" : "mb-5"}>
                  <label className="block text-sm font-semibold mb-1.5" style={{ color: BRAND_NAVY }}>
                    Finance Term (Months)
                  </label>
                  <div className="flex gap-2">
                    {terms.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setAffordTerm(t)}
                        className="flex-1 py-2.5 rounded-lg text-sm font-semibold border transition-all"
                        style={
                          affordTerm === t
                            ? { backgroundColor: BRAND_YELLOW, color: "#000", borderColor: BRAND_YELLOW }
                            : { backgroundColor: "white", color: BRAND_NAVY, borderColor: "#d1d5db" }
                        }
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Right: results card ── */}
          <div
            className="flex-1 min-w-0 rounded-xl p-5 flex flex-col"
            style={{ backgroundColor: "#f8fafc", border: `1.5px solid #e2e8f0` }}
          >
            {tab === "monthly" ? (
              monthlyResults === null ? (
                <div className="flex-1 flex items-center justify-center">
                  <p className="text-sm text-center text-gray-500 px-4">
                    The amount to finance is below the usual minimum of {gbp.format(MIN_CREDIT)}. Please increase the vehicle price or reduce the deposit.
                  </p>
                </div>
              ) : (
                <>
                  <p className="text-sm text-gray-500 mb-1">
                    <span className="font-semibold" style={{ color: BRAND_NAVY }}>{term}</span> monthly payments of
                  </p>
                  <div className="flex items-end mb-1">
                    <span className="font-extrabold leading-none" style={{ fontSize: compact ? "2rem" : "3rem", color: BRAND_ACCENT }}>
                      {formatPayment(monthlyResults.payment).pounds}
                    </span>
                    <span className="font-bold mb-1 ml-0.5" style={{ fontSize: compact ? "1.1rem" : "1.5rem", color: BRAND_ACCENT }}>
                      {formatPayment(monthlyResults.payment).pence}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">at 11.9% APR representative</p>

                  <a
                    href={APPLY_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-black text-sm transition-opacity hover:opacity-90 mb-2"
                    style={{ backgroundColor: BRAND_YELLOW }}
                  >
                    Apply Now <ChevronRight size={18} />
                  </a>
                  <Link
                    href={STOCK_URL}
                    className="text-center text-sm font-medium mb-4 block"
                    style={{ color: BRAND_NAVY }}
                  >
                    View our cars
                  </Link>

                  {!compact && (
                    <>
                      <p className="text-xs font-semibold mb-2" style={{ color: BRAND_NAVY }}>Breakdown</p>
                      {vehicleName && <Row label="Vehicle" value={vehicleName} />}
                      <Row label="Vehicle Price" value={gbp.format(price)} />
                      <Row label="Deposit" value={gbp.format(safeDeposit)} />
                      <Row label="Amount to Finance" value={gbp.format(monthlyResults.credit)} />
                      <Row label="APR" value="11.9% representative" />
                      {OPTION_FEE > 0 && <Row label="Option to purchase fee" value={gbp.format(OPTION_FEE)} />}
                      <Row label="Total Cost of Credit" value={gbp.format(monthlyResults.totalCostOfCredit)} />
                      <Row label="Total Repayable" value={gbp.format(monthlyResults.totalRepayable)} />
                    </>
                  )}
                </>
              )
            ) : (
              <>
                <p className="text-sm text-gray-500 mb-2">You could look at cars up to around</p>
                <p className="font-extrabold leading-none mb-1" style={{ fontSize: compact ? "2rem" : "2.5rem", color: BRAND_ACCENT }}>
                  {gbpRounded.format(affordResults.maxPrice)}
                </p>
                <p className="text-xs text-gray-500 mb-4">at 11.9% APR representative</p>

                <a
                  href={APPLY_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-bold text-black text-sm transition-opacity hover:opacity-90 mb-2"
                  style={{ backgroundColor: BRAND_YELLOW }}
                >
                  Apply Now <ChevronRight size={18} />
                </a>
                <Link
                  href={STOCK_URL}
                  className="text-center text-sm font-medium mb-4 block"
                  style={{ color: BRAND_NAVY }}
                >
                  View our cars
                </Link>

                {!compact && (
                  <>
                    <p className="text-xs font-semibold mb-2" style={{ color: BRAND_NAVY }}>Breakdown</p>
                    <Row label="Monthly Budget" value={gbp.format(budget)} />
                    <Row label="Deposit" value={gbp.format(affordDeposit)} />
                    <Row label="Amount to Finance" value={gbp.format(affordResults.credit)} />
                    <Row label="APR" value="11.9% representative" />
                    {OPTION_FEE > 0 && <Row label="Option to purchase fee" value={gbp.format(OPTION_FEE)} />}
                    <Row label="Total Cost of Credit" value={gbp.format(affordResults.totalCostOfCredit)} />
                    <Row label="Total Repayable" value={gbp.format(affordResults.totalRepayable)} />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Disclaimer beneath card */}
      <p className="text-xs text-gray-500 mt-3 leading-relaxed">
        This calculator is for illustration only and is not a quote or an offer of finance. Finance is subject to status and affordability checks. You must be 18 or over and a UK resident. Terms and conditions apply.
      </p>

      {/* Regulatory footer */}
      <div className="mt-4 text-xs text-gray-500 leading-relaxed border-t border-gray-200 pt-4">
        Epping Car Sales is authorised and regulated by the Financial Conduct Authority, firm reference number 1054225. We are a credit broker, not a lender. We can introduce you to a panel of lenders who may be able to provide finance for your purchase. If you take out finance following our introduction, we will typically receive a commission from the lender or broker. You can ask us at any time for details of the commission we expect to receive.
      </div>
    </div>
  )
}
