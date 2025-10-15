import { Sequelize } from "sequelize";
import mongoose from "mongoose";

export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  logging: false
});

export const mongoConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};
