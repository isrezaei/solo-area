import {RestLink} from "apollo-link-rest";
import {ApolloClient, ApolloLink, InMemoryCache} from "@apollo/client";
import {FETCH_ACCESS_TOKEN} from "../../lib/FetcherFuncs/FETCH_ACCESS_TOKEN";



async function initializeClient() {

    const token = await FETCH_ACCESS_TOKEN();

    const restLink = new RestLink({
        uri: 'https://api.spotify.com/v1',
        headers: {
            Authorization: `Bearer ${token}`
        }
    });

    return  new ApolloClient({
        cache: new InMemoryCache(),
        link: ApolloLink.from([restLink]),
    });

}

export const client = initializeClient();



export const DataBaseClient = new ApolloClient({
    ssrMode: true,
    cache: new InMemoryCache(),
    uri : `${process.env.NEXT_PUBLIC_BASE_URL}/api/graphql`
});