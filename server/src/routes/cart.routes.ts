import express from "express";
import { getCart, addUpdateCart, deleteProductFromCart } from "../controllers/cart.controller";

const router = express.Router();

router.get("/", getCart);
router.post("/create", addUpdateCart);
router.put("/update", addUpdateCart);
router.delete("/:id", deleteProductFromCart);

export default router;
