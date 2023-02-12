import {Search} from "./Header/Search";
import {Controller} from "./Header/Controller";
import {Account} from "./Header/Account";
import {NewReleasesAlbumsList} from "./New_Releases_Albums_List/NewReleasesAlbumsList";
import {RecentlyPlayedList} from "./Recently_Played_List/RecentlyPlayedList";
import {FeaturedPlayList} from "./Featured_playList/FeaturedPlayList";
import {Box, Flex, Text, Fade, VStack, HStack, Image, Button} from "@chakra-ui/react";
import {useEffect, useMemo, useState} from "react";
import {SearchBarModal} from "./SearchBarModal"


export const Main = () =>
{

    return (
        <Box position={"relative"}>

            <Box bgGradient={`linear(to-br, pink.900 , blackAlpha.500 , blackAlpha.500 ,blackAlpha.500)`} transition={'1s linear'} w={"full"} h={380} position={'absolute'} />


            {/*HEADER COMPONENTS*/}

            <Flex justify={"space-between"} align={"center"} w={"full"} p={5} >
                <HStack spacing={10}>
                    <Text fontSize={"4xl"} fontWeight={"bold"} color={"whiteAlpha.800"}  zIndex={1000}>Good Afternoon</Text>
                    <SearchBarModal/>
                    {/*<Controller/>*/}
                </HStack>
                    <Account/>
            </Flex>




            <Flex  direction={'column'} justify={"start"} align={'start'}  >
                {/*NEW RELEASES COMPONENTS*/}
                <NewReleasesAlbumsList/>
                {/*RECENTLY PLAYED LIST*/}
                <HStack w={"full"} justify={"center"} p={3}>

                    <Image width={660} height={200} src={'/popularArtist.png'} placeholder={"blur"} blurDataURL={'/popularArtist.png'} />
                    <VStack>
                        <Text>Tell us which artists you like</Text>
                        <Text>We'll create an experience just for you</Text>
                        <Button>Lets go</Button>
                    </VStack>

                </HStack>

                <RecentlyPlayedList/>
            </Flex>

            <FeaturedPlayList/>




        </Box>
    )
}