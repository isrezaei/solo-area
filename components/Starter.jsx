import { Account } from "./Header/Account";
import { NewReleasesAlbums } from "./NewReleases/NewReleasesAlbums";
import { Suggested } from "./Suggested/Suggested";
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
    <Box w={"full"} position={"relative"} zIndex={"1000"}>

      <VStack spacing={{sm : 10 , md : 5}}>

        <SelectGenre />

        {/*NEW RELEASES COMPONENTS*/}
        <NewReleasesAlbums />

        {/*Favourite ArtistsResult*/}
        <FavouriteArtists user={user} />

        {/*RECENTLY PLAYED LIST*/}
        <Suggested />

      </VStack>

    </Box>
  );
};
