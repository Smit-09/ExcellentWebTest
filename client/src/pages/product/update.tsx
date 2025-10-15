import { useNavigate, useParams } from 'react-router-dom'
import type { ProductPayload } from '../../api/products/product'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addOrUpdateProduct, fetchProducts } from '../../api/products/product'
import ProductForm from '../../components/Product/AddUpdateForm'

export default function ProductUpdate() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const qc = useQueryClient();
  const { data: products = [] } = useQuery({ queryKey: ['products'], queryFn: fetchProducts });
  const product = products.find(p => String(p._id) === id);

  const mut = useMutation({
    mutationFn: (p: ProductPayload) => addOrUpdateProduct({ ...p, _id: product?._id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['products'] })
      navigate('/products')
    }
  })

  return (
    <div className="w-full md:w-3/4 lg:w-3/4 xl:w-1/2 mx-auto py-6 px-4">
      <div className="flex items-center justify-start mb-5">
        <svg 
          xmlns="http://www.w3.org/2000/svg"
          fill="none" 
          viewBox="0 0 24 24"
          stroke-width="1.5" 
          stroke="currentColor" 
          className="w-4 h-4 text-white cursor-pointer inline-block mx-1" 
          onClick={() => navigate(-1)}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <h2 onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>
          Back
        </h2>
      </div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">Update Product</h2>
      </div>
      <ProductForm initialData={product} onSubmit={(data) => mut.mutate(data)} onCancel={() => navigate('/products')} />
    </div>
  )
}


