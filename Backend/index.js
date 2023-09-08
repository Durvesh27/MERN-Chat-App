import express from "express";
import mongoose from 'mongoose';
import dotenv from 'dotenv'
import cors from 'cors'
import { Login,Register, allUsers } from "./Controllers/userController.js";
import { protect } from "./Middlewares/authMiddleware.js";



const app=express()
app.use(express.json())
app.use(cors());
dotenv.config()

app.get("/",(req,res)=>{
res.send("Code running")
})


app.post('/login',Login)
app.post('/register',Register)
app.get("/all-users",protect,allUsers)
mongoose.connect(process.env.MONGO_URL).then(()=>{
console.log("Connected to DB")
})

app.listen(5000,()=>{
console.log("App running on port 5000")
})