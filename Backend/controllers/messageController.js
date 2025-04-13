import messageModel from "../models/messageModel.js";

export const getAllMessages = async(req, res) => {
    try {
        const messages = await messageModel.find().sort({timeStamp : 1})
        res.status(200).json({success : true, messages})
    } catch(error) {
        console.log(error)
        res.status(500).json({success : false, message : "Error fetching messages"})
    }
}

export const sendMessage = async(req, res) => {
    const {sender, profile, text} = req.body

    if (!sender || !text) {
        return res.status(400).json({ success: false, message: "Sender and text are required!" });
    }

    try {
        const newMessage = new messageModel({sender, profile, text})
        await newMessage.save()
        res.status(201).json({success : true, message : newMessage})
    } catch(error) {
        console.log(error)
        res.status(500).json({success : false, message : "Error sending message"})
    }
}

export const deleteMessage = async(req, res) => {
    const {messageId} = req.params

    if (!messageId) {
        return res.status(400).json({ success: false, message: "Message ID is required!" });
    }

    try {
        const deletedMessage = await messageModel.findByIdAndDelete(messageId)

        if(!deletedMessage) {
            return res.status(404).json({success : false, message : "Message not found"})
        }

        res.status(200).json({success : true, message : "Message deleted successfully"})
    } catch(error) {
        console.log(error)
        res.status(500).json({success : false, message : "Error deleting message"})
    }
}

export const deleteAllMessages = async(req, res) => {
    
    try {
        await messageModel.deleteMany({})
        res.status(200).json({success : true, message : "All messages deleted successfully"})
    } catch(error) {
        console.log(error)
        res.status(500).json({success : false, message : "Error deleting messages"})
    }
}