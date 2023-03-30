import {Box, Button, HStack, Icon, Stack, Text, VStack} from "@chakra-ui/react";
import {GoPlay} from "react-icons/go";
import Image from "next/image";
import {SearchBarModal} from "../root_center/SearchBarModal";
import {Account} from "../root_center/Header/Account";

const Header = ({getArtistInfo}) => {
    return (
        <HStack w={"full"} py={5}  justifyContent={"space-between"} align={"flex-start"} zIndex={1000}>

            <HStack spacing={5}>
                <Box w={250} h={250} boxShadow={'dark-lg'} rounded={"full"} position={"relative"} >
                    <Image layout={"fill"}
                           objectFit={"cover"}
                           priority={true}
                           src={getArtistInfo.images[0].url}
                           style={{position : "absolute" , borderRadius : '100%'}}
                           placeholder={"blur"}
                           blurDataURL={getArtistInfo.images[2].url}/>
                    <Icon boxSize={16} color={"lightgreen"} as={GoPlay} position={"absolute"} bottom={0} right={0}/>
                </Box>
                <Box spacing={0}>
                    <Text fontSize={50} fontWeight={"bold"} color={"whiteAlpha.700"}>{getArtistInfo.name}</Text>
                    <Button size={"sm"} rounded={"full"} variant={"outline"} colorScheme={'green'}>Subscribe</Button>
                </Box>

            </HStack>

            <HStack   justify={"flex-end"} align={"center"} p={5}  >
                <SearchBarModal/>
                <Account/>
            </HStack>

        </HStack>
    );
};

export default Header;