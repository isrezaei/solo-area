import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";

export const FETCH_MY_FLOWING_ARTISTS = async () =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    //?GET NEW RELEASES FROM SPOTIFY API
    const GET_FLOWING_ARTISTS = (await axios.get("https://api.spotify.com/v1/me/following?type=artist&after=0I2XqVXqHScXjHhk6AYYRe&limit=6" ,{
        method : 'GET',
        headers : {
            Authorization : `Bearer ${access_token}`
        }
    })).data.artists.items


    return await GET_FLOWING_ARTISTS
}