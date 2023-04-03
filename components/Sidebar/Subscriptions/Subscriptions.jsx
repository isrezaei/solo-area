import React, { useState } from "react";
import {
  Box,
  Button,
  Grid,
  HStack,
  Icon,
  Stack,
  Text,
  Tooltip,
  VStack,
} from "@chakra-ui/react";
import { RiUserFollowLine } from "react-icons/ri";
import Image from "next/image";
import { useRouter } from "next/router";
import Empty from "./Empty";

const Subscriptions = ({ GET_SUBSCRIBED_LIST }) => {
  const router = useRouter();

  const [showMore, setShowMore] = useState({
    setHeight: false,
    setOverFlow: false,
  });

  return (
    <Stack>
      {!GET_SUBSCRIBED_LIST?.length && <Empty />}

      {GET_SUBSCRIBED_LIST?.length && (
        <Stack
          h={showMore.setHeight ? "auto" : 290}
          overflow={showMore.setOverFlow ? "visible" : "hidden"}
        >
          <HStack>
            <Text fontSize={15} fontWeight={"bold"} color={"whiteAlpha.800"}>
              Subscriptions
            </Text>
            <Button
              size={"xs"}
              onClick={() =>
                setShowMore((prevState) => ({
                  setHeight: !prevState.setHeight,
                  setOverFlow: !prevState.setOverFlow,
                }))
              }
            >
              {showMore.setHeight ? "C" : "O"}
            </Button>
          </HStack>

          <Stack w={"full"} spacing={0}>
            {GET_SUBSCRIBED_LIST?.map((value) => {
              return (
                <HStack
                  key={value.id}
                  _hover={{ bg: "whiteAlpha.200" }}
                  p={2}
                  rounded={"xl"}
                  cursor={"pointer"}
                  onClick={() => router.push(`/artist/${value.id}`)}
                >
                  <Box
                    w={35}
                    h={35}
                    cursor={"pointer"}
                    rounded={"full"}
                    overflow={"hidden"}
                    position={"relative"}
                  >
                    <Image
                      style={{ position: "absolute" }}
                      layout={"fill"}
                      placeholder={"blur"}
                      blurDataURL={value.images[2].url}
                      src={value.images[2].url || ""}
                      loading={"lazy"}
                    />
                  </Box>

                  <Text fontSize={13}>{value.name}</Text>
                </HStack>
              );
            })}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Subscriptions;
