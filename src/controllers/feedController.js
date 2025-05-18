import {
  createFeed,
  deleteFeed,
  editFeed,
  getFeed,
} from "../models/feedModel.js";

export const getAllFeed = async (req, res) => {
  try {
    const allFeed = await getFeed();
    res.status(200).json(allFeed);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createUserFeed = async (req, res) => {
  try {
    const {
      image,
      address,
      description,
      idFromUser
    } = req.body;
    if (!image || !address || !description) {
      res.status(400).json({ msg: "all field must be fill" });
    }
    await createFeed(image, address, description, idFromUser);
    res.status(200).json({msg: "feed created"})
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const editUserFeed = async (req, res) => {
  try {
    const {id} = req.params
    const {
      username,
      image,
      address,
    } = req.body;
    
    await editFeed(id, username, image, address);
    res.status(200).json({msg: "feed updated", editFeed})
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deletedUserFeed = async (req, res) => {
  try {
    const {id} = req.params
    await deleteFeed(id);
    res.status(200).json({msg: "feed deleted", editFeed})
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
