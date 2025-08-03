import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createNotification = async ({
  actor_id,
  target_id,
  type,
  feed_id,
}) => {
  // ini notif untuk like
  return await prisma.notification.create({
    data: {
      type,
      actor_id,
      target_id,
      feed_id,
    },
    include: {
      actor: {
        select: {
          username: true,
          display_name: true,
          image: true,
        },
      },
      feed: true,
    },
  });
};

export const getNotificationsByUser = async (user_id) => {
  return prisma.notification.findMany({
    where: { target_id: user_id },
    orderBy: { createdAt: "desc" },
    include: {
      actor: true,
      feed: true,
    },
  });
};

export const updateNotif = async (notif_id) => {
  return prisma.notification.update({
    where : { id : Number(notif_id)},
    data : {
      isRead : true
    }
  })
}
