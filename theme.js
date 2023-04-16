import {extendTheme} from '@chakra-ui/react'

export const customTheme = extendTheme({
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

    breakpoints: {
        sm: "10em", //160px
        md: "53em", //848px
        lg: "67em", //1072px
        xl: "85em",//1360
        "2xl": "95em", //1520
        "3xl": "118em", //1880px
    },
})
