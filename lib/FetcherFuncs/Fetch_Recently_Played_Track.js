import axios from "axios";
import _ from "lodash";
import {Fetch_AccessToken} from "./Fetch_AccessToken";

export async function FETCH_RECENTLY_PLAYED_TRACK()
{
    const {access_token} = await Fetch_AccessToken()

    //?GET RECENTLY PLAYED LIST
    const GET_RECENTLY_PLAYED = (await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50&after=1000' , {
        headers : {
            "Authorization" : `Bearer ${access_token}`
        }
    })).data.items

    return await GET_RECENTLY_PLAYED.map(value =>
        _.pickBy(value.track , (value , key) => ['images' , 'name' , 'id' , 'type' , 'album' , 'artists' , 'album_type' , 'duration_ms'].includes(key)))
}
