import {gql} from "@apollo/client";
import {DataBaseClient} from "../../client/client";


export const getFavouriteArtists = async (userId) =>
{
    const GET_FAVOURITE_ARTISTS = gql`
        query GET_FAVOURITE_ARTISTS($userId : String){
            GET_FAVOURITE_ARTISTS(userId: $userId) {
                id
                list {
                    id
                    name
                    images {
                        url
                    }
                }
            }
        }
    `

    try {
        const {data, error} = await DataBaseClient.query({query : GET_FAVOURITE_ARTISTS , variables : {userId : '47525eb3-8627-49de-831b-ab7626f97967'}})
        if (error) return error
        return data
    }
    catch (error)
    {
        console.log(error)
    }

}