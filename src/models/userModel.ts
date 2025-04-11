import mongoose, {Schema, Document} from "mongoose";

export interface User extends Document {
    name: string,
    username: string,
    email: string,
    password: string
    profile: string
    bio: string
    createdAt: Date
}

export const UserSchema: Schema<User> = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true
    },
    username: {
        type: String,
        required: [true, "Username is required"],
        trim: true,
        unique: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        match: [/.+\@.+\..+/, "Please use a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    profile: {
        type: String,
    },
    bio: {
        type: String,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel