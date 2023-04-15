import {AbsoluteCenter, Box, HStack, Icon, Skeleton, SkeletonText, Stack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {CgPlayButtonO} from "react-icons/cg";
import prettyMilliseconds from "pretty-ms";
import {useSetRecoilState} from "recoil";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";


const TopTenMusic = ({trackInfo : {duration_ms, name, id , preview_url , album: { artists, images }}}) => {

    const setTrackForPlay = useSetRecoilState(SPOTIFY_TRACKS_ID_ATOM)

    const handelPlay = () => {
        setTrackForPlay({name , preview_url , id , artists , images , duration_ms})
    }


    return (
        <Stack
            direction={{sm : "column" , md : "row"}}
            justify={"center"}
            align={"center"}
            p={{sm : 2 , md :2}}
            mx={{sm : 2 , md : 0}}
            rounded={{sm : 30 , md : 50}}
            bg={"whiteAlpha.200"}>
            <Box role={"group"} position={"relative"}>
                    <Box
                        w={{sm : 90 , md : 50}}
                        h={{sm : 90 , md : 50}}
                        rounded={"full"}
                        overflow={"hidden"}
                        position={"relative"}
                        _groupHover={{ opacity: "30%" }}
                        transition={".2s"}
                    >
                        <Image
                            placeholder={"blur"}
                            blurDataURL={images[2].url}
                            src={images[1].url}
                            layout={"fill"}
                            objectFit={"cover"}/>

                    </Box>
                <AbsoluteCenter>
                    <Icon
                        display={"none"}
                        cursor={"pointer"}
                        _groupHover={{ display: "block" }}
                        fontSize={{sm : 45 , md : 25}}
                        as={CgPlayButtonO}
                        onClick={handelPlay}
                    />
                </AbsoluteCenter>
            </Box>

            <Stack spacing={{sm : 1 , md : 0}} w={"full"} justify={"center"} align={{sm : "center" , md : "flex-start"}}>
                    <Text  noOfLines={1} fontWeight={"bold"} fontSize={{sm : 10 , md : "md"}}>
                        {name}
                    </Text>
                    <Text noOfLines={2}  fontSize={{sm : 8 , md : "xs"}}>
                        {artists?.[0]?.name} {artists?.[1]?.name}
                    </Text>
                    <Text  noOfLines={2}  fontSize={{sm : 8 , md : "xs"}}>
                        {prettyMilliseconds(duration_ms, {
                            secondsDecimalDigits: 0,
                            colonNotation: true,
                        })}
                    </Text>
            </Stack>
        </Stack>
    );
};

export default TopTenMusic;