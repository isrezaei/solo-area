import {
  Box,
  Button,
  HStack,
  Icon,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { GoPlay } from "react-icons/go";
import Image from "next/image";
import { SearchBar } from "../Search/SearchBar";
import { Account } from "../Account";
import {useQuery} from "@apollo/client";
import {getSubscribeQuery} from "../../graphQl/query/database/getSubscribedList";
import _ from "lodash";
import {removeFromSubscribeList} from "../../graphQl/query/database/removeFromSubscribeList";
import {setToSubscribedList} from "../../graphQl/query/database/setToSubscribedList";
import {useUser} from "@supabase/auth-helpers-react";

const Header = ({ getArtistInfo }) => {

  const user = useUser()

  const {loading: subscribeStatus, data: {GET_SUBSCRIBED_LIST} = {}} = useQuery(getSubscribeQuery, {
    variables: {userId: user?.id}
  });

  const handelSubscribe = async (id , name , images) => {
    if (!!_.find(GET_SUBSCRIBED_LIST, {"id": id})) {
      return await removeFromSubscribeList(id, user?.id);
    }
    else {
      return await setToSubscribedList(id, name, images, user?.email, user?.id);
    }
  };

  return (
      <HStack
          w={"full"}
          py={5}
          justifyContent={"space-between"}
          align={"flex-start"}
          zIndex={1000}
      >
        <HStack spacing={5}>
          <Box
              w={250}
              h={250}
              boxShadow={"dark-lg"}
              rounded={"full"}
              position={"relative"}
              overflow={"hidden"}
          >
            <Image
                layout={"fill"}
                objectFit={"cover"}
                src={getArtistInfo?.images[0]?.url}
                style={{ position: "absolute", borderRadius: "100%" }}
                placeholder={"blur"}
                blurDataURL={getArtistInfo?.images[2]?.url}
            />
          </Box>
          <Box spacing={0}>
            <Text fontSize={50} fontWeight={"bold"} color={"whiteAlpha.700"}>
              {getArtistInfo.name}
            </Text>
            <Button
                size={"sm"}
                rounded={"full"}
                variant={!!_.find(GET_SUBSCRIBED_LIST, {"id": getArtistInfo.id}) ? "solid" : "outline"}
                colorScheme={"green"}
                onClick={() => handelSubscribe(getArtistInfo.id , getArtistInfo.name , getArtistInfo?.images)}
            >
              {!!_.find(GET_SUBSCRIBED_LIST, {"id": getArtistInfo.id}) ? " Subscribed" : " Subscribe"}
            </Button>
          </Box>
        </HStack>

        <HStack justify={"flex-end"} align={"center"} p={5}>
          <SearchBar />
          <Account />
        </HStack>
      </HStack>
  );
};

export default Header;
