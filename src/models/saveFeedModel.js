import prisma from "../lib/prisma.js";

export const getFeedSaved = async (user_id) => {
  return await prisma.feedSaved.findMany({
    where: { 
      actor_id: Number(user_id), 
      isSaved : true
    },
    include: { feed: true,
        actor : true
    },
  });
};

export const getAllBookmark = async (actorId) => {
  return await prisma.feedSaved.findMany({
    where: { actor_id: Number(actorId), isSaved: true },
    include: { feed: true },
  })
}

export const saveFeed = async (user_id, feed_id) => {
  const numActor_id = Number(user_id)
  const numFeed_id = Number(feed_id)

  return prisma.$transaction(async (tx) => {
    const existing = await tx.feedSaved.findUnique({
      where: { feed_id_actor_id: { feed_id: numFeed_id, actor_id: numActor_id } },
    });

    if (existing) {
      await tx.feedSaved.delete({ where: { id: existing.id } });
      await tx.feed.update({ where: { id: numFeed_id }, data: { save_count: { decrement: 1 } } });
      return { isSaved: false };
    }

    const bookmark = await tx.feedSaved.create({
      data: { actor_id: numActor_id, feed_id: numFeed_id, isSaved: true },
    });
    await tx.feed.update({ where: { id: numFeed_id }, data: { save_count: { increment: 1 } } });
    return { isSaved: true, bookmark };
  });
};
