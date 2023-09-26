import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import routeIndex from "./Routes/index.js";
import userRoutes from './Routes/userRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'
import messageRoutes from './Routes/messageRoutes.js'
// import {Server} from "socket.io";
// import { createServer } from "http";
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.get("/", (req, res) => {
  res.send("Code running");
});

app.use("/api/v1", routeIndex);
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});

app.listen(5000, () => {
  console.log("App running on port 5000");
});




// const httpServer = createServer();
// const io = new Server(httpServer,{ 
//  pingTimeout:60000,
//  cors:{
//  origin: "http://localhost:3000",
//  }
//  });

// io.on("connection", (socket) => {
// console.log("Connected to Socket.io")
// });

// httpServer.listen(3000);