import { createChat, getChat, getChatUsers } from "../models/chatModel.js";

export const getChats = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { target_id } = req.params;

    if (!user_id) {
      return res.status(401).json({ msg: "must login first" });
    }

    if (!target_id) {
      return res.status(400).json({ msg: "please input target_id" });
    }

    if (user_id === Number(target_id)) {
      return res.status(400).json({ msg: "cant get chat current user" });
    }

    const chat = await getChat(target_id, user_id);
    return res.status(200).json({
      msg: "get chat success",
      chat,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "internal server error" });
  }
};

export const createChats = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const {message}  = req.body;
    const target_id = Number(req.params.target_id)

    if (!user_id) {
      return res.status(401).json({ msg: "must login first" });
    }

    if (!target_id) {
      return res.status(400).json({ msg: "target id Unreach" });
    }

    if (!target_id || !message) {
      return res.status(400).json({ msg: "target_id & message unfill" });
    }

    const chat = await createChat(user_id, target_id, message);
    // req.io.to(`user_${target_id}`).emit("new_chat", chat);

    return res.status(200).json({ msg: "create chat success", chat });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "internal server error" });
  }
};

export const getAllChatCurentUser = async (req, res) => {
  const user_id = req.user?.id;
  const uniqueUser = new Map();

  if (!user_id) {
    return res.status(400).json({ msg: "must login first" });
  }

  try {
    const chats = await getChatUsers(user_id);
    chats.forEach((chat) => {
      const isActor = chat.actor_id === user_id;
      const isTarget = isActor ? chat.target : chat.actor;
      const otherTarget = isTarget.id;

      if (!uniqueUser.has(otherTarget)) {
        uniqueUser.set(otherTarget, {
          id: isTarget.id,
          username: isTarget.username,
          image: isTarget.image,
          lastMessage: chat.message,
        });
      }
    });
    return res.status(200).json({
      msg: "get chats success",
      users: Array.from(uniqueUser.values()),
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ msg: "internal server error" });
  }
};
