import {
  likeComment,
  getCommentWithLikes,
  getCommentsByFeedId,
  getCommentLikers,
  createComment,
} from "../models/commentModel.js";

export const createFeedComment = async (req, res) => {
  try {
    const { feedId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    if (!feedId || !content) {
      return res.status(400).json({
        success: false,
        message: "Feed ID and content are required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const newComment = await createComment(feedId, userId, content);

    return res.status(201).json({
      success: true,
      message: "Comment created successfully",
      data: newComment,
    });
  } catch (error) {
    console.error("Error in createComment:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const handleLikeComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required",
      });
    }

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    const result = await likeComment(commentId, userId);
    const updatedComment = await getCommentWithLikes(commentId, userId);

    return res.status(200).json({
      success: true,
      message: `Comment ${result.action} successfully`,
      data: {
        commentId: updatedComment.id,
        likeCount: updatedComment.like_count,
        isLiked: result.isLiked,
        likedByUsers: updatedComment.likedByUsers,
      },
    });
  } catch (error) {
    console.error("Error in handleLikeComment:", error);

    if (error.message === "Comment not found") {
      return res.status(404).json({
        success: false,
        message: "Comment not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getComments = async (req, res) => {
  try {
    const { feedId } = req.params;
    const userId = req.user?.id;

    if (!feedId) {
      return res.status(400).json({
        success: false,
        message: "Feed ID is required",
      });
    }

    const comments = await getCommentsByFeedId(feedId, userId);

    return res.status(200).json({
      success: true,
      data: comments,
    });
  } catch (error) {
    console.error("Error in getComments:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getCommentLikes = async (req, res) => {
  try {
    const { commentId } = req.params;

    if (!commentId) {
      return res.status(400).json({
        success: false,
        message: "Comment ID is required",
      });
    }

    const likers = await getCommentLikers(commentId);

    return res.status(200).json({
      success: true,
      data: {
        totalLikes: likers.length,
        likedByUsers: likers,
      },
    });
  } catch (error) {
    console.error("Error in getCommentLikes:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
