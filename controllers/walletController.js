// src/controllers/walletController.js
import { Wallet, WalletTransaction } from "../models/Wallet.js";
import { addTransaction as addWalletTransaction } from "../services/walletService.js";
import API from "../utils/api.js"; // For optional email notifications

/**
 * Get wallet details by userId
 */
export async function getWallet(req, res, next) {
  try {
    const { userId } = req.params;
    const wallet = await Wallet.findOne({ where: { userId } });
    if (!wallet) return res.status(404).json({ message: "Wallet not found" });

    res.json(wallet);
  } catch (err) {
    next(err);
  }
}

/**
 * Get all transactions for a wallet
 */
export async function getTransactions(req, res, next) {
  try {
    const { walletId } = req.params;
    const transactions = await WalletTransaction.findAll({ where: { walletId } });
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

    // Optional: Notify user via email when credited
    if (type === "credit") {
      const userWallet = await Wallet.findOne({ where: { userId } });
      if (userWallet) {
        const email = userWallet.user?.email; // Make sure Wallet has association to User
        if (email) {
          try {
            await API.post("/mail/send", {
              to: email,
              subject: "Wallet Credit Received",
              body: `<p>You have received a credit of <strong>${amount}</strong> in your wallet.</p>
                     <p>Description: ${description}</p>
                     <p>Current Balance: ${userWallet.balance}</p>`
            });
          } catch (mailErr) {
            console.warn("Wallet credit email failed:", mailErr);
          }
        }
      }
    }

    res.json(transaction);
  } catch (err) {
    next(err);
  }
}
