import {Main} from "../components/main";
import {SWRConfig, unstable_serialize} from "swr";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs"
import {getFavouriteArtists} from "../graphQl/query/database/getFavouriteArtists";
import {getNewReleasesAlbums} from "../graphQl/query/api/getNewReleasesAlbums";
import {getRandomArtists} from "../graphQl/query/api/getRandomArtists";
import {Sidebar} from "../components/Sidebar/Sidebar";
import {Button, HStack, Stack, VStack} from "@chakra-ui/react";
import {getRandomPlayed} from "../graphQl/query/api/getRandomPlayed";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";
import {useRouter} from "next/router";
import Header from "../components/Header/Header";
import {getSubscribeQuery} from "../graphQl/query/database/getSubscribedList";
import {getSeveralCategories} from "../graphQl/query/api/getSeveralCategories";
import Hamburger from "../components/HamburgerMenu/Hamburger";
import Head from "next/head";
import {useState} from "react";
import {supabase} from "../supabase/createClient";
import _ from "lodash"
import {useUser} from "@supabase/auth-helpers-react";


export default function Home({fallback, user, SSR_GET_SUBSCRIBED_LIST, FAVOURITE_ARTISTS}) {


    console.log(user)

    const router = useRouter()

    const [favouriteList,] = useState(_.size(FAVOURITE_ARTISTS?.[0]?.list))


    if (favouriteList < 10) {
        return (

            <VStack w={"full"} h={"100vh"} justifyContent={"center"} alignItems={"center"}>
                <Button size={"lg"} onClick={() => router.push("/pickFavouriteArtists")}>Please pickup some artists
                    first </Button>
            </VStack>

        )
    }

    if (favouriteList >= 10) {
        return (
            <>
                <Head>
                    <title>Home</title>
                </Head>

                <ApolloProvider client={DataBaseClient}>
                    <SWRConfig value={{fallback}}>

                        <VStack display={{sm: "block", md: "block", lg: "block", xl: "none"}} position={"relative"}
                                zIndex={3000}>
                            <Hamburger SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>
                        </VStack>

                        <HStack
                            maxW={{sm: "full", md: 848, lg: 1072, xl: 1990}}
                            h={"100svh"}
                            overflowY={"scroll"}
                            m={"auto"}
                            align={'flex-start'}
                            position={"relative"}
                            sx={{
                                "&::-webkit-scrollbar": {
                                    width: "0",
                                    height: "0",
                                },
                                scrollbarWidth: "none",
                                "-ms-overflow-style": "none",
                            }}>

                            <Stack display={{sm: "none", md: "none", lg: "none", xl: "flex"}} w={{sm: 0, md: 265}}
                                   position={"sticky"} top={0}>
                                {router.pathname !== "/login_signup" &&
                                    <Sidebar SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>}
                            </Stack>

                            <Stack flex={1} px={{sm: 0, md: 5}} zIndex={2000}>
                                {router.pathname !== "/login_signup" && <Header/>}
                                <Main user={user}/>
                            </Stack>
                        </HStack>
                    </SWRConfig>
                </ApolloProvider>
            </>
        )
    }
}


export const getServerSideProps = async ({req, res}) => {

    const supabaseServerClient = createServerSupabaseClient({req, res}, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY
    })

    // const {data: {user}} = await supabaseServerClient.auth.getUser()

    const {data: { session : {user} }} = await supabaseServerClient.auth.getSession()

    if (!user)
        return {
            redirect: {
                destination: '/login_signup',
                permanent: false,
            },
        }


    const GET_RECENTLY_PLAYED_TRACK = await getRandomPlayed()

    const GET_NEW_RELEASES = await getNewReleasesAlbums('pop', 0)

    const GET_RANDOM_ARTISTS_LIST = await getRandomArtists(0, "a")

    const GET_SEARCH_CATEGORIES = await getSeveralCategories()

    const GET_FAVORITE_ARTISTS = await getFavouriteArtists(user.id)

    const {data: {GET_SUBSCRIBED_LIST}} = await DataBaseClient.query({
        query: getSubscribeQuery,
        variables: {userId: user.id},
    })

    let {data: FAVOURITE_ARTISTS, error} = await supabase
        .from('FAVOURITE_ARTISTS')
        .select('list').eq("id", user.id)

    return {
        props: {
            user,
            SSR_GET_SUBSCRIBED_LIST: GET_SUBSCRIBED_LIST,
            FAVOURITE_ARTISTS,
            fallback: {
                "GET_RANDOM_PLAYED": GET_RECENTLY_PLAYED_TRACK,
                "GET_SEARCH_CATEGORIES": GET_SEARCH_CATEGORIES,
                [unstable_serialize(['api', 'GET_NEW_RELEASES', 'pop', 0])]: GET_NEW_RELEASES,
                [unstable_serialize(["api", "GET_RANDOM_ARTISTS", 0, "a"])]: GET_RANDOM_ARTISTS_LIST,
                [unstable_serialize(['api', 'GET_FAVORITE_ARTISTS', user.id])]: GET_FAVORITE_ARTISTS,
            },
        },
    }
}



