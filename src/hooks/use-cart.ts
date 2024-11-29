import { useState, useEffect } from 'react'

// Define a type for the cart item
type CartItem = {
  id: number; // or string, depending on your product ID type
  price: number;
  name: string
  cartId?: number; // Added cartId as an optional property
  // Add other product properties as needed
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([])

  useEffect(() => {
    const storedItems = localStorage.getItem('cart')
    if (storedItems) {
      setItems(JSON.parse(storedItems))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items))
  }, [items])

  const addItem = (product: CartItem) => {
    setItems((prevItems) => [...prevItems, { ...product, cartId: Date.now() }])
  }

  const removeItem = (cartId: any) => {
    setItems((prevItems) => prevItems.filter(item => item.cartId !== cartId))
  }

  const clearCart = () => {
    setItems([])
  }

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return { items, addItem, removeItem, clearCart, total }
}

