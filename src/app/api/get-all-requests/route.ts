import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextResponse } from "next/server";

export async function GET() {
    await dbConnect()

    try {
        const result = await UserModel.find({approved: false})
        return NextResponse.json({
            success: true,
            message: "Requests fetched successfully.",
            data: result
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong, try again later."
        }, {status: 500})
    }
}