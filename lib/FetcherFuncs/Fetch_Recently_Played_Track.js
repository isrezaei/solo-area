import axios from "axios";
import _ from "lodash";
import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";

export async function FETCH_RECENTLY_PLAYED_TRACK()
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    //?GET RECENTLY PLAYED LIST
    const GET_RECENTLY_PLAYED = (await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=9' , {
        headers : {
            "Authorization" : `Bearer ${access_token}`
        }
    })).data.items

    return await GET_RECENTLY_PLAYED.map(value =>
        _.pickBy(value.track , (value , key) => ['images' , 'name' , 'id' , 'type' , 'album' , 'artists' , 'album_type' , 'duration_ms'].includes(key)))
}
