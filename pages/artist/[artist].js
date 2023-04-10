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


export default function artist({fallback, SSR_GET_SUBSCRIBED_LIST}) {

    const [isOpen, setIsOpen] = useState(false);

    return (
        <ApolloProvider client={DataBaseClient}>
            <SWRConfig value={{fallback}}>
                <Box display={{sm: "block", md: "none"}} position={"relative"} zIndex={2000}>
                    <Button size={"sm"} position={"absolute"} onClick={() => setIsOpen(prev => !prev)}>O</Button>
                    <Hamburger SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST} setIsOpen={setIsOpen} isOpen={isOpen}/>
                </Box>
                <HStack overflowY={"scroll"} h={"100svh"} align={'flex-start'} position={"relative"}>
                    <Stack display={{base: "none", md: "flex"}} w={{sm: 0, md: 265}} zIndex={1000} position={"sticky"} top={0}>
                            <Sidebar SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>
                    </Stack>
                    <Stack flex={1}
                           px={{sm: 0, md: 5}}
                           h={"100vh"}
                           overflowY={"scroll"}
                           overflowX={"hidden"}>
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

    return {
        props: {
            fallback: {
                [unstable_serialize(['api', 'GET_ARTISTS_INFO', artistId])]: GET_ARTIST_INFO,
            },
            SSR_GET_SUBSCRIBED_LIST: GET_SUBSCRIBED_LIST
        }
    }
}