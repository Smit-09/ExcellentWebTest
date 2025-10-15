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
    const { productId, delta } = req.body as { productId: string; delta: number };
    const cart = await cartService.addUpdateCart(productId, delta ?? 1);
    res.status(200).json(cart);
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

export const checkoutCart = async (req: Request, res: Response) => {
  try {
    const success = await cartService.checkout();
    if (success) {
      res.status(200).json({ message: 'Your order has been placed!' });
    } else {
      res.status(500).json({ message: 'Something went wrong while processing your order.' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error occurred while processing your checkout.' });
  }
};
