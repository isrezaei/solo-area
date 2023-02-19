import {Sidebar} from "./root_sidebar/Sidebar";
import {Flex, Box, useColorModeValue, Container, Center} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {LOGIN_TOKEN_ATOM} from "../atoms/atoms";
import Login from "./login";
import {PlayBack} from "./playBack";
import {useRouter} from "next/router";
import { Auth, ThemeSupa , ThemeMinimal} from '@supabase/auth-ui-react'
import { useSession, useSupabaseClient , useUser} from '@supabase/auth-helpers-react'


export default function Layout({ children }) {

    const session = useSession()
    const supabase = useSupabaseClient()
    const user = useUser()

    const router = useRouter();

    const { pathname } = router;


    return (

        <Container maxW={'1990px'}>
                    <Flex  bg={'blackAlpha.800'} position={"relative"}>
                        {pathname === '/' && <Sidebar/>}
                        {pathname === '/' && <PlayBack/>}
                        <Box flex={8} >
                            {children}
                        </Box>
                    </Flex>
        </Container>
    )
}