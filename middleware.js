import { createMiddlewareSupabaseClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'


export async function middleware(req , res) {
    // We need to create a response and hand it to the supabase client to be able to modify the response headers.


    // Create authenticated Supabase Client.
    const supabase = createMiddlewareSupabaseClient({ req, res } , {
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })

    // Check if we have a session
    const {data: { session } , error} = await supabase.auth.getSession()

    console.log(session)

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
    matcher: '/',
}