import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Vendor } from "./Vendor.js";

export class Product extends Model {}

Product.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL, allowNull: false },
  vendorId: { type: DataTypes.UUID, allowNull: false, references: { model: Vendor, key: "id" } },
  isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
}, { sequelize, modelName: "Product", timestamps: true });
