import Cart from "../models/cart.model";
import type { ICart } from "../models/cart.model";

export const getAllCarts = async () => {
  return await Cart.find();
};

export const getCartById = async (id: string): Promise<ICart | null> => {
  return await Cart.findById(id);
};

export const addUpdateCart = async (
  id: string | undefined,
  data: Partial<ICart>
): Promise<ICart> => {
  if (id) {
    const updatedCart = await Cart.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!updatedCart) {
      throw new Error('Cart not found');
    }

    return updatedCart;
  } else {
    const newCart = new Cart(data);
    return await newCart.save();
  }
};

export const deleteCartById = async (id: string) => {
  const cart = await Cart.findById(id);
  if (!cart) throw new Error("Cart not found");
  await cart.deleteOne();
  return true;
};