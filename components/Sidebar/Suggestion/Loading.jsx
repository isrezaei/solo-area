import {HStack, SkeletonCircle, Stack} from "@chakra-ui/react";

const Loading = () => {
    return (
        Array.from({length: 50}).map((_ , index) => (
            <HStack key={index} w={"full"}>
                <SkeletonCircle size='12'/>
                <Stack>
                    <SkeletonCircle w={150} size='2'/>
                    <SkeletonCircle w={120} size='2'/>
                </Stack>
            </HStack>
        ))
    );
};

export default Loading;