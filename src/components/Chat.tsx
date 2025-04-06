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
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";

export default function Chat() {

    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value);
    };
    
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

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
        <div className="h-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="h-[40rem] px-4 mt-5">
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={handleChange}
                            onSubmit={onSubmit}
                        />
                    </div>
                    <div>
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
                    </div>
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
                                <Image src="/chat.png" alt="" width={500} height={500} className="bg-cover w-full h-full" />
                            </div>
                        )
                    }
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}