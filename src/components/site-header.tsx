"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingBag} from 'lucide-react'
import { useState } from "react"
import { Menu } from 'lucide-react'
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              CubTech
            </span>
            <span className="text-2xl font-bold">Engineering</span>
          </Link>
        </div>
        <nav className="ml-auto hidden md:flex gap-6">
          <Link href="#home" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link href="#about" className="text-sm font-medium hover:text-primary">
            About
          </Link>
          <Link href="#services" className="text-sm font-medium hover:text-primary">
            Services
          </Link>
          <Link href="#projects" className="text-sm font-medium hover:text-primary">
            Projects
          </Link>
          <Link href="#contact" className="text-sm font-medium hover:text-primary">
            Contact Us
          </Link>
        </nav>
        <div className="ml-auto md:ml-6">
          <Button variant="default" className="hidden md:inline-flex bg-blue-600 hover:bg-blue-700">
            <ShoppingBag className="mr-2 h-4 w-4" />
            <Link href="/shop">Visit Our Shop</Link>
          </Button>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4">
                <Link href="#home" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                  Home
                </Link>
                <Link href="/#about" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                  About
                </Link>
                <Link href="#services" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                  Services
                </Link>
                <Link href="#projects" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                  Projects
                </Link>
                <Link href="#contact" className="text-sm font-medium" onClick={() => setIsOpen(false)}>
                  Contact
                </Link>
              </nav>
              <Button variant="default" className="mt-6 w-full bg-blue-600 hover:bg-blue-700">
                <ShoppingBag className="mr-2 h-4 w-4" />
               <Link href="/shop">Visit Our Shop</Link>
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

