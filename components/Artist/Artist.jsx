import { Box, Divider, Flex, HStack, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import { getArtistInformation } from "../../graphQl/query/api/getArtistInformation";
import Header from "./Header";
import Popular from "./Popular";
import MoreAlbums from "./MoreAlbums";
import Fans from "./Fans";
import ShowAll from "./ShowAll";

export const Artist = () => {
  const {
    query: { artist: artistId },
  } = useRouter();

  const {
    data: {
      getArtistInfo,
      getAlbumsOfArtist,
      getArtistTopTracks,
      getRelatedArtist,
    },
  } = useSWR(
    ["api", "GET_ARTISTS_INFO", artistId],
    async (key, id, artistId) => await getArtistInformation(artistId)
  );

  const [open, setOpen] = useState(false);

  return (
    <HStack w={"full"}>
      <VStack
        w={"full"}
        h={"100vh"}
        px={5}
        overflowY={"scroll"}
        overflowX={"hidden"}
      >
        <Image
          layout={"fill"}
          objectFit={"cover"}
          priority={true}
          src={getArtistInfo?.images[0]?.url}
          style={{ position: "absolute", opacity: "20%", zIndex: 1 }}
          placeholder={"blur"}
          blurDataURL={getArtistInfo?.images[2]?.url || ""}
        />

        <Header getArtistInfo={getArtistInfo} />

        <Popular getArtistTopTracks={getArtistTopTracks} />

        <MoreAlbums
          getArtistInfo={getArtistInfo}
          getAlbumsOfArtist={getAlbumsOfArtist}
          setOpen={setOpen}
        />

        <Fans getRelatedArtist={getRelatedArtist} />
      </VStack>

      {/** modal for show all albums for artist **/}
      <ShowAll
        getAlbumsOfArtist={getAlbumsOfArtist}
        getArtistInfo={getArtistInfo}
        open={open}
        setOpen={setOpen}
      />
    </HStack>
  );
};
