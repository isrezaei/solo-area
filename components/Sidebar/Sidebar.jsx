import {Divider, Flex,} from "@chakra-ui/react";
import Directions from "./Directions";
import Subscription from './Subscriptions/Subscriptions'
import Suggestion from "./Suggestion/Suggestion";

export const Sidebar = ({SSR_GET_SUBSCRIBED_LIST}) => {


    return (
        <Flex
            display={{base: "none", md: "flex"}}
            h={"100svh"}
            direction={"column"}
            justify={"flex-start"}
            p={2}
            gap={5}
            overflowX={"hidden"}
            overflowY={"auto"}
            zIndex={1000}
        >

            <Directions/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Subscription SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Suggestion/>
        </Flex>
    );
};
