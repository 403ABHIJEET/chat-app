import Link from "next/link";

export default function Navbar() {

    return (
        <nav className="h-20">
            <Link href="/" >LOGO</Link>
            <Link href="/" >Home</Link>
            <Link href={`/chat`} >Chats</Link>
        </nav>
    )
}