// sockets/riderSocket.js
import { logger } from "../utils/logger.js";
import { ORDER_STATUS } from "../utils/constants.js";

/**
 * Initialize Rider Socket
 * @param {import("socket.io").Server} io
 */
export const initRiderSocket = (io) => {
  const riderNamespace = io.of("/rider");

  riderNamespace.on("connection", (socket) => {
    const { riderId } = socket.handshake.query;
    if (!riderId) {
      logger.warn("Rider connected without ID, disconnecting socket.");
      socket.disconnect();
      return;
    }

    logger.info(`Rider connected: ${riderId} | Socket ID: ${socket.id}`);

    // Join a room specific to this rider for personal updates
    socket.join(`rider_${riderId}`);

    /**
     * Listen for rider status updates
     * Example: rider updates delivery status (picked_up, delivered)
     */
    socket.on("updateDeliveryStatus", ({ orderId, status }) => {
      if (!orderId || !status) return;

      logger.info(`Rider ${riderId} updated order ${orderId} to ${status}`);
      // Broadcast update to the user/admin/vendor if needed
      io.emit(`orderUpdate_${orderId}`, { orderId, status, riderId });
    });

    /**
     * Listen for rider location updates
     * Example: send real-time location to user for tracking
     */
    socket.on("updateLocation", ({ lat, lng }) => {
      if (!lat || !lng) return;
      io.to(`rider_${riderId}`).emit("locationUpdate", { lat, lng });
    });

    /**
     * Example: Receive chat messages (optional)
     */
    socket.on("riderChatMessage", (data) => {
      const { userId, message } = data;
      if (!userId || !message) return;

      logger.info(`Rider ${riderId} sent message to ${userId}: ${message}`);
      io.to(`user_${userId}`).emit("newChatMessage", {
        sender: "rider",
        riderId,
        message,
        timestamp: new Date(),
      });
    });

    // Handle disconnection
    socket.on("disconnect", (reason) => {
      logger.warn(`Rider disconnected: ${riderId} | Reason: ${reason}`);
    });
  });
};
