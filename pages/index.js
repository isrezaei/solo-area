import {Main} from "../components/root_center/Main";
import  {SWRConfig , unstable_serialize} from "swr";
import {FETCH_NEW_RELEASES_ALBUMS} from "../lib/FetcherFuncs/FETCH_NEW_RELEASES_ALBUMS";
import {FETCH_RECENTLY_PLAYED_TRACK} from "../lib/FetcherFuncs/Fetch_Recently_Played_Track";
import {FETCH_ME} from "../lib/FetcherFuncs/FETCH_ME";
import {FETCH_ARTIST} from "../lib/FetcherFuncs/FETCH_ARTIST";
import {FETCH_RANDOM_ARTIST} from "../lib/FetcherFuncs/FETCH_RANDOM_ARTIST";

import {createServerComponentSupabaseClient, createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {GetSubscribedList} from "../supabase/get/getSubscribedList";
import {getFavouriteArtists} from "../supabase/get/getFavouriteArtists";
import {useSetRecoilState} from "recoil";
import {hostUser} from "../atoms/atoms";
import {useEffect} from "react";

export default function Home({fallback , user}) {



    return (
            <SWRConfig value={{fallback}}>
                <Main user={user}/>
            </SWRConfig>
    )
}


export const getServerSideProps = async ({req , res}) =>
{
    const supabaseServerClient = createServerSupabaseClient( {req , res} ,{
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })

    const {data: { user } , error} = await supabaseServerClient.auth.getUser()
    //
    // console.log(user.id)

    //?GET NEW RELEASES FROM SPOTIFY API
    const GET_NEW_RELEASES = await FETCH_NEW_RELEASES_ALBUMS('pop' , 0)

    //?GET RECENTLY PLAYED LIST AS A PRE-RENDERING
    const GET_RECENTLY_PLAYED_TRACK = await FETCH_RECENTLY_PLAYED_TRACK()

    //?GET HOST USER INFO
    const GET_ME_INFORMATION = await FETCH_ME()

    //?GET RANDOM ARTIST LIST FOR SIDEBAR
    const GET_RANDOM_ARTISTS_LISTS = await FETCH_RANDOM_ARTIST()

    const GET_FAVORITE_ARTISTS = await getFavouriteArtists(user.id)



    // const GET_SUBSCRIBED_LIST = await GetSubscribedList(user)


    // if (user)
    // {
    //     let { data: USERS, errorrs } = await supabaseServerClient.from('USERS').select(`id , username , FAVOURITE_ARTISTS(*)`).eq('id' , user.id)
    //
    //     console.log(USERS)
    // }




    return {
        props : {
            fallback : {
                '/api/get_recently_played_list': GET_RECENTLY_PLAYED_TRACK,
                'GET ME INFORMATION' : GET_ME_INFORMATION,
                'GET RANDOM ARTISTS LIST' : GET_RANDOM_ARTISTS_LISTS,
                [unstable_serialize(['api' , 'GET_NEW_RELEASES' , 'pop' , 0])] : GET_NEW_RELEASES,
                [unstable_serialize(['api' , 'GET_FAVORITE_ARTISTS' , user.id])] : GET_FAVORITE_ARTISTS,
                // 'GET_FAVORITE_ARTISTS' : GET_FAVORITE_ARTISTS
            },
            user : user
        },
    }
}



