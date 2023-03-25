import {gql} from "@apollo/client";
import {client} from "../client/client";


export const getNewReleasesAlbums =  async (genre = 'pop' , currentPage = 0) =>
{
    const apolloClient = await client;

    const offset = currentPage * 12

    const query = gql`
        query newReleases($genre : String , $offset : Int) {
            newReleases (genre : $genre , offset : $offset) @rest(type : "Search" , path : "/search?q=lil%2520genre%3A{args.genre}&type=album&market=us&limit=12&offset={args.offset}") {
                albums {
                    items {
                        id
                        artists {
                            name
                            id
                        }
                        images
                        name
                    }
                }
            }
        }
    `

   return  apolloClient.query({query , variables : {genre , offset}})
        .then(async (res) => (await res.data))
        .catch(reason => console.log(reason))
}
