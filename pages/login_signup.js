import {Box, Image, Img, VStack} from "@chakra-ui/react";
import {Auth, ThemeSupa} from "@supabase/auth-ui-react";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import {useAsync} from "react-use";
import _ from 'lodash'
import {useEffect} from "react";

export default function Login_signup ()
{

    const user = useUser()
    const router = useRouter()
    const supabase = useSupabaseClient()

    console.log(user)


    useAsync(async () => {

        let { data: FAVOURITE_ARTISTS, error } = await supabase
            .from('FAVOURITE_ARTISTS')
            .select('id').eq("id" , user.id)

        if (user)
        {
            if (FAVOURITE_ARTISTS.length === 0 )
            {
                return router.push("/pickFavouriteArtists")
            }
            if (FAVOURITE_ARTISTS.length > 0)
            {
               return router.push("/")
            }
        }

    } , [user] )

    if (user) return null

    return (
        <VStack w={"full"} justify={"center"} m={"auto"} maxW={'sm'} p={5}  h={'100vh'}   position={'relative'}>
            <Box w={"full"} zIndex={1000}>
                <Auth
                    onClick={()=> router.push('/')}
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