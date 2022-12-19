import {Link, Flex} from "@chakra-ui/react";

import {useEffect} from "react";
import {LOGIN_TOKEN_ATOM} from "../atoms/atoms";
import {useRecoilState} from "recoil";


export default function Login ()
{
    const AUTH_ENDPOINT = 'https://accounts.spotify.com/authorize'
    const RESPONSE_TYPE = 'token'

    const [token , setLoginToken] = useRecoilState(LOGIN_TOKEN_ATOM)

    useEffect(() => {

        const hash = window.location.hash
        let token = window.localStorage.getItem('token')


        if (!token && hash)
        {
            token = hash.substring(1).split('&').find(elem => elem.startsWith('access_token')).split('=')[1]

            window.location.hash = ''
            window.localStorage.setItem('token' , token)
            // console.log(token)
        }

        setLoginToken(token)



    } , [])



    return (
        <Flex w={'full'} h={'100vh'} align={'center'} justify={'center'} >
                <Link
                    href={`${AUTH_ENDPOINT}?client_id=${process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_BASE_URL}&response_type=${RESPONSE_TYPE}`}>
                    Login with spotify
                </Link>
        </Flex>
    )
}




