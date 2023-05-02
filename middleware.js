import {createMiddlewareSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'



export async function middleware(req ) {

    const res = NextResponse.next()


    // Create authenticated Supabase Client.
    const supabase = createMiddlewareSupabaseClient({ req , res } , {
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })

    const {data: { session } , error} = await supabase.auth.getSession()

    if (session?.user.email) {
        return NextResponse.next('/')
    }

    if (session?.user.email) {
        return res
    }


    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login_signup'
    redirectUrl.searchParams.set(`redirectedFrom`, req.nextUrl.pathname)
    return NextResponse.redirect(redirectUrl)

}

export const config = {
    matcher: ['/' , '/pickFavouriteArtists' ,'/artist/:path*' , '/new-releases-albums/:path*'],
}


// if (!session?.user.email)
// {
//     return NextResponse.redirect(new URL('/login_signup' , req.url))
// }
