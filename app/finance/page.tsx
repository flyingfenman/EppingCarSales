import type { Metadata } from "next"
import FinanceCalculator from "@/components/finance-calculator"

export const metadata: Metadata = {
  title: "Car Finance Calculator | Epping Car Sales",
  description:
    "Use our finance calculator to estimate monthly payments on your next car. Representative 11.9% APR. Epping Car Sales is a credit broker, not a lender.",
}

const MIN_PRICE = 2000
const MAX_PRICE = 100_000

interface FinancePageProps {
  searchParams: Promise<{ price?: string; vehicle?: string }>
}

export default async function FinancePage({ searchParams }: FinancePageProps) {
  const params = await searchParams

  // Parse ?price= — clamp between MIN_PRICE and MAX_PRICE, fall back to default
  let initialPrice = 10_000
  if (params.price) {
    const parsed = Number(params.price)
    if (!isNaN(parsed) && parsed > 0) {
      initialPrice = Math.min(MAX_PRICE, Math.max(MIN_PRICE, parsed))
    }
  }

  // Parse ?vehicle= — fall back to undefined when missing
  const vehicleName = params.vehicle?.trim() || undefined

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f1f5f9" }}>
      <div className="max-w-4xl mx-auto px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold mb-2" style={{ color: "#0f2044" }}>
          Car Finance Calculator
        </h1>
        <p className="text-gray-600 mb-8">
          Get an instant illustration of your monthly payments or find out what you could afford.
        </p>

        {vehicleName && (
          <p className="text-lg font-semibold mb-4" style={{ color: "#0f2044" }}>
            Finance this {vehicleName}
          </p>
        )}

        <FinanceCalculator initialPrice={initialPrice} vehicleName={vehicleName} />
      </div>
    </div>
  )
}
