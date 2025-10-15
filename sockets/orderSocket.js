export function initOrderSocket(io) {
  io.on("connection", (socket) => {
    console.log("✅ Order socket connected:", socket.id);

    socket.on("joinOrder", (orderId) => {
      socket.join(`order-${orderId}`);
    });

    socket.on("disconnect", () => {
      console.log("Order socket disconnected:", socket.id);
    });
  });
}

export function emitOrderUpdate(io, orderId, payload) {
  io.to(`order-${orderId}`).emit("orderUpdate", payload);
}
