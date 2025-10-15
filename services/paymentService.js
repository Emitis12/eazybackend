import { Wallet } from "../models/Wallet.js";
import { Paystack } from "../utils/paystack.js"; // implement Paystack API wrapper

export async function creditWallet(userId, amount, type = "credit") {
  const wallet = await Wallet.findOrCreate({ where: { userId } });
  wallet.balance += amount;
  await wallet.save();
  return wallet;
}

export async function debitWallet(userId, amount) {
  const wallet = await Wallet.findOne({ where: { userId } });
  if (!wallet || wallet.balance < amount) throw new Error("Insufficient balance");
  wallet.balance -= amount;
  await wallet.save();
  return wallet;
}

export async function payoutVendorOrRider(userId, amount) {
  // call Paystack Transfer API
  return await Paystack.transfer(userId, amount);
}
