import { NextResponse } from 'next/server';
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

    else if ((session && request.nextUrl.pathname === '/login') ||
        (session && request.nextUrl.pathname === '/signup') ||
        request.nextUrl.pathname === '/') {
        return NextResponse.redirect(new URL('/todos/create', request.url));
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}
