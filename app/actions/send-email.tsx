"use server"

import { Resend } from "resend"

export async function sendContactEmail(formData: FormData) {
  try {
    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const inquiryType = formData.get("inquiry-type") as string
    const message = formData.get("message") as string

    const resend = new Resend(process.env.RESEND_API_KEY)

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return { success: false, error: "Email service not configured" }
    }

    const { data, error } = await resend.emails.send({
      from: "GJC500 Contact Form <onboarding@resend.dev>",
      to: ["henry@gjc500.co.uk"],
      replyTo: email,
      subject: `New ${inquiryType || "Contact"} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Inquiry Type:</strong> ${inquiryType || "General"}</p>
        <h3>Message:</h3>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
      text: `
Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Inquiry Type: ${inquiryType || "General"}

Message:
${message}
      `,
    })

    if (error) {
      console.error("Resend error:", error)
      return { success: false, error: "Failed to send email" }
    }

    return { success: true }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error: error instanceof Error ? error.message : "Unknown error" }
  }
}
