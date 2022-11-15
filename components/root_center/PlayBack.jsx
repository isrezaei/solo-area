import SpotifyPlayer from 'react-spotify-web-playback';
import {Fetch_AccessToken} from "../../lib/FetcherFuncs/Fetch_AccessToken";
import {useAsync} from "react-use";
import {useEffect, useState} from "react";
import {useRecoilValue} from "recoil";
import {TRACK_FOR_WEB_PLAY_BACK} from "../../atoms/ItemsAtom";
import {Box, Divider, Flex} from "@chakra-ui/react";
import {usePlayer} from "../../lib/usePlayer";


const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}


export const PlayBack = () =>
{

    const player = usePlayer()

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(track);


    useEffect(() => {

        if (player)
        {
            player.addListener('player_state_changed', ( state => {

                console.log(state)

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => {
                    (!state)? setActive(false) : setActive(true)
                });
            }));

        }

    } , [player , track])






    const GET_TRACK_URI = useRecoilValue(TRACK_FOR_WEB_PLAY_BACK)

    console.log(GET_TRACK_URI)

    const [ACCESS_TOKEN , GET_ACCESS_TOKEN] = useState()

    useAsync(async () => {
        const {access_token} = await Fetch_AccessToken()
        if (access_token) GET_ACCESS_TOKEN(access_token)
    } , [])



    //
    //
    //
    // return (
    //     ACCESS_TOKEN && <Box w={'full'} position={"sticky"} bottom={0} >
    //
    //         <SpotifyPlayer token={ACCESS_TOKEN}
    //                        uris={[GET_TRACK_URI]}
    //                        autoPlay={true}
    //                        magnifySliderOnHover={true}/>
    //     </Box>
    // )





    return (
        player &&

        <Box position={'sticky'} bottom={0}>

            <SpotifyPlayer token={ACCESS_TOKEN}
                           uris={[GET_TRACK_URI]}
                           autoPlay={true}/>

            <Divider/>

            {/*<Flex w={"full"} h={'5vw'} justify={'space-evenly'} bg={'white'}>*/}
            {/*    <button className="btn-spotify" onClick={() => player.previousTrack()} >*/}
            {/*        &lt;&lt;*/}
            {/*    </button>*/}

            {/*    <button className="btn-spotify" onClick={()=> player.togglePlay()} >*/}
            {/*        { is_paused ? "PLAY" : "PAUSE" }*/}
            {/*    </button>*/}

            {/*    <button className="btn-spotify" onClick={() => player.nextTrack()} >*/}
            {/*        &gt;&gt;*/}
            {/*    </button>*/}
            {/*</Flex>*/}
        </Box>

    )
}