import axios from "axios";
import {FETCH_ACCESS_TOKEN} from "../FetcherFuncs/FETCH_ACCESS_TOKEN";
import {SPOTIFY_DEVICE_ID_ATOM } from "../../atoms/atoms";
import {useRecoilValue} from "recoil";

export const PUT_SPOTIFY_PLAY_MUSIC = async (TRACK_URI , SPOTIFY_DEVICE_ID) =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()


    // try
    // {
    //     return await axios({
    //         method : 'put',
    //         url : `https://api.spotify.com/v1/me/player/play?device_id=${SPOTIFY_DEVICE_ID}`,
    //         body :JSON.stringify({ uris: [TRACK_URI] }),
    //         headers : {
    //             'Authorization': `Bearer ${access_token}`
    //         }
    //     })
    // }
    // catch (error)
    // {
    //     console.log('WE HAVE ERROR')
    // }


    return await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${SPOTIFY_DEVICE_ID}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [TRACK_URI] }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    });
}
