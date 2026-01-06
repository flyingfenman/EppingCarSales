import { CarForm } from "@/components/admin/car-form"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function AddCarPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link href="/admin/dashboard" className="inline-flex items-center text-gray-600 hover:text-black mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-6">Add New Car</h1>
        <CarForm mode="create" />
      </div>
    </div>
  )
}
