import {Account} from "./Header/Account";
import {NewReleasesAlbums} from "../NewReleasesAlbums";
import {RandomPlayed} from "../RandomPlayed";
import {FeaturedPlayList} from "./Featured_playList/FeaturedPlayList";
import {Box, Flex, Text, Fade, VStack, HStack, Image, Button, Badge} from "@chakra-ui/react";
import {SearchBarModal} from "./SearchBarModal"
import {FavouriteArtists} from "../FavouriteArtists";

import {SelectGenre} from "./SelectGenre";
import {useQuery} from "@apollo/client";
import {query} from "../../graphQl/query/getNewReleasesAlbums";
import {Sidebar} from "../Sidebar";

export const Main = ({user}) =>
{

    // const { loading : Q , error : P, data : N } = useQuery(query);


    return (
            <Box position={"relative"} zIndex={'1000'}>
                {/*HEADER COMPONENTS*/}

                <Flex w={"full"} h={150} justify={"space-between"} align={"start"} p={5}  >
                        <HStack spacing={10}>
                            <Text fontSize={"4xl"} fontWeight={"bold"} color={"whiteAlpha.800"}  zIndex={2}>Good morning</Text>
                            <SearchBarModal/>
                        </HStack>
                    <Account/>

                </Flex>
                    <Flex  direction={'column'} justify={"start"} align={'center'} gap={5} px={5} >

                        <SelectGenre/>

                        {/*NEW RELEASES COMPONENTS*/}
                        <NewReleasesAlbums/>

                        {/*Favourite Artists*/}
                        <FavouriteArtists user={user}/>


                        {/*RECENTLY PLAYED LIST*/}
                        <RandomPlayed/>

                        {/*<FeaturedPlayList/>*/}
                    </Flex>
            </Box>
    )
}