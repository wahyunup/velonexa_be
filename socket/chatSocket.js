import { createChat } from "../src/models/chatModel.js";

export const chatSocket = (io, socket) => {
  // User bergabung ke room pribadi berdasarkan user_id
  socket.on("user_join", (user_id) => {
    socket.join(`user_${user_id}`);
    console.log(`User ${user_id} joined room user_${user_id}`);
  });

  // Kirim chat baru — simpan ke DB, lalu emit ke room target
  socket.on("send_chat", async ({ user_id, target_id, message }) => {
    try {
      const chat = await createChat(user_id, target_id, message);

      // Kirim ke penerima
      io.to(`user_${target_id}`).emit("new_chat", chat);

      // Kirim balik ke pengirim juga supaya UI update
      io.to(`user_${user_id}`).emit("new_chat", chat);
    } catch (error) {
      console.error("Error send_chat:", error);
      socket.emit("chat_error", { msg: "Gagal mengirim pesan" });
    }
  });
};
