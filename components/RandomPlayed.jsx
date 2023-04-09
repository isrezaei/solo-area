import useSWR from "swr";
import {
    Box,
    Flex,

    Text,
    VStack,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    Center, Stack, Grid,
} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {useState} from "react";
import {Icon} from "@chakra-ui/react";
import {HiDotsHorizontal} from "react-icons/hi";
import {RiPlayFill} from "react-icons/ri";
import {useRouter} from "next/router";
import {SPOTIFY_TRACKS_ID_ATOM} from "../atoms/atoms";
import Image from "next/image";
import {getRandomPlayed} from "../graphQl/query/api/getRandomPlayed";

import {Swiper, SwiperSlide} from "swiper/react";
import {Grid as swiperGrid, Pagination} from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import {ScrollContainer} from "react-indiana-drag-scroll";
import Artists from "./FavouriteArtists/Artists";


export const RandomPlayed = () => {
    const router = useRouter();

    const {data: {randomPlayed: {items: randomPlayedList} = []} = {}} =
        useSWR("GET_RANDOM_PLAYED", async () => await getRandomPlayed());

    const [activePlaying, setActivePlaying] = useState();

    const [trackID, setTrackID] = useRecoilState(SPOTIFY_TRACKS_ID_ATOM);

    const PLAY_TRACK = async (trackID) => {
        //?She's going to take a song ID and bring
        const TRACK = await FETCH_TRACK(trackID);

        //? ID from get track
        setActivePlaying(TRACK.id);
        setTrackID(TRACK.id);
    };

    //? This render we don't have track uri
    const RENDER = randomPlayedList.map(({track}) => {
        return (
                <Flex
                    w={{base: "full", md: "1xs"}}
                    justify={"space-evenly"}
                    align={"center"}
                    bg={"whiteAlpha.200"}
                    _hover={{bg: "whiteAlpha.300", transition: ".3s"}}
                    cursor={"pointer"}
                    role={"group"}
                    mr={{sm : 3 , md : 0}}
                >
                    <Box
                        position={"relative"}
                        w={{sm : 81 , md : 59}}
                        h={{sm : 81 , md : 59}}
                        roundedLeft={5}
                        overflow={"hidden"}
                    >
                        <Image
                            layout={"fill"}
                            sizes={"fill"}
                            placeholder={"blur"}
                            blurDataURL={track?.album?.images?.[2].url}
                            src={track?.album?.images?.[1].url}
                            loading={"lazy"}
                            alt={track.name}
                        />
                    </Box>

                    <Flex flex={2} mx={3} direction={"column"}>
                        <Text
                            w={150}
                            color={"whiteAlpha"}
                            fontWeight={"bold"}
                            whiteSpace={"nowrap"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                        >
                            {track.name}
                        </Text>
                        <Text fontSize={"xs"} color={"whiteAlpha.500"}>
                            {track.artists[0].name}
                        </Text>
                    </Flex>

                    <Center
                        flex={3}
                        onClick={() => PLAY_TRACK(track.id)}
                        opacity={track.id === activePlaying ? "100%" : "0%"}
                        pointerEvents={track.id === activePlaying ? "visible" : "none"}
                        transition={".5s"}
                        _groupHover={{opacity: "100%", pointerEvents: "auto"}}
                    >
                        <Icon boxSize={25} as={RiPlayFill} color={"whiteAlpha.600"}/>
                    </Center>

                    <Box flex={2}>
                        <Menu>
                            <MenuButton>
                                <Icon color={"whiteAlpha.500"} as={HiDotsHorizontal}/>
                            </MenuButton>
                            <MenuList bg={"blackAlpha.900"}>
                                <MenuItem>Add to queue</MenuItem>
                                <MenuDivider/>
                                <MenuItem
                                    onClick={() => router.push(`/artist/${track.artists[0].id}`)}
                                >
                                    Go to artist
                                </MenuItem>
                                <MenuItem>Got to albums</MenuItem>
                                <MenuDivider/>
                                <MenuItem>Save to your Liked Songs </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </Flex>

        );
    });

    return (
        <>
            <VStack w={"full"} align={"start"}>
                <Text
                    w={"full"}
                    fontSize={{sm: 20, md: 40}}
                    fontWeight={"bold"}
                    color={"whiteAlpha.600"}
                >
                    Random Should be ok ?
                </Text>

                <Stack    display={{sm : "flex" , md : "none"}} w={"full"} h={{sm : 175 , md : 190}} position={"relative"}>
                    <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                        <ScrollContainer style={{display : "flex" }}>
                            {RENDER}
                        </ScrollContainer>
                    </Flex>
                </Stack>


                <Grid
                    display={{sm : "none" , md : "grid"}}
                    w={"full"}
                    templateColumns={{ sm: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
                    gap={4}
                >
                  {RENDER}
                </Grid>
            </VStack>

        </>
    );
};
