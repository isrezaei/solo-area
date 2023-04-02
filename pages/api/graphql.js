import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { gql } from 'graphql-tag';
import {supabase} from "../../supabase/createClient";

const resolvers = {
    Query: {
        GET_SUBSCRIBED_LIST: async (_ , args) => {
            const {userId} = args
            const {data , error} = await supabase.from("SUBSCRIBE_LIST").select("*").eq("user_Id" , userId)
            if (error) return error
            return data
        },
        GET_FAVOURITE_ARTISTS : async (_ , args) => {
            const {userId} = args
            const { data , error } = await supabase.from('FAVOURITE_ARTISTS').select(`*`).eq('id' , userId)
            if (error) return error
            return data
        }
    },
    Mutation : {
        SET_TO_SUBSCRIBE_LIST : async (_ ,args) => {
            const {artistsId , name , images , dependent_to , userId} = args
            const {data , error} = await supabase.from("SUBSCRIBE_LIST").insert({id : artistsId , name , images , dependent_to , user_Id : userId}).select("*")
            if (error) return error
            return data
        },
        REMOVE_FROM_SUBSCRIBE_LIST : async (_ , args) => {
            const {artistId} = args
            await supabase.from("SUBSCRIBE_LIST").delete().eq("id" , artistId)
            return "remove from subscribe"
        }
    }
};

const typeDefs = gql`

    type imagesType {
        url : String
        width : Int
        height : Int
    }


    type subscribeListType {
        id : String
        name : String
        images : [imagesType]
        created_at : String
        dependent_to : String
        user_Id : String
    }
    
    type favouriteList {
        id : String
        name : String
        images : [imagesType]
    }
    
    type favouriteArtistsType {
        id : String
        list : [favouriteList]
        user_Id : String
    }
    
    input ImageInput {
        url : String
        width : Int
        height : Int
    }
    

    type Query {
        GET_SUBSCRIBED_LIST(userId : String): [subscribeListType]
        GET_FAVOURITE_ARTISTS(userId : String) : [favouriteArtistsType]
    }
    
    type Mutation {
        SET_TO_SUBSCRIBE_LIST (artistsId : String , name : String , images : [ImageInput], dependent_to : String , userId : String) : [subscribeListType]
        REMOVE_FROM_SUBSCRIBE_LIST(artistId : String) : String
    }


`;

const server = new ApolloServer({
    resolvers,
    typeDefs,
});

export default startServerAndCreateNextHandler(server);