import {Box, HStack, Text, VStack, Stack, Flex} from "@chakra-ui/react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import Image from "next/image";

const MoreAlbums = ({ getAlbumsOfArtist, getArtistInfo, setOpen }) => {
  return (
    <VStack w={"full"} zIndex={1000}>

      <Stack direction={{sm : "column" , md : "row"}} w={"full"} justify={"space-between"} align={"center"} my={5}>
        <Text
          align={"left"}
          fontSize={{sm : 20 , md : 45}}
          fontWeight={"bold"}
          noOfLines={1}
        >
          More albums from {getArtistInfo.name}
        </Text>
        <Text fontSize={"sm"} onClick={() => setOpen((prevState) => !prevState)}>SHOW ALL</Text>
      </Stack>


        <Stack  w={"full"} h={250} position={"relative"}>
            <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                <ScrollContainer style={{display: "flex"}}>
                    {getAlbumsOfArtist.items.slice(0, 8).map((albums) => (
                        <VStack
                            key={albums.id}
                            flex={"none"}
                            spacing={1}
                            p={2}
                            rounded={"sm"}
                            _hover={{ bg: "whiteAlpha.300", transition: ".3s" }}
                        >
                            <Box
                                w={{sm : 190 , md : 190}}
                                h={{sm : 190 , md : 190}}
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
            </Flex>
        </Stack>



      {/*  <Box position={"relative"} w={"full"}></Box>*/}
      {/*<Box w={"100%"} h={250} position={"relative"}>*/}
      {/*  <ScrollContainer style={{ display: "flex"}}>*/}

      {/*  </ScrollContainer>*/}
      {/*</Box>*/}
    </VStack>
  );
};

export default MoreAlbums;
