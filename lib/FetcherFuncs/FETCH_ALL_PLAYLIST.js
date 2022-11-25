import axios from "axios";
import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";

export const FETCH_ALL_PLAYLIST = async () =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    const GET_MY_PLAYLIST = (await axios.get('https://api.spotify.com/v1/me/playlists', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${access_token}`
        }
    })).data.items

    return await GET_MY_PLAYLIST
}

