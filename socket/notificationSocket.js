import { createNotification } from "../src/models/notificationModel.js";

export const notificationSocket = (io, socket) => {
  // User bergabung ke room pribadi untuk menerima notifikasi
  socket.on("join_user", (userId) => {
    socket.join(`user_${userId}`);
    console.log(`User ${userId} joined notification room user_${userId}`);
  });

  // Buat notifikasi dan emit ke target
  socket.on("create_notification", async ({ actorId, targetId, type, feedId }) => {
    try {
      const notif = await createNotification({
        actor_id: actorId,
        target_id: targetId,
        type,
        feed_id: feedId ?? null,
      });

      io.to(`user_${targetId}`).emit("new_notification", notif);
    } catch (error) {
      console.error("Error create_notification:", error);
    }
  });
};
