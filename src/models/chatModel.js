import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createChat = async (user_id, target_id, message) => {
  await prisma.chat.create({
    data: {
      user_id,
      target_id,
      message,
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
 await prisma.chat.findMany({
    where : {
        target_id : Number(target_id),
        actor_id : Number(user_id)
    },     
    orderBy : {
        createdAt : "asc"
    }
 })
}