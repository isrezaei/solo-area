import { Html, Head, Main, NextScript } from 'next/document'
import theme from "../theme";
import {ColorModeScript, useColorModeValue} from "@chakra-ui/react";

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <title>Home</title>
            </Head>
            <body>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <Main/>
            <NextScript />
            </body>
        </Html>
)
}