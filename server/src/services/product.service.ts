import Product from "../models/product.model";
import type { IProduct } from "../models/product.model";

export const getAllProducts = async () => {
  return await Product.find();
};

export const getProductById = async (id: string): Promise<IProduct | null> => {
  return await Product.findById(id);
};

export const addUpdateProduct = async (
  id: string | undefined,
  data: Partial<IProduct>
): Promise<IProduct> => {
  if (id) {
    const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true, runValidators: true });

    if (!updatedProduct) {
      throw new Error('Product not found');
    }

    return updatedProduct;
  } else {
    const newProduct = new Product(data);
    return await newProduct.save();
  }
};

export const deleteProductById = async (id: string) => {
  const product = await Product.findById(id);
  if (!product) throw new Error("Product not found");
  await product.deleteOne();
  return true;
};