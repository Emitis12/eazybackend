import { Sequelize } from "sequelize";
import mongoose from "mongoose";

const RETRY_LIMIT = 5;       // Number of retries
const RETRY_DELAY = 5000;    // Delay between retries in ms

// ===== PostgreSQL (Supabase Cloud) =====
export const sequelize = new Sequelize(process.env.POSTGRES_URI, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

export const testPostgresConnection = async () => {
  let attempts = 0;
  while (attempts < RETRY_LIMIT) {
    try {
      await sequelize.authenticate();
      console.log("✅ PostgreSQL connected successfully");
      await sequelize.sync({ alter: false }); // optional: sync models
      console.log("✅ Sequelize models synchronized");
      return;
    } catch (err) {
      attempts++;
      console.error(
        `❌ PostgreSQL connection failed (attempt ${attempts}): ${err.message}`
      );
      if (attempts >= RETRY_LIMIT) process.exit(1);
      console.log(`⏳ Retrying PostgreSQL in ${RETRY_DELAY / 1000}s...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
    }
  }
};

// ===== MongoDB (Atlas Cloud) =====
export const mongoConnect = async () => {
  let attempts = 0;
  while (attempts < RETRY_LIMIT) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 10000,
      });

      mongoose.connection.on("disconnected", () =>
        console.warn("⚠️ MongoDB disconnected! Trying to reconnect...")
      );
      mongoose.connection.on("reconnected", () =>
        console.log("✅ MongoDB reconnected")
      );

      console.log("✅ MongoDB connected");
      return;
    } catch (err) {
      attempts++;
      console.error(
        `❌ MongoDB connection failed (attempt ${attempts}): ${err.message}`
      );
      if (attempts >= RETRY_LIMIT) process.exit(1);
      console.log(`⏳ Retrying MongoDB in ${RETRY_DELAY / 1000}s...`);
      await new Promise((res) => setTimeout(res, RETRY_DELAY));
    }
  }
};
