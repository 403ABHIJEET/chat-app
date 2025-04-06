import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userSignUpSchema } from '@/schemas/userSchema';
import axios, { AxiosError } from 'axios';
import { useDebounceCallback } from 'usehooks-ts';
import { ApiResponse } from '@/types/apiResponse';
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export default function SignUp() {

    const [username, setUsername] = useState<string>('')
    const [usernameMessage, setUsernameMessage] = useState<string>('')
    const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false)
    const debounced = useDebounceCallback(setUsername, 500)
    const router = useRouter()

    const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof userSignUpSchema>>({
        resolver: zodResolver(userSignUpSchema),
        defaultValues: {
            name: '',
            email: '',
            username: '',
            password: '',
            confirmPassword: ''
        }
    });

    useEffect(() => {
        const checkUsernameUnique = async () => {
            if (!username) {
                setUsernameMessage('')
                return
            }
            if (username) {
                setIsCheckingUsername(true);
                setUsernameMessage('');
                try {
                    const response = await axios.get<ApiResponse>(`/api/check-username-unique?username=${username}`);
                    setUsernameMessage(response?.data?.message);
                } catch (error) {
                    const axiosError = error as AxiosError<ApiResponse>
                    let message = axiosError.response?.data.message ?? 'Error while checking username'
                    setUsernameMessage(message);
                } finally {
                    setIsCheckingUsername(false);
                }
            }
        };
        checkUsernameUnique();
    }, [username]);

    const onSubmit = async (data: z.infer<typeof userSignUpSchema>) => {
        try {
            const response = await axios.post<ApiResponse>('/api/user', data)
            if (response.data.success) {
                router.replace("/login")
            }
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <Card className="w-96 shadow-lg">
            <CardContent className="p-8">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4 flex flex-col gap-1">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            {...register('name')}
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            {...register('email')}
                            placeholder="Enter your email"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <Label htmlFor="username">Username</Label>
                        <Input
                            id="username"
                            {...register('username')}
                            placeholder="Enter your username"
                            onChange={(e) => debounced(e.target.value)}
                        />
                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                        {!isCheckingUsername && (
                            <p className={`text-sm ${usernameMessage === "username is available" ? "text-green-500" : "text-red-500"}`}>
                                {usernameMessage}
                            </p>
                        )}
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            type="password"
                            id="password"
                            {...register('password')}
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>

                    <div className="mb-4 flex flex-col gap-1">
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                            type="password"
                            id="confirmPassword"
                            {...register('confirmPassword')}
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>

                    <Button type="submit" className="w-full">
                        Sign Up
                    </Button>
                </form>
            </CardContent>
        </Card>
    )
};
