"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_js_1 = __importDefault(require("./config/db.js"));
const chat_js_1 = __importDefault(require("./routes/chat.js"));
dotenv_1.default.config();
const app = (0, express_1.default)();
(0, db_js_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/chat", chat_js_1.default);
app.listen(process.env.PORT, () => {
    console.log(`Chat service is running on port ${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map