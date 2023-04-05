import {
  AbsoluteCenter,
  Box,
  Icon,
  Grid,
  HStack,
  Text,
  VStack,
  Skeleton,
  SkeletonText,
  SkeletonCircle, Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import useSWR from "swr";
import { CgPlayButtonO } from "react-icons/cg";
import prettyMilliseconds from "pretty-ms";
import { getFavouriteArtists } from "../../graphQl/query/database/getFavouriteArtists";
import { getArtistInformation } from "../../graphQl/query/api/getArtistInformation";
import Artists from "./Artists";
import { motion } from "framer-motion";

import {ScrollContainer} from "react-indiana-drag-scroll";

import 'react-indiana-drag-scroll/dist/style.css'


export const FavouriteArtists = ({ user }) => {

  const [artistID, setArtistID] = useState(null);

  const {
    data: { GET_FAVOURITE_ARTISTS: favouriteArtists },
  } = useSWR(["api", "GET_FAVORITE_ARTISTS", user?.id], () =>
    getFavouriteArtists(user?.id)
  );


  const { data: { getArtistTopTracks } = {}, isLoading } = useSWR(
    artistID ? ["GET ARTIST DATA", artistID] : null,
    async (key, artistID) => getArtistInformation(artistID),
    { refreshInterval: null }
  );


  useEffect(() => {
    setArtistID(favouriteArtists[0].list[0].id);
  }, [favouriteArtists]);

  const handelSelect = (artisId) => {
    setArtistID(artisId);
  };



  let RenderTopTen;

  if (!getArtistTopTracks) {
    RenderTopTen = Array.from({ length: 10 }).map(( _ , index) => (
      <HStack key={index}>
        <SkeletonCircle size="10" />
        <VStack align={"flex-start"}>
          <SkeletonCircle size={3} w={180} />
          <SkeletonCircle size={3} w={150} />
        </VStack>
      </HStack>
    ));
  }


  if (getArtistTopTracks) {


    RenderTopTen = getArtistTopTracks?.tracks?.map(
      ({ duration_ms, name, id, album: { artists, images } }) => {
        return (
          <HStack p={2} rounded={50} key={id} bg={"whiteAlpha.200"}>
            <Box flex={0.3} role={"group"} position={"relative"}>
              <Skeleton
                startColor={"whiteAlpha.300"}
                endColor={"whiteAlpha.400"}
                rounded={"full"}
                isLoaded={!isLoading}
              >
                <Box
                  w={50}
                  h={50}
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
                    objectFit={"cover"}
                    style={{ position: "absolute", borderRadius: "100%" }}
                  />

                </Box>
              </Skeleton>
              <AbsoluteCenter>
                <Icon
                  display={"none"}
                  cursor={"pointer"}
                  _groupHover={{ display: "block" }}
                  fontSize={25}
                  as={CgPlayButtonO}
                />
              </AbsoluteCenter>
            </Box>

            <VStack flex={1} spacing={0} align={"flex-start"}>
              <SkeletonText
                startColor={"whiteAlpha.300"}
                endColor={"whiteAlpha.400"}
                noOfLines={3}
                spacing="1"
                isLoaded={!isLoading}
              >
                <Text w={150} noOfLines={1} fontWeight={"bold"} fontSize={"md"}>
                  {name}
                </Text>
                <Text w={150} noOfLines={2} fontSize={"xs"}>
                  {artists?.[0]?.name} {artists?.[1]?.name}
                </Text>
                <Text w={150} noOfLines={2} fontSize={"2xs"}>
                  {prettyMilliseconds(duration_ms, {
                    secondsDecimalDigits: 0,
                    colonNotation: true,
                  })}
                </Text>
              </SkeletonText>
            </VStack>
          </HStack>
        );
      }
    );
  }





  return (

      <Stack spacing={3}>

          <Text
              fontSize={35}
              fontWeight={"bold"}
              color={"whiteAlpha.600"}>
            Top 10 your favourite artist
          </Text>


            <ScrollContainer style={{display : "flex" , justifyContent : "flex-start"}}>
                {favouriteArtists?.[0]?.list?.map(artist => (
                    <Artists key={artist.id} artist={artist} artistID={artistID} handelSelect={handelSelect} />
                ))}
            </ScrollContainer>


        <motion.div
            key={[artistID]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
        <Grid  gap={2} templateColumns={"repeat(5, 1fr)"}>
          {RenderTopTen}
        </Grid>
        </motion.div>

      </Stack>
);
};
