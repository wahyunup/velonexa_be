import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createComment = async (feedId, userId, content) => {
  const feed_id = Number(feedId);
  const user_id = Number(userId);

  const feed = await prisma.feed.findUnique({
    where: { id: feed_id },
  });

  if (!feed) {
    throw new Error("Feed not found");
  }

  const comment = await prisma.comment_user.create({
    data: {
      field_comment: content,
      feed_id: feed_id,
      user_id: user_id,
      like_count: 0,
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          display_name: true,
          image: true
        },
      },
    },
  });

  return comment;
};

export const likeComment = async (commentId, userId) => {
  const commentId_num = Number(commentId);
  const userId_num = Number(userId);

  const comment = await prisma.comment_user.findUnique({
    where: { id: commentId_num },
  });

  if (!comment) {
    throw new Error("Comment not found");
  }

  const existingLike = await prisma.comment_like.findUnique({
    where: {
      user_id_comment_id: {
        user_id: userId_num,
        comment_id: commentId_num,
      },
    },
  });

  if (existingLike) {
    // Unlike: Remove like record and decrement counter
    await prisma.$transaction([
      prisma.comment_like.delete({
        where: {
          user_id_comment_id: {
            user_id: userId_num,
            comment_id: commentId_num,
          },
        },
      }),
      prisma.comment_user.update({
        where: { id: commentId_num },
        data: {
          like_count: {
            decrement: 1,
          },
        },
      }),
    ]);

    return { action: "unliked", isLiked: false };
  } else {
    // Like: Create like record and increment counter
    await prisma.$transaction([
      prisma.comment_like.create({
        data: {
          user_id: userId_num,
          comment_id: commentId_num,
        },
      }),
      prisma.comment_user.update({
        where: { id: commentId_num },
        data: {
          like_count: {
            increment: 1,
          },
        },
      }),
    ]);

    return { action: "liked", isLiked: true };
  }
};

export const getCommentWithLikes = async (commentId, userId = null) => {
  const comment = await prisma.comment_user.findUnique({
    where: { id: Number(commentId) },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          display_name: true,
        },
      },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              display_name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!comment) {
    return null;
  }

  // Check if current user liked this comment
  const isLiked = userId
    ? comment.likes.some((like) => like.user_id === Number(userId))
    : false;

  return {
    ...comment,
    isLiked,
    likedByUsers: comment.likes.map((like) => like.user),
    likedByNames: comment.likes.map(
      (like) => like.user.display_name || like.user.username
    ),
  };
};

export const getCommentsByFeedId = async (feedId, userId = null) => {
  const comments = await prisma.comment_user.findMany({
    where: { feed_id: Number(feedId) },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          display_name: true,
          image: true
        },
      },
      likes: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              display_name: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return comments.map((comment) => {
    const isLiked = userId
      ? comment.likes.some((like) => like.user_id === Number(userId))
      : false;

    return {
      ...comment,
      isLiked,
    };
  });
};

export const getCommentLikers = async (commentId) => {
  const likes = await prisma.comment_like.findMany({
    where: { comment_id: Number(commentId) },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          display_name: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return likes.map((like) => like.user);
};

export const getUserCommentLikes = async (userId) => {
  return await prisma.comment_like.findMany({
    where: { user_id: Number(userId) },
    include: {
      comment: {
        include: {
          user: {
            select: {
              id: true,
              username: true,
              display_name: true,
            },
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};
