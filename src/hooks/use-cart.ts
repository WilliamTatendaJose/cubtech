import { useState, useEffect, useCallback } from 'react'
import { Product } from '@/lib/products'

// Define a type for the cart item
interface CartItem extends Product {
  cartId: number
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

  const addItem = useCallback((product: Product) => {
    setItems((prevItems) => [...prevItems, { ...product, cartId: Date.now() }])
  }, [])

const removeItem = useCallback((cartId: number) => {
    setItems((prevItems) => prevItems.filter(item => item.cartId !== cartId))
  }, [])

    const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const total = items.reduce((sum, item) => sum + item.price, 0)

  return { items, addItem, removeItem, clearCart, total }
}

