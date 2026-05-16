"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const socket_io_1 = require("socket.io");
const http_1 = __importDefault(require("http"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
exports.app = app;
const server = http_1.default.createServer(app);
exports.server = server;
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});
exports.io = io;
const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("User connected: ", socket.id);
    console.log("query: ", socket.handshake.query);
    const userId = socket.handshake.query.userId;
    if (userId && userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} mapped to socket ${socket.id}`);
    }
    console.log("Current online users:", Object.keys(userSocketMap));
    io.emit("getOnlineUser", Object.keys(userSocketMap));
    if (userId) {
        socket.join(userId);
    }
    socket.on("typing", (data) => {
        console.log(`User ${data.userId} is typing in chat ${data.chatId}`);
        socket.to(data.chatId).emit("userTyping", {
            chatId: data.chatId,
            userId: data.userId,
        });
    });
    socket.on("stopTyping", (data) => {
        console.log(`User ${data.userId} stopped typing ${data.chatId}`);
        socket.to(data.chatId).emit("userStoppedTyping", {
            chatId: data.chatId,
            userId: data.userId,
        });
    });
    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
        console.log(`User ${userId} joined the chat room ${chatId}`);
    });
    socket.on("leaveChat", (chatId) => {
        socket.leave(chatId);
        console.log(`User ${userId} left the chat room ${chatId}`);
    });
    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        if (userId && userId !== "undefined") {
            delete userSocketMap[userId];
            console.log(`User ${userId} removed from online users`);
            console.log("Current online users after disconnect:", Object.keys(userSocketMap));
            io.emit("getOnlineUser", Object.keys(userSocketMap));
        }
    });
    socket.on("connect_error", (error) => {
        console.log("Socket connection Error, ", error);
    });
});
//# sourceMappingURL=socket.js.map