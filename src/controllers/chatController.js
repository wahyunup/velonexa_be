import { getChat } from "../models/chatModel.js";

export const getChats = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const {target_id} = req.body;

    if (!user_id) {
      return res.status(401).json({ msg: "must login first" });
    }

    if (!target_id) {
      return res.status(400).json({ msg: "please input target_id" });
    }

    if(user_id === Number(target_id) ){
        return res.status(400).json({msg:"cant get chat current user"})
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

export const createChat = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { target_id, message } = req.body;

    if (!user_id) {
      res.status(401).json({ msg: "must login first" });
    }

    if (!target_id || !message) {
      return res.status(400).json({ msg: "target_id & message unfill" });
    }

    const chat = await createChat(user_id, target_id, message);
    return res.status(200).json({ msg: "create chat success", chat });
  } catch (error) {
    return res.status(400).json({ msg: "internal server error" });
  }
};
