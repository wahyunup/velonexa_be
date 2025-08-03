export const chatSocket = (io, socket) => {
  socket.on("user join", (user_id) => {
    socket.join(`user_${user_id}`);
    console.log(`user ${user_id} join room user_${user_id}`);
  });
  try {
    
  } catch (error) {

  }
};
