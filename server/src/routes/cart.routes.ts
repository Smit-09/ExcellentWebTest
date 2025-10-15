import express from "express";
import { getCart, addUpdateCart, deleteCart, checkoutCart } from "../controllers/cart.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protect, getCart);
router.post("/create", protect, addUpdateCart);
router.put("/update", protect, addUpdateCart);
router.delete("/:id", protect, deleteCart);
router.post("/checkout", protect, checkoutCart);

export default router;
