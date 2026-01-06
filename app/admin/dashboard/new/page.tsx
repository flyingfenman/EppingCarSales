import { CarForm } from "@/components/admin/car-form"

export default function NewCarPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Add New Car</h1>
      <CarForm mode="create" />
    </div>
  )
}
