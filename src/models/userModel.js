import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async () => {
  return await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      display_name: true,
      feed: true,
      image: true
    }
  });
};

export const getUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
    include: {
      feed: true,
      bio: true,  
    }
  });
};

export const getUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id: Number(id) },
    include: {
      feed: true,
      bio: true,
    }
  });
};

export const editUser = async (user_id, bio, display_name, username) => {
 const updateUser = await prisma.user.update({
    where : {id: Number(user_id)},
    data : {
      display_name: display_name,
      username: username,
    }
  })

  await prisma.bio_user.upsert({
    where : {user_id: Number(user_id)},
    update: {bio:bio},
    create : {
      bio: bio,
      user: {connect: {id: Number(user_id)}}
    }
  })

 return updateUser
}

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

export const uploadProfileImage = async (userId, profileImage) => {
  return await prisma.user.update({
    where : {id: userId},
    data : {image : profileImage}
  })
}