import React from 'react'
import { useCart } from '../../context/CartContext'

const CartPage: React.FC = () => {
  const { items, total, removeFromCart, clearCart } = useCart();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-white shadow rounded">
          <ul>
            {items.map(item => (
              <li key={item.id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  ) : null}
                  <div>
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-600">₹{item.price} × {item.quantity}</div>
                  </div>
                </div>
                <button className="text-red-600 hover:underline" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between p-4">
            <div className="font-semibold">Total: ₹{total}</div>
            <div className="flex gap-2">
              <button className="bg-gray-200 px-4 py-2 rounded" onClick={clearCart}>Clear</button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded">Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage



