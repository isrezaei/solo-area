import React from 'react';
import {Flex, HStack, Text} from "@chakra-ui/react";
import {SearchBar} from "./Search/SearchBar";
import {Account} from "./Account";

const Header = () => {


    return (
        <Flex w={"full"} h={{sm : 75 , md : 110}} justify={"space-between"} align={"start"} p={5}>

            <HStack spacing={{sm : 3 , md : 10}}>
                <Text
                    fontSize={{sm : 20 , md : "4xl"}}
                    fontWeight={"bold"}
                    color={"whiteAlpha.800"}
                    zIndex={2}>
                    Good morning
                </Text>
                <SearchBar />
            </HStack>
            <Account />
        </Flex>

    );
};

export default Header;