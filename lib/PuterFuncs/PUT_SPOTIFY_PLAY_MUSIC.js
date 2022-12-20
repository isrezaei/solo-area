import {FETCH_ACCESS_TOKEN} from "../FetcherFuncs/FETCH_ACCESS_TOKEN";

export const PUT_SPOTIFY_PLAY_MUSIC = async (TRACK_URI , SPOTIFY_DEVICE_ID) =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    return await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${SPOTIFY_DEVICE_ID}`, {
        method: 'PUT',
        body: JSON.stringify({ uris: [TRACK_URI] }),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${access_token}`
        },
    });

}
