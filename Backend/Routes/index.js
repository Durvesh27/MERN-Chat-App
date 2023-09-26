import express from 'express'
import chatRoutes from '../Routes/chatRoutes.js'
import userRoutes from '../Routes/userRoutes.js'
import messageRoutes from '../Routes/messageRoutes.js'


const router = express.Router();
router.use('/user', userRoutes)
router.use('/chat', chatRoutes)
router.use('/message', messageRoutes)
export default router;

