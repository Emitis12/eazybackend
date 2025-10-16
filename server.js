import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { PORT, VITE_APP_URL } from "./config/env.js";
import { mongoConnect, sequelize } from "./config/db.js";

// Sockets
import { initEmailAlertSocket } from "./sockets/emailAlertSocket.js";
import { initChatSocket } from "./sockets/chatSocket.js";
import { initOrderSocket } from "./sockets/orderSocket.js";

// ===== Retry Helper for PostgreSQL =====
const connectPostgresWithRetry = async (retries = 5, delay = 3000) => {
  for (let i = 1; i <= retries; i++) {
    try {
      await sequelize.authenticate();
      console.log("✅ PostgreSQL connected successfully");
      await sequelize.sync({ alter: false });
      console.log("✅ Sequelize models synchronized");
      return;
    } catch (err) {
      console.error(`❌ PostgreSQL connection failed (attempt ${i}):`, err.message);
      if (i === retries) process.exit(1);
      console.log(`⏳ Retrying in ${delay / 1000}s...`);
      await new Promise((res) => setTimeout(res, delay));
    }
  }
};

(async () => {
  try {
    // ===== Connect to Databases =====
    await connectPostgresWithRetry();
    await mongoConnect(); // MongoDB Atlas with built-in reconnection handlers

    // ===== Create HTTP server =====
    const server = http.createServer(app);

    // ===== Initialize Socket.IO =====
    const io = new Server(server, {
      cors: {
        origin: VITE_APP_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
      },
    });

    // ===== Initialize Sockets =====
    initEmailAlertSocket(io);
    initChatSocket(io);
    initOrderSocket(io);

    // ===== MongoDB Connection Events =====
    const mongoose = (await import("mongoose")).default;
    mongoose.connection.on("disconnected", () =>
      console.warn("⚠️ MongoDB disconnected! Attempting to reconnect...")
    );
    mongoose.connection.on("reconnected", () =>
      console.log("✅ MongoDB reconnected")
    );

    // ===== Start Server =====
    server.listen(PORT, () => console.log(`🚀 Eazy Server running on port ${PORT}`));

    // ===== Graceful Shutdown =====
    const gracefulShutdown = async () => {
      console.log("🛑 Shutting down server...");
      await sequelize.close();
      await mongoose.connection.close();
      server.close(() => process.exit(0));
    };

    process.on("SIGINT", gracefulShutdown);
    process.on("SIGTERM", gracefulShutdown);

  } catch (err) {
    console.error("❌ Server initialization error:", err.message);
    process.exit(1);
  }
})();
