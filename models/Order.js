import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class Order extends Model {}

Order.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  customerId: { type: DataTypes.UUID, allowNull: false },
  vendorId: { type: DataTypes.UUID, allowNull: false },
  riderId: { type: DataTypes.UUID },
  totalAmount: { type: DataTypes.DECIMAL, allowNull: false },
  status: { type: DataTypes.ENUM("pending","accepted","delivered","cancelled"), defaultValue: "pending" },
}, { sequelize, modelName: "Order", timestamps: true });
