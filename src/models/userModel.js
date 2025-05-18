import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getUser = async () => {
    return await prisma.user.findMany()
}

export const getUserByEmail = async (email) => {
    return await prisma.user.findUnique({
        where : {email}
    })
}

export const register = async (username, email, password) => {
    return await prisma.user.create({
        data: {
            username,
            email,
            password
        }
    })
}