import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, deleteProduct } from '../../api/products/product';
import type { ProductPayload } from '../../api/products/product';
import ProductTable from '../../components/Product/ProductTable';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function ProductMaster() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { data: products, isLoading, isError, error } = useQuery<ProductPayload[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const [page, setPage] = useState(1);
  const pageSize = 10;
  const total = (products?.length ?? 0);
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const visible = (products ?? []).slice((page - 1) * pageSize, page * pageSize);

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setPage(1);
    },
  });

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="w-full mx-auto py-10 px-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={() => navigate('/products/create')}>Add Product</button>
      </div>

      <div className="mt-8 overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-600">{error?.message || 'Failed to load products'}</p>
        ) : (
          <>
            <ProductTable
              products={visible}
              onEdit={() => {}}
              onDelete={handleDelete}
            />
            <div className="flex items-center justify-end gap-2 mt-4">
              <button className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50" onClick={() => setPage((p: number) => Math.max(1, p - 1))} disabled={page === 1}>Prev</button>
              <span className="text-sm">Page {page} of {totalPages}</span>
              <button className="px-3 py-1 bg-gray-700 rounded disabled:opacity-50" onClick={() => setPage((p: number) => Math.min(totalPages, p + 1))} disabled={page === totalPages}>Next</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
