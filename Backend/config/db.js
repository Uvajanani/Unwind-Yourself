import mongoose from "mongoose";

export const connectdB = async() => {
    await mongoose.connect('mongodb+srv://uvajanani:wPNom5I1I8ozTd9s@cluster0.uwzha.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0').then(() => console.log("DB Connected"))
}