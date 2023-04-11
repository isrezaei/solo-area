import {gql} from "@apollo/client";
import {client} from "../../client/client";

export const getSeveralArtistsForPickup = async () => {

    const apolloClient = await client

    const GET_SEVERAL_ARTISTS = gql`
        query GET_SEVERAL_ARTISTS_FOR_PICKUP{
            GET_SEVERAL_ARTISTS_FOR_PICKUP @rest(type : "artist-information" , path : "/artists?ids=3TVXtAsR1Inumwj472S9r4,246dkjvS1zLTtiykXe5h60,66CXWjxzNUsdJxJ2JdwvnR,6eUKZXaKkcviH0Ku9w2n3V,06HL4z0CvFAxyc27GXpf02,1Xyo4u8uXC1ZmMpatF05PJ,6LuN9FCkKOj5PcnpouEgny,6beUvFUlKliUYJdLOXNj9C,0ZED1XzwlLHW4ZaG4lOT6m,1uNFoZAHBGtllmzznpCI3s,1vyhD5VmyZ7KMfW5gqLgo5,4q3ewBCX7sLwd24euuV69X,6M2wZ9GZgrQXHCFfjv46we,7n2wHs1TKAczGzO7Dd2rGr,0du5cEVh5yTK9QJze8zA0C,6KImCVD70vtIoJWnq6nGn3,5pKCCKE2ajJHZ9KAiaK11H,4kYSro6naA4h99UJvo89HB,4nDoRrQiYLoBzwC5BhVJzF,0C8ZW7ezQVs4URX5aX7Kqx,53XhwfbYqKCa1cC15pYq2q,04gDigrS5kc9YWfZHwBETP,4dpARuHxo51G3z768sgnrY,4gzpq5DPGxSnKTe4SA8HAU,6vWDO969PvNqNYHIOW5v0m,5WUlDfRSoLAfcVSX1WnrxN,2wY79sveU1sp5g7SokKOiI,64KEffDW9EtZ1y2vBYgq8T,5ZsFI1h6hIdQRw2ti0hz81,77AiFEVeAVj2ORpC85QVJs"){
                artists {
                    id 
                    name
                    images
                }
            } 
        }
    `

    try {
        const {data, error} = await apolloClient.query({query: GET_SEVERAL_ARTISTS})
        if (error) return error
        return data
    } catch (error) {
        console.log(error)
    }

}