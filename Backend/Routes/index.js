import express from 'express'
import chatRoutes from '../Routes/chatRoutes.js'
import userRoutes from '../Routes/userRoutes.js'

const router = express.Router();
router.use('/user', userRoutes)
router.use('/chat', chatRoutes)
export default router;