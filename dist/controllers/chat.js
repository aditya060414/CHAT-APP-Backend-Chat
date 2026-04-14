"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllChats = exports.CreateNewChat = void 0;
const TryCatchBlock_1 = __importDefault(require("../config/TryCatchBlock"));
const Chat_js_1 = __importDefault(require("../models/Chat.js"));
exports.CreateNewChat = (0, TryCatchBlock_1.default)(async (req, res) => {
    const userId = req.user?._id;
    const { otherUserId } = req.body;
    if (!otherUserId) {
        res.status(400).json({
            message: "Please provide the other user"
        });
        return;
    }
    const existingChat = await Chat_js_1.default.findOne({
        users: { $all: [userId, otherUserId], $size: 2 }
    });
    if (existingChat) {
        res.json({
            message: "Chat already exists",
            chatId: existingChat._id,
        });
        return;
    }
    const newChat = await Chat_js_1.default.create({
        users: [userId, otherUserId]
    });
    res.status(201).json({
        message: "Chat created successfully",
        chatId: newChat._id,
    });
});
exports.getAllChats = (0, TryCatchBlock_1.default)(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized request",
        });
        return;
    }
    const chats = await Chat_js_1.default.find({
        users: userId,
    }).sort({ updatedAt: -1 });
    // .populate("users", "name")
    const chatWithUserData = await Promise.all(chats.map(async (chat) => {
        const otherUserId = chat.users.find((id) => id !== userId);
    }));
    res.status(200).json({
        chats,
    });
});
//# sourceMappingURL=chat.js.map