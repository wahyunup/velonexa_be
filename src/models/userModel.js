import { PrismaClient } from "@prisma/client";

const prisma = PrismaClient()

export const registerUser = async (usename, email, password, confirmPassword) => {
    return await prisma.user.create({
        data: {
            username
        }
    })
}