import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async () => {
  return await prisma.user.findMany();
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const register = async (username, email, password, display_name) => {
  return await prisma.user.create({
    data: {
      username,
      email,
      password,
      display_name,
    },
  });
};

export const RefreshToken = async (userId, refresh_token) => {
  return await prisma.user.update({
    where: { id: userId },
    data: {
      refresh_token,
    },
  });
};

export const DeleteRefreshToken = async (refresh_token) => {
    return await prisma.user.updateMany({
        where: {refresh_token},
        data : {refresh_token:null}
    })
}

export const findRefreshToken = async (refresh_token) => {
    return await prisma.user.findFirst({
        where: {refresh_token : refresh_token}
    })
}