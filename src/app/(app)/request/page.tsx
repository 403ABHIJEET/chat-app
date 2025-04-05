'use client'
import RequestCard from "@/components/RequestCard";
import { User } from "@/models/userModel"
import { ApiResponse } from "@/types/apiResponse";
import axios from "axios";
import { useEffect, useState } from "react"

const Page = () => {

    const [requests, setRequests] = useState<User[]>([]);

    const fetchRequests = async() => {
        try {
            const resposne = await axios.get<ApiResponse>("/api/get-all-requests")
            setRequests(resposne.data.data)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    const onAccept = async(idx: any) => {
        try {
            const username = requests[idx].username
            await axios.put<ApiResponse>(`/api/accept-request?username=${username}`)
            const newRequests = requests.filter((_, index) => index !== idx)
            setRequests(newRequests)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="flex gap-2 justify-evenly">
            {
                requests.length > 0 ? (
                    requests.map((request, idx: number) => (
                        <RequestCard key={idx} 
                            userData={request} callFunc={onAccept} 
                            idx={idx}
                        />
                    ))
                ) : (
                    <div>There are no request.</div>
                )
            }
        </div>
    )

}

export default Page