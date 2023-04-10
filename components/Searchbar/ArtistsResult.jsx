import {
  Box,
  Grid,
  GridItem,
  Img,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";

const ArtistsResult = ({ artists }) => {
  const renderArtist = (artist, index) => (
    <GridItem
      key={artist?.id}
      bg={index === 0 ? "whiteAlpha.200" : "whiteAlpha.200"}
      py={index === 0 ? 3 : 0}
      rounded={index === 0 ? 5 : 30}
      colSpan={index === 0 ? 2 : "auto"}
    >
      <Stack
        justify={index === 0 ? "center" : "flex-start"}
        align="center"
        direction={index === 0 ? "column" : "row"}
      >
        <Link href={`/artist/${artist.id}`}>
          <Box
            w={index === 0 ? 200 : 50}
            h={index === 0 ? 200 : 50}
            rounded="full"
            overflow="hidden"
            position="relative"
            cursor="pointer"
          >
            <Image
              layout="fill"
              objectFit="cover"
              src={
                index === 0
                  ? artist?.images?.[0]?.url
                  : artist?.images?.[2]?.url
              }
              priority={true}
              placeholder="blur"
              blurDataURL={artist?.images?.[2]?.url}
            />
          </Box>
        </Link>
        <Text
          zIndex={1}
          fontSize={index === 0 ? 30 : 13}
          fontWeight={index === 0 ? "bold" : "normal"}
          color="whiteAlpha.800"
          noOfLines={1}
        >
          {artist?.name}
        </Text>
      </Stack>
    </GridItem>
  );

  return (
    <VStack flex={1} h={500} align="center">
      <Text
        w={"full"}
        fontSize={30}
        fontWeight={"bold"}
        color={"whiteAlpha.700"}
      >
        Top result
      </Text>
      <Grid
        w="full"
        overflowY="scroll"
        templateColumns="repeat(2, 1fr)"
        gap={3}
      >
        {artists?.items.map(renderArtist)}
      </Grid>
    </VStack>
  );
};

export default ArtistsResult;
