import Tilt from "react-parallax-tilt";
import {Stack, Text, VStack} from "@chakra-ui/react";
import Image from "next/image";

const Albums = ({albumsInfo: {images, name, artists, id}}) => {
    return (
        <Tilt
            className="parallax-effect"
            perspective={500}
            scale={1.05}
        >
            <VStack
                cursor={"pointer"}
                overflow={"hidden"}
            >
                <Stack
                    w={{sm: 190, md: 190 , lg : 210 , xl : 165 , "2xl" : 190 , "3xl" : 250}}
                    h={{sm: 190, md: 190 , lg : 210 , xl : 165 , "2xl" : 190 , "3xl" : 250}}
                    position={"relative"}
                    bg={"whiteAlpha.200"}
                    mx={{sm: 2, md: 0}}
                    overflow={"hidden"}
                >
                    <Image
                        onClick={() => router.push(`/new-releases-albums/${id}`)}
                        objectFit={"cover"}
                        layout={"fill"}
                        placeholder={"blur"}
                        blurDataURL={images[2].url}
                        src={images[0].url}
                        alt={name}
                        priority
                    />
                </Stack>


                <VStack spacing={0}>
                    <Text
                        w={65}
                        noOfLines={1}
                        fontWeight={"bold"}
                        fontSize={{sm: 10, md: "sm"}}
                        color={"whitesmoke"}
                    >
                        {name}
                    </Text>
                    <Text fontSize={{sm: 9, md: "xs"}} color={"#9e9e9e"}>
                        {artists[0]?.name}
                    </Text>
                </VStack>
            </VStack>

        </Tilt>
    );
};

export default Albums;