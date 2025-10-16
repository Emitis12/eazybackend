import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";
import { Wallet } from "./Wallet.js";

export class Rider extends Model {}

Rider.init(
  {
    id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
    fullName: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    phoneNumber: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    vehicleType: { type: DataTypes.STRING },
    vehicleModel: { type: DataTypes.STRING },
    licenseNumber: { type: DataTypes.STRING },
    passportPhoto: { type: DataTypes.STRING },
    vehiclePhoto: { type: DataTypes.STRING },
    idDocument: { type: DataTypes.STRING },
    approved: { type: DataTypes.BOOLEAN, defaultValue: false },
    online: { type: DataTypes.BOOLEAN, defaultValue: false },
    active: { type: DataTypes.BOOLEAN, defaultValue: true },
    lastLogin: { type: DataTypes.DATE },
  },
  {
    sequelize,
    modelName: "Rider",
    tableName: "riders",
    timestamps: true,
  }
);

// Associations
Rider.hasMany(models.Order, { foreignKey: "riderId", as: "orders" });
Rider.hasOne(Wallet, { foreignKey: "userId", as: "wallet" });
Wallet.belongsTo(Rider, { foreignKey: "userId" });

export default Rider;
