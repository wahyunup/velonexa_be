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
import { isSupportedImage } from "../utils/imageValidation.js";

export const getAllFeed = async (req, res) => {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(50, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const user_id = req.user?.id
    
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

    if (!req.file) {
      return res.status(400).json({ msg: "image is required" });
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
    const userId = req.user?.id;

    const updated = await editFeed(id, userId, description, image, address);
    if (!updated) {
      return res.status(404).json({ msg: "feed not found" });
    }
    if (!isSupportedImage(req.file.buffer)) {
      return res.status(400).json({ msg: "invalid image file" });
    }
    return res.status(200).json({ msg: "feed updated" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const deletedUserFeed = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    const deleted = await deleteFeed(id, userId);
    if (!deleted) {
      return res.status(404).json({ msg: "feed not found" });
    }
    return res.status(200).json({ msg: "feed deleted" });
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
