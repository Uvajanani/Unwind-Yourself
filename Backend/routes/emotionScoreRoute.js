import express from "express"
import { getEmotionScores, updateEmotionScore } from "../controllers/updateEmotionScore.js"

const emotionScoreRouter = express.Router()

emotionScoreRouter.post("/emotion/update", updateEmotionScore)
emotionScoreRouter.get("/emotion/:userId", getEmotionScores)

export default emotionScoreRouter