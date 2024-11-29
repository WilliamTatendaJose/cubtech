import { Button } from "@/components/ui/button"
import { useCart } from "@/hooks/use-cart"
import { ShoppingBag, Trash2 } from 'lucide-react'
import Link from "next/link"

export function CartSidebar() {
  const { items, removeItem, clearCart, total } = useCart()

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
      {items.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      ) : (
        <>
          <div className="flex-1 overflow-auto">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2">
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between mb-4">
              <span className="font-bold">Total:</span>
              <span className="font-bold">${total.toFixed(2)}</span>
            </div>
            <Button asChild className="w-full mb-2">
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </div>
        </>
      )}
    </div>
  )
}

