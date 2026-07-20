import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Epping Car Sales",
  description: "Contact Epping Car Sales at Patches Farm, Galley Hill, Epping, EN9 2AG. Call 01992 367909, email henry@eppingcarsales.com or get directions.",
  alternates: { canonical: "https://www.eppingcarsales.com/contact" },
  openGraph: {
    url: "https://www.eppingcarsales.com/contact",
    title: "Contact Epping Car Sales",
    description: "Call, email or visit Epping Car Sales in Epping, Essex.",
  },
}

export default function ContactLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children
}
