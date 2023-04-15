import {Artist} from "../../components/Artist/Artist";
import {getArtistInformation} from "../../graphQl/query/api/getArtistInformation";
import {unstable_serialize} from "swr";
import {SWRConfig} from "swr";
import {Sidebar} from "../../components/Sidebar/Sidebar";
import {Box, Button, HStack, Stack} from "@chakra-ui/react";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../../graphQl/client/client";
import Hamburger from "../../components/HamburgerMenu/Hamburger";
import MainHeader from "../../components/Header/MainHeader";
import {getSubscribeQuery} from "../../graphQl/query/database/getSubscribedList";
import {createServerSupabaseClient} from "@supabase/auth-helpers-nextjs";
import {useState} from "react";
import Image from "next/image";
import {getRandomPlayed} from "../../graphQl/query/api/getRandomPlayed";
import {getSeveralCategories} from "../../graphQl/query/api/getSeveralCategories";
import Head from "next/head";


export default function artist({fallback, SSR_GET_SUBSCRIBED_LIST}) {


    return (
        <ApolloProvider client={DataBaseClient}>

            <Head>
                <title>Artists</title>
            </Head>

            <SWRConfig value={{fallback}}>

                <Box display={{sm: "block", md: "none"}} position={"relative"} zIndex={3000}>
                    <Hamburger SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>
                </Box>

                <HStack overflowY={"scroll"}  h={"100vh"} align={'flex-start'} position={"relative"}>

                    <Stack display={{base: "none", md: "flex"}} w={{sm: 0, md: 265}} zIndex={1000} position={"sticky"} top={0}>
                            <Sidebar SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>
                    </Stack>

                    <Stack flex={1}
                           px={{sm: 0, md: 5}}
                           h={"100vh"}
                           overflowY={"auto"}

                           sx={{
                               "&::-webkit-scrollbar": {
                                   display : "none"
                               },
                               scrollbarWidth: "none",
                               "-ms-overflow-style": "none",
                           }}>
                        <MainHeader/>
                        <Artist/>
                    </Stack>
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