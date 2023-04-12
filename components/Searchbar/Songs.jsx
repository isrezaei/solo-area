import {Box, HStack, Icon, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import prettyMilliseconds from "pretty-ms";
import {useSetRecoilState} from "recoil";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";
import {CgPlayButtonO} from "react-icons/cg";

const Songs = ({tracks}) => {

    const setTrackForPlay = useSetRecoilState(SPOTIFY_TRACKS_ID_ATOM)

    const handelPlay = (name , preview_url , id , artists , images , duration_ms) => {
        setTrackForPlay({name , preview_url , id , artists , images , duration_ms})
    }


    return (
        <VStack flex={1}>
            <Text w={"full"} fontSize={{sm : 20 , md : 30}} fontWeight="bold" color="whiteAlpha.700">
                Songs
            </Text>
            <VStack w="full" h={450} overflowY={{sm : "visible" , md : "scroll"}}
                    sx={{
                        "&::-webkit-scrollbar": {
                            width: "0",
                            height: "0",
                        },
                        scrollbarWidth: "none",
                        "-ms-overflow-style": "none",
                    }}>
                {tracks?.items.map((song) => {

                    console.log(song)

                    return (
                        <HStack
                            key={song.id}
                            w="full"
                            bg={{sm : "none" , md : "whiteAlpha.200"}}
                            justify="space-between"
                            align="center"
                            p={2}
                        >
                            <HStack justify="center" align="center">
                                <Box
                                    w={50}
                                    h={50}
                                    position="relative"
                                    overflow="hidden"
                                >
                                    <Image
                                        layout="fill"
                                        src={song.album.images[1].url}
                                        placeholder={"blur"}
                                        blurDataURL={song.album.images[2].url}
                                    />
                                </Box>
                                <Box>
                                    <Text
                                        fontSize="sm"
                                        w={{sm : 75 , md : 200}}
                                        fontWeight="bold"
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                    >
                                        {song.name}
                                    </Text>

                                    <Text
                                        fontSize="xs"
                                        w={{sm : 50 , md : 200}}
                                        textOverflow="ellipsis"
                                        whiteSpace="nowrap"
                                        overflow="hidden"
                                    >
                                        {song.artists[0].name}
                                    </Text>
                                </Box>
                            </HStack>
                            <Icon
                                onClick={() => handelPlay(song.name , song.preview_url , song.id , song.artists ,song.album.images ,song.duration_ms)}
                                cursor={"pointer"}
                                _groupHover={{ display: "block" }}
                                fontSize={{sm : 23 , md : 25}}
                                as={CgPlayButtonO}
                            />
                            <Text fontSize="xs">
                                {prettyMilliseconds(song.duration_ms, {
                                    secondsDecimalDigits: 0,
                                    colonNotation: true,
                                })}
                            </Text>
                        </HStack>
                    )

                })}
            </VStack>
        </VStack>
    );
};

export default Songs;
