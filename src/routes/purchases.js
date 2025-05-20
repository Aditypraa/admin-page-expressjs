import express from "express";
import {
  getAllPurchases,
  createPurchaseForm,
  createPurchase,
  cancelPurchase,
} from "../controllers/PurchasesController.js";

const router = express.Router();

// Get all purchases
router.get("/", getAllPurchases);

// Get purchase creation form
router.get("/create", createPurchaseForm);

// Create a new purchase
router.post("/", createPurchase);

// Cancel a purchase
router.post("/:id/cancel", cancelPurchase);

export default router;
