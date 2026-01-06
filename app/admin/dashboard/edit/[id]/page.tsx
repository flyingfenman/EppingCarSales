import { CarForm } from "@/components/admin/car-form"
import { getCar } from "@/app/actions/cars"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default async function EditCarPage({ params }: { params: { id: string } }) {
  try {
    const car = await getCar(params.id)

    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/admin/dashboard" className="inline-flex items-center text-gray-600 hover:text-black mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold mb-6">Edit Car: {car.title}</h1>
          <CarForm car={car} mode="edit" />
        </div>
      </div>
    )
  } catch (error) {
    notFound()
  }
}
