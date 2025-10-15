import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { checkoutCart, getCart, removeFromCart } from '../../api/cart/cart'

const CartPage: React.FC = () => {
  const qc = useQueryClient();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [messageTimeout, setMessageTimeout] = useState<number | null>(null);
  const { data: items = [] } = useQuery({ queryKey: ['cart'], queryFn: getCart });

  const total = items.reduce((s, i) => s + Number(i?.product?.price) * Number(i?.quantity), 0);

  const removeMut = useMutation({
    mutationFn: (id: string) => removeFromCart(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['cart'] })
  });

  const checkoutMut = useMutation({
    mutationFn: checkoutCart,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['cart'] });
      setOrderPlaced(true);
      if (messageTimeout !== null) {
        clearTimeout(messageTimeout);
      }
      const timer = setTimeout(() => {
        setOrderPlaced(false);
      }, 2000);

      setMessageTimeout(timer);
    },
  });

  const handleCheckout = () => {
    checkoutMut.mutate();
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">My Cart</h1>
      {orderPlaced && (
        <div className="bg-green-500 text-white p-4 mb-4 rounded">
          Your order has been placed! 🎉
        </div>
      )}
      {!orderPlaced && items.length === 0 ? (
        <p className="text-gray-600">Your cart is empty.</p>
      ) : (
        <div className="bg-black shadow rounded">
          <ul>
            {items.map(item => (
              <li key={item._id} className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center gap-4">
                  {item.product.imageUrl ? (
                    <img src={item.product.imageUrl} alt={item.product.name} className="w-12 h-12 object-cover rounded" />
                  ) : null}
                  <div>
                    <div className="font-medium">{item.product.name}</div>
                    <div className="text-sm text-gray-400">₹{item.product.price} × {item.quantity}</div>
                  </div>
                </div>
                <button className="text-red-600 hover:underline" onClick={() => item._id && removeMut.mutate(item._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <div className="flex items-center justify-between p-4">
            <div className="font-semibold">Total: ₹{total}</div>
            <div className="flex gap-2">
              <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleCheckout}>Checkout</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartPage
