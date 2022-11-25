import {useRecoilValue} from "recoil";
import {NEW_RELEASES_ALBUMS_ATOM} from "../../../atoms/ItemsAtom";
import {Flex, Image, Text , Box , VStack ,HStack} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ScrollContainer} from "react-indiana-drag-scroll";
import useSWR from "swr";
import axios from "axios";
import {Fetch_New_Releases_Albums} from "../../../lib/FetcherFuncs/Fetch_New_Releases_Albums";

export const NewReleasesAlbumsList = () =>
{
    const router = useRouter()

    const {data} = useSWR('/api/get_new_releases_albums_list' , async () => (await Fetch_New_Releases_Albums()))


    const Render = data?.map(ALBUMS_DATA => {

        const {images , name , artists , id} = ALBUMS_DATA

        return (
            <VStack  key={ALBUMS_DATA.id} flex={'none'} bg={'#151515'} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "#212121"}}>
                <Image onClick={() => router.push(`/new-releases-albums/${id}`)} src={images[0].url} boxSize={'15vw'} p={3} rounded={'1.5vw'} alt=''/>
                <Text  textAlign={'left'} fontWeight={'bold'} fontSize={'md'} align={'left'} color={'whitesmoke'}>{name}</Text>
                <Text  textAlign={'left'} fontSize={'.8vw'} align={'left'} color={'#9e9e9e'}>{artists[0]?.name}</Text>
            </VStack>
        )
    })


    return (
        <Box my={4}>
            <Text fontSize={'2vw'} color={'whiteAlpha.800'} my={5}>New Releases</Text>

            <ScrollContainer style={{display : 'flex'}}>
                {Render}
            </ScrollContainer>
        </Box>
    )
}