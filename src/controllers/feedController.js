import {
  createFeed,
  deleteFeed,
  editFeed,
  getFeed,
} from "../models/feedModel.js";

export const getAllFeed = async (req, res) => {
  try {
    const allFeed = await getFeed();
    return res.status(200).json(allFeed);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const createUserFeed = async (req, res) => {
  try {
    const { image, address, description } = req.body;
    const user_id = req.user?.id

    if (!user_id) {
      return res.status(401).json({ msg: "harap login terlebih dahulu" });
    }

    if (!image || !address || !description) {
      return res.status(400).json({ msg: "all field must be fill" });
    }

    await createFeed(image, address, description, user_id);
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
