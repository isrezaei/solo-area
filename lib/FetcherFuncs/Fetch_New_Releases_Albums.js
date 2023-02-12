import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";
import _ from "lodash";

export const Fetch_New_Releases_Albums = async () =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    //?GET NEW RELEASES FROM SPOTIFY API
    const GET_NEW_RELEASES = (await axios.get("https://api.spotify.com/v1/browse/new-releases?country=US&limit=12&offset=5" ,
        {
        method : 'GET',
        headers : {
            Authorization : `Bearer ${access_token}`
        }
    })).data.albums.items


    return await GET_NEW_RELEASES.map(value => _.pickBy(value , (value , key) => ['images' , 'name' , 'id' , 'type' , 'artists'].includes(key)))
}