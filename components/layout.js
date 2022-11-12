import {Sidebar} from "./root_sidebar/Sidebar";
import {Flex , Box} from "@chakra-ui/react";
import {AlbumsInfo} from "./pages/new_releases_albums_track/AlbumsInfo";
import {PlayBack} from "./root_center/PlayBack";


export default function Layout({ children }) {
    return (
        <Box>
        <Flex>
            <Sidebar/>
            <Box flex={8}>
                {children}
            </Box>
        </Flex>
            <PlayBack/>
        </Box>
    )
}