"use client"

import { useState } from "react"
import { ShopHeader } from "@/components/shop-header"
import { ProductGrid } from "@/components/product-grid"
import { SiteFooter } from "@/components/site-footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CartProvider } from '@/components/cartProvider'
import { products } from "@/lib/products"

export default function ShopPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const categories = ["All", ...new Set(products.map(product => product.category))]

  const filteredProducts = products.filter(product => 
    (selectedCategory === "All" || product.category === selectedCategory) &&
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <>
    <CartProvider>
      <div className="flex min-h-screen flex-col">
          <ShopHeader />
          <main className="flex-1 container py-12">
            <h1 className="text-3xl font-bold mb-6">Our Products</h1>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
              <div>
                <Label htmlFor="search">Search Products</Label>
                <Input
                  id="search"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <ProductGrid products={filteredProducts} />
          </main>
          <SiteFooter />
        </div>
    </CartProvider>
   
    </>
   
  )
}

