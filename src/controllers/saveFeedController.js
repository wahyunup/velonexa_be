import { getAllBookmark, getFeedSaved, saveFeed } from "../models/SaveFeedModel.js";

export const getAllFeedSaved = async (req, res) => {
  try {
    const actor_id = req.params.actor_id;
    if (!actor_id) {
      res.status(400).json({ msg: "user id unknowns" });
    }

    const feedSaved = await getFeedSaved(actor_id);
    return res
      .status(200)
      .json({ msg: "get feed saved success", bookmark: feedSaved });
  } catch (error) {
    return res.status(400).json({ msg: "internal server error" });
  }
};

export const getFeedSavedlogin = async (req, res) => {
  try {
   const bookmark = await getAllBookmark()
   return res.status(200).json({msg:"succes get bookmark user login", bookmark})
  } catch (error) {
    return res.status(400).json({msg:"internal server error"})
  }
}

export const savedFeed = async (req, res) => {
  try {
    const user_id = req.user?.id
    const feed_id = req.params.feed_id;

    if (!user_id) {
      res.status(400).json({ msg: "user_id unknown" });
    }

    if (!feed_id) {
      res.status(400).json({ msg: "feed_id unknown" });
    }

    const bookmark = await saveFeed(user_id, feed_id);
    return res
      .status(200)
      .json({ msg: bookmark.isSaved ? "feed saved" : "feed unsaved", ...bookmark });
  } catch (error) {
    console.log("error der", error);
    return res.status(400).json({ msg: "internal server error" });
  }
};
