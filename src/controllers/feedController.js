import {
  addLike,
  createFeed,
  deleteFeed,
  editFeed,
  getFeed,
  getLikeId,
  getAllFeeds
} from "../models/feedModel.js";
import { cloudinaryUpload } from "../utils/cloudinaryUpload.js";

export const getAllFeed = async (req, res) => {
  try {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const user_id = req.user?.id
    console.log(user_id);
    
    if (!user_id) {
      return res.status(400).json({msg:"must login first"})
    }

    const allFeed = await getFeed(page, limit, user_id);
    return res.status(200).json(allFeed);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const getAllFeedExplore = async (req, res) => {
  try {
    const data = await getAllFeeds();
    res.status(200)
      .json({ msg: "get all feed successfully", data });
  } catch (error) {
    res.status(400).json({msg: error.message})
  }
};

export const createUserFeed = async (req, res) => {
  try {
    const { address, description } = req.body;

    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ msg: "harap login terlebih dahulu" });
    }

    if (!address || !description) {
      return res.status(400).json({ msg: "all field must be fill" });
    }
    const fileBuffer = req.file.buffer;
    const imageUrl = await cloudinaryUpload(fileBuffer);
    await createFeed(imageUrl, address, description, user_id);
    return res.status(200).json({ msg: "feed created" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const editUserFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const { description, image, address } = req.body;

    await editFeed(id, description, image, address);
    return res.status(200).json({ msg: "feed updated", editFeed });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deletedUserFeed = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteFeed(id);
    return res.status(200).json({ msg: "feed deleted", deleteFeed });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const likeFeed = async (req, res) => {
  try {
    const user_id = req.user?.id;

    const { like } = req.body;

    const { feed_id } = req.params;

    if (!feed_id) {
      return res.status(400).json({ msg: "feed id tidak ditemukan" });
    }

    if (!user_id) {
      return res.status(401).json({ msg: "user belum login" });
    }
    await addLike(user_id, feed_id, like);
    if (like) {
      return res.status(200).json({ msg: "berhasil like", isLike: like });
    } else if (!like) {
      return res.status(200).json({ msg: "berhasil unlike", isLike: like });
    }
  } catch (error) {
    return res.status(400).json(error);
  }
};

export const getLike = async (req, res) => {
  try {
    const user_id = req.user?.id;
    const { feed_id } = req.params;

    if (!user_id) {
      return res.status(400).json({ msg: "id user tidak ditemukan" });
    }

    if (!feed_id) {
      return res.status(400).json({ msg: "id feed tidak ditemukan" });
    }
    const getLikes = await getLikeId(user_id, feed_id);

    return res
      .status(200)
      .json({ msg: "success dapet likenya", data: getLikes });
  } catch (error) {
    return res.status(400).json({ msg: "gagal dapat status", error });
  }
};
