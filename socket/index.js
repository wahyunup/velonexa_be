import { chatSocket } from "./chatSocket.js";
import { notificationSocket } from "./notificationSocket.js";

export const socketHandler = (io) => {
  io.on("connection", (socket) => {
    console.log("socket connected:", socket.id);

    notificationSocket(io, socket);
    chatSocket(io, socket);

    socket.on("disconnect", () => {
      console.log("socket disconnected:", socket.id);
    });
  });
};
