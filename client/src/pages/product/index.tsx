import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchProducts, addOrUpdateProduct, deleteProduct } from '../../api/products/product';
import type { ProductPayload } from '../../api/products/product';
import { useState } from 'react';
import ProductForm from '../../components/Product/AddUpdateForm';
import ProductTable from '../../components/Product/ProductTable';

export default function ProductMaster() {
  const queryClient = useQueryClient();
  const [selectedProduct, setSelectedProduct] = useState<ProductPayload | null>(null);

  const { data: products, isLoading, isError, error } = useQuery<ProductPayload[], Error>({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  const addOrUpdateMutation = useMutation<ProductPayload, Error, ProductPayload>({
    mutationFn: addOrUpdateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      setSelectedProduct(null);
    },
  });

  const deleteMutation = useMutation<void, Error, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });

  const handleAddOrUpdate = (product: ProductPayload) => {
    addOrUpdateMutation.mutate(product);
  };

  const handleDelete = (id: number) => {
    deleteMutation.mutate(id);
  };

  return (
    <div className="w-full mx-auto py-10 px-4">
      <h1 className="text-2xl font-bold mb-6">Product Master</h1>

      <ProductForm
        onSubmit={handleAddOrUpdate}
        initialData={selectedProduct || undefined}
        onCancel={() => setSelectedProduct(null)}
      />

      <div className="mt-8 overflow-x-auto">
        {isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className="text-red-600">{error?.message || 'Failed to load products'}</p>
        ) : (
          <ProductTable
            products={products ?? []}
            onEdit={(product) => setSelectedProduct(product)}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}
