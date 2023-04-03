import { useState } from "react";
import {
  Box,
  Grid,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";

const ShowAll = ({ getAlbumsOfArtist, getArtistInfo, open, setOpen }) => {
  return (
    <Modal
      size={"full"}
      isOpen={open}
      onClose={() => setOpen((prevState) => !prevState)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader bg={"black"}>
          <Text fontSize={35} fontWeight={"bold"} color={"whiteAlpha.800"}>
            {getArtistInfo?.name}
          </Text>
        </ModalHeader>

        <ModalCloseButton />

        <ModalBody px={10} bg={"black"}>
          <Grid templateColumns={{ md: "repeat(6, 1fr)" }} gap={5}>
            {getAlbumsOfArtist?.items.map((albums) => (
              <VStack
                p={2}
                key={albums.id}
                bg={"whiteAlpha.100"}
                rounded={10}
                _hover={{ bg: "whiteAlpha.300", transition: ".3s" }}
              >
                <Box
                  position={"relative"}
                  width={190}
                  height={190}
                  rounded={10}
                  overflow={"hidden"}
                >
                  <Image
                    src={albums.images[0].url}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL={albums.images[2].url}
                    layout={"fill"}
                    objectFit={"cover"}
                    style={{ position: "absolute" }}
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
                  {albums?.name}
                </Text>

                <Text fontWeight={"bold"} fontSize={"12"} color={"#9e9e9e"}>
                  {albums.release_date.slice(0, 4)}
                </Text>
              </VStack>
            ))}
          </Grid>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ShowAll;
