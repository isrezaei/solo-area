import {ChakraProvider, ColorModeProvider,} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import Layout from "../components/layout";
import {createBrowserSupabaseClient, createServerSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import {useState} from "react";
import {useRouter} from "next/router";
import {customTheme} from "../theme";
import NextNprogress from 'nextjs-progressbar';
import "@fontsource/karla"
import "@fontsource/acme"

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




