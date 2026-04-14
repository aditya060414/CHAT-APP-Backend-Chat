import express from 'express'
import { Auth } from '../middlewares/Auth.js';
import { CreateNewChat, getAllChats } from '../controllers/chat.js';
const router = express.Router();

router.post("/new", Auth, CreateNewChat)
router.get("/allChats", Auth, getAllChats)

export default router;