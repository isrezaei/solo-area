import {HStack, SkeletonCircle, Stack, VStack} from "@chakra-ui/react";

const Loading = () => {
    return (
        Array.from({ length: 10 }).map(( _ , index) => (
            <Stack direction={{sm : "column" , md : "row"}} align={{sm : "center" , md : "flex-start"}} p={{sm : 1 , md :2}} key={index}>
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