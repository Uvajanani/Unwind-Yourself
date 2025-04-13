import express from "express";
import { detectEmotion } from "../controllers/emotionController.js";
import { getUserTextEmotion, saveTextEmotion } from "../controllers/saveTextEmotion.js";

const emotionRouter = express.Router();
emotionRouter.post("/detect-emotion", detectEmotion);
emotionRouter.post("/save-text-emotion", saveTextEmotion);
emotionRouter.get("/getUser/:userId", getUserTextEmotion) 

export default emotionRouter;