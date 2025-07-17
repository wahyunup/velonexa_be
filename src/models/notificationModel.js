import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNotification = async ({ actorId, targetId, type, feedId }) => {
  return await prisma.notification.create({
    data: {
      type,
      actorId,
      targetId,
      feedId,
    },
    include: {
      actor: true,
      feed: true,
    },
  });
};


export const getNotificationsByUser = async (userId) => {
  return prisma.notification.findMany({
    where: { targetId: userId },
    orderBy: { createdAt: "desc" },
    include: {
      actor: true,
      feed: true,
    },
  });
};
