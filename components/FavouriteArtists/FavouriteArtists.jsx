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
    SkeletonCircle, Stack, Flex,
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
      <HStack p={{sm : 1 , md :2}} key={index}>
        <SkeletonCircle size={{sm : 30 , md : 50}} />
        <VStack align={"flex-start"}>
          <SkeletonCircle size={{sm : 2 , md : 3}} w={{sm : 110 , md : 160}} />
          <SkeletonCircle size={{sm : 2 , md : 3}} w={{sm : 75 , md : 140}} />
        </VStack>
      </HStack>
    ));
  }


  if (getArtistTopTracks) {


    RenderTopTen = getArtistTopTracks?.tracks?.map(
      ({ duration_ms, name, id, album: { artists, images } }) => {
        return (
          <HStack p={{sm : 1 , md :2}} rounded={50} key={id} bg={"whiteAlpha.200"}>
            <Box role={"group"} position={"relative"}>
              <Skeleton
                startColor={"whiteAlpha.300"}
                endColor={"whiteAlpha.400"}
                rounded={"full"}
                isLoaded={!isLoading}
              >
                <Box
                  w={{sm : 30 , md : 50}}
                  h={{sm : 30 , md : 50}}
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

            <VStack  spacing={0} align={"flex-start"}>
              <SkeletonText
                startColor={"whiteAlpha.300"}
                endColor={"whiteAlpha.400"}
                noOfLines={3}
                spacing="1"
                isLoaded={!isLoading}
              >
                <Text  noOfLines={1} fontWeight={"bold"} fontSize={{sm : 12 , md : "md"}}>
                  {name}
                </Text>
                <Text noOfLines={2}  fontSize={{sm : 8 , md : "xs"}}>
                  {artists?.[0]?.name} {artists?.[1]?.name}
                </Text>
                <Text  noOfLines={2}  fontSize={{sm : 8 , md : "xs"}}>
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

      <Stack w={"full"} h={{sm : "auto" , md : "auto"}} spacing={3} >

          <Text
              fontSize={{sm : 15 , md : 35}}
              fontWeight={"bold"}
              color={"whiteAlpha.600"}>
            Top 10 your favourite artist
          </Text>


          <Stack w={"full"} h={{sm : 110 , md : 190}} position={"relative"}>
              <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                  <ScrollContainer style={{display : "flex" }}>
                      {favouriteArtists?.[0]?.list?.map(artist => (
                          <Artists key={artist.id} artist={artist} artistID={artistID} handelSelect={handelSelect} />
                      ))}
                  </ScrollContainer>
              </Flex>
          </Stack>


        <motion.div
            key={[artistID]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
        <Grid  gap={2} templateColumns={{sm : "repeat(2, 1fr)" , md : "repeat(5, 1fr)"}}>
          {RenderTopTen}
        </Grid>
        </motion.div>

      </Stack>
);
};
