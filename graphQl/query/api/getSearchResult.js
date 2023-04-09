import {gql} from "@apollo/client";
import {client} from "../../client/client";


export const GetSearchResult = async (value) => {

    const apolloClient = await client


    const query = gql`
        query SEARCH_RESULT($value : String) {
            SEARCH_RESULT(value : $value) @rest(type : "search" , path : "/search?q={args.value}&type=album,track,artist&market=es&limit=50"){
                albums {
                    items {
                        id
                        images
                        name
                        artists {
                            id
                            name
                        }
                    }
                }
                artists {
                    items {
                        id
                        name
                        images
                        popularity
                    }
                }
                tracks {
                    items {
                        id
                        name
                        popularity
                        duration_ms
                        album {
                            id
                            images
                            name
                        }
                        artists {
                            id
                            name
                        }
                    }
                }
            }
        }

    `


    try {
        const {data, error} = await apolloClient.query({query, variables: {value}})
        if (error) return error
        return data
    } catch (error) {
        console.log(error)
    }
}