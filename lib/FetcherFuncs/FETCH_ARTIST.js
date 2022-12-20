import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";


export const FETCH_ARTIST = async (artist_id) =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    const GET_ARTIST = (await axios.get(`https://api.spotify.com/v1/artists/${artist_id}` , {
                method : 'GET' ,
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data

    console.log(GET_ARTIST)


    return await GET_ARTIST
}