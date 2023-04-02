import {gql} from "@apollo/client";
import {client} from "../../client/client";

export const getSeveralCategories = async () =>
{

    const query = gql`
       query {
           GET_SEVERAL_CATEGORIES @rest(type : "categories" , path : "/browse/categories?country=US&limit=50"){
               categories {
                   items {
                       id
                       name
                       icons
                   }
               }
           }
       }  
    
    `


    const apolloClient = await client

    try {
        const {data , error} = await apolloClient.query({query})
        if (error) return error
        return data
    }
    catch (error)
    {
        console.log(error)
    }
}