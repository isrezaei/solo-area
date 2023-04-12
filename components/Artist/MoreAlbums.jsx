import {Box, HStack, Text, VStack, Stack, Flex} from "@chakra-ui/react";

import Image from "next/image";


import { ScrollContainer } from 'react-indiana-drag-scroll';
import 'react-indiana-drag-scroll/dist/style.css'

const MoreAlbums = ({getAlbumsOfArtist, getArtistInfo, setOpen}) => {


    return (
        <Box w={"full"} zIndex={1000}>

            <Stack direction={{sm: "column", md: "row"}} w={"full"} justify={"space-between"} align={"center"} my={5}>
                <Text
                    align={"left"}
                    fontSize={{sm: 20, md: 45}}
                    fontWeight={"bold"}
                    noOfLines={1}
                >
                    More albums from {getArtistInfo.name}
                </Text>
                <Text fontSize={"sm"} onClick={() => setOpen((prevState) => !prevState)}>SHOW ALL</Text>
            </Stack>


            <Stack w={"full"} h={240} position={"relative"}>
                <Box w={"full"} position={"absolute"} overflow={"hidden"}>
                    <ScrollContainer style={{display: "flex"}}>
                        {getAlbumsOfArtist.items.slice(0, 8).map((albums) => (
                            <VStack key={albums.id} spacing={0} align={"center"} justify={"center"}>
                                <Box
                                    key={albums.id}
                                    w={{sm: 190, md: 190}}
                                    h={{sm: 190, md: 190}}
                                    rounded={"sm"}
                                    overflow={"hidden"}
                                    position={"relative"}
                                >
                                    <Image
                                        src={albums.images[0].url}
                                        layout={"fill"}
                                        objectFit={"cover"}
                                        placeholder={"blur"}
                                        blurDataURL={albums.images[2].url}
                                    />
                                </Box>

                                <Text
                                    w={200}
                                    whiteSpace={"nowrap"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    textAlign={"center"}
                                    fontWeight={"bold"}
                                    fontSize={15}
                                    color={"whitesmoke"}
                                >
                                    {albums.name}
                                </Text>

                                <HStack>
                                    <Text fontWeight={"bold"} fontSize={"sm"} color={"#9e9e9e"}>
                                        {albums.release_date.slice(0, 4)}
                                    </Text>
                                    <Text fontWeight={"bold"} fontSize={12} color={"#9e9e9e"}>
                                        {albums.type}
                                    </Text>
                                </HStack>

                            </VStack>
                        ))}
                    </ScrollContainer>
                </Box>
            </Stack>


        </Box>
    );
};

export default MoreAlbums;
