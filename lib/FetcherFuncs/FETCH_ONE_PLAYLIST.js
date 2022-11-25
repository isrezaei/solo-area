import axios from "axios";
import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";

export const FETCH_ONE_PLAYLIST = async (PLAYLIST_ID) =>
{

    const {access_token} = await FETCH_ACCESS_TOKEN()

    const GET_ONE_MY_PLAYLIST = (await axios.get(
            `https://api.spotify.com/v1/playlists/${PLAYLIST_ID}?market=US` ,
            {
                method : 'GET',
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data

    return GET_ONE_MY_PLAYLIST
}