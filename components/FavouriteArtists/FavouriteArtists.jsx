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
import Loading from "./Loading";

import {ScrollContainer} from "react-indiana-drag-scroll";

import 'react-indiana-drag-scroll/dist/style.css'
import TopTen from "./TopTen";


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
    RenderTopTen = <Loading/>
  }


  if (getArtistTopTracks) {
    RenderTopTen = getArtistTopTracks?.tracks?.map(trackInfo => <TopTen trackInfo={trackInfo}/>)
  }





  return (

      <Stack w={"full"} h={{sm : "auto" , md : "auto"}} spacing={3} >

          <Text
              fontSize={{sm : 20 , md : 35}}
              fontWeight={"bold"}
              color={"whiteAlpha.600"}>
            Top 10 your favourite artist
          </Text>


          <Stack w={"full"} h={{sm : 175 , md : 190}} position={"relative"}>
              <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                  <ScrollContainer style={{display : "flex" }}>
                      {favouriteArtists?.[0]?.list?.map(artist => (
                          <Artists key={artist.id} artist={artist} artistID={artistID} handelSelect={handelSelect} />
                      ))}
                  </ScrollContainer>
              </Flex>
          </Stack>




          <Stack display={{sm : "flex" , md : "none"}} w={"full"} h={{sm : 130 , md : 190}} position={"relative"}>
              <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                  <ScrollContainer style={{display : "flex" }}>
                      {RenderTopTen}
                  </ScrollContainer>
              </Flex>
          </Stack>





          <motion.div
            key={[artistID]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
        <Grid display={{sm : "none" , md : "grid"}} gap={2} templateColumns={{sm : "repeat(2, 1fr)" , md : "repeat(5, 1fr)"}}>
          {RenderTopTen}
        </Grid>

        </motion.div>

      </Stack>
);
};
