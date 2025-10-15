import type { ProductPayload } from "../../api/products/product";

interface ProductTableProps {
  products: ProductPayload[];
  onEdit: (product: ProductPayload) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onEdit, onDelete }: ProductTableProps) {
  return (
    <table className="min-w-full bg-black shadow rounded overflow-hidden">
      <thead className="bg-gray-900">
        <tr>
          <th className="text-left p-3">Name</th>
          <th className="text-left p-3">Price</th>
          <th className="text-left p-3">Category</th>
          <th className="text-left p-3">Stock</th>
          <th className="text-left p-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {(products ?? []).map((product) => (
          <tr key={product.id} className="border-t">
            <td className="p-3">{product.name}</td>
            <td className="p-3">{product.price}</td>
            <td className="p-3">{product.category}</td>
            <td className="p-3">{product.stock}</td>
            <td className="p-3">
              <button
                onClick={() => onEdit(product)}
                className="text-blue-600 hover:underline"
              >
                Edit
              </button>
              <button
                onClick={() => product.id !== undefined && onDelete(product.id)}
                className="text-red-600 hover:underline ml-4"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

