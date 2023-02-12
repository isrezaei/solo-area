import { Html, Head, Main, NextScript } from 'next/document'
import theme from "../theme";
import {ColorModeScript, useColorModeValue} from "@chakra-ui/react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Home</title>
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
            </Head>
            <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main/>
            <NextScript />
            </body>
        </Html>
)
}