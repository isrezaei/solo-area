import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";
import _ from "lodash";

export const FETCH_NEW_RELEASES_ALBUMS = async (genre , currentPage = 0) =>
{

    const offset = currentPage * 12

    try {
        const {access_token} = await FETCH_ACCESS_TOKEN()

        //?GET NEW RELEASES FROM SPOTIFY API
        const GET_NEW_RELEASES = (await axios.get(`https://api.spotify.com/v1/search?q=lil%2520genre%3A${genre}&type=album&market=us&limit=12&offset=${offset}` ,
            {
                method : 'GET',
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            })).data.albums.items

        return await GET_NEW_RELEASES.map(value => _.pickBy(value , (value , key) => ['images' , 'name' , 'id' , 'type' , 'artists'].includes(key)))
    }
    catch (e)
    {
        console.log('FETCH_NEW_RELEASES_ALBUMS have Error')
    }

}