'use client'
import Image from 'next/image'

const Page = () => {

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-black p-6">
            <div className="relative flex flex-col sm:flex-row max-w-3xl shadow-lg rounded-xl overflow-hidden bg-white dark:bg-gray-900 transition-colors duration-300">
                <div className="w-full sm:w-1/2 bg-yellow-400 flex items-center justify-center p-4">
                    <Image
                        src="/profile.png"
                        alt="Profile"
                        width={300}
                        height={300}
                        className="rounded-md object-cover"
                    />
                </div>

                <div className="w-full sm:w-1/2 p-6 space-y-4 text-gray-800 dark:text-white">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name Surname</p>
                        <h2 className="text-xl font-semibold">Victoria Davidson</h2>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Position</p>
                        <p className="text-lg font-medium">Project Manager</p>
                    </div>

                    <div className="flex gap-6 text-sm">
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Followers</p>
                            <p>64</p>
                        </div>
                        <div>
                            <p className="text-gray-500 dark:text-gray-400">Following</p>
                            <p>326</p>
                        </div>
                    </div>

                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Team</p>
                        <div className="flex space-x-2 mt-2">
                            {['/team1.png', '/team2.png', '/team3.png', '/team4.png'].map((src, i) => (
                                <Image
                                    key={i}
                                    src={src}
                                    alt={`Team member ${i + 1}`}
                                    width={32}
                                    height={32}
                                    className="rounded-full border border-white dark:border-gray-700"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
