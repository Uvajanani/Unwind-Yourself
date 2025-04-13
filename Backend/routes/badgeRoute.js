import express from "express";
import { addBadgeToUser, getUserBadges } from "../controllers/addBadgeToUser.js";

const badgeRouter = express.Router();

badgeRouter.post("/badge/add", addBadgeToUser);
badgeRouter.get("/badge/:userId", getUserBadges)

export default badgeRouter;