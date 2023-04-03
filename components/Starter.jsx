import { Account } from "./Account";
import { NewReleasesAlbums } from "./NewReleasesAlbums";
import { RandomPlayed } from "./RandomPlayed";
import {
  Box,
  Flex,
  Text,
  HStack,
} from "@chakra-ui/react";
import { SearchBar } from "./Search/SearchBar";
import { FavouriteArtists } from "./FavouriteArtists";
import { SelectGenre } from "./SelectGenre";

export const Starter = ({ user }) => {
  // const { loading : Q , error : P, data : N } = useQuery(query);

  return (
    <Box w={"full"} position={"relative"} zIndex={"1000"}>
      {/*HEADER COMPONENTS*/}

      <Flex w={"full"} h={150} justify={"space-between"} align={"start"} p={5}>

        <HStack spacing={10}>
          <Text
            fontSize={"4xl"}
            fontWeight={"bold"}
            color={"whiteAlpha.800"}
            zIndex={2}
          >
            Good morning
          </Text>
          <SearchBar />
        </HStack>
        <Account />
      </Flex>

      <Flex
          direction={"column"}
          justify={"start"}
          align={"center"}
          gap={5}>

        <SelectGenre />

        {/*NEW RELEASES COMPONENTS*/}
        <NewReleasesAlbums />

        {/*Favourite ArtistsResult*/}
        <FavouriteArtists user={user} />

        {/*RECENTLY PLAYED LIST*/}
        <RandomPlayed />

        {/*<FeaturedPlayList/>*/}
      </Flex>
    </Box>
  );
};
