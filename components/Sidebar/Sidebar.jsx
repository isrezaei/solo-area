import {Divider, Flex,} from "@chakra-ui/react";
import Directions from "./Directions";
import Subscription from './Subscriptions/Subscriptions'
import Suggestion from "./Suggestion/Suggestion";

export const Sidebar = ({SSR_GET_SUBSCRIBED_LIST}) => {


    return (
        <Flex
            w={"full"}
            h={"100svh"}
            mt={{sm : 22 , xl : 0}}
            direction={"column"}
            justify={"flex-start"}
            p={2}
            gap={5}
            overflowX={"hidden"}
            overflowY={"auto"}
            zIndex={1000}
            sx={{
                "&::-webkit-scrollbar": {
                    width: "0",
                    height: "0",
                },
                scrollbarWidth: "none",
                "-ms-overflow-style": "none",
            }}
        >

            <Directions/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Subscription SSR_GET_SUBSCRIBED_LIST={SSR_GET_SUBSCRIBED_LIST}/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Suggestion/>
        </Flex>
    );
};
