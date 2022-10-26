import { NextResponse } from 'next/server'
import {getToken} from "next-auth/jwt";

export async function middleware(request) {

    const {pathname} = req.nextUrl

    const Token = await getToken({request , secret : process.env.SPOTIFY_CLIENT_SECRET})

    console.log(pathname)

    if (Token && pathname !== '/login')
    {
        return NextResponse.redirect(new URL('/', request.url))
    }

    if (!Token && pathname === 'pages/login')
    {
        return NextResponse.redirect(new URL('pages/login', request.url))
    }

}


export const config = {
    matcher: '/login',
}