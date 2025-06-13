import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getComments = async (feedId) => {
  return await prisma.comment_user.findMany({
    where: { feed_id: Number(feedId) },
    include: {
      user: {
        select: { username: true, display_name: true },
      },
    },
  });
}

export const createCommentInModel = async (feedId, comment, user_id, like_count) => {
  return await prisma.comment_user.create({
    data: {
      field_comment: comment,
      feed_id: Number(feedId),
      user_id: Number(user_id),
      like_count: like_count || 0,
    },
  });
};

export const deleteComment = async (commentId) => {
  return await prisma.comment_user.delete({
    where: { id: Number(commentId) },
  });
};