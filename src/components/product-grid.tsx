"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { Product } from "@/lib/products"


interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products = [] }: ProductGridProps) {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.isArray(products) && products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onSelect={() => setSelectedProduct(product)}
        />
      ))}
      {selectedProduct && (
        <ProductModal
          product={{...selectedProduct, id: selectedProduct.id.toString()}}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  )
}

