import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    sender : {type : String, required : true},
    profile : {type : String},
    text : {type : String, required : true},
    timestamp : {type : Date, default : Date.now}
}, {minimize : false})

const messageModel = mongoose.models.message || mongoose.model("message", messageSchema)
export default messageModel