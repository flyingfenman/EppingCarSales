"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { sendContactEmail } from "@/app/actions/send-email"
import { trackContactForm, trackPhoneClick } from "@/lib/analytics"

export default function Contact() {
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus("idle")

    const form = e.currentTarget

    try {
      const formData = new FormData(form)
      const inquiryType = formData.get("inquiry-type") as string

      // Call server action to send email
      const result = await sendContactEmail(formData)

      if (result.success) {
        setFormStatus("success")
        form.reset()
        trackContactForm(inquiryType || "general")
      } else {
        setFormStatus("error")
      }
    } catch (error) {
      console.error("Form submission error:", error)
      setFormStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container py-12 px-4 md:px-6">
      <h1 className="text-3xl font-bold tracking-tight mb-6">Contact Epping Car Sales</h1>
      <p className="text-muted-foreground mb-10 max-w-3xl">
        If you have any questions about our stock, services, or would like to book a test drive, feel free to reach out
        using the form below or by phone.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Call Us</h3>
            <p className="text-muted-foreground mb-4">Our team is here to help</p>
            <a
              href="tel:+441992367909"
              className="font-medium hover:text-primary"
              onClick={() => trackPhoneClick("+441992367909")}
            >
              +44 1992 367909
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">We'll respond promptly</p>
            <a href="mailto:henry@eppingcarsales.com" className="font-medium hover:underline">henry@eppingcarsales.com</a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-4">Appointment Only</p>
            <p className="font-medium">Patches Farm, Galley Hill<br />Epping, EN9 2AG</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <div>
          <h2 className="text-2xl font-bold mb-6">Send Us a Message</h2>

          {formStatus === "success" && (
            <Alert className="mb-6 bg-green-50 text-green-800 border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Message Sent!</AlertTitle>
              <AlertDescription>
                Your message has been sent successfully. We'll get back to you soon!
              </AlertDescription>
            </Alert>
          )}

          {formStatus === "error" && (
            <Alert className="mb-6 bg-red-50 text-red-800 border-red-200">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                There was a problem sending your message. Please try calling us at +44 1992 367909.
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" required placeholder="John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" name="email" required placeholder="john.doe@example.com" />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" type="tel" name="phone" placeholder="07740 080073" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiry-type">Inquiry Type</Label>
              <Select name="inquiry-type">
                <SelectTrigger id="inquiry-type">
                  <SelectValue placeholder="Select an inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Inquiry</SelectItem>
                  <SelectItem value="sales">Sales Inquiry</SelectItem>
                  <SelectItem value="test-drive">Test Drive Request</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Your Message</Label>
              <Textarea id="message" name="message" required placeholder="Type your message here..." rows={6} />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#F7B32B] hover:bg-[#E5A420] text-black font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-6">Opening Hours</h2>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start mb-6">
                <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                <div>
                  <h3 className="font-bold mb-2">Dealership Hours</h3>
                  <p className="text-muted-foreground mb-2">
                    Visit our dealership to view our selection of quality used cars.
                  </p>
                  <p className="text-sm font-semibold text-primary">By appointment only</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-lg overflow-hidden h-[400px] relative">
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
          <div className="bg-background p-6 rounded-lg max-w-md text-center">
            <h3 className="text-xl font-bold mb-2">Visit Us</h3>
            <p className="mb-4">Patches Farm, Galley Hill, Epping, EN9 2AG</p>
            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Patches+Farm+Galley+Hill+Epping+EN9+2AG"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gjc-yellow hover:bg-gjc-yellow-hover text-black">Get Directions</Button>
            </a>
          </div>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2474.0!2d0.0167!3d51.7167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d89f0e0e0e0e0f%3A0x0!2sPatches+Farm%2C+Galley+Hill%2C+Epping+EN9+2AG!5e0!3m2!1sen!2suk!4v1700000000000!5m2!1sen!2suk"
          width="100%"
          height="400"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          title="Epping Car Sales Location"
          className="w-full h-full"
        ></iframe>
      </div>
    </div>
  )
}
