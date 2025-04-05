import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    await dbConnect()

    try {
        const url = new URL(request.url);
        const username = url.searchParams.get('username');
        const user = await UserModel.findOne({ username: username})
        if(user) {
            user.approved = true
            user.save()
        }
        return NextResponse.json({
            success: true,
            message: "User deleted successfully."
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong, try again later."
        }, {status: 500})
    }
}