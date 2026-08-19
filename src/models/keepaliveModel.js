import prisma from "../lib/prisma.js";

export const getKeepalive = async (id) => {
  return await prisma.keepalive.findUnique({
    where: {
      id: parseInt(id),
    },
  });
};

export const createKeepAlive = async (status) => {
  const date = new Date();

  return await prisma.keepalive.upsert({
    where: {
      id: 1,
    },
    update: {
      status: status,
      createdAt: date,
    },
    create: {
      status: status,
      createdAt: date,
    },
  });
};
