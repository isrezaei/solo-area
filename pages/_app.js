import {ChakraProvider, extendTheme} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import Layout from "../components/layout";
import 'react-indiana-drag-scroll/dist/style.css';
import "@fontsource/karla"
import NextNprogress from 'nextjs-progressbar';
import {createBrowserSupabaseClient} from '@supabase/auth-helpers-nextjs'
import {SessionContextProvider} from '@supabase/auth-helpers-react'
import {useState} from "react";
import {useRouter} from "next/router";
import {PlayBack} from "../components/playBack";


function MyApp({Component, pageProps: {session, ...pageProps}}) {

    const {pathname} = useRouter();


    const customTheme = extendTheme({
        styles: {
            global: {
                body: {
                    background: 'black'
                },
                "::-webkit-scrollbar": {
                    width: "6px",
                    height: "6px",
                },
                "::-webkit-scrollbar-track": {
                    bg: "transparent",
                },
                "::-webkit-scrollbar-thumb": {
                    bg: "whiteAlpha.500",
                    borderRadius: "full",
                },
                "::-webkit-scrollbar-thumb:hover": {
                    bg: "gray.600",
                },
            },
        },

        colors: {
            black : {
                500: "rgba(0, 0, 0, 0.36)",
                800: "rgba(0, 0, 0, 0.80)",
            },
        },


        breakpoints: {
            sm: "20em",
            md: "30em",
            lg: "48em",
            xl: "62em",
            xxl : "80em",
            xxxl: "118em", // add your custom breakpoint here
        },

    })

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
                    <NextNprogress color={'#589846'} height={5}/>
                    <ChakraProvider theme={customTheme}>
                        <Layout>
                            <Component {...pageProps} />
                            {/*<PlayBack/>*/}
                        </Layout>
                    </ChakraProvider>
                </main>
            </RecoilRoot>
        </SessionContextProvider>

    )
}

export default MyApp


