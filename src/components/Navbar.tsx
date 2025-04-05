"use client"

import * as React from "react"
import Link from "next/link"
import {
    ListItem,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Avatar from '@mui/material/Avatar'
import { signOut, useSession } from "next-auth/react"
import { Skeleton } from "./ui/skeleton"

export default function Navbar() {

    const { data: session, status } = useSession()

    return (
        <div className="h-20 flex justify-evenly items-center">
            <div className="font-bold text-2xl">
                LOGO
            </div>
            {
                status === 'loading' ? (
                    <Skeleton className="h-12 w-12 rounded-full" />
                ) : session ? (
                    <div className="flex justify-evenly">
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <Link href="/" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            HOME
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <Link href="/chat" legacyBehavior passHref>
                                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                            CHAT
                                        </NavigationMenuLink>
                                    </Link>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                        <NavigationMenu>
                            <NavigationMenuList>
                                <NavigationMenuItem>
                                    <NavigationMenuTrigger>
                                        <Avatar alt="Remy Sharp" src="https://i.pravatar.cc/150?img=4" />
                                    </NavigationMenuTrigger>
                                    <NavigationMenuContent>
                                        <ul>
                                            <ListItem>Profile</ListItem>
                                            <ListItem>
                                                <button onClick={() => signOut({ callbackUrl: "/" })}>
                                                    Logout
                                                </button>
                                            </ListItem>
                                        </ul>
                                    </NavigationMenuContent>
                                </NavigationMenuItem>
                            </NavigationMenuList>
                        </NavigationMenu>
                    </div>
                ) : (
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <Link href="/login" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Login
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <Link href="/sign-up" legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        Sign Up
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                )
            }
        </div>
    )
}