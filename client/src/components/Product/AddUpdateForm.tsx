import { useState, useEffect } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import type { ProductPayload } from '../../api/products/product';

type Product = ProductPayload;

interface ProductFormProps {
  onSubmit: (product: Product) => void;
  initialData?: Product;
  onCancel?: () => void;
}

const categories = ['Electronics', 'Furniture', 'Clothing', 'Books'];

export default function ProductForm({ onSubmit, initialData, onCancel }: ProductFormProps) {
  const [formData, setFormData] = useState<Product>(
    initialData ?? {
      name: '',
      price: 0,
      imageUrl: '',
      category: categories[0],
      stock: 0,
    }
  );

  const [errors, setErrors] = useState({
    name: '',
    price: '',
    imageUrl: '',
    category: '',
    stock: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'price' || name === 'stock' ? Number(value) : value,
    });
  };

  const validateForm = (): boolean => {
    debugger
    const newErrors = { name: '', price: '', imageUrl: '', category: '', stock: '' };

    if (!formData.name?.trim()) newErrors.name = 'Name is required';
    if (!Number.isFinite(formData.price) || formData.price <= 0) newErrors.price = 'Price must be a positive number';
    try {
      new URL(formData.imageUrl);
    } catch {
      newErrors.imageUrl = 'Valid image URL is required';
    }
    if (!formData.category) newErrors.category = 'Category is required';
    if (!Number.isInteger(formData.stock) || formData.stock < 0) newErrors.stock = 'Stock must be 0 or more';

    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const isFormValid = (): boolean => {
    const nameOk = !!formData.name?.trim();
    const priceOk = Number.isFinite(formData.price) && formData.price > 0;
    let imageOk = true;
    // try { new URL(formData.imageUrl); } catch { imageOk = false; }
    const categoryOk = !!formData.category;
    const stockOk = Number.isInteger(formData.stock) && formData.stock >= 0;
    return nameOk && priceOk && imageOk && categoryOk && stockOk;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-black p-4 rounded shadow">
      <div>
        <label className="block font-medium">Product Name</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        />
        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
      </div>

      <div>
        <label className="block font-medium">Price</label>
        <input
          name="price"
          value={Number.isFinite(formData.price) ? formData.price : ''}
          onChange={handleChange}
          type="number"
          className="border rounded px-3 py-2 w-full"
          required
        />
        {errors.price && <p className="text-red-500 text-sm">{errors.price}</p>}
      </div>

      <div>
        <label className="block font-medium">Image URL</label>
        <input
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          type="url"
          className="border rounded px-3 py-2 w-full"
          required
        />
        {errors.imageUrl && <p className="text-red-500 text-sm">{errors.imageUrl}</p>}
      </div>

      <div>
        <label className="block font-medium">Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded px-3 py-2 w-full"
          required
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
      </div>

      <div>
        <label className="block font-medium">Stock</label>
        <input
          name="stock"
          value={Number.isFinite(formData.stock) ? formData.stock : ''}
          onChange={handleChange}
          type="number"
          className="border rounded px-3 py-2 w-full"
          required
        />
        {errors.stock && <p className="text-red-500 text-sm">{errors.stock}</p>}
      </div>

      <div className="flex space-x-2">
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-60" disabled={!isFormValid()}>
          {formData.id ? 'Update' : 'Add'}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
