import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import routeIndex from "./Routes/index.js";
import userRoutes from "./Routes/userRoutes.js";
import chatRoutes from "./Routes/chatRoutes.js";
import messageRoutes from "./Routes/messageRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";


const app = express();
// app.use(express.static(path.resolve('./public')));
app.use(express.json())
app.use(cors());
dotenv.config();
app.get("/", (req, res) => {
  // res.sendFile('/public/index.html')
  res.send("Code running")
});

app.use("/api/v1", routeIndex);
// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);

mongoose.connect(process.env.MONGO_URL).then(() => {
  console.log("Connected to DB");
});

const server=app.listen(5000, () => {
  console.log("App running on port 5000");
});

// const httpServer = createServer(app);
// const io = new Server(httpServer
//   , {
//   pingTimeout: 60000,
//   cors: {
//     origin: "http://localhost:3000"
//   },
// }
// );


const io = new Server(server, {
  // pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to Socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });
  socket.on('join chat',(room)=>{
  socket.join(room)
  console.log("User joined room"+room)
  })
  
  socket.on('typing',(room)=>socket.in(room).emit("typing"))
  socket.on('stop typing',(room)=>socket.in(room).emit("stop typing"))

  socket.on('new message',(newMessageRecieved)=>{
  var chat=newMessageRecieved.chat;
  if(!chat.users){
  return console.log("chat.users not defined")
  }
  chat.users.forEach((user)=>{
  if(user._id==newMessageRecieved.sender._id) return;
  socket.in(user._id).emit("message recieved",newMessageRecieved)
  })
  })
});
// console.log("port 5000 running")
// app.listen(5000);
//  httpServer.listen(5000)

