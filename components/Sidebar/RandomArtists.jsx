import {Box, HStack, IconButton, Text} from "@chakra-ui/react";
import Image from "next/image";
import _ from "lodash";
import {RiUserFollowFill, RiUserUnfollowFill} from "react-icons/ri";
import useSWR from "swr";
import {getRandomArtists} from "../../graphQl/query/api/getRandomArtists";
import Link from "next/link";
import {useRouter} from "next/router";

const RandomArtists = ({currentPage , setCurrentPage , handelSubscribe , GET_SUBSCRIBED_LIST , subscribeStatus}) => {

    const router = useRouter()

    const {
        data: {
            randomArtists: { artists: { items: randomArtists } = [] } = {},
        } = {},
        isValidating,
    } = useSWR(
        ["api", "GET_RANDOM_ARTISTS", currentPage],
        async (api, key, currentPage) => await getRandomArtists(currentPage),
        { refreshInterval: 0 }
    );


    return (
        randomArtists?.map((randomArtist) => {
            return (
                <HStack
                    key={randomArtist.id}
                    w={"full"}
                    pr={2}
                    bg={"whiteAlpha.200"}
                    cursor={"pointer"}
                    fontSize={"sm"}
                    roundedRight={"xl"}
                    roundedLeft={"3xl"}
                >

                        <Box
                            w={50}
                            h={50}
                            position={"relative"}
                            overflow={"hidden"}
                            rounded={"5rem 0rem 5rem 5rem"}
                            onClick={() => router.push(`/artist/${randomArtist.id}`)}
                        >
                            <Image
                                style={{ position: "absolute" }}
                                src={randomArtist?.images[2]?.url || ""}
                                layout={"fill"}
                                objectFit={"cover"}
                                placeholder={"blur"}
                                blurDataURL={randomArtist?.images[2]?.url}
                            />
                        </Box>


                        <Box flex={1} spacing={0}>
                            <Text w={79} noOfLines={1} fontSize={"xs"}>
                                {randomArtist.name}
                            </Text>
                            <Text w={79} noOfLines={1} fontSize={"2xs"}>
                                {randomArtist.genres[0]}
                            </Text>
                        </Box>


                    <IconButton
                        isLoading={subscribeStatus}
                        aria-label={"subscribe-unSubscribe"}
                        onClick={() => handelSubscribe(randomArtist)}
                        rounded={"full"}
                        colorScheme={"orange"}
                        size={"sm"}
                        icon={
                            !!_.find(GET_SUBSCRIBED_LIST, { id: randomArtist.id }) ? (
                                <RiUserUnfollowFill size={18} />
                            ) : (
                                <RiUserFollowFill size={18} />
                            )
                        }
                        variant={
                            !!_.find(GET_SUBSCRIBED_LIST, { id: randomArtist.id })
                                ? "solid"
                                : "outline"
                        }
                    />
                </HStack>
            );
        })
    );
};

export default RandomArtists;