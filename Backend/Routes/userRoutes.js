import express from 'express'
import { Login, Register, allUsers } from '../Controllers/userController.js'
import { protect } from '../Middlewares/authMiddleware.js'
const router=express.Router()

router.route("/login").post(Login)
router.route("/").post(Register).get(protect,allUsers)

export default router