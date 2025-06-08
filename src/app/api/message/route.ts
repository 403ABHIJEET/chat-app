import dbConnect from "@/lib/dbConnect";
import MessageModel from "@/models/messageModel";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect()
    try {
        const { searchParams } = new URL(request.url)
        const queryParams = {
            sender: searchParams.get('sender'),
            reciever: searchParams.get('reciever')
        }
        const sender = queryParams.sender
        const receiver = queryParams.reciever
        console.log(sender, receiver)
        const result = await MessageModel.find({
            $or: [
                {
                    $and: [
                        { sender: sender },
                        { receiver: receiver }
                    ]
                },
                {
                    $and: [
                        { sender: receiver },
                        { receiver: sender }
                    ]
                }
            ]
        });
        return NextResponse.json({
            success: true,
            message: "Messages fetched successfully.",
            data: result
        }, {status: 200})
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
        }, {status: 500})
    }
}

export async function POST(request: NextRequest) {
    await dbConnect()
    try {
        const {message, sender, receiver} = await request.json()
        const newMessage = new MessageModel({
            content: message,
            sender: sender,
            receiver: receiver
        })
        await newMessage.save()
        return NextResponse.json({
            success: true,
            message: "Message saved successfully."
        }, {status: 200})
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "something went wrong."
        }, {status: 500})
    }
}