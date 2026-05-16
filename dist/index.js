"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const chat_js_1 = __importDefault(require("./routes/chat.js"));
const cors_1 = __importDefault(require("cors"));
const socket_js_1 = require("./config/socket.js");
dotenv_1.default.config();
(0, db_js_1.default)();
socket_js_1.app.use(express_1.default.json());
socket_js_1.app.use((0, cors_1.default)({
    origin: "http://localhost:5173",
    credentials: true,
}));
socket_js_1.app.get("/", (req, res) => {
    res.send("Backend running");
});
socket_js_1.app.use("/api/v1/chat", chat_js_1.default);
socket_js_1.server.listen(process.env.PORT, () => {
    console.log(`Chat service is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map