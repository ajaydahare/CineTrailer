import User from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

//user signup
export const signup = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User Already exist.." });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Password do not match" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { email: result.email, id: result._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      result: {
        id: result._id,
        name: result.name,
        email: result.email,
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ error: e });
  }
};

// user sign in
export const signin = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      error: errors.array()[0].msg,
    });
  }
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (!existingUser)
      return res.status(400).json({ message: "User Doen't exist" });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Wrong Password" });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      process.env.JWT_SECRET
    );

    res.status(200).json({
      result: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
      },
      token,
    });
  } catch (e) {
    res.status(500).json({ message: "something went wrong " });
  }
};

export const getUserById = (req, res, next, id) => {
  User.findById(id, (error, user) => {
    if (error || !user) {
      res.status(400).json({
        error: "user Not found",
      });
    }
    req.profile = user;
    next();
  });
};
