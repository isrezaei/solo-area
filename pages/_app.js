
import {ChakraProvider} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import '/globals.css'
import Layout from "../components/layout";
import {useRouter} from "next/router";
import 'react-indiana-drag-scroll/dist/style.css';
import {theme} from "@chakra-ui/react";
import "@fontsource/karla"
import {ScrollContainer} from "react-scroll-motion";


function MyApp({ Component, pageProps: { session, ...pageProps } }) {

    const router = useRouter()



    return (
        <RecoilRoot>
                <main style={{fontFamily : 'Karla'}}>

                <ChakraProvider theme={theme}>
                    {
                        router.pathname === '/login' ?
                            <Component {...pageProps} /> :
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                    }
                </ChakraProvider>
                </main>
        </RecoilRoot>
    )
}
export default MyApp
