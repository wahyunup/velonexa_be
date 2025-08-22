import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

export const getAllBookmark = async () => {
  return await prisma.feedSaved.findMany({
    include: {feed: true}
  })
}

export const saveFeed = async (user_id, feed_id) => {
  const numActor_id = Number(user_id)
  const numFeed_id = Number(feed_id)

const existing = await prisma.feedSaved.findFirst({
  where : {
    actor_id : numActor_id,
    feed_id : numFeed_id
  }})

  if(existing) {
    await prisma.feedSaved.delete({
      where : {id: existing.id}
    });
    return {isSaved : false}
  } else {
    const bookmark = await prisma.feedSaved.create({
      data : {
        actor_id : numActor_id,
        feed_id : numFeed_id,
        isSaved : true
      }
    })

    return {isSaved : true, bookmark}
  }
};
