import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    await dbConnect()

    try {
        const { name, email, username, password } = await request.json()
        const emailExist = await UserModel.findOne({
            email: email
        })
        if(emailExist) {
            return NextResponse.json({
                success: false,
                message: "This email already registered."
            }, {status: 409})
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = new UserModel({
            name: name,
            email: email,
            username: username,
            password: hashPassword
        })
        await user.save()
        return NextResponse.json({
            success: true,
            message: "User registered successfully."
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong, try again later."
        }, {status: 500})
    }
}

export async function GET(request: NextRequest) {
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            id: searchParams.get('id')
        }
        const userId = queryParam.id
        if(userId) {
            const user = await UserModel.findById(userId)
            return NextResponse.json({
                success: true,
                message: "User fetched successfully.",
                data: user
            }, {status: 200})
        }
        const users = await UserModel.find()
        return NextResponse.json({
            success: true,
            message: "Users fetched successfully.",
            data: users
        }, {status: 201})
    } catch(error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong, try again later"
        }, {status: 500})
    }
}