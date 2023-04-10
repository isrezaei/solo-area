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
import { Searchbar } from "../Searchbar/Searchbar";
import { Account } from "../Header/Account";
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
          py={0}
          justifyContent={"space-between"}
          align={"flex-start"}
          zIndex={1000}
      >

        <Stack
            w={"full"}
            justify={{sm : "center" , md : "flex-start"}}
            align={"center"}
            direction={{sm : "column" , md : "row"}}
            spacing={{sm : 0 , md : 5}}>

          <Box
              w={{sm : 250 , md : 250}}
              h={{sm : 250 , md : 250}}
              boxShadow={"dark-lg"}
              rounded={"full"}
              position={"relative"}
              overflow={"hidden"}
          >
            <Image
                layout={"fill"}
                objectFit={"cover"}
                src={getArtistInfo?.images[0]?.url}
                placeholder={"blur"}
                blurDataURL={getArtistInfo?.images[2]?.url}
            />
          </Box>

          <VStack align={{sm : "center" , md : "flex-start"}} spacing={0}>
            <Text fontSize={{sm : 35 , md : 50}} fontWeight={"bold"} >
              {getArtistInfo.name}
            </Text>
            <Button
                size={"xs"}
                rounded={5}
                variant={!!_.find(GET_SUBSCRIBED_LIST, {"id": getArtistInfo.id}) ? "solid" : "outline"}
                colorScheme={"blue"}
                onClick={() => handelSubscribe(getArtistInfo.id , getArtistInfo.name , getArtistInfo?.images)}
            >
              {!!_.find(GET_SUBSCRIBED_LIST, {"id": getArtistInfo.id}) ? " Subscribed" : " Subscribe"}
            </Button>
          </VStack>

        </Stack>


      </HStack>
  );
};

export default Header;
