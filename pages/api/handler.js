// Creating a new supabase server useclient object (e.g. in API route):
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'


export default async (req , res) => {

    const supabaseServerClient = createServerSupabaseClient( {req , res} ,{
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })


    const {data: { user } , error} = await supabaseServerClient.auth.getUser()



    res.status(200).json(user)
}