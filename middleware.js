import {createMiddlewareSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'



export async function middleware(req , res) {

    const supabase = createMiddlewareSupabaseClient({ req, res } , {
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })


    const {data: { session } , error} = await supabase.auth.getSession()

    let { data: FAVOURITE_ARTISTS } = await supabase
        .from('FAVOURITE_ARTISTS')
        .select('id').eq("id" , session.user.id)


    console.log(error)

    switch (true) {
        case session.user.email :
        default :
            return NextResponse.next('/')
        case !session.user.email :
            return NextResponse.redirect(new URL('/login_signup' , req.url))
    }
}

export const config = {
    matcher: ['/' , '/pickFavouriteArtists' ,'/artist/:path*' , '/new-releases-albums/:path*'],
}