// sockets/emailAlertSocket.js

let ioInstance;

/**
 * Initialize Email Alert Socket
 * @param {import("socket.io").Server} io
 */
export function initEmailAlertSocket(io) {
  ioInstance = io;

  io.on("connection", (socket) => {
    console.log("✅ Email Alert socket connected:", socket.id);

    socket.on("subscribeEmailAlerts", (email) => {
      console.log(`📩 Subscribed: ${email}`);
      socket.join("email-alerts");
    });

    socket.on("disconnect", () => {
      console.log("Email Alert socket disconnected:", socket.id);
    });
  });
}

/**
 * Send email alert to all subscribed users in real-time
 * @param {Object} message - { userId?, title, message }
 */
export function sendEmailAlert(message) {
  if (!ioInstance) {
    console.warn("⚠️ EmailAlert Socket.IO instance not initialized");
    return;
  }

  // Emit to all clients in "email-alerts" room
  ioInstance.to("email-alerts").emit("newEmailAlert", message);
  console.log("📤 Email alert emitted:", message);
}

/**
 * Optional helper to send a targeted alert to a single user
 * @param {string} socketId
 * @param {Object} message
 */
export function sendEmailAlertToUser(socketId, message) {
  if (!ioInstance) return;
  ioInstance.to(socketId).emit("newEmailAlert", message);
  console.log(`📤 Email alert sent to socket ${socketId}:`, message);
}
