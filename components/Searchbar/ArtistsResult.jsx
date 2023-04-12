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
      p={1}
      rounded={index === 0 ? 25 : 30}
      colSpan={{sm : index === 0 ? 1 : "auto" , md : index === 0 ? 2 : "auto"}}
    >
      <Stack
        justify={"flex-start"}
        align={"center"}
        direction={ "row"}
      >
        <Link href={`/artist/${artist.id}`}>
          <Box
            w={{sm : index === 0 ? 150 : 50 , md : index === 0 ? 200 : 50}}
            h={{sm : index === 0 ? 150 : 50 , md : index === 0 ? 200 : 50}}

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
          fontSize={{sm : index === 0 ? 15 : 12 , md : index === 0 ? 30 : 13}}
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
        fontSize={{sm : 20 , md :30}}
        fontWeight={"bold"}
        color={"whiteAlpha.700"}
      >
        Top result
      </Text>
      <Grid
        w="full"
        overflowY="scroll"
        templateColumns={{sm : "repeat(1, 1fr)" , md : "repeat(2, 1fr)"}}
        gap={3}
        sx={{
          "&::-webkit-scrollbar": {
            width: "0",
            height: "0",
          },
          scrollbarWidth: "none",
          "-ms-overflow-style": "none",
        }}
      >
        { artists?.items.map(renderArtist)}
      </Grid>
    </VStack>
  );
};

export default ArtistsResult;
