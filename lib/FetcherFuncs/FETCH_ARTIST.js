import {FETCH_ACCESS_TOKEN} from "./FETCH_ACCESS_TOKEN";
import axios from "axios";
import _ from 'lodash'

export const FETCH_ARTIST = async (artistID) =>
{
    const {access_token} = await FETCH_ACCESS_TOKEN()



    const GET_ARTIST_INFO = (await axios.get(`https://api.spotify.com/v1/artists/${artistID}` , {
                method : 'GET' ,
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data

    const ARTIST_INFO = _.pick(GET_ARTIST_INFO , ['images' , 'name' , 'id' , 'uri' , 'followers' , 'popularity'])



    const GET_ARTIST_TOP_TRACK = (await axios.get(`https://api.spotify.com/v1/artists/${artistID}/top-tracks?market=ES` , {
                method : 'GET' ,
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data

    const ARTIST_TOP_TRACK = _.map(GET_ARTIST_TOP_TRACK.tracks , (value) => _.pick(value , ['album' , 'artists' , 'duration_ms' , 'id' , 'name' , 'preview_url' , 'uri']) )



    const GET_ARTIST_ALBUMS = (await axios.get(`https://api.spotify.com/v1/artists/${artistID}/albums?market=ES` , {
                method : 'GET' ,
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data


    const ARTIST_ALBUMS = _.pick(GET_ARTIST_ALBUMS , 'items')

    const RELATED_ARTISTS = (await axios.get(`https://api.spotify.com/v1/artists/${artistID}/related-artists` , {
                method : 'GET' ,
                headers : {
                    Authorization : `Bearer ${access_token}`
                }
            }
        )
    ).data



    return {artist_info : ARTIST_INFO , top_track : ARTIST_TOP_TRACK , artist_albums : ARTIST_ALBUMS , artist_related : RELATED_ARTISTS}
}