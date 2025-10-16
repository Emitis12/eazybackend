// models/Wallet.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";
import { WalletTransaction } from "./WalletTransaction.js";

export class Wallet extends Model {}

Wallet.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  userId: { 
    type: DataTypes.UUID, 
    allowNull: false, 
    unique: true, 
    references: { model: User, key: "id" } 
  },
  balance: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0, allowNull: false },
  serviceChargeTotal: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0, allowNull: false } // <== NEW
}, {
  sequelize,
  modelName: "Wallet",
  tableName: "wallets",
  timestamps: true
});

// Association: one wallet has many transactions
Wallet.hasMany(WalletTransaction, { foreignKey: "walletId", as: "transactions" });
WalletTransaction.belongsTo(Wallet, { foreignKey: "walletId" });
