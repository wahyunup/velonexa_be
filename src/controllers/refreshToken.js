import { findRefreshToken } from "../models/userModel.js";
import jwt from "jsonwebtoken";
export const getToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token;
    if (!refreshToken) {
      return res.status(401).json({ msg: "refresh token tidak ada" });
    }
    const refreshTokenUser = await findRefreshToken(refreshToken);
    if (!refreshTokenUser) {
      return res.status(401).json({ msg: "refresh token tidak sama" });
    }
    jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err) {
          return res.sendStatus(403);
        }
        const accessToken = jwt.sign(
          {
            id: refreshTokenUser.id,
            username: refreshTokenUser.username,
            display_name: refreshTokenUser.display_name,
            email: refreshTokenUser.email,
          },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "15m" }
        );

        return res.json({ accessToken });
      }
    );

    return res.status(200).json({ msg: "refresh token berhasil" });
  } catch (error) {
    return res.status(404).json({ msg: "refresh token gagal" });
  }
};
