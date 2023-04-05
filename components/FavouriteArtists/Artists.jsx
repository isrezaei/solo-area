import {AbsoluteCenter, Box, Stack, Text , HStack} from "@chakra-ui/react";
import Image from "next/image";



const Artists = ({artist : {id , name , images} , artistID , handelSelect}) => {
    return (

        <HStack mx={2} overflow={"hidden"} rounded={"full"} position={"relative"} flex={"none"}>


            <Image
                style={{
                    borderRadius: "100%",
                    transition: ".3s",
                    opacity: id === artistID ? "50%" : "100%",
                    transform: id === artistID ? "scale(.95)" : "scale(1)",
                    zIndex: 1,
                }}
                width={180}
                height={180}
                onClick={() => handelSelect(id)}
                placeholder={"blur"}
                blurDataURL={images[2].url}
                src={images[0].url}
            />

            {id === artistID && (
                <AbsoluteCenter w={"full"}  zIndex={2}>
                    <Text p={2} fontWeight={"bold"} fontSize={15} >{name}</Text>
                </AbsoluteCenter>
            )}

        </HStack>


    );
};

export default Artists;