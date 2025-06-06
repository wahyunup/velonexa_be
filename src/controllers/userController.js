import {
  register,
  getUser,
  getUserByEmail,
  RefreshToken,
  DeleteRefreshToken
} from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import validator from "validator";

export const getAllUser = async (req, res) => {
  try {
    const users = await getUser();
    
    if (!users) {
      return res.status(404).json({ msg: "user not found" });
    }

    return res.status(200).json({
      msg: "success",
      data: users,
    });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    if (!username || !email || !password || !confirmPassword) {
      return res.status(401).json({ msg: "isi semua field" });
    }

    if (!validator.isEmail(email)) {
      return res.status(401).json({ msg: "format email tidak valid" });
    }

    if (password.length < 8) {
      return res
        .status(401)
        .json({ msg: "password harus lebih dari 8 karakter" });
    }

    const existingEmail = await getUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ msg: "email sudah tersedia" });
    }

    if (password !== confirmPassword) {
      return res.status(401).json({ msg: "masukan password yang sama" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const display_name = faker.person.fullName();

    await register(username, email, hashedPassword, display_name);
    return res.status(200).json({ msg: "register berhasil" });
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(401).json({ msg: "email tidak tersedia" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      return res.status(401).json({ msg: "password tidak sesuai" });
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        email: user.email,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "7s" }
    );

    const refreshToken = jwt.sign(
      {
        id: user.id,
        username: user.username,
        display_name: user.display_name,
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    await RefreshToken(user.id, refreshToken);

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3600000,
    });

    res.json({
      msg: "login berhasil",
      accessToken,
      user: {
        username: user.username,
        email: user.email,
        display_name: user.display_name,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Terjadi kesalahan pada server" });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refresh_token
    if(!refreshToken) {
      res.status(400).json({msg : "refresh token tidak ada"})
    }
    await DeleteRefreshToken(refreshToken)
    res.clearCookie("refresh_token", { httpOnly: true, secure: true });

    return res.status(200).json({ msg: "logout berhasil" });
  } catch (error) {
    return res.status(401).json({ msg: "gagal logout" });
  }
};
