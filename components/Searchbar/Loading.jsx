import React from 'react';
import {Text, VStack} from "@chakra-ui/react";

const Loading = () => {
    return (
        <VStack>
            <Text fontSize={25} fontWeight={'bold'}>Wait for result</Text>
        </VStack>
    );
};

export default Loading;