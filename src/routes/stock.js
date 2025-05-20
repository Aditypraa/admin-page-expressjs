import express from "express";
import { getStockPage, updateStock } from "../controllers/StockController.js";

const router = express.Router();

// Get stock management page
router.get("/", getStockPage);

// Update product stock
router.post("/update/:id", updateStock);

export default router;
