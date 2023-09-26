import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken"
export const protect=async(req,res,next)=>{
let token;
console.log(req.headers.authorization,"ixz")
if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") ) {
try{
token=req.headers.authorization.split(" ")[1]
const decoded=jwt.verify(token,process.env.JWT_SECRET)
req.user=await userModel.findById(decoded?.userId).select("-password")
next()
}
catch(error){
res.status(401)
throw new Error("Not Authorized,token failed")
}
}
else{
    res.status(401)
    throw new Error("Not Authorized,no token ")
}
}