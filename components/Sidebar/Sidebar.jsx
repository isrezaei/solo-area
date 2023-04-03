import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    IconButton,
    HStack,
    Icon,
    Spacer,
    Stack,
    Text,
    Tooltip,
    VStack,
    Spinner,
} from "@chakra-ui/react";
import {
    page,
    pageLink,
    next,
    previous,
    active,
    pagination,
    breakLinkClassName,
    breakClassName,
} from "./PaginationStyle";
import {
    RiHome6Line,
    RiMusicFill,
    RiUserFollowFill,
    RiUserFollowLine,
    RiUserUnfollowFill,
} from "react-icons/ri";
import {useRouter} from "next/router";
import Image from "next/image";
import {useEffect, useState} from "react";
import ReactPaginate from "react-paginate";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import useSWR from "swr";
import {getSubscribeQuery} from "../../graphQl/query/database/getSubscribedList";
import {getRandomArtists} from "../../graphQl/query/api/getRandomArtists";
import {setToSubscribedList} from "../../graphQl/query/database/setToSubscribedList";
import {removeFromSubscribeList} from "../../graphQl/query/database/removeFromSubscribeList";
import {useQuery} from "@apollo/client";
import _ from "lodash";
import Directions from "./Directions";
import Subscription from './Subscriptions/Subscriptions'
import Pagination from "./Pagination";
import RandomArtists from "./RandomArtists";

export const Sidebar = () => {

    const user = useUser();


    const [showMore, setShowMore] = useState({
        setHeight: false,
        setOverFlow: false,
    });

    const [currentPage, setCurrentPage] = useState(0);


    const {loading: subscribeStatus, data: {GET_SUBSCRIBED_LIST} = {}} = useQuery(getSubscribeQuery, {
        variables: {userId: user?.id}
    });

    const handelSubscribe = async (randomArtist) => {
        const {id, images, name} = randomArtist;

        if (!!_.find(GET_SUBSCRIBED_LIST, {id: id})) {
            return await removeFromSubscribeList(id, user?.id);
        } else {
            return await setToSubscribedList(id, name, images, user?.email, user?.id);
        }
    };

    const handlePageClick = ({selected: selectedPage}) => {
        setCurrentPage(selectedPage);
    };

    const handelHeight = () => {
        setShowMore((prevState) => ({
            setHeight: !prevState.setHeight,
            setOverFlow: !prevState.setOverFlow,
        }))
    }


    return (
        <Flex
            display={{base: "none", md: "flex"}}
            flex={{md: 1.5, "3xl": 1}}
            w={300}
            h={"100vh"}
            direction={"column"}
            justify={"flex-start"}
            p={2}
            gap={5}
            position={"sticky"}
            top={0}
            overflowX={"hidden"}
            overflowY={"scroll"}
            zIndex={1000}
        >

            <Directions/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Subscription
                GET_SUBSCRIBED_LIST={GET_SUBSCRIBED_LIST}
            />

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <VStack
                h={showMore.setHeight ? "auto" : 280}
                overflow={showMore.setOverFlow ? "visible" : "hidden"}
            >


                <HStack w={"full"} justify={"flex-start"} spacing={3}>
                    <Text fontSize={15} fontWeight={"bold"} color={"whiteAlpha.800"}>
                        maybe you like it
                    </Text>
                    <Button
                        size={"xs"}
                        onClick={handelHeight}>
                        {showMore.setHeight ? "C" : "O"}
                    </Button>

                </HStack>

                <HStack w={"full"} justify={"space-between"}>
                    <Pagination handlePageClick={handlePageClick}/>
                    {/*{isValidating && (*/}
                    {/*  <Spinner thickness="3px" size={"sm"} color={"pink.800"} />*/}
                    {/*)}*/}
                </HStack>


                <RandomArtists
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    GET_SUBSCRIBED_LIST={GET_SUBSCRIBED_LIST}
                    handelSubscribe={handelSubscribe}
                    subscribeStatus={subscribeStatus}
                />


            </VStack>
        </Flex>
    );
};
