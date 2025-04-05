import { NextRequest, NextResponse } from 'next/server'
export { default } from "next-auth/middleware"
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({req: request})
    const url = request.nextUrl
    if(token && (
        url.pathname.startsWith('/login') ||
        url.pathname.startsWith('/sign-up')
    )) {
        return NextResponse.redirect(new URL('/chat', request.url))
    }
    if(!token && url.pathname.startsWith('/chat')) {
        return NextResponse.redirect(new URL('/login', request.url))
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: [
        '/login',
        '/sign-up',
        '/chat/:path*',
        '/requests/:path*'
    ],
}