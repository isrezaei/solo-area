import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";

export const FETCH_TRACK = async (trackId) =>
{

    const {access_token} = await FETCH_ACCESS_TOKEN()

    const GET_TRACK = (await axios.get(
            `https://api.spotify.com/v1/tracks/${trackId}` ,
            {
                method : 'GET',
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data


    return await GET_TRACK

}