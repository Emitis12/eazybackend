// services/walletService.js
import { Wallet, WalletTransaction } from "../models/Wallet.js";
import API from "../utils/api.js"; // for sending emails

// ===== Service charge percentages =====
const RIDER_SERVICE_CHARGE = 20;   // 20%
const VENDOR_SERVICE_CHARGE = 20;  // 20%

/**
 * Add a credit or debit transaction for a user
 * Automatically sends email notification
 * @param {string} userId
 * @param {"credit"|"debit"} type
 * @param {number} amount
 * @param {string} description
 */
export const addTransaction = async (userId, type, amount, description) => {
  const wallet = await Wallet.findOne({ where: { userId } });
  if (!wallet) throw new Error("Wallet not found");

  if (type === "debit" && parseFloat(wallet.balance) < amount) {
    throw new Error("Insufficient wallet balance");
  }

  const transaction = await WalletTransaction.create({
    walletId: wallet.id,
    type,
    amount,
    description,
    reference: `TX-${Date.now()}`
  });

  wallet.balance = type === "credit"
    ? parseFloat(wallet.balance) + parseFloat(amount)
    : parseFloat(wallet.balance) - parseFloat(amount);

  await wallet.save();

  // ✅ Send email notification
  try {
    const res = await API.get(`/users/${userId}`);
    const email = res.email;
    if (email) {
      const subject = type === "credit" ? "Wallet Credited" : "Wallet Debited";
      const body = `
        <p>Hi ${res.name},</p>
        <p>Your wallet has been ${type === "credit" ? "credited" : "debited"} with <strong>${amount}</strong> units.</p>
        <p>Description: ${description}</p>
        <p>New Balance: <strong>${wallet.balance}</strong></p>
        <p>Reference: ${transaction.reference}</p>
      `;
      await API.post("/mail/send", { to: email, subject, body });
    }
  } catch (err) {
    console.warn("Wallet email notification failed:", err);
  }

  return transaction;
};

// ===== Delivery Fee Calculator =====
export const calculateDeliveryFee = (distanceKm) => {
  const baseFee = 200; // NGN
  const perKm = 50;    // NGN per km
  return baseFee + (distanceKm * perKm);
};

// ===== Credit Rider Wallet with Service Charge Deduction =====
export const creditRiderWallet = async (riderId, deliveryFee) => {
  const serviceCharge = (deliveryFee * RIDER_SERVICE_CHARGE) / 100;
  const netAmount = deliveryFee - serviceCharge;

  // Add net credit to wallet
  await addTransaction(riderId, "credit", netAmount, "Delivery completed");

  // Update rider's total service charge
  const wallet = await Wallet.findOne({ where: { userId: riderId } });
  wallet.serviceChargeTotal = parseFloat(wallet.serviceChargeTotal || 0) + serviceCharge;
  await wallet.save();

  return { netAmount, serviceCharge };
};

// ===== Credit Vendor Wallet with Service Charge Deduction =====
export const creditVendorWallet = async (vendorId, amount, description) => {
  const serviceCharge = (amount * VENDOR_SERVICE_CHARGE) / 100;
  const netAmount = amount - serviceCharge;

  // Add net credit to wallet
  await addTransaction(vendorId, "credit", netAmount, description);

  // Update vendor's total service charge
  const wallet = await Wallet.findOne({ where: { userId: vendorId } });
  wallet.serviceChargeTotal = parseFloat(wallet.serviceChargeTotal || 0) + serviceCharge;
  await wallet.save();

  return { netAmount, serviceCharge };
};
