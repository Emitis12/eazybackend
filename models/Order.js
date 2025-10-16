import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { User } from "./User.js";       // Customers
import { Vendor } from "./Vendor.js";   // Vendors
import { Rider } from "./Rider.js";     // Riders

export class Order extends Model {}

Order.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },

    // Users involved
    customerId: { type: DataTypes.UUID, allowNull: false, references: { model: User, key: "id" } },
    vendorId: { type: DataTypes.UUID, allowNull: false, references: { model: Vendor, key: "id" } },
    riderId: { type: DataTypes.UUID, allowNull: true, references: { model: Rider, key: "id" } },

    // Financials
    totalAmount: { type: DataTypes.DECIMAL(12,2), allowNull: false },
    deliveryFee: { type: DataTypes.DECIMAL(12,2), defaultValue: 0.0 }, // for rider payouts

    // Status
    status: { type: DataTypes.ENUM("pending","accepted","delivered","completed","cancelled"), defaultValue: "pending" },
  },
  { 
    sequelize, 
    modelName: "Order", 
    tableName: "orders",
    timestamps: true 
  }
);

// ===============================
// Associations
// ===============================
Order.belongsTo(User, { foreignKey: "customerId", as: "customer" });
Order.belongsTo(Vendor, { foreignKey: "vendorId", as: "vendor" });
Order.belongsTo(Rider, { foreignKey: "riderId", as: "rider" });

export { Order };
