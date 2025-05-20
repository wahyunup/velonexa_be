import jwt from "jsonwebtoken"

export const authToken = (req, res, next) => {
    const authheader = req.headers.authorization
    const token = authheader && authheader.split(" ")[1]

    if (!token) {
        res.status(401).json({msg:"token tidak ditemukan"})
    }

    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({msg:"token invalid"})
    }
}