import Link from "next/link"
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react"

export function SiteFooter() {
  return (
    <footer className="border-t bg-slate-950 text-slate-50">
      <div className="container py-12">
        <div className="grid gap-8 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
                CubTech
              </span>
              <span className="text-2xl font-bold">Engineering</span>
            </Link>
            <p className="mt-4 text-slate-400">
              Your trusted partner in engineering excellence, providing comprehensive solutions for all your technical needs.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#about" className="text-slate-400 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#services" className="text-slate-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#projects" className="text-slate-400 hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-slate-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-slate-400">Automation</li>
              <li className="text-slate-400">Security Systems</li>
              <li className="text-slate-400">Solar Solutions</li>
              <li className="text-slate-400">Generators</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="text-slate-400">Harare, Zimbabwe</li>
              <li className="text-slate-400">cubtechengineering@gmail.com</li>
              <li className="text-slate-400">+263 77 777 5356 / +263 71 977 5346</li>
            </ul>
            <div className="mt-4 flex space-x-4">
              <Link href="#" className="text-slate-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-slate-400 hover:text-white">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-slate-800 pt-8 text-center text-slate-400">
          <p>© {new Date().getFullYear()} CubTech Engineering. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

