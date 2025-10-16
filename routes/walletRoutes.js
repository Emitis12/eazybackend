// src/routes/walletRoutes.js
import express from "express";
import { getWallet, getTransactions, addTransaction } from "../controllers/walletController.js";
import { authenticate } from "../middlewares/authMiddleware.js"; // Optional auth middleware

const router = express.Router();

// GET wallet details
router.get("/:userId", authenticate, getWallet);

// GET all transactions for a wallet
router.get("/:walletId/transactions", authenticate, getTransactions);

// POST new transaction (credit/debit)
router.post("/:userId/transactions", authenticate, addTransaction);

export default router;
