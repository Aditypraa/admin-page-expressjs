import express from "express";
import {
  getAllProducts,
  createProductForm,
  createProduct,
} from "../controllers/ProductsController.js";

const router = express.Router();

// Get all products
router.get("/", getAllProducts);

// Get product creation form
router.get("/create", createProductForm);

// Create a new product
router.post("/", createProduct);

export default router;
