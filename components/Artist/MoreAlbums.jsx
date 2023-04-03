import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { ScrollContainer } from "react-indiana-drag-scroll";
import Image from "next/image";

const MoreAlbums = ({ getAlbumsOfArtist, getArtistInfo, setOpen }) => {
  return (
    <VStack w={"full"} zIndex={1000}>
      <HStack w={"full"} justify={"space-between"} my={5}>
        <Text
          align={"left"}
          fontSize={45}
          fontWeight={"bold"}
          color={"whiteAlpha.700"}
        >
          More albums from {getArtistInfo.name}
        </Text>
        <Text onClick={() => setOpen((prevState) => !prevState)}>SHOW ALL</Text>
      </HStack>

      <HStack w={"full"} h={250} position={"relative"}>
        <ScrollContainer
          style={{ display: "flex", width: "100%", position: "absolute" }}
        >
          {getAlbumsOfArtist.items.slice(0, 8).map((albums) => (
            <VStack
              key={albums.id}
              flex={"none"}
              spacing={1}
              bg={"whiteAlpha.200"}
              p={2}
              mr={3}
              rounded={".8vw"}
              _hover={{ bg: "whiteAlpha.300", transition: ".3s" }}
            >
              <Box
                w={190}
                h={190}
                rounded={5}
                overflow={"hidden"}
                position={"relative"}
              >
                <Image
                  src={albums.images[0].url}
                  layout={"fill"}
                  objectFit={"cover"}
                  style={{ position: "absolute" }}
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
      </HStack>
    </VStack>
  );
};

export default MoreAlbums;
