// src/controllers/walletController.js
import { Wallet, WalletTransaction } from "../models/Wallet.js";
import { addTransaction as addWalletTransaction } from "../services/walletService.js";
import { sendEmail } from "../services/emailService.js";
import { Op } from "sequelize";

/**
 * Get wallet details by userId
 * Supports optional date filters: ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
export async function getWallet(req, res, next) {
  try {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    let transactionsQuery = { walletId: wallet.id };
    if (startDate || endDate) {
      transactionsQuery.createdAt = {};
      if (startDate) transactionsQuery.createdAt[Op.gte] = new Date(startDate);
      if (endDate) transactionsQuery.createdAt[Op.lte] = new Date(endDate);
    }

    const transactions = await WalletTransaction.findAll({
      where: transactionsQuery,
      order: [["createdAt", "DESC"]]
    });

    res.json({ wallet, transactions });
  } catch (err) {
    next(err);
  }
}

/**
 * Get all transactions for a wallet
 * Supports optional date filters: ?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
export async function getTransactions(req, res, next) {
  try {
    const { walletId } = req.params;
    const { startDate, endDate } = req.query;

    let query = { walletId };
    if (startDate || endDate) {
      query.createdAt = {};
      if (startDate) query.createdAt[Op.gte] = new Date(startDate);
      if (endDate) query.createdAt[Op.lte] = new Date(endDate);
    }

    const transactions = await WalletTransaction.findAll({
      where: query,
      order: [["createdAt", "DESC"]]
    });

    res.json(transactions);
  } catch (err) {
    next(err);
  }
}

/**
 * Add a credit or debit transaction
 */
export async function addTransaction(req, res, next) {
  try {
    const { userId } = req.params;
    const { type, amount, description } = req.body;

    if (!type || !amount) return res.status(400).json({ message: "Type and amount are required" });

    const transaction = await addWalletTransaction(userId, type, parseFloat(amount), description);

    // Send email notification on credit
    if (type === "credit") {
      const wallet = await Wallet.findOne({ where: { userId } });
      if (wallet && wallet.user?.email) {
        try {
          await sendEmail(
            wallet.user.email,
            "Wallet Credit Received",
            `<p>Hi ${wallet.user?.name || "User"},</p>
             <p>You have received a credit of <strong>${amount}</strong> in your wallet.</p>
             <p>Description: ${description}</p>
             <p>Current Balance: <strong>${wallet.balance}</strong></p>
             <p>Total Service Charges Paid: <strong>${wallet.serviceChargeTotal}</strong></p>`
          );
        } catch (mailErr) {
          console.warn("Wallet credit email failed:", mailErr);
        }
      }
    }

    res.json(transaction);
  } catch (err) {
    next(err);
  }
}
