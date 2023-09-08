
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../Models/userModel.js";

export const Register = async (req, res) => {
  try {
      // const { userData } = req.body;
      const { name, email, pic,password} = req.body
      if (!name || !email || !password || !pic) return res.json({ success: false, message: "All fields are mandtory.." })
      const isEmailExist = await userModel.find({ email: email })
      if (isEmailExist.length) {
          return res.json({ success: false, message: "Email is exist, try diffrent email." })
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new userModel({ name, email,pic, password: hashedPassword});
      await user.save();
     
      return res.json({ success: true, message: "User registered Successfully." })
      
  } catch (error) {
      return res.json({ success: false, message:error})
  }
}

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body.userData
    if (!email || !password)
      return res.json({ success: false, message: "Fill all Fields" });
    const user = await userModel.findOne({ email });
    if (!user) return res.json({ success: false, message: "User not Found" });

    const isPasswordRight = await bcrypt.compare(password, user.password);
   
    if (isPasswordRight) {
    
      const userObject = {
        name: user.name,
        email: user.email,
        role: user.pic,
        _id: user._id,
      };
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
      return res.json({
        success: true,
        message: "Login Successfull",
        user: userObject,
        token: token,
      });
    }
    return res.status(404).json({ success: false, message: "Password is wrong" });
  } catch (error) {
    return res.json({ success: false, message: error });
  }
};

export const allUsers=async(req,res)=>{
  try{
  const keyword=req.query.search ? {
  $or:[
    {name:{$regex:req.query.search,$options:"i"}},
    {email:{$regex:req.query.search,$options:"i"}},
  ]
  }:{}
  const users=await userModel.find(keyword).find({_id:{$ne:req.user._id}})
  res.send(users)
  }
  catch (error) {
    return res.json({ success: false, message: error });
  }
}