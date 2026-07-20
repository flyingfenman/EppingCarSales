import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Read the Epping Car Sales privacy policy and how we protect and use your information.",
  alternates: { canonical: "https://www.eppingcarsales.com/privacy" },
}

export default function PrivacyPolicy() {
  return (
    <div className="privacy-policy-container">
      <div className="privacy-content">
        <header className="privacy-header">
          <h1>Privacy Policy for Epping Car Sales</h1>
          <p className="last-updated">Last Updated: July 14, 2025</p>
        </header>

        <div className="privacy-intro">
          <p>
            At Epping Car Sales, we are committed to protecting your privacy. This Privacy Policy explains how we
            collect, use, disclose, and safeguard your information when you visit our dealership, use our website, or
            interact with us in any other way.
          </p>
          <p>
            Please read this Privacy Policy carefully. If you do not agree with the terms of this Privacy Policy, please
            do not access or use our services.
          </p>
        </div>

        <div className="privacy-sections">
          <section>
            <h2>1. Information We Collect</h2>
            <p>
              We may collect personal information from you in a variety of ways, including, but not limited to, when
              you:
            </p>
            <ul>
              <li>Visit our dealership.</li>
              <li>Browse or make an inquiry through our website.</li>
              <li>Apply for financing.</li>
              <li>Purchase, lease, or service a vehicle.</li>
              <li>Participate in promotions or surveys.</li>
              <li>Contact us for support or information.</li>
            </ul>
            <p>The types of personal information we may collect include:</p>
            <ul>
              <li>
                <strong>Contact Information:</strong> Name, address, email address, phone number.
              </li>
              <li>
                <strong>Demographic Information:</strong> Age, gender, marital status.
              </li>
              <li>
                <strong>Financial Information:</strong> Income, credit history, bank account details (for financing
                purposes).
              </li>
              <li>
                <strong>Vehicle Information:</strong> Vehicle identification number (VIN), make, model, year, service
                history, mileage.
              </li>
              <li>
                <strong>Identification Information:</strong> Driver's license number, passport details (as required for
                transactions).
              </li>
              <li>
                <strong>Online Activity Information:</strong> IP address, browser type, operating system, browsing
                history on our website, cookies, and other tracking technologies.
              </li>
              <li>
                <strong>Communications:</strong> Records of your interactions with us, including phone calls, emails,
                and chat messages.
              </li>
            </ul>
          </section>

          <section>
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes, including:</p>
            <ul>
              <li>
                <strong>To Provide Services:</strong> To process your vehicle purchases, leases, service appointments,
                and financing applications.
              </li>
              <li>
                <strong>To Communicate with You:</strong> To respond to your inquiries, send you updates about your
                vehicle, service reminders, and promotional offers.
              </li>
              <li>
                <strong>To Improve Our Services:</strong> To understand your needs and preferences, and to enhance our
                products, services, and website.
              </li>
              <li>
                <strong>For Marketing and Promotions:</strong> To send you marketing communications about new vehicles,
                special offers, and events that may be of interest to you. You can opt-out of these communications at
                any time.
              </li>
              <li>
                <strong>For Legal and Security Purposes:</strong> To comply with legal obligations, enforce our terms
                and conditions, and protect the security and integrity of our dealership and website.
              </li>
              <li>
                <strong>For Internal Operations:</strong> For data analysis, auditing, fraud prevention, and other
                internal business purposes.
              </li>
            </ul>
          </section>

          <section>
            <h2>3. How We Share Your Information</h2>
            <p>We may share your personal information with third parties in the following circumstances:</p>
            <ul>
              <li>
                <strong>With Affiliates:</strong> With our affiliated companies and brands for business and operational
                purposes.
              </li>
              <li>
                <strong>With Service Providers:</strong> With trusted third-party service providers who perform
                functions on our behalf, such as financing companies, warranty providers, payment processors, IT service
                providers, and marketing agencies. These providers are obligated to protect your information and use it
                only for the purposes for which we disclose it to them.
              </li>
              <li>
                <strong>For Financing:</strong> With banks, lenders, and other financial institutions when you apply for
                vehicle financing.
              </li>
              <li>
                <strong>For Legal Reasons:</strong> When required by law, court order, or government regulation, or if
                we believe such action is necessary to comply with legal processes, protect our rights or property, or
                ensure the safety of our customers or the public.
              </li>
              <li>
                <strong>In Case of Business Transfer:</strong> In connection with, or during negotiations of, any
                merger, sale of company assets, financing, or acquisition of all or a portion of our business to another
                company.
              </li>
              <li>
                <strong>With Your Consent:</strong> With your explicit consent for any other purpose not outlined in
                this policy.
              </li>
            </ul>
          </section>

          <section>
            <h2>4. Your Choices</h2>
            <p>You have certain choices regarding the personal information you provide to us:</p>
            <ul>
              <li>
                <strong>Opt-Out of Marketing Communications:</strong> You can opt-out of receiving promotional emails or
                text messages from us by following the unsubscribe instructions included in those communications or by
                contacting us directly.
              </li>
              <li>
                <strong>Access and Update Your Information:</strong> You may request access to, or correction of, your
                personal information that we hold.
              </li>
              <li>
                <strong>Cookies:</strong> Most web browsers are set to accept cookies by default. If you prefer, you can
                usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove
                cookies or reject cookies, this could affect certain features or services of our website.
              </li>
            </ul>
          </section>

          <section>
            <h2>5. Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures designed to protect your personal
              information from unauthorized access, use, alteration, and disclosure. However, please be aware that no
              method of transmission over the Internet or method of electronic storage is 100% secure.
            </p>
          </section>

          <section>
            <h2>6. Data Retention</h2>
            <p>
              We retain your personal information for as long as necessary to fulfill the purposes outlined in this
              Privacy Policy, unless a longer retention period is required or permitted by law.
            </p>
          </section>

          <section>
            <h2>7. Children's Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 16. We do not knowingly collect personal
              information from children under 16. If we become aware that we have inadvertently collected personal
              information from a child under 16, we will take steps to delete such information as soon as possible.
            </p>
          </section>

          <section>
            <h2>8. Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              Privacy Policy on our website and updating the "Last Updated" date at the top of this policy. We encourage
              you to review this Privacy Policy periodically for any changes.
            </p>
          </section>

          <section>
            <h2>9. Contact Us</h2>
            <p>
              If you have any questions or concerns about this Privacy Policy or our data practices, please contact us
              at:
            </p>
            <div className="contact-info">
              <p>
                <strong>Epping Car Sales</strong>
              </p>
              <p>YOUR_ADDRESS</p>
              <p>+44 1992 367909</p>
              <p>YOUR_EMAIL_ADDRESS</p>
            </div>
          </section>
        </div>

        <div className="privacy-footer">
          <Link href="/" className="back-link">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
