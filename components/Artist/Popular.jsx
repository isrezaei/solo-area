import {AbsoluteCenter, Box, HStack, Icon, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import prettyMilliseconds from "pretty-ms";
import {useSetRecoilState} from "recoil";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";
import {CgPlayButtonO} from "react-icons/cg";

const Popular = ({getArtistTopTracks}) => {

    const setTrackForPlay = useSetRecoilState(SPOTIFY_TRACKS_ID_ATOM)

    const handelPlay = (name , preview_url , id , artists , images , duration_ms) => {
        setTrackForPlay({name , preview_url , id , artists , images , duration_ms})
    }


    return (
        <VStack w={"full"} spacing={3} zIndex={1000}>
            <Text
                w={"full"}
                fontSize={{sm : 20 , md : 45}}
                fontWeight={"bold"}>
                Popular
            </Text>
            {getArtistTopTracks.tracks.slice(0, 5).map((track, index) => {

                console.log(track)

                return (
                    <HStack
                        key={track.id}
                        w={"full"}
                        px={{sm : 3 , md : 3}}
                        py={2}
                        justify={"space-between"}
                        align={"center"}
                        bg={"whiteAlpha.200"}
                    >

                        <HStack>
                            <Text w={5}>{index + 1}</Text>
                            <Box
                                w={{sm : 65 , md : 70}}
                                h={{sm : 65 , md : 70}}
                                position={"relative"}
                                _groupHover={{ opacity: "30%" }}
                                overflow={"hidden"}
                            >
                                <Image
                                    layout={"fill"}
                                    objectFit={"cover"}
                                    src={track.album?.images?.[1]?.url}
                                    placeholder={"blur"}
                                    blurDataURL={track.album?.images?.[2]?.url}
                                />
                            </Box>




                            <Box align={"start"}>
                                <Text
                                    w={210}
                                    fontSize={15}
                                    noOfLines={1}
                                    fontWeight={"bold"}
                                    color={"whiteAlpha.800"}
                                >
                                    {track.album?.name}
                                </Text>
                                <Text w={210} fontSize={12} color={"whiteAlpha.600"}>
                                    {track.album?.artists?.[0]?.name}
                                </Text>
                            </Box>
                        </HStack>

                        <Text w={200} display={{sm : "none" , md : "flex"}} fontSize={13} noOfLines={1} color={"whiteAlpha.800"}>
                            {track.album?.name}
                        </Text>

                        <Icon
                            onClick={() => handelPlay(track.name , track.preview_url , track.id , track.album.artists ,track.album.images ,track.duration_ms)}
                            cursor={"pointer"}
                            _groupHover={{ display: "block" }}
                            fontSize={{sm : 23 , md : 25}}
                            as={CgPlayButtonO}
                        />

                        <Text fontSize={13} color={"whiteAlpha.800"}>
                            {prettyMilliseconds(track.duration_ms, {
                                secondsDecimalDigits: 0,
                                colonNotation: true,
                            })}
                        </Text>
                    </HStack>
                );
            })}
        </VStack>
    );
};

export default Popular;
