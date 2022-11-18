import {Search} from "./Header/Search";
import {Controller} from "./Header/Controller";
import {Account} from "./Header/Account";
import {NewReleasesAlbumsList} from "./New_Releases_Albums_List/NewReleasesAlbumsList";
import {RecentlyPlayedList} from "./Recently_Played_List/RecentlyPlayedList";
import {Box, Flex} from "@chakra-ui/react";


export const Main = () =>
{
    return (
        <Box flex={8} p={4}>
            {/*HEADER COMPONENTS*/}
            <Flex>
                <Search/>
                <Controller/>
                <Account/>
            </Flex>
            {/*NEW RELEASES COMPONENTS*/}
            <NewReleasesAlbumsList/>
            {/*RECENTLY PLAYED LIST*/}
            <RecentlyPlayedList/>

        </Box>
    )
}