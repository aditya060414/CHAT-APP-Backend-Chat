import mongoose, { Document, Model } from "mongoose";
export interface IChat extends Document {
    users: mongoose.Types.ObjectId[];
    latestMessage?: {
        text?: string;
        sender?: string;
    };
}
declare const Chat: Model<IChat>;
export default Chat;
//# sourceMappingURL=Chat.d.ts.map