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
            <>
                <Image onClick={() => router.push(`/new-releases-albums/${id}`)} src={images[0].url} boxSize={'15vw'} rounded={2} mr={5} alt=''/>
            </>
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