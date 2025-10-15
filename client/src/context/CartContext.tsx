import React, { createContext, useContext, useMemo, useState } from 'react'

export interface CartItem {
  id: number
  name: string
  price: number
  imageUrl?: string
  quantity: number
}

interface CartContextValue {
  items: CartItem[]
  cartCount: number
  total: number
  addToCart: (item: Omit<CartItem, 'quantity'>, qty?: number) => void
  removeFromCart: (id: number) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([])

  const addToCart = (item: Omit<CartItem, 'quantity'>, qty: number = 1) => {
    setItems(prev => {
      const existing = prev.find(p => p.id === item.id)
      if (existing) {
        return prev.map(p => p.id === item.id ? { ...p, quantity: p.quantity + qty } : p)
      }
      return [...prev, { ...item, quantity: qty }]
    })
  }

  const removeFromCart = (id: number) => {
    setItems(prev => prev.filter(p => p.id !== id))
  }

  const clearCart = () => setItems([])

  const cartCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items])
  const total = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items])

  const value: CartContextValue = {
    items,
    cartCount,
    total,
    addToCart,
    removeFromCart,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = (): CartContextValue => {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
