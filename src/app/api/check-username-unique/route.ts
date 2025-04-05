import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect()

    try {
        const {searchParams} = new URL(request.url)
        const queryParam = {
            username: searchParams.get('username')
        }
        const username = queryParam.username
        const existUsername = await UserModel.findOne({
            username: username
        })
        if(existUsername) {
            return NextResponse.json({
                sccess: true,
                message: 'username already exist'
            }, {status: 201})
        } else {
            return NextResponse.json({
                success: true,
                message: 'username is available'
            }, {status: 200})
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: 'something went wrong'
        }, {status: 500})
    }
}