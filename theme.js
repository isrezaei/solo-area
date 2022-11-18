import { extendTheme } from '@chakra-ui/react'

const theme = {
    config : {
        initialColorMode: 'dark',
        useSystemColorMode: false,
    },
    styles: {
        global: {
             body : {
                margin : 0,
                padding : 0,
            },
        },
    },
}




export default  extendTheme({ theme })