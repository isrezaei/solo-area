import {gql} from "@apollo/client";
import {DataBaseClient} from "../../client/client";
import {getSubscribeQuery} from "./getSubscribedList";

export const removeFromSubscribeList = async (artistId , userId) =>
{
    const REMOVE_FROM_SUBSCRIBE_LIST = gql`
        mutation REMOVE_FROM_SUBSCRIBE_LIST($artistId: String) {
            REMOVE_FROM_SUBSCRIBE_LIST(artistId: $artistId)
        }
    `
    try {
        const {error} = DataBaseClient.mutate({mutation : REMOVE_FROM_SUBSCRIBE_LIST , variables : {artistId} ,
            refetchQueries : [{query : getSubscribeQuery , variables : {userId}}]})
        if (error) return error
    }
    catch (error) {
        console.log(error)
    }
}