import React from 'react'
import { ChatState } from '../../Context/chatProvider'
import { Box } from '@chakra-ui/react'
import SideDrawer from '../Miscelloneos/SideDrawer'
import ChatBox from '../Miscelloneos/ChatBox'
import MyChats from '../Miscelloneos/MyChats'

const ChatSection = () => {
const{user}=ChatState()
  return (
    <div style={{width:"100%"}}>
      {
        user && <SideDrawer/>
      }
      <Box display="flex" justifyContent="space-between" w="100%" h="91.5vh" p="10px">
        {user && <MyChats/>}
        {user && <ChatBox/>}
      </Box>
    </div>
  )
}

export default ChatSection