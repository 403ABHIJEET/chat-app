import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

interface props {
    src: string,
    alt?: string
}

export function Avatare({src, alt}: props) {
    return (
        <Avatar>
            <AvatarImage src={src} alt={alt ?? "@shadcn"} />
            <AvatarFallback>CN</AvatarFallback>
        </Avatar>
    )
}
