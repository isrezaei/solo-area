import {gql} from "@apollo/client";
import {client} from "../../client/client";


export const getRandomPlayed = async () =>
{
    const apolloClient = await client;


    const query = gql`
        query {
            randomPlayed @rest(type : "random-played" , path : "/me/player/recently-played?limit=12") {
                items {
                    track {
                        id,
                        name,
                        preview_url,
                        duration_ms,
                        artists {
                            id
                            name
                        },
                        album {
                            id
                            name
                            images
                        }
                    }
                }
            }
        }
    `

    return apolloClient.query({query})
        .then(async (res) => (await res.data))
        .catch(reason => console.log(reason))
}