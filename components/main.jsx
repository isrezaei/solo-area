import {NewReleasesAlbums} from "./NewReleases/NewReleasesAlbums";
import {Suggested} from "./Suggested/Suggested";
import {Box, VStack,} from "@chakra-ui/react";
import {FavouriteArtists} from "./FavouriteArtists/FavouriteArtists";
import {SelectGenre} from "./SelectGenre";


export const Main = ({ user }) => {
    return (
    <Box w={"full"} position={"relative"} zIndex={"1000"}>
      <VStack spacing={{sm : 10 , md : 5}}>
        <SelectGenre />
        <NewReleasesAlbums />
        <FavouriteArtists user={user} />
        <Suggested />
      </VStack>
    </Box>
  );
};
