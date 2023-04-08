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
import {ApolloProvider} from "@apollo/client";
import {DataBaseClient} from "../graphQl/client/client";
import {Sidebar} from "../components/Sidebar/Sidebar";
import theme, {customTheme} from "../theme";
import {getSeveralCategories} from "../graphQl/query/api/getSeveralCategories";
import {SWRConfig} from "swr";
import {getSubscribeQuery} from "../graphQl/query/database/getSubscribedList";
import {NextResponse , NextRequest} from "next/server";
import {supabase} from "../supabase/createClient";


function MyApp({Component, pageProps: {session , ...pageProps}}) {

    const router = useRouter()

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
                                <Component {...pageProps} />
                            </Layout>
                        </ColorModeProvider>
                    </ChakraProvider>
                </main>
            </RecoilRoot>
        </SessionContextProvider>

    )
}


export default MyApp




