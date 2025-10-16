import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Wallet } from "./Wallet.js";

export class Vendor extends Model {}

Vendor.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false },
    businessName: { type: DataTypes.STRING, allowNull: false },
    businessEmail: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    passportPhoto: { type: DataTypes.STRING },
    idDocument: { type: DataTypes.STRING },
    shopPhoto: { type: DataTypes.STRING },
    isApproved: { type: DataTypes.BOOLEAN, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastLogin: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Vendor",
    tableName: "vendors",
    timestamps: true,
  }
);

// Associations
Vendor.hasOne(Wallet, { foreignKey: "userId", as: "wallet" });
Wallet.belongsTo(Vendor, { foreignKey: "userId" });

export default Vendor;
