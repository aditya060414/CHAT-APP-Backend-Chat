import express from 'express'
import { Auth } from '../middlewares/Auth.js';
import { CreateNewChat, getAllChats, getMessageByChat, sendMessage } from '../controllers/chat.js';
import { upload } from '../middlewares/Multer.js';

const router = express.Router();

router.post("/new", Auth, CreateNewChat)
router.get("/allChats", Auth, getAllChats)
router.post("/message", Auth, upload.single('image'), sendMessage)
router.get("/message/:chatId", Auth, getMessageByChat)
export default router;