import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { createContext } from "react";
import api from "../Comonents/ApiConfig/index.js";

const ChatContext=createContext()

const ChatProvider=({children})=>{
const[user,setUser]=useState()

useEffect(() => {
    const getCurrentUserData = async () => {
      const token = JSON.parse(localStorage.getItem("ChatToken"));
      if(token){
        try{
          const response = await api.post(
            "/user/get-current-user",
            { token }
          );
          if (response.data.success) {
setUser(response.data.user)
          } 
        }
        catch(error){
          console.log(error)
        }
      }
    };
    getCurrentUserData();
  }, []);


    return (
        <ChatContext.Provider value={{user,setUser}}>
        {children}
        </ChatContext.Provider>
    )
}
export const ChatState=()=>{
return useContext(ChatContext)
}
export default ChatProvider