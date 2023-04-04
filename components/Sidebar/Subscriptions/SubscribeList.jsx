import {Box, HStack, Text} from "@chakra-ui/react";
import Image from "next/image";
import {useRouter} from "next/router";


const SubscribeList = ({value}) => {

    const router = useRouter()

    return (
        <HStack
            key={value.id}
            rounded={"full"}
            cursor={"pointer"}
            onClick={() => router.push(`/artist/${value.id}`)}
            _hover={{bg: "whiteAlpha.200"}}
        >
            <Box
                w={39}
                h={39}
                cursor={"pointer"}
                rounded={"full"}
                overflow={"hidden"}
                position={"relative"}
            >
                <Image
                    style={{position: "absolute"}}
                    layout={"fill"}
                    placeholder={"blur"}
                    blurDataURL={value.images[2].url}
                    src={value.images[2].url || ""}
                    loading={"lazy"}
                />
            </Box>

            <Text fontSize={13}>{value.name}</Text>
        </HStack>
    );
};

export default SubscribeList;