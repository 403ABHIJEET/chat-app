"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { User } from "@/models/userModel";

interface props {
    users: User[]
    userClicked: (username: string) => void
}

export function ExpandableCardDemo({ users, userClicked }: props) {

    const [active, setActive] = useState<(typeof users)[number] | boolean | null>(
        null
    );

    const [activeUser, setActiveUser] = useState<string>('')

    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0  grid place-items-center z-[100]">
                        <motion.button
                            key={`button-${active.username}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.username}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.username}-${id}`}>
                                <Image
                                    priority
                                    width={200}
                                    height={200}
                                    src={active.profile ?? "/profile.jpg"}
                                    alt={active.name}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.username}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.name}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.username}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.username}
                                        </motion.p>
                                    </div>

                                    <motion.a
                                        layoutId={`button-${active.username}-${id}`}
                                        href={`/chat/profile/${active._id}`}
                                        className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                                    >
                                        Profile
                                    </motion.a>
                                </div>
                                <div className="pt-4 relative px-4">
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                                    >
                                        {active.bio ?? 'Bio'}
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <div className="flex-1 overflow-y-auto space-y-2 max-h-[calc(100vh-200px)] px-4">
                {users.map((user, index) => (
                    <motion.div
                        layoutId={`card-${user.username}-${id}`}
                        key={`card-${user.username}-${id}`}
                        className={`p-4 flex flex-col md:flex-row justify-between items-center rounded-xl cursor-pointer            transition-all duration-300
                                ${activeUser === user.username
                                ? "bg-green-100 dark:bg-green-900"
                                : "hover:bg-neutral-50 dark:hover:bg-neutral-800"}`}
                        onClick={() => {
                            userClicked(user.username)
                            setActiveUser(user.username)
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="flex gap-4 flex-col md:flex-row w-full items-center md:items-start">
                            <motion.div layoutId={`image-${user.username}-${id}`}>
                                <Image
                                    width={100}
                                    height={100}
                                    src={
                                        user.profile ??
                                        `https://raw.githubusercontent.com/Ashwinvalento/cartoon-avatar/master/lib/images/male/${index + 1}.png`
                                    }
                                    alt={user.username}
                                    className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                                />
                            </motion.div>
                            <div className="flex-1 text-center md:text-left">
                                <motion.h3
                                    layoutId={`title-${user.username}-${id}`}
                                    className="font-medium text-neutral-800 dark:text-neutral-200"
                                >
                                    {user.name}
                                </motion.h3>
                                <motion.p
                                    layoutId={`description-${user.username}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-400"
                                >
                                    @{user.username}
                                </motion.p>
                            </div>
                        </div>
                        <motion.button
                            layoutId={`button-${user.username}-${id}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                setActive(user);
                            }}
                            className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-green-500 hover:text-white text-black mt-4 md:mt-0"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Profile
                        </motion.button>
                    </motion.div>
                ))}
            </div>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};

