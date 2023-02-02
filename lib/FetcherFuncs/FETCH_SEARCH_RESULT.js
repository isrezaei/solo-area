import axios from "axios";
import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";

export const FETCH_SEARCH_RESULT = async (inputValue) =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    let GET_SEARCH_RESULT ;

    try {
        GET_SEARCH_RESULT = (await axios.get(`https://api.spotify.com/v1/search?q=${inputValue}&type=album%2Ctrack%2Cartist&market=es&limit=50`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${access_token}`
            }
        })).data

        console.log(GET_SEARCH_RESULT)

    }
    catch (e) {
        GET_SEARCH_RESULT = 'you have a Error !'
    }


    return GET_SEARCH_RESULT
}