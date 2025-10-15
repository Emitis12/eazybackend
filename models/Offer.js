import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Offer extends Model {}

Offer.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  discount: { type: DataTypes.DECIMAL, allowNull: false },
  startDate: { type: DataTypes.DATE },
  endDate: { type: DataTypes.DATE },
  vendorId: { type: DataTypes.UUID, allowNull: false },
}, { sequelize, modelName: "Offer", timestamps: true });
