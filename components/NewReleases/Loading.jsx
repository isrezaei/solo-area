import {Skeleton, Stack, VStack} from "@chakra-ui/react";

const Loading = () => {

    const loadingElement = Array.from({length: 12});

    return (
        loadingElement.map((_, index) => (
                <VStack key={index} mx={{sm: 1, md: 0}}>
                    <Skeleton
                        rounded={0}
                        startColor={"whiteAlpha.300"}
                        endColor={"whiteAlpha.400"}
                        height={{sm: 190, md: 190 , "3xl" : 250}}
                        width={{sm: 190, md: 190 , "3xl" : 250}}
                    />
                    <Skeleton
                        rounded={0}
                        startColor={"whiteAlpha.300"}
                        endColor={"whiteAlpha.400"}
                        height={{sm: 2, md: 2}}
                        w={90}
                        mt="2"
                    />
                    <Skeleton
                        rounded={0}
                        startColor={"whiteAlpha.300"}
                        endColor={"whiteAlpha.400"}
                        height={{sm: 2, md: 2}}
                        w={70}
                        mt="1"
                    />
                </VStack>
            )
        )
    )
};

export default Loading;