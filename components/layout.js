import {Sidebar} from "./root_sidebar/Sidebar";
import {Flex, Box, useColorModeValue} from "@chakra-ui/react";
import {PlayBack} from "./PlayBack";
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {LOGIN_TOKEN_ATOM} from "../atoms/atoms";
import Login from "./login";
import {ScrollContainer} from "react-scroll-motion";


export default function Layout({ children }) {

    const bg = useColorModeValue('blackAlpha.50', 'blackAlpha.800')

    const LOGIN_TOKEN = useRecoilValue(LOGIN_TOKEN_ATOM)

    if (!LOGIN_TOKEN) return <Login/>


    return (


            <Flex  bg={bg}>

                <Sidebar/>

                <Box flex={8}>
                    {children}
                </Box>

                <PlayBack/>
            </Flex>

    )
}