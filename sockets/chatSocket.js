export function initChatSocket(io) {
  io.on("connection", (socket) => {
    console.log("✅ Chat socket connected:", socket.id);

    socket.on("joinChat", (chatId) => {
      socket.join(`chat-${chatId}`);
    });

    socket.on("sendMessage", ({ chatId, message }) => {
      io.to(`chat-${chatId}`).emit("receiveMessage", message);
    });

    socket.on("disconnect", () => {
      console.log("Chat socket disconnected:", socket.id);
    });
  });
}
