"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Auth_js_1 = require("../middlewares/Auth.js");
const chat_js_1 = require("../controllers/chat.js");
const router = express_1.default.Router();
router.post("/new", Auth_js_1.Auth, chat_js_1.CreateNewChat);
router.get("/allChats", Auth_js_1.Auth, chat_js_1.getAllChats);
exports.default = router;
//# sourceMappingURL=chat.js.map