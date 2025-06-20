import jwt from "jsonwebtoken"

export const authToken = (req, res, next) => {
    // const authheader = req.headers.authorization
    // const token = authheader && authheader.split(" ")[1]

    const token = req.cookies.refresh_token

    if (!token) {
        return res.status(401).json({msg:"token tidak ditemukan"})
    }
    
    try {
        const decode = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET)
        req.user = decode
        next()
    } catch (error) {
        return res.status(401).json({msg:"token invalid"})
    }
}