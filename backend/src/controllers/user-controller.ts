import { NextFunction, Request, RequestHandler, Response } from "express";
import UserModel from "../models/UserModel.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token.manager.js";
import { COOKIE_NAME } from "../utils/constants.js";
import userModel from "../models/UserModel.js";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await UserModel.find({});

    return res.status(200).json({
      message: "All Users...🙂",
      data: users,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

export const userSignup = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, name, password } = req.body;
    const hashedPassword = await hash(password, 10);
    const user = new UserModel({ name, email, password: hashedPassword });

    await user.save();
    // console.log(password);
    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: true, // Set to true only in production
    });
    //create token and store cookie
    const token = createToken(user._id.toString(), user.email, "7d");
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    return res
      .cookie(COOKIE_NAME, token, {
        path: "/", // Default path
        expires,
        httpOnly: true, // Prevents client-side access via JavaScript
        sameSite: "none", // Required for cross-origin cookies
        signed: true,
        secure: true,
      })
      .status(200)
      .json({
        message: "SignUP sccessfully...🙂",
        data: user,
        success: true,
        error: false,
      });
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({
        message: "User already exists with this email...😐",
        success: false,
        error: true,
      });
    }

    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    // console.log(email,password);/

    const existingUser = await UserModel.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({
        message: "User Not Regestered...😣",
        success: false,
        error: true,
      });
    }

    const isPasswordCorrect = await compare(password, existingUser.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({
        message: "Incorrect Password...😣",
        success: false,
        error: true,
      });
    }

    const token = createToken(
      existingUser._id.toString(),
      existingUser.email,
      "7d"
    );

    res.clearCookie(COOKIE_NAME, {
      path: "/",
      httpOnly: true,
      sameSite: "none",
      signed: true,
      secure: true, // Set to true only in production
    });

    const expires = new Date();
    expires.setDate(expires.getDate() + 7);
    //change the domain when production
    return res
      .cookie(COOKIE_NAME, token, {
        path: "/", // Default path
        expires,
        httpOnly: true, // Prevents client-side access via JavaScript
        sameSite: "none", // Required for cross-origin cookies
        signed: true,
        secure: true,
      })
      .status(200)
      .json({
        message: "Login sccessfully...🙂",
        data: existingUser,
        token: token,
        success: true,
        error: false,
      });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

export const userDetails = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userModel.findById(res.locals._id);

    return res.status(200).json({
      message: "User Datails...🥰",
      data: user,
      success: true,
      error: false,
    });
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

export const userLogOut = async (req, res, next) => {
  try {
    res
      .clearCookie(COOKIE_NAME, {
        path: "/",
        httpOnly: true,
        sameSite: "none",
        signed: true,
        secure: true, // Set to true only in production
      })
      .status(200)
      .json({
        message: "Logout Successfully...😣",
        success: true,
        error: false,
      });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      success: true,
      error: false,
    });
  }
};
