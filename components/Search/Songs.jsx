import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";

const Songs = ({ tracks }) => {
    return (
        <VStack flex={1}>
            <Text w={"full"} fontSize={30} fontWeight="bold" color="whiteAlpha.700">
                Songs
            </Text>
            <VStack w="full" h={450} overflowY="scroll">
                {tracks?.items.map((song) => (
                    <HStack
                        key={song.id}
                        w="full"
                        bg="whiteAlpha.200"
                        rounded="xl"
                        justify="space-between"
                        align="center"
                        p={2}
                    >
                        <HStack justify="center" align="center">
                            <Box
                                w={50}
                                h={50}
                                position="relative"
                                rounded={15}
                                overflow="hidden"
                            >
                                <Image
                                    layout="fill"
                                    src={song.album.images[1].url}
                                    placeholder="blur"
                                    blurDataURL={song.album.images[2].url}
                                />
                            </Box>
                            <Box>
                                <Text
                                    fontSize="sm"
                                    w={200}
                                    fontWeight="bold"
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                >
                                    {song.name}
                                </Text>
                                <Text
                                    fontSize="xs"
                                    w={200}
                                    textOverflow="ellipsis"
                                    whiteSpace="nowrap"
                                    overflow="hidden"
                                >
                                    {song.artists[0].name}
                                </Text>
                            </Box>
                        </HStack>
                        <Text fontSize="xs">{song.duration_ms}</Text>
                    </HStack>
                ))}
            </VStack>
        </VStack>
    );
};

export default Songs;