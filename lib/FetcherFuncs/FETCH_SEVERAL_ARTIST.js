import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";

export const FETCH_SEVERAL_ARTIST = async () =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()

    let GET_SEVERAL_ARTIST ;


    try {
        GET_SEVERAL_ARTIST = (await axios.get(
            'https://api.spotify.com/v1/artists?ids=06HL4z0CvFAxyc27GXpf02,' +
            '6KImCVD70vtIoJWnq6nGn3,' +
            '1uNFoZAHBGtllmzznpCI3s,' +
            '0C8ZW7ezQVs4URX5aX7Kqx,' +
            '66CXWjxzNUsdJxJ2JdwvnR,' +
            '6M2wZ9GZgrQXHCFfjv46we,' +
            '5YGY8feqx7naU7z4HrwZM6,' +
            '5WUlDfRSoLAfcVSX1WnrxN,' +
            '5ZsFI1h6hIdQRw2ti0hz81,' +
            '4dpARuHxo51G3z768sgnrY,' +
            '4npEfmQ6YuiwW1GpUmaq3F'
            , {
            headers : {
                Authorization : `Bearer ${access_token}`
            }
        })).data

    }
    catch (e)
    {
        console.log(e)
    }


    return GET_SEVERAL_ARTIST
}