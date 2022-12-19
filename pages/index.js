import {Main} from "../components/root_center/Main";
import  {SWRConfig} from "swr";
import {Fetch_New_Releases_Albums} from "../lib/FetcherFuncs/Fetch_New_Releases_Albums";
import {FETCH_RECENTLY_PLAYED_TRACK} from "../lib/FetcherFuncs/Fetch_Recently_Played_Track";


export default function Home({fallback}) {

    return (

            <SWRConfig value={{fallback , refreshInterval : 5000}}>
                <Main/>
            </SWRConfig>
    )
}


export const getStaticProps = async (context) =>
{
    //?GET NEW RELEASES FROM SPOTIFY API
    const GET_NEW_RELEASES = await Fetch_New_Releases_Albums()

    //?GET RECENTLY PLAYED LIST AS A PRE-RENDERING
    const GET_RECENTLY_PLAYED_TRACK = await FETCH_RECENTLY_PLAYED_TRACK()


    return {
        props : {
            fallback : {
                '/api/get_new_releases_albums_list': GET_NEW_RELEASES,
                '/api/get_recently_played_list': GET_RECENTLY_PLAYED_TRACK
            },
        },
    }
}



