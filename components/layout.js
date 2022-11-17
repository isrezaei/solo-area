import {Sidebar} from "./root_sidebar/Sidebar";
import {Flex , Box} from "@chakra-ui/react";
import {PlayBack} from "./PlayBack";



export default function Layout({ children }) {
    return (
        <Box>
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