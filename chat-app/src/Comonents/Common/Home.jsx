import { Box, Button } from '@chakra-ui/react'
import React from 'react'
import { ChatState } from '../../Context/chatProvider'

const Home = () => {
  const{user}=ChatState()
  console.log(user,"ues")
  return (
    <div>
      <Box bg='tomato' w='100%' p={4} color='white'>
  {/* <h1>{user?.name}</h1> */}
</Box>
      <Button colorScheme='blue'>Home</Button>
    </div>
  )
}

export default Home
