import { Document, Model } from "mongoose";
export interface IChat extends Document {
    users: string[];
    latestMessage: {
        text: string;
        sender: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
declare const Chat: Model<IChat>;
export default Chat;
//# sourceMappingURL=Chat.d.ts.map