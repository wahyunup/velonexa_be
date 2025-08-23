// import { createChat } from "../src/models/chatModel.js";

// export const chatSocket = (io, socket) => {
//   socket.on("user join", (user_id) => {
//     socket.join(`user_${user_id}`);
//     console.log(`user ${user_id} join room user_${user_id}`);
//   });
//   socket.on("create_chat", async ({user_id, target_id, message}) => {
//   try {
//     const chat = await createChat(user_id, target_id, message
//     ) 
//     io.to(`user_${target_id}`).emit("new_chat", chat)

//   } catch (error) {
//     console.error("Error create chat:", error);
//   }
// })
// }
