import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
// import {  allUsers } from "./Controllers/userController.js";
// import { protect } from "./Middlewares/authMiddleware.js";
import userRoutes from './Routes/userRoutes.js'
import chatRoutes from './Routes/chatRoutes.js'

const app=express()
app.use(express.json())
app.use(cors());
dotenv.config()

app.get("/",(req,res)=>{
res.send("Code running")
})

// app.get("/all-users",protect,allUsers)

app.use("/api/user",userRoutes)
app.use("/api/chat",chatRoutes)
mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log("Connected to DB")
})

app.listen(5000,()=>{
console.log("App running on port 5000")
})