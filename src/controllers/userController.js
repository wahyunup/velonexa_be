import {register, getUser, getUserByEmail} from "../models/userModel.js"
import bcrypt from "bcrypt"

export const getAllUser = async (req, res) => {
    try {
        const allFeed = await getUser()
        return res.status(200).json(allFeed) 
    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
}

export const registerUser = async (req, res) => {
    try {
        const {username, email, password, confirmPassword} = req.body

        const existingEmail = await getUserByEmail(email)
        if (existingEmail) {
             return res.status(400).json({msg:"email sudah tersedia"})
        }

        if (password !== confirmPassword) {
            return res.status(401).json({msg:"masukan password yang sama"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        await register(username, email, hashedPassword)
        return res.status(200).json({msg:"register berhasil"})

    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
} 

