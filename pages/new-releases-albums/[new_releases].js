import {AlbumsInfo} from "../../components/NewReleases/AlbumsInfo";
import {Box} from "@chakra-ui/react";
import {TracksInfo} from "../../components/NewReleases/TracksInfo";
import {FETCH_NEW_RELESES_TRACK} from "../../lib/FetcherFuncs/FETCH_NEW_RELESES_TRACK";
import useSWR , {unstable_serialize , SWRConfig} from "swr";
import {useRouter} from "next/router";

function NewReleasesAlbumsTrack ({fallback})
{

    // const SET_NEW_RELEASES_ALBUM_TRACK = useSetRecoilState(NEW_RELEASES_ALBUMS_TRACK_ATOM)
    //
    // useEffect(() => SET_NEW_RELEASES_ALBUM_TRACK(JSON.parse(GET_NEW_RELEASES_ALL_DATA)) , [])
    //
    // console.log(JSON.parse(GET_NEW_RELEASES_ALL_DATA))




    return (
        <SWRConfig value={{fallback}}>
            <Box w={"full"} h={'full'} bg={'gray.900'} >
                {/*HEADER*/}
                <AlbumsInfo/>
                {/*/!*BODY*!/*/}
                <TracksInfo/>
            </Box>
        </SWRConfig>

    )
}

export default NewReleasesAlbumsTrack



export const getServerSideProps = async ({params : {new_releases}}) => {

    console.log(new_releases)

    const GET_TRACK_OF_NEW_RELEASES = await FETCH_NEW_RELESES_TRACK(new_releases)

    return {
        props :{
            fallback : {
                [unstable_serialize(['api' , 'GET_TRACKS_OF_NEW_RELEASES' , new_releases])] : GET_TRACK_OF_NEW_RELEASES
            }
        }
    }
}

