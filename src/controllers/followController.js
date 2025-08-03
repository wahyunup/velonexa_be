import {
  createFollow,
  updateFollow,
  getFollow,
  getFollowUser,
} from "../models/followModel.js";

export const follow = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const target_id = Number(req.params.target_id);

    if (!user_id) {
      return res.status(400).json({ msg: "user id unknown" });
    }

    if (user_id === target_id) {
      return res.status(400).json({
        msg: "user id same",
      });
    }
    console.log("req.params:", req.params);
    console.log("req.params.target_id:", req.params.target_id);

    const follow = await createFollow(target_id, user_id);
    return res.status(200).json({ msg: "follow success", follow });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "internal server error",
    });
  }
};

export const unfollow = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const target_id = Number(req.params.target_id);

    if (!user_id) {
      return res.status(400).json({ msg: "user id unknown" });
    }
    const unfollow = await updateFollow(user_id, target_id);
    return res.status(200).json({ msg: "unfollow success", unfollow });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "internal server error",
    });
  }
};

export const getfollows = async (req, res) => {
  try {
    const user_id = req.user?.id;
    if (!user_id) {
      return res.status(400).json({ msg: "user id unknown" });
    }
    const following = await getFollow(user_id);
    const followingMaping = following.map((f) => f)
    return res.status(200).json({ msg: "get follows success", followingMaping });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "internal server error",
    });
  }
};

export const getfollowerUser = async (req, res) => {
  try {
    const target_id = req.params.target_id;
    if (!target_id) {
      return res.status(400).json({ msg: "user id unknown" });
    }
    const following = await getFollow(target_id);
    const followingMaping = following.map((f) => f)
    return res.status(200).json({ msg: "get follows success", followingMaping });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "internal server error",
    });
  }
};

export const getfollowsUser = async (req, res) => {
  try {
    const target_id = req.params.target_id
    if (!target_id) {
      return res.status(400).json({ msg: "user id unknown" });
    }
    const following = await getFollowUser(target_id);
    const followingMaping = following.map((f) => f)
    return res.status(200).json({ msg: "get follows success", followingMaping });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      msg: "internal server error",
    });
  }
};
