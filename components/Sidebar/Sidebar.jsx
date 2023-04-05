import {Divider, Flex,} from "@chakra-ui/react";
import Directions from "./Directions";
import Subscription from './Subscriptions/Subscriptions'
import Suggestion from "./Suggestion/Suggestion";

export const Sidebar = ({users}) => {

    console.log(users)

    return (
        <Flex
            display={{base: "none", md: "flex"}}
            flex={{md: 1.5, "3xl": 1}}
            w={300}
            h={"100svh"}
            direction={"column"}
            justify={"flex-start"}
            p={2}
            gap={5}
            position={"sticky"}
            top={0}
            overflowX={"hidden"}
            overflowY={"auto"}
            zIndex={1000}
        >

            <Directions/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Subscription/>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <Suggestion/>
        </Flex>
    );
};
