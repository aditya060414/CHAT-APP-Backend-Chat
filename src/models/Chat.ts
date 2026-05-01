import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChat extends Document {
  users: string[];
  latestMessage: {
    text: string;
    sender: string;
  };
}

const chatSchema: Schema<IChat> = new Schema(
  {
    users: [{ type: String, required: true }],
    latestMessage: {
      text: { type: String, required: true },
      sender: { type: String, required: true },
    },
  },
  { timestamps: true },
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
