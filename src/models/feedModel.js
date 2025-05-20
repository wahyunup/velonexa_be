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
