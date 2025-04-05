import { User } from "@/models/userModel";

interface Props {  
    callFunc: (idx: number) => void;  
    userData: User;  
    idx: number
}

export default function RequestCard({ userData, callFunc, idx }: Props) {  

    return (
        <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-sm">
            <div className="grid grid-cols-2 gap-2 text-gray-700">
                <div className="font-semibold">Name:</div>
                <div>{userData.name}</div>

                <div className="font-semibold">Email:</div>
                <div>{userData.email}</div>

                <div className="font-semibold">Username:</div>
                <div>{userData.username}</div>
            </div>
            <div className="mt-4 flex justify-between">
                <button 
                    className="w-full bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
                    onClick={() => callFunc(idx)} 
                >
                    Accept
                </button>
            </div>
        </div>
    );
}
