import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { COOKIE_NAME } from "./constants.js";

export const createToken = (id: string, email: string, expiresIn) => {
  const paylod = { id, email };
  const token = jwt.sign(paylod, process.env.JWT_SECRET, {
    expiresIn,
  });

  return token;
};

export const verifyTheToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.signedCookies[`${COOKIE_NAME}`];
    if (!token) {
      throw new Error("User Not Authenticated...😑");
    }
    // Verify the token
    const verifiedUser: {
      id: string; // Use lowercase 'string'
      email: string;
    } = jwt.verify(token, process.env.JWT_SECRET) as {
      id: string;
      email: string;
    };

    // Proceed with the verified user data
    // console.log("User verified:", verifiedUser);
    res.locals._id = verifiedUser.id;
    next(); // Proceed to the next middleware or route
  } catch (err) {
    return res.status(400).json({
      message: err.message || err,
      success: false,
      error: true,
    });
  }
};

