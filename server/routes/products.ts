import { Router } from "express";
import {
  createProduct,
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

export default router;
