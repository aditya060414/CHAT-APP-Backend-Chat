import mongoose, { Document, Schema, Model } from "mongoose";

export interface IChat extends Document {
  users: mongoose.Types.ObjectId[];
  latestMessage?: {
    text?: string;
    sender?: string;
  };
}

const chatSchema: Schema<IChat> = new Schema(
  {
    users: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
    latestMessage: {
      text: { type: String, default: "" },
      sender: { type: String, default: "" },
    },
  },
  { timestamps: true },
);

const Chat: Model<IChat> = mongoose.model<IChat>("Chat", chatSchema);

export default Chat;
