import {Sidebar} from "./root_sidebar/Sidebar";
import {Flex, Box , Container} from "@chakra-ui/react";
import {useRouter} from "next/router";


export default function Layout({ children }) {

    const router = useRouter();

    const { pathname } = router;


    return (

        <Container maxW={'1990px'}>
                    <Flex  bg={'blackAlpha.800'} position={"relative"}>
                        {pathname === '/' && <Sidebar/>}
                        {/*{pathname === '/' && <PlayBack/>}*/}
                        <Box flex={8} >
                            {children}
                        </Box>
                    </Flex>
        </Container>
    )
}