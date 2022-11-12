import axios from "axios";
import _ from "lodash";

export default async function handler (req , res)
{
    const TRACK_ID = req.query.get_new_releases_tracks

    //?GET ACCESS TOKEN BY REFRESH TOKEN (WHEN EXPIRED ACCESS TOKEN)
    const GET_ACCESS_TOKEN = (await axios.get(process.env.NEXT_PUBLIC_BASE_URL +'/api/get_access_token')).data

    //?GET NEW RELEASES ALBUMS TRACKS
    const GET_NEW_RELEASES_ALBUM_TRACKS = (await axios.get(
        `https://api.spotify.com/v1/albums/${TRACK_ID}`,
        {
            headers: {
                Authorization: `Bearer ${GET_ACCESS_TOKEN}`
            }
        })).data


    const FILTER_ALL_NEEDS_FROM_API = _.pickBy(GET_NEW_RELEASES_ALBUM_TRACKS ,
        (value , key) => ['images' , 'name' , 'id' , 'type' , 'artists' , 'label' , 'tracks' , 'total_tracks' , 'release_date'].includes(key))


    res.status(200).json(FILTER_ALL_NEEDS_FROM_API)

}