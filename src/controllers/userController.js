import {register, getUser, getUserByEmail} from "../models/userModel.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { faker } from "@faker-js/faker"

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

        const display_name =  faker.person.fullName()

        await register(username, email, hashedPassword, display_name)
        return res.status(200).json({msg:"register berhasil"})

    } catch (error) {
        return res.status(400).json({msg:error.message})
    }
} 

export const login = async (req, res) => {
    const {email, password} = req.body
    try {
        const user = await getUserByEmail(email)
        if(!user) {
            return res.status(401).json({msg:"email tidak tersedia"})
        }

        const passwordValid = await bcrypt.compare(password, user.password)
        if (!passwordValid) {
            return res.status(401).json({msg:"password tidak sesuai"})
        }

       const token = jwt.sign({
            userId : user.id,
            email : user.email
        },process.env.JWT_SECRET,{expiresIn: '1h'})

        res.json({
            msg: "login berhasil",
            token,
            user : {
                username : user.username,
                email : user.email,
                display_name : user.display_name,
            }
        })


    } catch (error) {
        return res.status(401).json({msg:"login gagal"})
    }
}

