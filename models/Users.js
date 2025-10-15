import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

export class User extends Model {}

User.init({
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.ENUM("superadmin","admin","vendor","rider","customer"), allowNull: false },
  wallet: { type: DataTypes.DECIMAL, defaultValue: 0.0 },
  otpCode: { type: DataTypes.STRING },
  otpExpiry: { type: DataTypes.DATE },
  isVerified: { type: DataTypes.BOOLEAN, defaultValue: false }
}, {
  sequelize,
  modelName: "User",
  timestamps: true,
});
