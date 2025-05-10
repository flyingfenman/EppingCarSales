import Link from "next/link"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <p>&copy; 2024 GJC500. All rights reserved.</p>
        <div className="footer-links">
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  )
}
