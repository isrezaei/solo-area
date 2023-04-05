import {
    Box,
    ChakraProvider,
    ColorModeProvider,
    ColorModeScript,
    Divider,
    extendTheme,
    HStack,
    Stack
} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import Layout from "../components/layout";
import "@fontsource/karla"
import NextNprogress from 'nextjs-progressbar';
import {createBrowserSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import {useState} from "react";
import {useRouter} from "next/router";
import {PlayBack} from "../components/playBack";
import App from 'next/app';
import Header from "../components/Header";
import {supabase} from "../supabase/createClient";
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";
import {Sidebar} from "../components/Sidebar/Sidebar";
import theme, {customTheme} from "../theme";
import {getSeveralCategories} from "../graphQl/query/api/getSeveralCategories";
import {SWRConfig} from "swr";


function MyApp({Component, pageProps: {session, ...pageProps} , fallback }) {


    const [supabase] = useState(() => createBrowserSupabaseClient({
                supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
                supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_KEY
            }
        )
    )

    return (
        <SessionContextProvider supabaseClient={supabase} initialSession={pageProps.initialSession}>
            <RecoilRoot>
                <main style={{fontFamily: 'Karla'}}>
                    <NextNprogress color={'#46986f'} height={3}/>
                    <ChakraProvider theme={customTheme}>
                        <ColorModeProvider options={{initialColorMode: "dark", useSystemColorMode: false}}>
                            <Layout>
                                <HStack  align={'flex-start'} >
                                    <SWRConfig value={{fallback}}>
                                        <ApolloProvider client={DataBaseClient}>
                                            <Sidebar/>
                                        </ApolloProvider>
                                        <Stack w={"full"}>
                                            <Header/>
                                            <Component {...pageProps} />
                                        </Stack>
                                    </SWRConfig>
                                </HStack>
                            </Layout>
                        </ColorModeProvider>
                    </ChakraProvider>
                </main>
            </RecoilRoot>
        </SessionContextProvider>

    )
}

MyApp.getInitialProps = async (ctx) => {
    const users = "Hello"

    const GET_SEARCH_CATEGORIES = await getSeveralCategories()

    return {
        fallback : {
            "GET_SEARCH_CATEGORIES": GET_SEARCH_CATEGORIES,
        }
    }
}



export default MyApp




