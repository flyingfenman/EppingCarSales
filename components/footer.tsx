import Link from "next/link"

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-content">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-sm">
            <p>&copy; {new Date().getFullYear()} Epping Car Sales. All rights reserved.</p>
            <span className="hidden sm:inline text-gray-400">|</span>
            <a href="tel:+441992367909" className="hover:underline">+44 1992 367909</a>
            <span className="hidden sm:inline text-gray-400">|</span>
            <span>Patches Farm, Galley Hill, Epping, EN9 2AG</span>
          </div>
          <div className="footer-links">
            <Link href="/privacy">Privacy Policy</Link>
            <Link href="/admin">Admin</Link>
            <Link href="/terms">Terms of Service</Link>
            <Link href="/contact">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
