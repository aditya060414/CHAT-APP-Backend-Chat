"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMessageByChat = exports.sendMessage = exports.getAllChats = exports.CreateNewChat = void 0;
const TryCatchBlock_1 = __importDefault(require("../config/TryCatchBlock"));
const Chat_js_1 = __importDefault(require("../models/Chat.js"));
const Messages_1 = require("../models/Messages");
const axios_1 = __importDefault(require("axios"));
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
        const unseenCount = await Messages_1.Messages.countDocuments({
            chatId: chat._id,
            sender: { $ne: userId },
            seen: false,
        });
        try {
            const { data } = await axios_1.default.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`);
            return {
                user: data,
                chat: {
                    ...chat.toObject(),
                    latestMessage: chat.latestMessage || null,
                    unseenCount,
                }
            };
        }
        catch (error) {
            console.log(error);
            return {
                user: { id: otherUserId, name: "Unknown" },
                ...chat.toObject(),
                latestMessage: chat.latestMessage || null,
                unseenCount,
            };
        }
    }));
    res.status(200).json({
        chats: chatWithUserData,
    });
});
exports.sendMessage = (0, TryCatchBlock_1.default)(async (req, res) => {
    const senderId = req.user?._id;
    const { chatId, text } = req.body;
    const imageFile = req.file;
    if (!senderId) {
        res.status(401).json({
            messages: "Unauthorized request"
        });
        return;
    }
    if (!chatId) {
        res.status(400).json({
            message: "Id missing."
        });
        return;
    }
    if (!text && !imageFile) {
        res.status(400).json({
            message: "Missing data."
        });
        return;
    }
    const chat = await Chat_js_1.default.findById(chatId);
    if (!chat) {
        res.status(404).json({
            message: "Chat not found."
        });
        return;
    }
    const isUserInChat = chat.users.some((userId) => userId.toString() === senderId.toString());
    if (!isUserInChat) {
        res.status(403).json({
            message: "Unauthorized request"
        });
        return;
    }
    const otherUserId = chat.users.find((userId) => userId.toString() !== senderId.toString());
    if (!otherUserId) {
        res.status(401).json({
            messages: "Unauthorized request"
        });
        return;
    }
    // socket setup
    let messageData = {
        chatId: chatId,
        sender: senderId,
        seen: false,
        seenAt: undefined,
    };
    if (imageFile) {
        messageData.image = {
            url: imageFile.path,
            publicId: imageFile.filename,
        };
        messageData.messageType = "image";
        messageData.text = text || " ";
    }
    else {
        messageData.text = text;
        messageData.messageType = "text";
    }
    const message = new Messages_1.Messages(messageData);
    const savedMessage = await message.save();
    const latestMessageText = imageFile ? "📷" : text;
    await Chat_js_1.default.findByIdAndUpdate(chatId, {
        latestMessage: {
            text: latestMessageText,
            sender: senderId,
        },
        updatedAt: new Date(),
    }, { new: true });
    // emit socket
    res.status(201).json({
        message: savedMessage,
        sender: senderId,
    });
});
exports.getMessageByChat = (0, TryCatchBlock_1.default)(async (req, res) => {
    const userId = req.user?._id;
    const { chatId } = req.params;
    if (!chatId) {
        res.status(400).json({
            message: "Id missing."
        });
        return;
    }
    if (!userId) {
        res.status(401).json({
            message: "Unauthorized Request."
        });
        return;
    }
    const chat = await Chat_js_1.default.findById(chatId);
    if (!chat) {
        res.status(404).json({
            message: "Chat not found."
        });
        return;
    }
    const isUserInChat = chat.users.some((userId) => userId.toString() === userId.toString());
    if (!isUserInChat) {
        res.status(403).json({
            message: "Unauthorized request"
        });
        return;
    }
    const messageMarkToSeen = await Messages_1.Messages.find({
        chatId: chatId,
        sender: { $ne: userId },
        seen: false,
    });
    await Messages_1.Messages.updateMany({
        chatId: chatId,
        sender: { $ne: userId },
        seen: false,
    }, {
        seen: true,
        seenAt: new Date(),
    });
    const messages = await Messages_1.Messages.find({
        chatId: chatId
    }).sort({ createdAt: 1 });
    const otherUserId = chat.users.find((id) => id !== userId);
    try {
        const { data } = await axios_1.default.get(`${process.env.USER_SERVICE}/api/v1/user/${otherUserId}`);
        if (!otherUserId) {
            res.status(401).json({
                message: "Unauthorized request."
            });
            return;
        }
        // socket work
        res.status(201).json({
            messages,
            user: data,
        });
    }
    catch (error) {
        console.log(error);
        res.json({
            messages,
            user: { _id: otherUserId, name: "Unknown" }
        });
    }
});
//# sourceMappingURL=chat.js.map