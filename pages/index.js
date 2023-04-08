import {Starter} from "../components/Starter";
import {SWRConfig, unstable_serialize} from "swr";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import {getFavouriteArtists} from "../graphQl/query/database/getFavouriteArtists";
import {getNewReleasesAlbums} from "../graphQl/query/api/getNewReleasesAlbums";
import {getRandomArtists} from "../graphQl/query/api/getRandomArtists";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {Divider, HStack, Stack} from "@chakra-ui/react";
import {getRandomPlayed} from "../graphQl/query/api/getRandomPlayed";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";
import {useRouter} from "next/router";
import Header from "../components/Header";
import {getSubscribeQuery} from "../graphQl/query/database/getSubscribedList";
import {getSeveralCategories} from "../graphQl/query/api/getSeveralCategories";




export default function Home({fallback, user , SSR_GET_SUBSCRIBED_LIST}) {

    const router = useRouter()

    return (
        <SWRConfig value={{fallback}}>

            <HStack   align={'flex-start'} position={"relative"}>

                <ApolloProvider client={DataBaseClient}>
                    <Stack w={{sm : 0 , md : 265}} position={"sticky"} top={0}>
                        {router.pathname !== "/login_signup" && <Sidebar SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>}
                    </Stack>
                </ApolloProvider>


                <Stack flex={1}>
                    {router.pathname !== "/login_signup" && <Header/>}
                    <Starter user={user}/>
                </Stack>

            </HStack>


        </SWRConfig>
    )
}


export const getServerSideProps = async ({req, res}) => {

    const supabaseServerClient = createServerSupabaseClient({req, res}, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY
    })
    // const {data: { user } , error} = await supabaseServerClient.auth.getUser()

    const {data: {session: {user}}, error} = await supabaseServerClient.auth.getSession()


    const GET_RECENTLY_PLAYED_TRACK = await getRandomPlayed()

    const GET_NEW_RELEASES = await getNewReleasesAlbums('pop', 0)

    const GET_RANDOM_ARTISTS_LIST = await getRandomArtists(0, "a")

    const GET_FAVORITE_ARTISTS = await getFavouriteArtists(user?.id)

    const GET_SEARCH_CATEGORIES = await getSeveralCategories()

    const {data : {GET_SUBSCRIBED_LIST}} = await DataBaseClient.query({query : getSubscribeQuery , variables : {userId : user.id}})

    console.log(GET_SUBSCRIBED_LIST)

    return {
        props: {
            fallback: {
                "GET_RANDOM_PLAYED": GET_RECENTLY_PLAYED_TRACK,
                "GET_SEARCH_CATEGORIES": GET_SEARCH_CATEGORIES,
                [unstable_serialize(['api', 'GET_NEW_RELEASES', 'pop', 0])]: GET_NEW_RELEASES,
                [unstable_serialize(["api", "GET_RANDOM_ARTISTS", 0, "a"])]: GET_RANDOM_ARTISTS_LIST,
                [unstable_serialize(['api', 'GET_FAVORITE_ARTISTS', user.id])]: GET_FAVORITE_ARTISTS,
            },
            user,
            SSR_GET_SUBSCRIBED_LIST : GET_SUBSCRIBED_LIST
        },
    }
}



