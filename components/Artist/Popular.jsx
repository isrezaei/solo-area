import React from 'react';
import {Box, HStack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";
import prettyMilliseconds from "pretty-ms";

const Popular = ({getArtistTopTracks}) => {
    return (
        <VStack  w={"full"}  spacing={3} zIndex={1000}>
            <Text w={"full"} fontSize={45} fontWeight={"bold"} color={"whiteAlpha.700"}>Popular</Text>
            {
                getArtistTopTracks.tracks.slice(0 ,5).map((track , index) => {
                    return (
                        <HStack key={track.id} w={"full"} px={3} py={2} justify={"space-between"} align={'center'} rounded={'lg'} bg={'whiteAlpha.200'}>
                            <HStack>
                                <Text w={5}>{index + 1}</Text>
                                <Box w={50} h={50} position={"relative"} rounded={5} overflow={"hidden"}  >
                                    <Image layout={"fill"} style={{position : "absolute"}} objectFit={"cover"} src={track.album?.images?.[1]?.url} placeholder={"blur"} blurDataURL={track.album?.images?.[2]?.url}/>
                                </Box>
                                <Box align={'start'}>
                                    <Text fontSize={15} noOfLines={1} fontWeight={"bold"} color={'whiteAlpha.800'}>{track.album?.name}</Text>
                                    <Text fontSize={12} color={'whiteAlpha.600'}>{track.album?.artists?.[0]?.name}</Text>
                                </Box>
                            </HStack>
                            <Text fontSize={13} noOfLines={1} color={'whiteAlpha.800'}>{track.album?.name}</Text>
                            <Text fontSize={13} color={'whiteAlpha.800'}>{prettyMilliseconds(track.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}</Text>
                        </HStack>
                    )
                })
            }
        </VStack>
    );
};

export default Popular;