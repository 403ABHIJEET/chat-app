'use client'
import { Message } from "@/models/messageModel"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Loading from "../loading"
import axios from "axios"
import { ApiResponse } from "@/types/apiResponse"

const Page = () => {

    const { data: session, status } = useSession()
    const [users, setUsers] = useState([])
    const [chats, setChats] = useState<Message[]>([])

    const fetchUsers = async() => {
        try {
            const userId = session?.user.id
            const response = await axios.get<ApiResponse>(`/api/get-usernames?id=${userId}`)
            const usernames = response.data.data
            setUsers(usernames)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    if(status == 'loading') {
        return <Loading />
    }

    return (
        <div>
            <button>Add User</button>
            <div>
                {
                    users.length > 0 ? (
                        users.map((user: any) => (
                            <div>{user.username}</div>
                        ))
                    ) : (
                        <div>No user here</div>
                    )
                }
            </div>
            <div>
                {
                    chats.length > 0 ? (
                        chats.map((chat) => (
                            <div>{chat.content}</div>
                        ))
                    ) : (
                        <div>You didn't talk to this user</div>
                    )
                }
            </div>
        </div>
    )
}

export default Page