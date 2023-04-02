import {gql} from "@apollo/client";

export const getSubscribeQuery = gql`
    query GET_SUBSCRIBED_LIST($userId: String) {
        GET_SUBSCRIBED_LIST(userId: $userId) {
            id
            name
            images {
                width
                height
                url
            }
            created_at
            dependent_to
            user_Id
        }
    }
`