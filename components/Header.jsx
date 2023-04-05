import React from 'react';
import {Flex, HStack, Text} from "@chakra-ui/react";
import {SearchBar} from "./Search/SearchBar";
import {Account} from "./Account";

const Header = () => {


    return (
        <Flex w={"full"} h={110} justify={"space-between"} align={"start"} p={5}>

            <HStack spacing={10}>
                <Text
                    fontSize={"4xl"}
                    fontWeight={"bold"}
                    color={"whiteAlpha.800"}
                    zIndex={2}
                >
                    Good morning
                </Text>
                <SearchBar />
            </HStack>
            <Account />
        </Flex>

    );
};

export default Header;