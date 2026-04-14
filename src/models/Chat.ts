import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChat extends Document {
    users: string[];
    latesMessage: {
        text: string,
        sender: string,
    };
    createdAt: Date,
    updatedAt: Date,
}

const chatSchema: Schema<IChat> = new Schema({
    users: [{ type: String, require: true }],
    latesMessage: {
        text: { type: String, require: true },
        sender: { type: String, require: true },
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

const Chat: Model<IChat> = mongoose.model<IChat>('Chat', chatSchema);

export default Chat;