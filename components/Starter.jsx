import { Account } from "./Account";
import { NewReleasesAlbums } from "./NewReleases/NewReleasesAlbums";
import { RandomPlayed } from "./RandomPlayed";
import {
  Box,
  Flex,
  Text,
  HStack, VStack,
} from "@chakra-ui/react";
import { FavouriteArtists } from "./FavouriteArtists/FavouriteArtists";
import { SelectGenre } from "./SelectGenre";


export const Starter = ({ user }) => {

  return (
    <Box w={"full"} position={"relative"} zIndex={"1000"} px={{sm : 0 , md : 5}}>

      <VStack spacing={5}>

        <SelectGenre />

        {/*NEW RELEASES COMPONENTS*/}
        <NewReleasesAlbums />

        {/*Favourite ArtistsResult*/}
        <FavouriteArtists user={user} />

        {/*RECENTLY PLAYED LIST*/}
        <RandomPlayed />

        {/*<FeaturedPlayList/>*/}

      </VStack>

    </Box>
  );
};
