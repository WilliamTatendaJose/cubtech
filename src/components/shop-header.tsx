"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useCart } from "@/hooks/use-cart"
import { CartSidebar } from "@/components/cart-sidebar"

export function ShopHeader() {
  const [isOpen, setIsOpen] = useState(false)
  const { items } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
              CubTech
            </span>
            <span className="text-2xl font-bold">Shop</span>
          </Link>
        </div>
        <nav className="ml-auto flex items-center space-x-4">
          <Link href="/shop" className="text-sm font-medium hover:text-primary">
            Products
          </Link>
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-xs text-white flex items-center justify-center">
                    {items.length}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <CartSidebar />
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </header>
  )
}

