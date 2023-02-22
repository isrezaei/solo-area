import {createMiddlewareSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'



export async function middleware(req , res) {

    // Create authenticated Supabase Client.
    const supabase = createMiddlewareSupabaseClient({ req, res } , {
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })


    // Check if we have a session
    const {data: { session } , error} = await supabase.auth.getSession()



    const {data : USERS } = await supabase
        .from("USERS")
        .select('username , id , FAVOURITE_ARTISTS(*) ').eq('id' , session.user.id)


    // console.log(USERS?.[0]?.FAVOURITE_ARTISTS.favourite_artists.length)
    // if (USERS?.[0]?.FAVOURITE_ARTISTS?.favourite_artists.length)
    // {
    //     return NextResponse.redirect(new URL('/', req.url))
    // }



    // Check auth condition
    if (session?.user.email) {
        // Authentication successful, forward request to protected route.
        return NextResponse.next('/')
    }


    // Auth condition not met, redirect to home page.
    if (!session?.user.email)
    {
        return NextResponse.redirect(new URL('/login_signup' , req.url))
    }







}

export const config = {
    matcher: ['/' , '/pickFavouriteArtists' ,'/artist/:path*' , '/new-releases-albums/:path*'],
}