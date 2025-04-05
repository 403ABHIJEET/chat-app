import { NextRequest, NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })
    const url = request.nextUrl

    console.log('🧪 Middleware triggered:', url.pathname);
    console.log('🔐 Token:', token);


    const isAuthPage = url.pathname.startsWith('/login') || url.pathname.startsWith('/sign-up')

    if (token && isAuthPage) {
        return NextResponse.redirect(new URL('/chat', request.url))
    }

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/login',
        '/sign-up',
        '/chat/:path*',
    ],
}
