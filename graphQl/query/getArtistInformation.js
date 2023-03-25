import {gql} from "@apollo/client";
import {client} from "../client/client";



export const getArtistInformation = async (artistId) =>
{


    const apolloClient = await client

    const query = gql`
        query getArtistInfo($artistId : String) {
            getArtistInfo(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}") {
                images
                name
                id
                uri
                popularity
                followers {
                    total
                }
            }
            getArtistTopTracks(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}/top-tracks?market=US"){
                tracks {
                    album {
                        artists {
                            id
                            name
                        }
                        id
                        images
                        name
                        release_date
                    }
                    duration_ms
                    preview_url
                }
            }

            getAlbumsOfArtist(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}/albums?market=US") {
                items {
                    artists {
                        id
                        name
                    }
                    id
                    images
                    name
                    release_date
                }
            }

            getRelatedArtist(artistId : $artistId) @rest(type : "artist-information" , path : "/artists/{args.artistId}/related-artists") {
                id
                images
                name
            }
        }

    `


    try {
        const {data , errors} = await apolloClient.query({query , variables : {artistId}})
        if (errors) return errors
        return await data
    }
    catch (error)
    {
        console.log(error)
    }


    // return apolloClient.query({query , variables : {artistId}})
    //     .then(async (res) => await res.data)
    //     .catch(error => console.log(error))

}