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
  description
) => {
  return await prisma.feed.create({
    data: {
      image,
      address,
      description,
      isLike : false,
      isSave : false,
      createAt: new Date(),
      updateAt: new Date(),
      idFromUser : Number(idFromUser)
    },
    include : {
        user : {
            select : { username : true}
        }
    }
  });
};

export const editFeed = async (feedID, username, image, address) => {
  return await prisma.feed.update({
    where: { feedId: Number(feedID) },
    data: {
      username: username,
      image: image,
      address: address,
    },
  });
};

export const deleteFeed = async (feedId) => {
  return await prisma.feed.delete({
    where: { feedId: Number(feedId) },
  });
};
