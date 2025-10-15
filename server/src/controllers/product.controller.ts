import { Request, Response } from "express";
import * as productService from "../services/product.service";

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await productService.getAllProducts();
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addUpdateProduct = async (req: Request, res: Response) => {
  try {
    const { id, ...productData } = req.body;

    const product = await productService.addUpdateProduct(id, productData);
    
    res.status(id ? 200 : 201).json(product);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    await productService.deleteProductById(req.params.id);
    res.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
