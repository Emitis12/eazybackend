// src/routes/walletRoutes.js
import express from "express";
import { getWallet, getTransactions, addTransaction } from "../controllers/walletController.js";
import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router();

// GET wallet details with optional date filters
// Example: /wallet/:userId?startDate=2025-10-01&endDate=2025-10-15
router.get("/:userId", authenticate, getWallet);

// GET all transactions for a wallet with optional date filters
// Example: /wallet/:walletId/transactions?startDate=2025-10-01&endDate=2025-10-15
router.get("/:walletId/transactions", authenticate, getTransactions);

// POST new transaction (credit/debit) for a wallet
router.post("/:userId/transactions", authenticate, addTransaction);

export default router;
