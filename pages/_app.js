import { SessionProvider } from "next-auth/react"
import {ChakraProvider} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import '/globals.css'
import Layout from "../components/layout";
import {useRouter} from "next/router";
import 'react-indiana-drag-scroll/dist/style.css';

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

    const router = useRouter()

    return (
        <RecoilRoot>
            <SessionProvider session={session}>
                <ChakraProvider>

                    {
                        router.pathname === '/login' ?
                            <Component {...pageProps} /> :
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                    }
                </ChakraProvider>
            </SessionProvider>
        </RecoilRoot>
    )
}
export default MyApp
