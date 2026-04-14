import TryCatch from "../config/TryCatchBlock"
import { AuthenticatedRequest } from "../middlewares/Auth"
import Chat from "../models/Chat.js"


export const CreateNewChat = TryCatch(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;
    const { otherUserId } = req.body;

    if (!otherUserId) {
        res.status(400).json({
            message: "Please provide the other user"
        })
        return;
    }

    const existingChat = await Chat.findOne({
        users: { $all: [userId, otherUserId], $size: 2 }
    })

    if (existingChat) {
        res.json({
            message: "Chat already exists",
            chatId: existingChat._id,
        });
        return;
    }
    const newChat = await Chat.create({
        users: [userId, otherUserId]
    });

    res.status(201).json({
        message: "Chat created successfully",
        chatId: newChat._id,
    })
})

export const getAllChats = TryCatch(async (req: AuthenticatedRequest, res) => {
    const userId = req.user?._id;

    if (!userId) {
        res.status(401).json({
            message: "Unauthorized request",
        });
        return;
    }

    const chats = await Chat.find({
        users: userId,
    }).sort({ updatedAt: -1 })
    // .populate("users", "name")

    const chatWithUserData = await Promise.all(
        chats.map(async(chat)=>{
            const otherUserId = chat.users.find((id)=>id !== userId);
        })
    );
    
    res.status(200).json({
        chats,
    })
})