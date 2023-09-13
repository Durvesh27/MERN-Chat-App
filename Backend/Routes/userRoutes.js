import express from 'express'
import { Login, Register, allUsers, getCurrentUser } from '../Controllers/userController.js'
import { protect } from '../Middlewares/authMiddleware.js'
const router=express.Router()
router.post('/register',Register)
router.route("/login").post(Login)
router.route("/get-current-user").post(getCurrentUser)
router.route("/").get(protect,allUsers)

export default router