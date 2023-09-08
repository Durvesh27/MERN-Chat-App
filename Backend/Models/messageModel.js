import mongoose from "mongoose";

const messageModel=mongoose.Schema({
sender:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
},
content:{
    type:String,
    trim:true
},
chat:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"   
}
},{
    timeStamps:true
})

export default mongoose.model("Message",messageModel)