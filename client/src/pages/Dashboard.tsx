import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../api/products/product";
import { addOrUpdateCartDelta, getCart } from "../api/cart/cart";

const Dashboard: React.FC = () => {
  const { data: products = [], isLoading } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const { data: cartItemsServer = [], refetch } = useQuery({ queryKey: ['cart'], queryFn: getCart });
  const [optimistic, setOptimistic] = useState<Record<string, number>>({});
  const cartMap = useMemo(() => {
    const base: Record<string, number> = {};
    for (const ci of cartItemsServer) base[ci.productId] = ci.quantity;
    return base;
  }, [cartItemsServer]);
  const getQty = (id?: string) => (id ? optimistic[id] ?? cartMap[id] ?? 0 : 0);
  const setDelta = (productId: string, delta: number, stock: number) => {
    setOptimistic(prev => {
      const next = (prev[productId] ?? cartMap[productId] ?? 0) + delta;
      return { ...prev, [productId]: Math.max(0, Math.min(stock, next)) };
    });
    addOrUpdateCartDelta(productId, delta).then(() => {
        refetch();
      }).catch(() => {
      setOptimistic(prev => ({ ...prev, [productId]: cartMap[productId] ?? 0 }));
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Our Products</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map(p => (
            <div key={p._id} className="bg-black rounded shadow p-4 flex flex-col">
              {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded mb-3" />}
              <div className="font-medium">{p.name}</div>
              <div className="text-gray-500 text-sm">Category: {p.category}</div>
              <div className="font-bold text-lg text-gray-400 mb-3">₹{p.price}</div>
              <div className="mt-auto flex items-center gap-2">
                {getQty(p._id) > 0 ? (
                  <>
                    <button className="bg-gray-800 px-3 py-1 rounded" onClick={() => p._id && setDelta(p._id, -1, p.stock)}>-</button>
                    <span>{getQty(p._id)}</span>
                    <button className="bg-gray-800 px-3 py-1 rounded" onClick={() => p._id && setDelta(p._id, 1, p.stock)} disabled={getQty(p._id) >= p.stock}>+</button>
                  </>
                ) : (
                  <button className="bg-blue-600 text-white px-3 py-1 rounded" onClick={() => p._id && setDelta(p._id, 1, p.stock)}>Add to Cart</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
