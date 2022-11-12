import axios from "axios";
import _ from "lodash";

export default async function handler (req , res)
{

    //?Get Access Token From Next Api
    const Get_ACCESS_TOKEN = (await axios.get(process.env.NEXT_PUBLIC_BASE_URL + '/api/get_access_token')).data

    //*GET RECENTLY PLAYED LIST
    const GET_RECENTLY_PLAYED = (await axios.get('https://api.spotify.com/v1/me/player/recently-played?limit=50&after=1000' , {
        headers : {
            "Authorization" : `Bearer ${Get_ACCESS_TOKEN}`
        }
    })).data.items


    const FILTER_ALL_NEEDS_FROM_API = GET_RECENTLY_PLAYED.map(value =>
        _.pickBy(value.track , (value , key) => ['images' , 'name' , 'id' , 'type' , 'album' , 'artists' , 'album_type' , 'duration_ms'].includes(key)))



    res.status(200).json(FILTER_ALL_NEEDS_FROM_API)
}