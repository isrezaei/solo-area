import axios from "axios";
import _ from "lodash";

export default async function handler (req , res)
{
    //?GET ACCESS TOKEN BY REFRESH TOKEN (WHEN EXPIRED ACCESS TOKEN)
    const GET_ACCESS_TOKEN = (await axios.get(process.env.NEXT_PUBLIC_BASE_URL +'/api/get_access_token')).data


    //?GET NEW RELEASES FROM SPOTIFY API
    const GET_NEW_RELEASES = (await axios.get("https://api.spotify.com/v1/browse/new-releases?country=US&limit=10&offset=5" ,{
        method : 'GET',
        headers : {
            Authorization : `Bearer ${GET_ACCESS_TOKEN}`
        }
    })).data.albums.items


    const FILTER_ALL_NEEDS_FROM_API = GET_NEW_RELEASES.map(value => _.pickBy(value , (value , key) => ['images' , 'name' , 'id' , 'type' , 'artists'].includes(key)))

    res.status(200).json(FILTER_ALL_NEEDS_FROM_API)
}
