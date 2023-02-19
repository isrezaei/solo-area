import {Box} from "@chakra-ui/react";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {Button} from "@supabase/ui";
import {useRouter} from "next/router";
import {useEffect} from "react";
import {useAsync} from "react-use";
import _ from 'lodash'


export default function Login_signup ()
{

    const user = useUser()
    const router = useRouter()
    const supabase = useSupabaseClient()

    useAsync(async () => {

        const { data : ALREADY_EXIST_USERS , error } = await supabase
            .from('USERS')
            .select(`email`)

        if (user){

            const checkRouter = !!_.find(ALREADY_EXIST_USERS , {email : user?.email})

            //? IF USER ALREADY EXIST IN USERS COLUMN IN SUPABASE GO TO HOME
            if (checkRouter) return  router.push('/')
            //! IF USER NOT EXIST IN USERS COLUMN IN SUPABASE GO TO MANAGE ACCOUNT
            if (!checkRouter) return router.push('/manage_account')
        }




    } , [user] )


    if (user) return null

    return (
        <Box  m={"auto"} maxW={'sm'} p={5}  h={'auto'} bg={'whiteAlpha.100'}>
            <Auth
                providers={['google', 'facebook', 'twitter']}
                socialLayout="horizontal"
                supabaseClient={supabase}
                appearance={{
                    theme : ThemeSupa,
                    style : {
                        button : {color: 'white' },
                    }
                }}
                theme="dark"
            />
        </Box>
    )
}