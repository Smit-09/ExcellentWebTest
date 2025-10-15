import Cart from "../models/cart.model";
import type { ICart } from "../models/cart.model";
import Product from "../models/product.model";

export const getAllCarts = async () => {
  const carts = await Cart.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: 'productId',
        foreignField: '_id',
        as: 'product'
      }
    },
    { $unwind: '$product' },
    {
      $project: {
        _id: 1,
        productId: 1,
        quantity: 1,
        'product._id': 1,
        'product.name': 1,
        'product.price': 1,
        'product.imageUrl': 1,
        'product.category': 1,
        'product.stock': 1,
      }
    }
  ]);
  return carts;
};

export const getCartById = async (id: string): Promise<ICart | null> => {
  return await Cart.findById(id);
};

export const addUpdateCart = async (
  productId: string,
  delta: number,
): Promise<ICart> => {
  const product = await Product.findById(productId);
  if (!product) throw new Error('Product not found');
  const existing = await Cart.findOne({ productId });
  const nextQty = (existing?.quantity ?? 0) + delta;
  const boundedQty = Math.max(0, Math.min(product.stock, nextQty));
  if (existing) {
    existing.quantity = boundedQty;
    if (existing.quantity === 0) {
      await existing.deleteOne();
      return existing;
    }
    return await existing.save();
  }
  const created = new Cart({ productId, quantity: Math.max(0, Math.min(product.stock, delta || 1)) });
  return await created.save();
};

export const deleteCartById = async (id: string) => {
  const cart = await Cart.findById(id);
  if (!cart) throw new Error("Cart not found");
  await cart.deleteOne();
  return true;
};

export const checkout = async () => {
  await Cart.deleteMany();  
  return true;
};