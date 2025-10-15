import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import type { ProductPayload } from '../../api/products/product';

type Product = ProductPayload;

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  initialData?: Product;
  onCancel?: () => void;
}

const categories = ['Electronics', 'Furniture', 'Clothing', 'Books'];

export default function ProductForm({ onSubmit, initialData, onCancel }: ProductFormProps) {
  const { register, handleSubmit, reset, formState: { errors, isValid } } = useForm<Product>({
    mode: 'onChange',
    defaultValues: initialData ?? {
      name: '',
      price: 0,
      imageUrl: '',
      category: categories[0],
      stock: 0,
    }
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit((data: Product) => onSubmit(data))} className="space-y-4 bg-black p-4 rounded shadow">
      <div>
        <label className="block font-medium">Product Name</label>
        <input
          {...register('name', { required: 'Name is required', minLength: { value: 2, message: 'Min 2 characters' } })}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          type="number"
          step="0.01"
          {...register('price', {
            valueAsNumber: true,
            required: 'Price is required',
            validate: (v: number) => (Number.isFinite(v) && v > 0) || 'Price must be positive'
          })}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Image URL</label>
        <input
          type="url"
          {...register('imageUrl', {
            required: 'Image URL is required',
            validate: (v: string) => { try { new URL(v); return true; } catch { return 'Enter a valid URL'; } }
          })}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          {...register('category', { required: 'Category is required' })}
          className="border rounded px-3 py-2 w-full"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
      </div>

      <div>
        <label className="block font-medium">Stock</label>
        <input
          type="number"
          {...register('stock', {
            valueAsNumber: true,
            required: 'Stock is required',
            validate: (v: number) => (Number.isInteger(v) && v >= 0) || 'Stock must be 0 or more'
          })}
          className="border rounded px-3 py-2 w-full"
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" disabled={!isValid}>
          {initialData?._id ? 'Update' : 'Add'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-800 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
