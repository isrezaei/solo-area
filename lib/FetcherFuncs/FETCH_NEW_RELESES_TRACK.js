import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";
import _ from "lodash";

export const FETCH_NEW_RELESES_TRACK = async (NEW_RELEASES_TRACK_ID) =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    // console.log(access_token)

    //?GET NEW RELEASES ALBUMS TRACKS
    const GET_NEW_RELEASES_ALBUM_TRACKS = (await axios.get(
        `https://api.spotify.com/v1/albums/${NEW_RELEASES_TRACK_ID}`,
        {
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).data


    return await _.pickBy(GET_NEW_RELEASES_ALBUM_TRACKS ,
        (value , key) => ['images' , 'name' , 'id' , 'type' , 'artists' , 'label' , 'tracks' , 'total_tracks' , 'release_date'].includes(key))
}