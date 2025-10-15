import axiosClient from "../axiosClient";

export interface ProductPayload {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}
export interface Product {
  id?: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}

// export interface ProductResponse {
//   _id: string;
//   name: string;
//   price: string;
//   category: string;
// }

// export const addProduct = async (payload: ProductPayload): Promise<ProductResponse> => {
export const addProduct = async (payload: ProductPayload) => {
  const { data } = await axiosClient.post('/api/products', payload);
  return data as ProductPayload;
};

export const fetchProducts = async (): Promise<ProductPayload[]> => {
  const res = await axiosClient.get('/api/products');
  return res.data as ProductPayload[];
};

export const addOrUpdateProduct = async (product: ProductPayload): Promise<ProductPayload> => {
  if (product.id) {
    const res = await axiosClient.put(`/api/products/${product.id}`, product);
    return res.data as ProductPayload;
  } else {
    const res = await axiosClient.post('/api/products', product);
    return res.data as ProductPayload;
  }
};

export const deleteProduct = async (id: number): Promise<void> => {
  await axiosClient.delete(`/api/products/${id}`);
};
