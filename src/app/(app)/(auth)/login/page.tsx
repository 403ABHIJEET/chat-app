'use client'
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import { useState } from "react";

const Page = () => {

    const [isLogin, seIsLogin] = useState(true)

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            {
                isLogin ? (
                    <Login />
                ) : (
                    <SignUp />
                )
            }
        </div>
    )
};

export default Page;
