import express from "express";
import { loginUser, registerUser, updateUserDetails, updateUserPassword, updateUserProfile, getUserDetails } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/updateScore", updateUserDetails);
userRouter.put("/updateProfile/:userId", updateUserProfile)
userRouter.put("/updatePassword/:userId", updateUserPassword)
userRouter.get("/:userId", getUserDetails);

export default userRouter;