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
    <div className="container py-8 md:py-12 px-4 md:px-6">
      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4 md:mb-6">Contact Epping Car Sales</h1>
      <p className="text-muted-foreground mb-8 md:mb-10 max-w-3xl">
        If you have any questions about our stock, services, or would like to book a test drive, feel free to reach out
        using the form below or by phone.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6 mb-10 md:mb-12">
        <Card>
          <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
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
          <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">We'll respond promptly</p>
            <a href="mailto:henry@eppingcarsales.com" className="font-medium hover:underline">henry@eppingcarsales.com</a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 sm:p-6 flex flex-col items-center text-center">
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

      <div className="rounded-lg overflow-hidden border border-border">
        <iframe
          src="https://maps.google.com/maps?width=100%25&height=400&hl=en&q=Patches%20Farm%2C%20Galley%20Hill%2C%20Epping%20EN9%202AG&t=&z=14&ie=UTF8&iwloc=B&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Epping Car Sales Location"
          className="w-full h-[280px] sm:h-[360px] md:h-[400px] block"
        ></iframe>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-background p-4 sm:p-5">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="font-bold leading-tight">Visit Us (Appointment Only)</h3>
              <p className="text-sm text-muted-foreground">Patches Farm, Galley Hill, Epping, EN9 2AG</p>
            </div>
          </div>
          <a
            href="https://www.google.com/maps/dir/?api=1&destination=Patches+Farm+Galley+Hill+Epping+EN9+2AG"
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0"
          >
            <Button className="w-full sm:w-auto bg-gjc-yellow hover:bg-gjc-yellow-hover text-black font-semibold">
              Get Directions
            </Button>
          </a>
        </div>
      </div>
    </div>
  )
}
