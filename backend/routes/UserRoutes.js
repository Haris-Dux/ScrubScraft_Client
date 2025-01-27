import express from "express";
import {
  login,
  logout,
  persistUserSession,
  sendResetPasswordOTP,
  signUp,
  updatePassword,
  updateUserInformation,
  verifyOtp,
} from "../controllers/User.controller.js";
import { verifyUser } from "../middleware/Auth.js";


const userRouter = express.Router();

userRouter.post("/users/signup", signUp);
userRouter.post("/users/login", login);
userRouter.delete("/users/logout",verifyUser,logout);
userRouter.post("/users/updatePassword",updatePassword);
userRouter.post("/users/sendResetPasswordOTP", sendResetPasswordOTP);
userRouter.post("/users/verifyOtp", verifyOtp);
userRouter.get("/users/persistUserSession", persistUserSession);
userRouter.post("/users/updateUserInformation",verifyUser,updateUserInformation);

export default userRouter;
