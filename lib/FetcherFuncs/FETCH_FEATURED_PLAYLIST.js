import axios from "axios";
import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";

export const FETCH_FEATURED_PLAYLIST = async () =>
{

    const {access_token} = await FETCH_ACCESS_TOKEN()

    const GET_FEATURED_PLAYLIST = (await axios.get('https://api.spotify.com/v1/browse/featured-playlists?country=US&locale=sv_US&timestamp=2014-10-23T09%3A00%3A00.000Z&limit=20' , {
                method : 'GET' ,
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data.playlists.items


    return await GET_FEATURED_PLAYLIST
}