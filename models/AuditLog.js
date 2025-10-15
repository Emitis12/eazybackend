// models/AuditLog.js
import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

/**
 * AuditLog Model
 * Tracks critical actions across the system for security & analytics
 */
const AuditLog = sequelize.define(
  "AuditLog",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    actorId: {
      type: DataTypes.UUID,
      allowNull: false,
      comment: "ID of the user/vendor/rider performing the action",
    },
    actorRole: {
      type: DataTypes.ENUM("superadmin", "admin", "vendor", "rider", "customer"),
      allowNull: false,
    },
    action: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: "Description of the action performed",
    },
    targetId: {
      type: DataTypes.UUID,
      allowNull: true,
      comment: "Optional ID of the target entity affected by the action",
    },
    targetType: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Type of the target entity (User, Order, Product, etc.)",
    },
    ipAddress: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "IP address of the actor",
    },
    userAgent: {
      type: DataTypes.STRING,
      allowNull: true,
      comment: "Browser/User-Agent info for tracking",
    },
    metadata: {
      type: DataTypes.JSONB,
      allowNull: true,
      comment: "Any extra JSON data related to the action",
    },
  },
  {
    tableName: "audit_logs",
    timestamps: true,
    updatedAt: false, // Only record createdAt
    indexes: [
      { fields: ["actorId"] },
      { fields: ["targetId"] },
      { fields: ["actorRole"] },
    ],
  }
);

export default AuditLog;
