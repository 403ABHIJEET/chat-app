import {Document, Schema} from "mongoose";

export interface Message extends Document {
    usernames: string[]
    content: string,
    myMessage: boolean,
    createdAt: Date
}

export const MessageSchema: Schema<Message> = new Schema({
    usernames: {
        type: [String],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    myMessage: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})