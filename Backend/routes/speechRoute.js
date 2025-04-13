import express from "express"
import { getSpeechEmotions, saveSpeechEmotion } from "../controllers/speechController.js"

const speechRouter = express.Router()

speechRouter.post("/save-speech-emotion", saveSpeechEmotion)
speechRouter.get("/getSpeech/:userId", getSpeechEmotions)


export default speechRouter