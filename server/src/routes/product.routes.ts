import express from "express";
// import { protect } from "../middlewares/auth.middleware";
import { addUpdateProduct, deleteProduct, getProducts } from "../controllers/product.controller";

const router = express.Router();

// router.get("/", protect, getProducts); (I can use middleware but didnt implemented on FE)

router.get("/", getProducts);
router.post("/create", addUpdateProduct);
router.put("/update", addUpdateProduct);
router.delete("/:id", deleteProduct);

export default router;
