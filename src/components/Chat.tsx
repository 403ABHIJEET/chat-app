import { Message } from "@/models/messageModel"
import { useSession } from "next-auth/react"
import { useEffect, useRef, useState } from "react"
import axios from "axios"
import { ApiResponse } from "@/types/apiResponse"
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import { User } from "@/models/userModel"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useDebounceCallback } from 'usehooks-ts';
import { ExpandableCardDemo } from "./ExpandCard"
import { Search, Send } from "lucide-react";

export default function Chat() {

    const placeholders = [
        "What's the first rule of Fight Club?",
        "Who is Tyler Durden?",
        "Where is Andrew Laeddis Hiding?",
        "Write a Javascript method to reverse a string",
        "How to assemble your own PC?",
    ];

    const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.toLowerCase()
        if (value === '') {
            await fetchUsers()
            return
        }
        const searchedUsers = users.filter((user) => {
            const name = user.name.toLowerCase()
            const username = user.username.toLowerCase()
            return name.includes(value) || username.includes(value)
        })
        setUsers(searchedUsers)
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    };

    const { data: session, status } = useSession()
    const [messages, setMessages] = useState<Message[]>([])
    const [fetching, setFetching] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const debounced = useDebounceCallback(handleChange, 500)

    const fetchUsers = async () => {
        setFetching(true)
        try {
            const response = await axios.get<ApiResponse>(`/api/user`)
            const users: User[] = response.data.data
            setUsers(users.filter((user) => user.username !== session?.user.username))
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

    const [input, setInput] = useState<string>("");
    const [search, setSearch] = useState<string>("");
    const bottomRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    const sendMessage = () => {
        if (input.trim() === "") return;
        setInput("");
    };

    return (
        <div className="h-full">
            <ResizablePanelGroup
                direction="horizontal"
                className="w-full rounded-lg border"
            >
                <ResizablePanel defaultSize={50}>
                    <div className="p-4 mt-5">
                        <PlaceholdersAndVanishInput
                            placeholders={placeholders}
                            onChange={debounced}
                            onSubmit={onSubmit}
                        />
                    </div>
                    <div className="">
                        <div >
                            {
                                fetching ? (
                                    <Skeleton />
                                ) : (
                                    <ExpandableCardDemo users={users} />
                                )
                            }
                        </div>
                    </div>
                </ResizablePanel>
                <ResizableHandle />
                <ResizablePanel defaultSize={50}>
                    <div className="w-full h-full shadow-md p-4 bg-white flex flex-col">
                        <div className="mb-2 flex items-center gap-2 px-3 py-2 border rounded-full">
                            <Search className="w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search messages"
                                className="flex-1 outline-none text-sm placeholder-gray-400"
                            />
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2">
                            {messages
                                .filter((msg) => msg.content.toLowerCase().includes(search.toLowerCase()))
                                .map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`max-w-[70%] px-4 py-2 rounded-lg text-sm leading-tight whitespace-pre-line ${msg.sender === session?.user.username
                                            ? "ml-auto bg-blue-500 text-white"
                                            : "bg-gray-200 text-gray-800"
                                            }`}
                                    >
                                        {msg.content}
                                    </div>
                                ))}
                            <div ref={bottomRef} />
                        </div>
                        <div className="flex items-center border rounded-full px-3 py-2 mt-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type a message"
                                className="flex-1 outline-none text-sm placeholder-gray-400"
                            />
                            <button onClick={sendMessage} className="text-gray-500 hover:text-blue-500">
                                <Send className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </ResizablePanel>
            </ResizablePanelGroup>
        </div>
    )
}