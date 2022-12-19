import {useSession , signIn} from "next-auth/react";
import {useEffect, useLayoutEffect} from "react";
import spotifyApi from "../lib/SpotifyWebApi";
import {FETCH_ACCESS_TOKEN} from "../lib/FetcherFuncs/FETCH_ACCESS_TOKEN";
import useSWR from "swr";


export default function useSpotify ()
{
    const {data : GET_ACCESS_TOKEN} = useSWR('GET ACCESS TOKEN' , ()=> (FETCH_ACCESS_TOKEN()))




    useEffect(()=> {

        if (GET_ACCESS_TOKEN)
        {
            spotifyApi.setAccessToken(GET_ACCESS_TOKEN.access_token)
        }
    } , [GET_ACCESS_TOKEN])

    return spotifyApi
}