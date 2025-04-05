import { Loader2 } from "lucide-react"

const Loading = () => {
    return (
        <div className="h-screen flex justify-center items-center">
            <Loader2 className="w-10 h-10 text-gray-600 animate-spin" />
        </div>
    )
}

export default Loading
