import {Image, Text, Box, VStack, HStack, Divider, Center, Flex} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ScrollContainer, useScrollContainer} from "react-indiana-drag-scroll";
import 'react-indiana-drag-scroll/dist/style.css'
import useSWR from "swr";



import {Fetch_New_Releases_Albums} from "../../../lib/FetcherFuncs/Fetch_New_Releases_Albums";

export const NewReleasesAlbumsList = () =>
{
    const router = useRouter()

    const {data} = useSWR('/api/get_new_releases_albums_list' , async () => (await Fetch_New_Releases_Albums()))

    const scrollContainer = useScrollContainer();

    const Render = data?.map(ALBUMS_DATA => {

        const {images , name , artists , id} = ALBUMS_DATA

        return (
            <VStack key={id} flex={'none'} bg={'#151515'} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "#212121"}}>
                <Image onClick={() => router.push(`/new-releases-albums/${id}`)} src={images[0].url} boxSize={'15vw'} p={3} rounded={'1.5vw'} alt=''/>
                <Text px={5} w={150} textAlign={'center'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} fontWeight={'bold'} fontSize={'md'} color={'whitesmoke'}>{name}</Text>
                <Text fontSize={'.8vw'}  color={'#9e9e9e'}>{artists[0]?.name}</Text>
            </VStack>
        )
    })


    return (
        <Box my={4} px={5}>

            <Text my={2} fontSize={'2vw'} fontWeight={"bold"} color={'whiteAlpha.700'} >Weekly musics</Text>
            <Flex ref={scrollContainer.ref}  w={'65vw'} overflowX={"hidden"} justify={'start'} align={'start'} cursor={'grab'}>
                {Render}
            </Flex>
        </Box>
    )
}