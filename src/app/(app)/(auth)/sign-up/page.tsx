'use client'
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { userSignUpSchema } from '@/schemas/userSchema';
import axios, { AxiosError } from 'axios';
import { useDebounceCallback } from 'usehooks-ts';
import { ApiResponse } from '@/types/apiResponse';
import { Loader2 } from 'lucide-react'

const Page = () => {

    const [username, setUsername] = useState<string>('')
    const [usernameMessage, setUsernameMessage] = useState<string>('')
    const [isCheckingUsername, setIsCheckingUsername] = useState<boolean>(false)
    const debounced = useDebounceCallback(setUsername, 500)

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
            if(!username) {
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

    const onSubmit = async (data: any) => {
        try {
            await axios.post<ApiResponse>('/api/sign-up', data)
        } catch (error) {
            console.error('Error creating user:', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-96">
                <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            {...register('name')}
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="text"
                            {...register('email')}
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your name"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            {...register('username')}
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your username"
                            onChange={(e: any) => {
                                debounced(e.target.value)
                            }}
                        />
                        {isCheckingUsername && <Loader2 className="animate-spin" />}
                        {!isCheckingUsername && (
                            <p className={`text-sm ${usernameMessage == "username is available" ? 'text-green-500' : 'text-red-500'}`}>
                                {usernameMessage}
                            </p>
                        )}
                        {errors.username && <p className="text-red-500 text-sm">{errors.username.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            {...register('password')}
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                        {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            {...register('confirmPassword')}
                            className="w-full p-2 border border-gray-300 rounded mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Confirm your password"
                        />
                        {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                    >
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Page;

