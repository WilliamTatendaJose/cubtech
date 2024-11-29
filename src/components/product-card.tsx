"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/lib/products"

interface ProductCardProps {
  product: Product
  onSelect: () => void
}

export function ProductCard({ product, onSelect }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 cursor-pointer" onClick={onSelect}>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="mt-2 font-bold">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Category: {product.category}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={() => addItem(product)} className="w-full">
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  )
}

