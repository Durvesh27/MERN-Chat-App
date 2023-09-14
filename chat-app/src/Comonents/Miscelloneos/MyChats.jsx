import React, { useState } from 'react'
import { ChatState } from '../../Context/chatProvider';
import toast from 'react-hot-toast';
import api from '../ApiConfig';
import { useEffect } from 'react';
import { Box, Button, Stack,Text } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import ChatLoading from '../Avatar/ChatLoading';
import { getSender } from '../Config/chatLogics.js';
import GroupChatModal from './GroupChatModal';
const MyChats = () => {
  const { user,selectedChat,setSelectedChat,chats,setChats } = ChatState();

  const fetchChats=async()=>{
  try{
  const{data}=await api.get("/chat")
  console.log(data,"chats")
 setChats(data)
  }
  catch(error){
    toast.error(error.message)
  }
  }
  useEffect(()=>{
  fetchChats()
  },[])

  return (
<Box
display={{ base: selectedChat ? "none" : "flex", md: "flex" }}
flexDir="column"
alignItems="center"
p={3}
bg="white"
w={{ base: "100%", md: "31%" }}
borderRadius="lg"
borderWidth="1px"
>
<Box
  pb={3}
  px={3}
  fontSize={{ base: "15px", md: "30px" }}
  fontFamily="Arial"
  display="flex"
  w="100%"
  justifyContent="space-between"
  alignItems="center"
>
My Chats
<GroupChatModal>
<Button
            display="flex"
            fontSize={{ base: "10px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
</GroupChatModal>
</Box>
<Box
  display="flex"
  flexDir="column"
  p={3}
  bg="#F8F8F8"
  w="100%"
  h="100%"
  borderRadius="lg"
  overflowY="hidden"
>
{
  chats? (
  <Stack overflowY='scroll' >
{
  chats?.map((chat)=>(
    <Box
    onClick={() => setSelectedChat(chat)}
    cursor="pointer"
    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
    color={selectedChat === chat ? "white" : "black"}
    px={3}
    py={2}
    borderRadius="lg"
    key={chat._id}
  >

    <Text>
  {!chat.isGroupChat? (
    getSender(user,chat.users)
  ):(chat.chatName)}
    </Text>
    </Box>
  ))
}
  </Stack>
  ):(
    <ChatLoading/>
  )
}
</Box>
</Box>
  )
}

export default MyChats
