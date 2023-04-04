import {gql} from "@apollo/client";
import {client} from "../../client/client";

import _ from 'lodash'


export const getRandomArtists = async (currentPage , alphabet = "a") =>
{
    const apolloClient = await client;
    const offset = currentPage * 50;
    const query = gql`
        query randomArtists($offset : Int , $alphabet : String){
            randomArtists(offset : $offset , alphabet :$alphabet) @rest(type : "random-artists" , path : "/search?q={args.alphabet}&type=artist&limit=50&offset={args.offset}") {
                artists {
                    items {
                        id , 
                        name,
                        images,
                        genres
                    }
                }
            }
        }
    `

    return apolloClient.query({query , variables : {offset , alphabet}})
        .then(async (res) => (await res.data))
        .catch(reason => console.log(reason))
}