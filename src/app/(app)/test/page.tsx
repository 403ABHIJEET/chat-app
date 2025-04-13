'use client'
import ThemeToggle from "@/components/ThemeToggle"
import { toast } from "sonner"

const Page = () => {
    return (
        <div>
            <button onClick={() => toast.error("Someting went wrong")} >error</button>
            <button onClick={() => toast.success("everything is okay")} >success</button>
        </div>
    )
}

export default Page