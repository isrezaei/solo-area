import axios from "axios";
import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import _ from 'lodash'

export const FETCH_RANDOM_ARTIST = async (countRender = 0) =>
{

    const {access_token} = await FETCH_ACCESS_TOKEN()

    const offset = countRender * 50;

    try {
        return (await axios.get(`https://api.spotify.com/v1/search?q=genre:rock&type=artist&limit=50&offset=${offset}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${access_token}`,
            }
        })).data.artists.items.map(value => _.pick(value, ['id', 'name', 'images', 'genres']))


    }
    catch (error)
    {
        alert('FETCH RANDOM ARTIST IS FAIL')
    }
}