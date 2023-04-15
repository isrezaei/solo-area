import {AbsoluteCenter, Box, Stack, Text, HStack} from "@chakra-ui/react";
import Image from "next/image";
import Tilt from "react-parallax-tilt";


const TopTenArtists = ({artist: {id, name, images}, artistID, handelSelect}) => {
    return (
        <Tilt
            className="parallax-effect"
            perspective={500}
            scale={0.95}
        >

            <Box w={{sm: 170, md: 180 , "3xl" : 210}}
                 h={{sm: 170, md: 180 , "3xl" : 210}}
                 transform={id === artistID ? "scale(.95)" : "scale(1)"}
                 transition={".2s"}
                 opacity={id === artistID ? "50%" : "100%"}
                 mx={2}
                 rounded={"full"}
                 overflow={"hidden"}>
                <Image
                    layout={"fill"}
                    onClick={() => handelSelect(id)}
                    placeholder={"blur"}
                    blurDataURL={images[2].url}
                    src={images[0].url}
                />
            </Box>

            {id === artistID && (
                <AbsoluteCenter w={"full"}>
                    <Text textAlign={"center"} fontWeight={"bold"} fontSize={{sm: "sm", md: 15}}>{name}</Text>
                </AbsoluteCenter>
            )}

        </Tilt>
    );
};

export default TopTenArtists;