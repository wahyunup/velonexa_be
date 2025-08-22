import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createFollow = async (target_id, user_id) => {
  return await prisma.follow_user.upsert({
    where: {
      user_id_target_id: {
        user_id: Number(user_id),
        target_id: Number(target_id),
      },
    },
    update: {
      isFollow: true,
    },
    create: {
      user_id: Number(user_id),
      target_id: Number(target_id),
      isFollow: true,
    },
    include: {
      target: {
        select: {
          id : true,
          username: true,
        },
      },
      user: {
        select: {
          id : true,
          username: true,
        },
      },
    },
  });
};

export const updateFollow = async (user_id, target_id) => {
  return await prisma.follow_user.delete({
    where: {
      user_id_target_id: {
        user_id: Number(user_id),
        target_id: Number(target_id),
      },
    },
    include: {
      target: {
        select: {
          id : true, 
          username:true },
      },
      user: {
        select: {
          id : true, 
          username:true },
      },
    },
  });
};

export const getFollow = async (user_id) => {
  return await prisma.follow_user.findMany({
    where: { user_id: Number(user_id), isFollow: true },
    include: {
      target: {select : {
        username : true
      }},
      user : {select : {
        username : true
      }}
    },
  });
};

export const getFollowUser = async (target_id) => {
  return await prisma.follow_user.findMany({
    where: { 
      target_id: Number(target_id),
    },
    include: {
      target: {select : {
        username : true
      }},
      user : {select : {
        username : true
      }}
    },
  });
};
