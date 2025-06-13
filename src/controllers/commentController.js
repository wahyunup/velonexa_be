import { getComments, createCommentInModel } from "../models/commentModel.js";

export const getFeedComments = async (req, res) => {
  try {
    const { feedId } = req.params;

    if (!feedId) {
      return res.status(400).json({
        msg: "Feed ID is required",
      });
    }

    const comments = await getComments(feedId);
    return res.status(200).json({
      msg: "Comments retrieved successfully",
      data: comments,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const createComment = async (req, res) => {
  try {
    const { feedId } = req.params;
    const { comment, like_count } = req.body;
    const user_id = req.user?.id;

    if (!user_id) {
      return res.status(401).json({ msg: "Please log in first" });
    }

    if (!feedId || !comment) {
      return res.status(400).json({ msg: "Feed ID and comment are required" });
    }

    await createCommentInModel(feedId, comment, user_id, like_count);
    return res.status(200).json({ msg: "Comment created successfully" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};
