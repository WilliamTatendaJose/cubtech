import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCart } from "@/hooks/use-cart"
import { Product } from "@/lib/products"

interface ProductModalProps {
  product: Product
  onClose: () => void
}

export function ProductModal({ product, onClose }: ProductModalProps) {
  const { addItem } = useCart()

  const handleAddToCart = () => {
    addItem(product)
    onClose()
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
          <DialogDescription>
            Detailed information about the product
          </DialogDescription>
        </DialogHeader>
        <div className="relative h-64 my-4">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-md"
          />
        </div>
        <p className="text-muted-foreground">{product.description}</p>
        <p className="mt-2 font-bold text-lg">${product.price.toFixed(2)}</p>
        <p className="text-sm text-muted-foreground">Category: {product.category}</p>
        <Button onClick={handleAddToCart} className="w-full mt-4">
          Add to Cart
        </Button>
      </DialogContent>
    </Dialog>
  )
}

