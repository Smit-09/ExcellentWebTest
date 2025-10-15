import axiosClient from "../axiosClient";

export interface CartProduct {
  _id: string;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  stock: number;
}

export interface CartItemDto {
  _id: string;
  productId: string;
  quantity: number;
  product: CartProduct;
}

export const getCart = async (): Promise<CartItemDto[]> => {
  const { data } = await axiosClient.get('/api/cart');
  return data as CartItemDto[];
}

export const addOrUpdateCartDelta = async (productId: string, delta: number): Promise<CartItemDto> => {
  const { data } = await axiosClient.put('/api/cart/update', { productId, delta });
  return data as CartItemDto;
}

export const removeFromCart = async (id: string): Promise<void> => {
  await axiosClient.delete(`/api/cart/${id}`);
}

export const checkoutCart = async (): Promise<void> => {
  await axiosClient.post(`/api/cart/checkout`);
}


