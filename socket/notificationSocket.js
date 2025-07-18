import { createNotification } from "../src/models/notificationModel.js";

export const notificationSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("testingggg browww");

    socket.on("join_user", (userId) => {
      socket.join(`user_${userId}`);
      console.log(`User ${userId} testing socket cuyyyy...`);
    });

    socket.on(
      "create_notification",
      async ({ actorId, targetId, type, feedId }) => {
        try {
          const notif = await createNotification({
            actorId,
            targetId,
            type,
            feedId,
          });
          console.log(notif);

          io.to(`user_${targetId}`).emit("new_notification", notif);
        } catch (error) {
          console.error("Error sending notification:", error);
        }
      }
    );
  });
};


// export const notificationSocket = (io) => {
//   io.on("connection", (socket) => {
//     console.log("Socket connected:", socket.id);

//     // contoh event dari server ke client
//     socket.emit("notification", {
//       message: "Selamat datang di velonexa!",
//       timestamp: new Date(),
//     });

//     // event listener dari client
//     socket.on("pingServer", (payload) => {
//       console.log("Client says:", payload);
//     });

//     // simulasi kirim notifikasi dari server setiap 5 detik
//     setInterval(() => {
//       socket.emit("notification", {
//         message: "Notifikasi real-time dari server",
//         timestamp: new Date(),
//       });
//     }, 5000);

//     socket.on("disconnect", () => {
//       console.log("Socket disconnected:", socket.id);
//     });
//   });
// };
