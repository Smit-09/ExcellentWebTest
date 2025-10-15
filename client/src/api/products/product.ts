import axiosClient from "../axiosClient";

export interface ProductPayload {
  _id?: string;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  stock: number;
}
export interface ProductResponseDto {
  _id: string;
  name: string;
  price: string;
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
  const body = { ...payload, price: String(payload.price) };
  const { data } = await axiosClient.post('/api/products/create', body);
  return normalizeProduct(data);
};

export const fetchProducts = async (): Promise<ProductPayload[]> => {
  const res = await axiosClient.get('/api/products');
  const list = res.data as ProductResponseDto[];
  return list.map(normalizeProduct);
};

export const addOrUpdateProduct = async (product: ProductPayload): Promise<ProductPayload> => {
  if (product._id) {
    const body = { id: product._id, name: product.name, price: String(product.price), imageUrl: product.imageUrl, category: product.category, stock: product.stock };
    const res = await axiosClient.put('/api/products/update', body);
    return normalizeProduct(res.data);
  } else {
    const body = { name: product.name, price: String(product.price), imageUrl: product.imageUrl, category: product.category, stock: product.stock };
    const res = await axiosClient.post('/api/products/create', body);
    return normalizeProduct(res.data);
  }
};

export const deleteProduct = async (id: string | number): Promise<void> => {
  await axiosClient.delete(`/api/products/${id}`);
};

const normalizeProduct = (dto: ProductResponseDto): ProductPayload => ({
  _id: dto._id,
  name: dto.name,
  price: Number(dto.price),
  imageUrl: dto.imageUrl,
  category: dto.category,
  stock: dto.stock,
});
