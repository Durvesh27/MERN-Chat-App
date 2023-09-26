import Chat from "../Models/chatModel.js";
import userModel from "../Models/userModel.js";

export const accesschat = async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    return res.status(404).json({
      success: false,
      message: "UserId not sent with the request",
    });
  }
  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      {
        users: { $elemMatch: { $eq: req.user._id } },
      },
      {
        users: { $elemMatch: { $eq: userId } },
      },
    ],
  })
    .populate("users", "-password")
    .populate("latestMessage");
  isChat -
    (await userModel.populate(isChat, {
      path: "latestMessage.sender",
      sender: "name pic email",
    }));
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    var chatData = {
      chatName: "sender",
      isGroupChat: "false",
      users: [req.user._id, userId],
    };
    try {
      const createdChat = await Chat.create(chatData);
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(FullChat);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};

export const fetchChats = async (req, res) => {
  try {
    // Chat.find({users:{$elemMatch:{$eq:req.user._id}}}).then(result=>res.send(result))
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("latestMessage")
      .sort({ updatedAt: -1 })
      .then(async (results) => {
        results = await userModel.populate(results, {
          path: "latestMessage.sender",
          select: "name pic email",
        });
        res.status(200).send(results);
      });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const createGroupChat = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(404).send({ message: "Fill all the fields" });
  }
  var users = JSON.parse(req.body.users);
  if (users.length < 2) {
    return res
      .status(404)
      .send({ message: "More than 2 users are required to form group chat" });
  }
  users.push(req.user);
  try {
    const groupChat = await Chat.create({
      chatName: req.body.name,
      users: users,
      isGroupChat: true,
      groupAdmin: req.user,
    });
    const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
      .populate("users", "-password")
      .populate("groupAdmin", "-password");
    res.status(200).json(fullGroupChat);
  } catch (error) {
    throw new Error(error.message);
  }
};

export const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;
  const updatedChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName,
    },
    {
      new: true,
    }
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");
  if(!updatedChat){
   res.status(404)
    throw new Error("Chat Not Found")
  }else{
    res.json(updatedChat)
  }
};

export const addToGroup=async(req,res)=>{
  const { chatId, userId } = req.body; 
  const added=await Chat.findByIdAndUpdate(
    chatId,
    {
      $push:{users:userId},
    },
    {new:true}
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");
  if(!added){
    res.status(404)
     throw new Error("Chat Not Found")
   }else{
     res.json(added)
   }
}

export const removeFromGroup=async(req,res)=>{
  const { chatId, userId } = req.body; 
  const remove=await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull:{users:userId},
    },
    {new:true}
  )
  .populate("users", "-password")
  .populate("groupAdmin", "-password");
  if(!remove){
    res.status(404)
     throw new Error("Chat Not Found")
   }else{
     res.json(remove)
   }
}

