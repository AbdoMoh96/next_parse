import { NextResponse } from 'next/server'
import { getToken } from 'next-auth/jwt';
import app from "@/config/app";

export async function middleware(request: any) {
    const session = await getToken({ req: request, secret: app.nextAuthSecret });

    if (!session && request.nextUrl.pathname === '/signup') {
        return NextResponse.next();
    }

    if (!session && request.nextUrl.pathname !== '/login') {
        return NextResponse.redirect(new URL("/login", request.url));
    }
    // can't go to the login page if the user is already logged in
    else if ((session && request.nextUrl.pathname === '/login') ||  request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/todos', request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}


/*
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
    return NextResponse.redirect(new URL('/login', request.url));
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: '/',
}*/
