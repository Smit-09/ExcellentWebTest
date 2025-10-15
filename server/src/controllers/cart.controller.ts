import { Request, Response } from "express";
import * as cartService from "../services/cart.service";

export const getCart = async (_req: Request, res: Response) => {
  try {
    const carts = await cartService.getAllCarts();
    res.json(carts);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addUpdateCart = async (req: Request, res: Response) => {
  try {
    const { id, ...cartData } = req.body;

    const cart = await cartService.addUpdateCart(id, cartData);
    
    res.status(id ? 200 : 201).json(cart);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    await cartService.deleteCartById(req.params.id);
    res.json({ message: "Cart deleted successfully" });
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};
