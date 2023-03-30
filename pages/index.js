import {Main} from "../components/root_center/Main";
import  {SWRConfig , unstable_serialize} from "swr";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import {getFavouriteArtists} from "../supabase/get/getFavouriteArtists";
import {getNewReleasesAlbums} from "../graphQl/query/api/getNewReleasesAlbums";
import {getRandomArtists} from "../graphQl/query/api/getRandomArtists";
import {Sidebar} from "../components/Sidebar";
import {Divider, HStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {getRandomPlayed} from "../graphQl/query/api/getRandomPlayed";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";



export default function Home({fallback , user}) {
    return (
            <SWRConfig value={{fallback}}>
                <HStack spacing={0} align={'flex-start'}>
                    <ApolloProvider client={DataBaseClient}>
                        <Sidebar/>
                    </ApolloProvider>
                    <Divider h={'80%'} borderColor={'whiteAlpha.900'} borderWidth={1} rounded={"full"} orientation={'vertical'}/>
                    <Main user={user}/>
                </HStack>
            </SWRConfig>
    )
}



export const getServerSideProps = async ({req , res}) =>
{
    const supabaseServerClient = createServerSupabaseClient( {req , res} ,{
        supabaseUrl : process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey : process.env.NEXT_PUBLIC_SUPABASE_KEY
    })
    // const {data: { user } , error} = await supabaseServerClient.auth.getUser()

    const {data: { session : {user}} , error} = await supabaseServerClient.auth.getSession()


    //?GET RECENTLY PLAYED LIST AS A PRE-RENDERING
    const GET_RECENTLY_PLAYED_TRACK = await getRandomPlayed()


    //?GET NEW RELEASES FROM SPOTIFY API
    const GET_NEW_RELEASES = await getNewReleasesAlbums('pop' , 0)


    //?GET RANDOM ARTIST LIST FOR SIDEBAR
    const GET_RANDOM_ARTISTS_LIST = await getRandomArtists(0)


    const GET_FAVORITE_ARTISTS = await getFavouriteArtists(user?.id)





    return {
        props : {
            fallback : {
                'GET_RANDOM_PLAYED': GET_RECENTLY_PLAYED_TRACK,
                [unstable_serialize(['api' , 'GET_NEW_RELEASES' , 'pop' , 0])] : GET_NEW_RELEASES,
                [unstable_serialize(['api' , 'GET_RANDOM_ARTISTS' , 0])] : GET_RANDOM_ARTISTS_LIST,
                [unstable_serialize(['api' , 'GET_FAVORITE_ARTISTS' , user.id])] : GET_FAVORITE_ARTISTS,
            },
            user : user
        },
    }
}



