import express from 'express'
import { accesschat, createGroupChat, fetchChats } from '../Controllers/chatControllers.js'
import { protect } from '../Middlewares/authMiddleware.js'

const router=express.Router()
router.route("/").post(protect,accesschat)
router.route("/").get(protect,fetchChats)
router.route("/group").post(protect,createGroupChat);
// router.route("/group-remove").put(protect,renameGroup);
// router.route("/group-add").put(protect,addToGroup);

export default router