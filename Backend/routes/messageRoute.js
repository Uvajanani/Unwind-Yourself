import express from "express"
import { deleteAllMessages, deleteMessage, getAllMessages, sendMessage } from "../controllers/messageController.js"

const messageRouter = express.Router()

messageRouter.get("/", getAllMessages)
messageRouter.post("/send", sendMessage)
messageRouter.delete("/deleteAll", deleteAllMessages)
messageRouter.delete("/delete/:messageId", deleteMessage)

export default messageRouter