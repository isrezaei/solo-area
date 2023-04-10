import {Skeleton, Stack} from "@chakra-ui/react";

const Loading = () => {

    const loadingElement = Array.from({length: 12});

    return (
        loadingElement.map((_, index) => (
                <Stack key={index} mx={{sm: 1, md: 0}}>
                    <Skeleton
                        rounded={0}
                        startColor={"whiteAlpha.300"}
                        endColor={"whiteAlpha.400"}
                        height={{sm: 150, md: 180}}
                        width={{sm: 150, md: 175}}
                    />
                    <Skeleton
                        rounded={0}
                        startColor={"whiteAlpha.300"}
                        endColor={"whiteAlpha.400"}
                        height={{sm: 2, md: 3}}
                        mt="2"
                    />
                    <Skeleton
                        rounded={0}
                        startColor={"whiteAlpha.300"}
                        endColor={"whiteAlpha.400"}
                        height={{sm: 2, md: 2}}
                        mt="1"
                    />
                </Stack>
            )
        )
    )
};

export default Loading;