"use server"

export async function sendContactEmail(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string
  const inquiryType = formData.get("inquiry-type") as string
  const message = formData.get("message") as string

  // For now, we'll just log the submission and return success
  // The actual email will be handled on the client side
  console.log("Contact form submission:", {
    name,
    email,
    phone,
    inquiryType,
    message,
    timestamp: new Date().toISOString(),
  })

  return {
    success: true,
    message: "Message received! We'll get back to you soon.",
    formData: { name, email, phone, inquiryType, message },
  }
}
