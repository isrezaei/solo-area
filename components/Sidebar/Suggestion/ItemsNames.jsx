import React from 'react';
import {Box, Text} from "@chakra-ui/react";

const ItemsNames = ({artists}) => {
    return (
        <Box flex={1} spacing={0}>
            <Text w={79} noOfLines={1} fontSize={"xs"}>
                {artists.name}
            </Text>
            <Text w={79} noOfLines={1} fontSize={"2xs"}>
                {artists.genres[0]}
            </Text>
        </Box>
    );
};

export default ItemsNames;