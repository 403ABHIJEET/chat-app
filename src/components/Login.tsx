import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { toast } from "sonner";

interface props {
    flips: (val: boolean) => void
}

export default function Login({ flips }: props) {

    const router = useRouter()
    const [identifier, setIdentifier] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isLogging, setIsLogging] = useState<boolean>(false)

    const handleLogin = async (e: any) => {
        setIsLogging(true)
        e.preventDefault()
        const result = await signIn('credentials', {
            redirect: false,
            identifier: identifier,
            password: password
        })
        setIsLogging(false)
        if (result?.error) {
            toast.error(result.error)
        } else if (result?.url) {
            toast.success("User login successfully.")
            router.replace(`/chat`);
        }
    };

    return (
        <Card className="w-96 shadow-md rounded-2xl bg-white dark:bg-zinc-900 text-black dark:text-white">
            <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <Input
                            type="text"
                            placeholder="Email or Username"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            required
                            className="bg-white dark:bg-zinc-800 text-black dark:text-white"
                        />
                    </div>

                    <div className="mb-4 relative">
                        <Input
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="pr-10 bg-white dark:bg-zinc-800 text-black dark:text-white"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute inset-y-0 right-3 flex items-center text-gray-500 dark:text-gray-300"
                        >
                            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                    </div>
                    <Button type="submit" className="w-full" disabled={isLogging}>
                        {
                            isLogging ? (
                                <Loader2 className="w-10 h-10 text-gray-600 animate-spin" />
                            ) : (
                                'Login'
                            )
                        }
                    </Button>
                </form>
                <div className="text-center pt-1">
                    New here?
                    <button className="text-blue-500 hover:text-blue-800 dark:hover:text-blue-400"
                        onClick={() => flips(true)}
                    >
                        SignUp
                    </button>
                </div>
            </CardContent>
        </Card>
    )
}
