'use client'
import { Message } from "@/models/messageModel"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import axios from "axios"
import { ApiResponse } from "@/types/apiResponse"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Friend } from "@/models/firendModel"
import { User } from "@/models/userModel"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatare } from "@/components/Avatar"
import Image from "next/image"

const Page = () => {

    const { data: session, status } = useSession()
    const [friends, setFriends] = useState<Friend[]>([])
    const [messages, setMessages] = useState<Message[]>([])
    const [fetching, setFetching] = useState<boolean>(false)

    const fetchUsers = async () => {
        setFetching(true)
        try {
            const userId = session?.user._id
            const response = await axios.get<ApiResponse>(`/api/user?id=${userId}`)
            const user: User = response.data.data
            setFriends(user.friends)
            setFriends(friends)
        } catch (error) {
            console.log(error);
        } finally {
            setFetching(false)
        }
    }

    useEffect(() => {
        if (status != 'loading') {
            fetchUsers()
        }
    }, [status])

    return (
        <div className="h-screen p-20 pt-0 pb-25">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    {
                        fetching ? (
                            <Skeleton />
                        ) : (
                            friends.map((friend: Friend, idx: number) => (
                                <button key={idx}>
                                    <Avatare src={`https://i.pravatar.cc/150?img=${idx}`} alt="avatar" />
                                    <div>
                                        <div>{friend.username}</div>
                                        <div>{friend.name}</div>
                                    </div>
                                </button>
                            ))
                        )
                    }
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    {
                        messages.length > 0 ? (
                            messages.map((message: Message, idx: number) => (
                                <div key={idx}>
                                    {message.content}
                                </div>
                            ))
                        ) : (
                            <div className="flex justify-center items-center h-full">
                                <Image src="https://static.whatsapp.net/rsrc.php/v4/y6/r/wa669aeJeom.png" alt="" width={500} height={500} />
                            </div>
                        )
                    }
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}

export default Page