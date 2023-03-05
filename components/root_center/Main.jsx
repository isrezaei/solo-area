import {Account} from "./Header/Account";
import {NewReleasesAlbumsList} from "./New_Releases_Albums_List/NewReleasesAlbumsList";
import {RecentlyPlayedList} from "./Recently_Played_List/RecentlyPlayedList";
import {FeaturedPlayList} from "./Featured_playList/FeaturedPlayList";
import {Box, Flex, Text, Fade, VStack, HStack, Image, Button, Badge} from "@chakra-ui/react";
import {SearchBarModal} from "./SearchBarModal"
import {FavouriteArtists} from "../FavouriteArtists";

import {SelectGenre} from "./SelectGenre";

export const Main = ({user}) =>
{


    return (
        <>
            <Box position={"relative"} zIndex={'1000'}>
                {/*HEADER COMPONENTS*/}

                <Flex w={"full"} h={150} justify={"space-between"} align={"start"} p={5}  >
                        <HStack spacing={10}>
                            <Text fontSize={"4xl"} fontWeight={"bold"} color={"whiteAlpha.800"}  zIndex={2}>Good Afternoon</Text>
                            <SearchBarModal/>
                        </HStack>
                    <Account/>

                </Flex>


                <Flex  direction={'column'} justify={"start"} align={'center'} gap={5} px={5} >

                    <SelectGenre/>

                    {/*NEW RELEASES COMPONENTS*/}
                    <NewReleasesAlbumsList/>

                    {/*Favourite Artists*/}
                    <FavouriteArtists user={user}/>


                    {/*RECENTLY PLAYED LIST*/}
                    <RecentlyPlayedList/>

                    <FeaturedPlayList/>
                </Flex>


            </Box>
        </>
    )
}