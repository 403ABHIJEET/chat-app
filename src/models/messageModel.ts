import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document {
    sender: string
    receiver: string
    content: string,
    createdAt: Date
}

export const MessageSchema: Schema<Message> = new Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
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

const MessageModel = (mongoose.models.Message as mongoose.Model<Message>) || mongoose.model<Message>("Message", MessageSchema)

export default MessageModel