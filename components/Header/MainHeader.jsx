import React from 'react';
import {HStack, Text} from "@chakra-ui/react";
import {Searchbar} from "../Searchbar/Searchbar";
import {Account} from "./Account";
import Greetings from "./Greetings";

const MainHeader = () => {

    return (
        <HStack w={"full"} h={{sm: 65, md: 110}} justify={"space-between"} py={5} >
            <Text
                fontSize={{sm: 20, md: "4xl"}}
                fontWeight={"bold"}
                color={"white"}>
                <Greetings/>
            </Text>

            <HStack>
                <Searchbar/>
                <Account/>
            </HStack>

        </HStack>

    );
};

export default MainHeader;