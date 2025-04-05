'use client'
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Page = () => {

    const router = useRouter()
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e: any) => {
        e.preventDefault()
        const result = await signIn('credentials', {
            redirect: false,
            identifier: identifier,
            password: password
        })
        if (result?.error) {
           
        }
        else if (result?.url) {
            router.replace(`/chat`);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleLogin}
                className="bg-white p-6 rounded-2xl shadow-md w-96"
            >
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        placeholder="Email or Username"
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4 relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                </div>
                <button type="submit" className="w-full">Login</button>
            </form>
        </div>
    );
};

export default Page;
