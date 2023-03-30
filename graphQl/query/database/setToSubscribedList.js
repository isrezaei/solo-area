import {gql} from "@apollo/client"
import {DataBaseClient} from "../../client/client";
import {getSubscribeQuery} from "./getSubscribedList";

export const setToSubscribedList = (artistsId , name , images , dependent_to , userId) =>
{

    const SET_TO_SUBSCRIBE_LIST = gql`
        mutation SET_TO_SUBSCRIBE_LIST($artistsId : String , $name: String, $images : [ImageInput] , $dependent_to: String, $userId: String) {
            SET_TO_SUBSCRIBE_LIST(artistsId: $artistsId, name: $name , images: $images , dependent_to: $dependent_to, userId: $userId) {
                id
                name
                images {
                    url
                }
                created_at
                dependent_to
                user_Id
            }
        }
    `

    try {

        const {data , error} = DataBaseClient.mutate({
            mutation : SET_TO_SUBSCRIBE_LIST ,
            variables : {artistsId , name , images , dependent_to , userId} ,
            refetchQueries : [{query : getSubscribeQuery , variables : {userId}}]
        })

        if (error) return error
        return data
    }
    catch (error) {
        console.log(error)
    }

}