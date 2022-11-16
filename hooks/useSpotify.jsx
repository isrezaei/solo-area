import {useSession , signIn} from "next-auth/react";
import {useEffect, useLayoutEffect} from "react";
import spotifyApi from "../lib/SpotifyWebApi";


export default function useSpotify ()
{

    const { data : session , status } = useSession()

    console.log(session)

    useEffect(()=> {

        if (session)
        {
            //! IF REFRESH TOKEN IS BROKEN , GO TO SIGN IN AGAIN
            if (session.error === 'RefreshAccessTokenError')
            {
                signIn()
            }

            //? IF EVERY THINGS IS OKY , RETURN TO ME ACCESS TOKEN
            spotifyApi.setAccessToken(session?.accessToken)
        }
    } , [session])

    return spotifyApi
}