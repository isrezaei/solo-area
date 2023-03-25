import {gql} from "@apollo/client";
import {client} from "../client/client";

export const getRandomArtists = async (currentPage) =>
{
    const apolloClient = await client;
    const offset = currentPage * 50;
    const query = gql`
        query randomArtists($offset : Int){
            randomArtists(offset : $offset) @rest(type : "random-artists" , path : "/search?q=genre&rock&type=artist&limit=50&offset={args.offset}") {
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

    return apolloClient.query({query , variables : {offset}})
        .then(async (res) => (await res.data))
        .catch(reason => console.log(reason))
}