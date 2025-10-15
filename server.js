import http from "http";
import { Server } from "socket.io";
import app from "./app.js";
import { PORT } from "./config/env.js";
import { mongoConnect, sequelize } from "./config/db.js";

// Sockets
import { initEmailAlertSocket } from "./sockets/emailAlertSocket.js";
import { initChatSocket } from "./sockets/chatSocket.js";
import { initOrderSocket } from "./sockets/orderSocket.js";

(async () => {
  try {
    // Connect to PostgreSQL
    await sequelize.authenticate();
    console.log("✅ PostgreSQL connected");

    // Connect to MongoDB (optional: for chat/logs)
    await mongoConnect();
    console.log("✅ MongoDB connected");

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.IO
    const io = new Server(server, {
      cors: {
        origin: "*", // Update with frontend URL in production
        methods: ["GET", "POST"],
      },
    });

    // Initialize all sockets
    initEmailAlertSocket(io);
    initChatSocket(io);
    initOrderSocket(io);

    // Start server
    server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (err) {
    console.error("❌ Server initialization error:", err);
    process.exit(1);
  }
})();
