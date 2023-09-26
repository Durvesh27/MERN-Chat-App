import chatModel from "../Models/chatModel.js";
import Messages from "../Models/messageModel.js";
import userModel from "../Models/userModel.js";

export const sendMessage=async(req,res)=>{
const{content,chatId}=req.body;
if(!content || !chatId)
return res.status(404)
var newMessage={
sender:req.user._id,
content:content,
chat:chatId
}
try{
var message=await Messages.create(newMessage)
message=await message.populate("sender","name pic")
message=await message.populate("chat")
message=await userModel.populate(message,{
    path:"chat.users",
    select:"name pic email"
})
await chatModel.findByIdAndUpdate(req.body.chatId,{
    latestMessage:message
})
res.json(message)
}catch(error){
res.status(500);
throw new Error(error.message)
}
}

export const allMessages=async(req,res)=>{
try{
    const messages=await Messages.find({chat:req.params.chatId}).populate(
        "sender","name pic email"
    ).populate("chat")
    res.json(messages)
}catch(error){
    res.status(500);
    throw new Error(error.message)
}
}