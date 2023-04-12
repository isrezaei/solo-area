import React from 'react';
import {Button, Flex, HStack, Text , Stack} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill} from "react-icons/ri";
import {useRouter} from "next/router";



const Directions = () => {

    const router = useRouter();

    return (
        <Stack>
            <Button
                justifyContent={"flex-start"}
                onClick={() => router.push("/")}
                leftIcon={<RiHome6Line color={"#989898"} />}
                variant={router.pathname === "/" ? "solid" : "outline"}
                rounded={0}
                colorScheme={"gray"}
                size={"sm"}
            >
                    Home
            </Button>

            <Button
                justifyContent={"flex-start"}
                onClick={() => router.push("/")}
                leftIcon={<RiMusicFill color={"#989898"} />}
                variant={"outline"}
                rounded={0}
                colorScheme={"gray"}
                size={"sm"}
            >
                Favourite
            </Button>
            <Button
                justifyContent={"flex-start"}
                onClick={() => router.push("/pickFavouriteArtists")}
                leftIcon={<RiMusicFill color={"#989898"} />}
                variant={router.pathname === "/pickFavouriteArtists" ? "solid" : "outline"}
                rounded={0}
                colorScheme={"gray"}
                size={"sm"}
            >
                Pick Top Ten
            </Button>
        </Stack>
    );
};

export default Directions;