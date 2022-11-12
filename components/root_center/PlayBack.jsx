import SpotifyPlayer from 'react-spotify-web-playback';
import {Fetch_AccessToken} from "../../lib/FetcherFuncs/Fetch_AccessToken";
import {useAsync} from "react-use";
import {useState} from "react";
import {useRecoilValue} from "recoil";
import {TRACK_FOR_WEB_PLAY_BACK} from "../../atoms/ItemsAtom";
import {Box} from "@chakra-ui/react";

export const PlayBack = () =>
{
    const GET_TRACK_URI = useRecoilValue(TRACK_FOR_WEB_PLAY_BACK)

    console.log(GET_TRACK_URI)

    const [ACCESS_TOKEN , GET_ACCESS_TOKEN] = useState()

    useAsync(async () => {
        const {access_token} = await Fetch_AccessToken()
        if (access_token) GET_ACCESS_TOKEN(access_token)
    } , [])


    return (
        ACCESS_TOKEN && <Box w={'full'} position={"sticky"} bottom={0} >

            <SpotifyPlayer token={ACCESS_TOKEN}
                           uris={[GET_TRACK_URI]}
                           autoPlay={true}
                           magnifySliderOnHover={true}
                           styles={{ bgColor: '#333'}}/>
        </Box>
    )
}