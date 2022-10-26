import { SessionProvider } from "next-auth/react"
import {ChakraProvider} from "@chakra-ui/react";
import { extendTheme } from '@chakra-ui/react'
import '/globals.css'

//!MAYBE NEEDED
const colors = {

    styles : {
        global : {
            'body' : {
                background : 'red'
            }
        }
    }

}
const theme = extendTheme({ colors })


function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
      <SessionProvider session={session}>
          <ChakraProvider theme={theme}>
              <Component {...pageProps} />
          </ChakraProvider>
      </SessionProvider>
  )
}
export default MyApp
