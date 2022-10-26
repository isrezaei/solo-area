import { NextResponse } from 'next/server'
import {getToken} from "next-auth/jwt";

export async function middleware(req) {

    const {pathname} = req.nextUrl

    const token = await getToken({req , secret : process.env.JWT_SECRET})

    console.log(token)

    if (pathname.includes('/api/auth') || token)
    {
        return NextResponse.next()
    }
    if (!token && pathname !== '/login')
    {
        return NextResponse.redirect(new URL('/login', req.url))
    }

}


export const config = {
    matcher: '/',
}
