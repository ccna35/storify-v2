import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
  updateProduct,
} from "../controllers/products";
import { verifyToken } from "../util/token";

const router = Router();

// Middleware
router.use(verifyToken);

// Create a new product
router.post("/", createProduct);

// Get all products
router.get("/", getAllProducts);

// Get a single product
router.get("/:id", getProduct);

// Update a product
router.put("/:id", updateProduct);

// Delete a product
router.delete("/:id", deleteProduct);

export default router;
