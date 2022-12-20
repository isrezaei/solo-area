import {NEW_RELEASES_ALBUMS_TRACK_ATOM} from "../../atoms/atoms";
import {useSetRecoilState} from "recoil";
import {useEffect} from "react";
import {AlbumsInfo} from "../../components/pages/new_releases_albums_track/AlbumsInfo";
import {Box} from "@chakra-ui/react";
import {TracksInfo} from "../../components/pages/new_releases_albums_track/TracksInfo";
import {Fetch_New_Releases_Albums} from "../../lib/FetcherFuncs/Fetch_New_Releases_Albums";
import {FETCH_NEW_RELESES_TRACK} from "../../lib/FetcherFuncs/FETCH_NEW_RELESES_TRACK";

function NewReleasesAlbumsTrack ({GET_NEW_RELEASES_ALL_DATA})
{

    const SET_NEW_RELEASES_ALBUM_TRACK = useSetRecoilState(NEW_RELEASES_ALBUMS_TRACK_ATOM)

    useEffect(() => SET_NEW_RELEASES_ALBUM_TRACK(JSON.parse(GET_NEW_RELEASES_ALL_DATA)) , [])

    console.log(JSON.parse(GET_NEW_RELEASES_ALL_DATA))




    return (
        <Box w={"full"} h={'full'} bg={'gray.900'} >
            {/*HEADER*/}
            <AlbumsInfo/>
            {/*BODY*/}
            <TracksInfo/>
        </Box>
    )
}

export default NewReleasesAlbumsTrack



export const getStaticPaths  = async () =>
{
    //?GET NEW RELEASES FROM SPOTIFY API AND SET ALL NEED PARAMS FOR FIRST BUILD
    const GET_NEW_RELEASES = await Fetch_New_Releases_Albums()

    const PATH_URL = GET_NEW_RELEASES.map(value => {
        return {
            params : {new_releases : value.id}
        }
    })
    return {
        paths : PATH_URL,
        fallback : 'blocking'
    }
}

export const getStaticProps = async ({params : {new_releases : NEW_RELEASES_TRACK_ID}}) =>
{
    //?GET NEW RELEASES ALBUMS TRACKS
    const GET_NEW_RELEASES_ALBUM_TRACKS = await FETCH_NEW_RELESES_TRACK(NEW_RELEASES_TRACK_ID)


    return {
        props : {
            GET_NEW_RELEASES_ALL_DATA : JSON.stringify(GET_NEW_RELEASES_ALBUM_TRACKS)
        },
        revalidate : 1
    }
}

