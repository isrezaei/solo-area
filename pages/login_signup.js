import {Box, Image, Img, VStack} from "@chakra-ui/react";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";

import {Button} from "@supabase/ui";
import {useRouter} from "next/router";
import {useEffect, useLayoutEffect} from "react";
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
            .select(`id`)

        if (user){
            const checkRouter = _.find(ALREADY_EXIST_USERS , {id : user.id})
            //? IF USER ALREADY EXIST IN USERS COLUMN IN SUPABASE GO TO HOME
            if (checkRouter) return  router.push('/')
            //! IF USER NOT EXIST IN USERS COLUMN IN SUPABASE GO TO MANAGE ACCOUNT
            if (!checkRouter) return router.push('/manage_account')
        }


    } , [user] )




    if (user) return null

    return (
        <VStack justify={"center"} m={"auto"} maxW={'sm'} p={5}  h={'100vh'}   position={'relative'}>
            <Img src={'/gif_1.gif'} objectFit={'cover'} position={"absolute"} w={'full'} h={'85vh'}  zIndex={1} opacity={'30%'}/>

            <Box w={"full"} zIndex={1000}>
                <Auth
                    providers={['google', 'facebook', 'twitter']}
                    socialLayout="horizontal"
                    supabaseClient={supabase}
                    appearance={{
                        theme : ThemeSupa,
                        style : {
                            button : {background : 'rgba(255,255,255,0.13)'},
                            input : {background: 'rgba(255,255,255,0.13)'}
                        }
                    }}
                    theme="dark"
                />
            </Box>


        </VStack>
    )
}