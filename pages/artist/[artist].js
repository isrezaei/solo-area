import {Artist} from "../../components/Artist/Artist";
import {getArtistInformation} from "../../graphQl/query/api/getArtistInformation";
import {SWRConfig, unstable_serialize} from "swr";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {Box, HStack, Stack} from "@chakra-ui/react";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../../graphQl/client/client";
import Hamburger from "../../components/HamburgerMenu/Hamburger";
import Header from "../../components/Header/Header";
import {getSubscribeQuery} from "../../graphQl/query/database/getSubscribedList";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {getSeveralCategories} from "../../graphQl/query/api/getSeveralCategories";
import Head from "next/head";
import BgImage from "../../components/Artist/BgImage";


export default function artist({fallback, SSR_GET_SUBSCRIBED_LIST}) {

    return (
        <ApolloProvider client={DataBaseClient}>

            <Head>
                <title>Artists</title>
            </Head>

            <SWRConfig value={{fallback}}>

                <BgImage/>

                <Box display={{sm: "block", md: "block", lg: "block", xl: "none"}} position={"relative"}>
                    <Hamburger SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>
                </Box>


                <HStack
                    w={"full"}
                    h={"100svh"}
                    overflowY={"scroll"}
                    justify={"center"}
                    align={'flex-start'}
                    position={"relative"}>

                    <Stack display={{sm: "none", md: "none", lg: "none", xl: "flex"}} w={{sm: 0, md: 265}}
                           position={"sticky"} top={0} zIndex={1000}>
                        <Sidebar SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>
                    </Stack>

                    <Box flex={1}
                         px={{sm: 0, md: 5}}
                         maxW={{sm: "full", md: 848, lg: 1072, xl: 1990}}
                         h={"100vh"}
                         overflowY={"scroll"}
                         sx={{
                             "&::-webkit-scrollbar": {
                                 display: "none"
                             },
                             scrollbarWidth: "none",
                             "-ms-overflow-style": "none",
                         }}>
                        <Header/>
                        <Artist/>
                    </Box>

                </HStack>
            </SWRConfig>

        </ApolloProvider>
    )
}


export const getServerSideProps = async ({req, res, params: {artist: artistId}}) => {
    const GET_ARTIST_INFO = await getArtistInformation(artistId)

    const supabaseServerClient = createServerSupabaseClient({req, res}, {
        supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
        supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY
    })
    const {data: {session: {user}}} = await supabaseServerClient.auth.getSession()
    const {data: {GET_SUBSCRIBED_LIST}} = await DataBaseClient.query({
        query: getSubscribeQuery,
        variables: {userId: user.id}
    })

    const GET_SEARCH_CATEGORIES = await getSeveralCategories()

    return {
        props: {
            fallback: {
                "GET_SEARCH_CATEGORIES": GET_SEARCH_CATEGORIES,
                [unstable_serialize(['api', 'GET_ARTISTS_INFO', artistId])]: GET_ARTIST_INFO,
            },
            SSR_GET_SUBSCRIBED_LIST: GET_SUBSCRIBED_LIST
        }
    }
}