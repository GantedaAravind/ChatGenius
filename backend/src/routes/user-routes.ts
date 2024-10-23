import { Router } from "express";
import {
  getAllUsers,
  userDetails,
  userLogin,
  userLogOut,
  userSignup,
} from "../controllers/user-controller.js";
import validate, {
  loginValidator,
  signupValidator,
} from "../utils/validators.js";
import { verifyTheToken } from "../utils/token.manager.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.post("/signup", validate(signupValidator), userSignup);
userRouter.post("/login", validate(loginValidator), userLogin);
userRouter.get("/user-details", verifyTheToken, userDetails); //auth-status
userRouter.get("/logout", verifyTheToken, userLogOut);

export default userRouter;
