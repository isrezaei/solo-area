import {Skeleton, SkeletonText, Stack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import {useRecoilValue} from "recoil";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";

const MetaData = () => {
    const trackInfo = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM);
    return (
        <>
            {!trackInfo && (
                <Skeleton
                    rounded={"md"}
                    boxSize={35}
                    startColor="#212121"
                    endColor="#424242"
                />
            )}
            {trackInfo && (
                <Stack w={{sm: 45, md: 55}} h={{sm: 45, md: 55}} overflow={"hidden"} position={"relative"}>
                    <Image
                        layout={"fill"}
                        objectFit={"cover"}
                        src={trackInfo?.images[1].url}
                    />
                </Stack>
            )}

            <VStack spacing={0} align={"center"}>
                {!trackInfo && (
                    <SkeletonText
                        boxSize={120}
                        height={4}
                        noOfLines={2}
                        spacing="1"
                        startColor="#212121"
                        endColor="#424242"
                    />
                )}
                {trackInfo && (
                    <VStack align={"start"} spacing={0}>
                        <Text
                            overflow={"hidden"}
                            whiteSpace={"nowrap"}
                            textOverflow={"ellipsis"}
                            w={95}
                            fontSize={"sm"}
                            fontWeight={"bold"}
                        >
                            {trackInfo.name}
                        </Text>
                        <Text fontSize={"xs"} color={"whiteAlpha.800"}>
                            {trackInfo?.artists[0].name}
                        </Text>
                    </VStack>
                )}
            </VStack>
        </>
    );
};

export default MetaData;