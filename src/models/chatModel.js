import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createChat = async (user_id, target_id, message) => {
  return await prisma.chat.create({
    data: {
      actor_id: user_id,
      target_id: target_id,
      message: message,
    },
    include: {
      actor: {
        select: { id: true, username: true },
      },
      target: {
        select: { id: true, username: true },
      },
    },
  });
};

export const getChat = async (target_id, user_id) => {
  return await prisma.chat.findMany({
    where: {
      OR : [
        {
          target_id: Number(target_id),
          actor_id: Number(user_id),
        },
        {
          target_id: Number(user_id),
          actor_id: Number(target_id),
        }
      ]
    },
    orderBy: {
      createdAt: "asc",
    },
  });
};

export const getChatUsers = async (user_id) => {
  return await prisma.chat.findMany({
    where: {
      OR: [
        { actor_id: user_id },
        { target_id: user_id },
      ],
    },
    include : {
      actor : {
        select : {
          id : true,
          username : true,
          image : true
        }
      },
      target : {
        select : {
          id : true,
          username : true,
          image : true
        }
      }
    },
    orderBy : {
      createdAt : "desc"
    }
  });
};
