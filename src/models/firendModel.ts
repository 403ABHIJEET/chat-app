import { Schema } from "mongoose";
import { Message, MessageSchema } from "./messageModel";

export interface Friend extends Document {
    username: string,
    name: string,
    messages: Message[]
}

export const FriendShchema: Schema<Friend> = new Schema({
    username: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    messages: [MessageSchema]
})