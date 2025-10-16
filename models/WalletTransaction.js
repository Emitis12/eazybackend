// models/WalletTransaction.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Wallet } from "./Wallet.js";

export class WalletTransaction extends Model {}

WalletTransaction.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  walletId: { 
    type: DataTypes.UUID, 
    allowNull: false, 
    references: { model: Wallet, key: "id" } 
  },
  type: { type: DataTypes.ENUM("credit","debit"), allowNull: false },
  amount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
  description: { type: DataTypes.STRING },
  reference: { type: DataTypes.STRING } // optional transaction reference
}, {
  sequelize,
  modelName: "WalletTransaction",
  tableName: "wallet_transactions",
  timestamps: true
});
