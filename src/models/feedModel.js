import prisma from "../lib/prisma.js";

export const getFeed = async (page, limit, user_id) => {
  const NumUser_id = Number(user_id)
  const skip = (page - 1) * limit;
  return await prisma.feed.findMany({
    skip: skip,
    take: limit,
    where: {
      OR: [
        { user_id: NumUser_id },
        {
          user: {
            following: {
              some: {
                user_id: NumUser_id,
                isFollow: true,
              },
            },
          },
        },
      ],
    },
    include: {
      user: {
        select: {
          username: true,
          image: true,
          following: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const getAllFeeds = async () => {
  return await prisma.feed.findMany({
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 30,
  });
};

export const createFeed = async (image, address, description, user_id) => {
  return await prisma.feed.create({
    data: {
      image,
      address,
      description,
      like_count: 0,
      save_count: 0,
      user_id: Number(user_id),
    },
    include: {
      user: {
        select: {
          username: true,
          image: true,
        },
      },
    },
  });
};

export const editFeed = async (feedID, userId, description, image, address) => {
  const result = await prisma.feed.updateMany({
    where: { id: Number(feedID), user_id: Number(userId) },
    data: {
      description: description,
      image: image,
      address: address,
    },
  });

  return result.count > 0;
};

export const deleteFeed = async (feedId, userId) => {
  const id = Number(feedId);

  return prisma.$transaction(async (tx) => {
    const feed = await tx.feed.findFirst({
      where: { id, user_id: Number(userId) },
      select: { id: true },
    });

    if (!feed) return false;

    await tx.feedSaved.deleteMany({ where: { feed_id: id } });
    await tx.comment_like.deleteMany({ where: { comment: { feed_id: id } } });
    await tx.comment_user.deleteMany({ where: { feed_id: id } });
    await tx.like_user.deleteMany({ where: { feed_id: id } });
    await tx.notification.deleteMany({ where: { feed_id: id } });
    await tx.feed.delete({ where: { id } });

    return true;
  });
};

export const addLike = async (user_id, feed_id, like) => {
  const userId = Number(user_id);
  const feedId = Number(feed_id);
  return prisma.$transaction(async (tx) => {
    const existing = await tx.like_user.findUnique({
      where: { user_id_feed_id: { user_id: userId, feed_id: feedId } },
    });

    if (!existing) {
      await tx.like_user.create({ data: { user_id: userId, feed_id: feedId, isLike: Boolean(like) } });
      if (like) {
        await tx.feed.update({ where: { id: feedId }, data: { like_count: { increment: 1 } } });
      }
      return;
    }

    if (existing.isLike !== like) {
      await tx.like_user.update({
        where: {
          user_id_feed_id: {
            user_id: Number(user_id),
            feed_id: Number(feed_id),
          },
        },
        data: { isLike: like },
      });

      await tx.feed.update({
        where: { id: feedId },
        data: {
          like_count: like ? { increment: 1 } : { decrement: 1 },
        },
      });
    }
  });
};

export const getLikeId = async (user_id, feed_id) => {
  return prisma.like_user.findUnique({
    where: {
      user_id_feed_id: {
        feed_id: Number(feed_id),
        user_id: Number(user_id),
      },
    },
  });
};
