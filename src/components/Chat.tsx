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
import { PlaceholdersAndVanishInput } from "@/components/ui/placeholders-and-vanish-input";
import { useDebounceCallback } from 'usehooks-ts';
import { ExpandableCardDemo } from "./ExpandCard"
import SocketChat from "./socket/SocketChat"

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
    const [fetching, setFetching] = useState<boolean>(false)
    const [users, setUsers] = useState<User[]>([])
    const debounced = useDebounceCallback(handleChange, 500)
    const [reciever, setReciever] = useState<string>('')

    const fetchUsers = async () => {
        setFetching(true)
        try {
            const response = await axios.get<ApiResponse>(`/api/user`)
            const data: User[] = response.data.data
            setUsers(data.filter((user) => user.username !== session?.user.username))
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

        <>
            <div className="h-full">
                <ResizablePanelGroup
                    direction="horizontal"
                    className="w-full rounded-lg border"
                >
                    <ResizablePanel defaultSize={50} className="min-w-1/4">
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
                                        <ExpandableCardDemo users={users} userClicked={(RecieverUsername) => setReciever(RecieverUsername)} />
                                    )
                                }
                            </div>
                        </div>
                    </ResizablePanel>
                    <ResizableHandle />
                    <ResizablePanel defaultSize={50} className="min-w-1/4">
                        {
                            reciever ? (
                                <SocketChat userId={session?.user.username} recipientId={reciever} />
                            ) : (
                                'hello bro'
                            )
                        }
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </>
    )
}