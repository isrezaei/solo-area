
import {ChakraProvider} from "@chakra-ui/react";
import {RecoilRoot} from "recoil";
import '/globals.css'
import Layout from "../components/layout";
import {useRouter} from "next/router";
import 'react-indiana-drag-scroll/dist/style.css';
import {theme} from "@chakra-ui/react";
import "@fontsource/karla"
import NextNprogress from 'nextjs-progressbar';
import {DraggableCore} from 'react-draggable'

function MyApp({ Component, pageProps: { session, ...pageProps } }) {

    const router = useRouter()




    return (
        <RecoilRoot>
                <main style={{fontFamily : 'Karla'}}>
                <NextNprogress color={'#589846'} height={7}/>
                <ChakraProvider theme={theme}>
                            <Layout>
                                    <Component {...pageProps} />
                            </Layout>
                </ChakraProvider>
                </main>
        </RecoilRoot>
    )
}
export default MyApp
