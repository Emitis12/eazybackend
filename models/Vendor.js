import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Vendor extends Model {}

Vendor.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  businessName: { type: DataTypes.STRING, allowNull: false },
  businessEmail: { type: DataTypes.STRING, allowNull: false, unique: true },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
  wallet: { type: DataTypes.DECIMAL, defaultValue: 0.0 }
}, { sequelize, modelName: "Vendor", timestamps: true });
