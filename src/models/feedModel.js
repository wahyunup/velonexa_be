import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFeed = async () => {
    return await prisma.feed.findMany({
        include : {
            user : {
                select : {username : true}
            }
        }
  });
};

export const createFeed = async (
  image,
  address,
  description,
  user_id
) => {
  return await prisma.feed.create({
    data: {
      image,
      address,
      description,
      like_count : 0,
      save_count : 0,
      user_id : Number(user_id),
    },
    include : {
        user : {
            select : { username : true}
        }
    }
  });
};

export const editFeed = async (feedID, description, image, address) => {
  return await prisma.feed.update({
    where: { id: Number(feedID) },
    data: {
      description: description,
      image: image,
      address: address,
    },
  });
};

export const deleteFeed = async (feedId) => {
  return await prisma.feed.delete({
    where: { id: Number(feedId) },
  });
};

export const addLike = async (user_id, feed_id, like) => {
  const existing = await prisma.like_user.findUnique({
    where: {
      user_id_feed_id: {
        user_id: Number(user_id),
        feed_id: Number(feed_id),
      },
    },
  });

  if (!existing) {
    // Belum pernah like
    await prisma.like_user.create({
      data: {
        user_id: Number(user_id),
        feed_id: Number(feed_id),
        isLike: like,
      },
    });
    if (like) {
      await prisma.feed.update({
        where: { id: Number(feed_id) },
        data: { like_count: { increment: 1 } },
      });
    }
  } else {
    // Sudah pernah like, cek apakah status berubah
    if (existing.isLike !== like) {
      await prisma.like_user.update({
        where: {
          user_id_feed_id: {
            user_id: Number(user_id),
            feed_id: Number(feed_id),
          },
        },
        data: { isLike: like },
      });

      await prisma.feed.update({
        where: { id: Number(feed_id) },
        data: {
          like_count: like
            ? { increment: 1 }
            : { decrement: 1 },
        },
      });
    }
  }
};

export const getLikeId = async (user_id, feed_id) => { 
  return prisma.like_user.findUnique({
    where: {
      user_id_feed_id : {
        feed_id : Number(feed_id) ,
        user_id : Number(user_id)
      }
    }
  })
}