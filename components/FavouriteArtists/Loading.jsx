import {HStack, SkeletonCircle, Stack, VStack} from "@chakra-ui/react";

const Loading = () => {
    return (
        Array.from({ length: 10 }).map(( _ , index) => (
            <Stack
                key={index}
                direction={{sm : "column" , md : "row"}}
                justify={"center"}
                align={"center"}
                p={{sm : 2 , md :2}}
                mx={{sm : 2 , md : 0}}
                rounded={{sm : 30 , md : 50}}
                bg={"whiteAlpha.200"}
            >
                <SkeletonCircle size={{sm : 90 , md : 50}} />
                <VStack align={{sm : "center" , md : "flex-start"}}>
                    <SkeletonCircle size={{sm : 2 , md : 3}} w={{sm : 55 , md : 160}} />
                    <SkeletonCircle size={{sm : 2 , md : 3}} w={{sm : 35 , md : 140}} />
                </VStack>
            </Stack>
        ))
    )
};

export default Loading;