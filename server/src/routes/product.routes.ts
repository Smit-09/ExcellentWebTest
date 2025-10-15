import express from "express";
import { addUpdateProduct, deleteProduct, getProducts } from "../controllers/product.controller";
import { protect } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", protect, getProducts);
router.post("/create", protect, addUpdateProduct);
router.put("/update", protect, addUpdateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
