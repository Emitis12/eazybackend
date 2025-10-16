// models/User.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Wallet } from "./Wallet.js";

export class User extends Model {}

User.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("superadmin","admin","vendor","rider","customer"), allowNull: false },
  otpCode: { type: DataTypes.STRING },
  otpExpiry: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
}, { sequelize, modelName: "User", timestamps: true });

// One wallet per user
User.hasOne(Wallet, { foreignKey: "userId", as: "wallet" });
Wallet.belongsTo(User, { foreignKey: "userId" });
