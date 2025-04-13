import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectdB } from "./config/db.js";
import userRouter from "./routes/userRoute.js";
import messageRouter from "./routes/messageRoute.js";
import "dotenv/config";
import messageModel from "./models/messageModel.js";
import emotionRouter from "./routes/emotionRoute.js";
import speechRouter from "./routes/speechRoute.js";
import badgeRouter from "./routes/badgeRoute.js";
import emotionScoreRouter from "./routes/emotionScoreRoute.js";
import developedRouter from "./routes/developedRoute.js";

const app = express();
const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173", "http://localhost:5174"],
        methods: ["GET", "POST"],
        credentials: true,
        allowedHeaders: ["Content-Type"],
    },
});

const port = 4000;

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

app.use(express.json());
app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error(`Origin ${origin} not allowed by CORS`));
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);

connectdB();

app.use("/api/user", userRouter);
app.use("/api/messages", messageRouter);
app.use("/api/emotion", emotionRouter)
app.use("/api", speechRouter)
app.use("/api/badges", badgeRouter);
app.use("/api/emotionScore", emotionScoreRouter);
app.use("/api/developedArea", developedRouter);


app.get("/", (req, res) => {
    res.send("API Working");
});

const activeUsers = new Map();

io.on("connection", (socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", (message) => {
        console.log("New Message Received:", message);
        socket.broadcast.emit("receiveMessage", message);
    });

    socket.on("joinCommunity", (user) => {
        console.log("joinCommunity event received with user:", user); 
        if (!user?.id) {
            console.log("No user ID provided");
            return;
        }
    
        activeUsers.set(user.id, { 
          ...user, 
          socketId: socket.id 
        });
    
        console.log("Active Users after join:", Array.from(activeUsers.values()));
        io.emit("updateActiveUsers", Array.from(activeUsers.values()));
    });
    

    socket.on("leaveCommunity", ({ id }) => {
        if (!id) return;
        activeUsers.delete(id);
        console.log("Active Users after leave:", Array.from(activeUsers.values()));
        io.emit("updateActiveUsers", Array.from(activeUsers.values()));
   });


    socket.on("userTyping", (typingStatus) => {
        socket.broadcast.emit("userTyping", typingStatus);
    });

    socket.on("profileUpdated", (updatedUser) => {
        console.log("Profile updated:", updatedUser);
        io.emit("profileUpdated", updatedUser); 
    });

    socket.on("messageDeleted", async (messageId) => {
        try {
            await messageModel.findByIdAndDelete(messageId);
    
            io.emit("messageDeleted", messageId);
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    });
    

    socket.on("deleteMessage", async (messageId) => {
        try {
            await messageModel.findByIdAndDelete(messageId);
    
            io.emit("messageDeleted", messageId); 
        } catch (error) {
            console.error("Error deleting message:", error);
        }
    });
      
    socket.on("deleteAllMessages", async () => {
        try {
          await messageModel.deleteMany({}); 
          io.emit("deleteAllMessages"); 
        } catch (error) {
          console.error("Error deleting messages:", error);
        }
    });
      
      
      
    socket.on("disconnect", () => {
        const disconnectedUser = Array.from(activeUsers.entries())
          .find(([, user]) => user.socketId === socket.id);
    
        if (disconnectedUser) {
          activeUsers.delete(disconnectedUser[0]);
          console.log(`User ${disconnectedUser[0]} disconnected.`);
          io.emit("updateActiveUsers", Array.from(activeUsers.values()));
        }
      });
});

app.set("socketio", io);

server.listen(port, () => {
    console.log("Server started on port", port);
});
