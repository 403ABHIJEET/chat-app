import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    sender: string
    reciever: string
    content: string,
    createdAt: Date
}

export const MessageSchema: Schema<Message> = new Schema({
    sender: {
        type: String,
        required: true
    },
    reciever: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now()
    }
})

const MessageModel = (mongoose.models.User as mongoose.Model<Message>) || mongoose.model<Message>("User", MessageSchema)

export default MessageModel