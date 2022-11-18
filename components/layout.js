import {Sidebar} from "./root_sidebar/Sidebar";
import {Flex, Box, useColorModeValue} from "@chakra-ui/react";
import {PlayBack} from "./PlayBack";



export default function Layout({ children }) {
    const bg = useColorModeValue('blackAlpha.50', 'blackAlpha.800')
    return (
        <Box bg={bg}>
        <Flex>
            <Sidebar/>
            <Box flex={8}>
                {children}
            </Box>
            <PlayBack/>
        </Flex>
        </Box>
    )
}