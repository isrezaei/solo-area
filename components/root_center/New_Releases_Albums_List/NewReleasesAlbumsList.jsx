import {Image, Text, Box, VStack, HStack, Divider, Center, Flex, Grid} from "@chakra-ui/react";
import {useRouter} from "next/router";
import 'react-indiana-drag-scroll/dist/style.css'
import useSWR from "swr";
import Tilt from "react-parallax-tilt";
import {Fetch_New_Releases_Albums} from "../../../lib/FetcherFuncs/Fetch_New_Releases_Albums";
import useSound from 'use-sound';


export const NewReleasesAlbumsList = () =>
{
    const router = useRouter()

    const {data} = useSWR('/api/get_new_releases_albums_list' , async () => (await Fetch_New_Releases_Albums()) , {refreshInterval : 60000})

    const [play , {stop}] = useSound('/beepSound.mp3');

    const Render = data?.map(ALBUMS_DATA => {

        const {images , name , artists , id} = ALBUMS_DATA

        return (
            <Tilt key={id} className="parallax-effect" perspective={500} scale={1.05}>
                <VStack onClick={play}  cursor={"pointer"} spacing={0} bg={'whiteAlpha.200'} p={1}  rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300"}}>
                    <Image onClick={() => router.push(`/new-releases-albums/${id}`)} src={images[0].url} boxSize={180} p={2}  rounded={25} alt=''/>
                    <Text px={5} w={150} textAlign={'center'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} fontWeight={'bold'} fontSize={'sm'} color={'whitesmoke'}>{name}</Text>
                    <Text fontSize={'xs'}  color={'#9e9e9e'}>{artists[0]?.name}</Text>
                </VStack>
            </Tilt>
        )
    })


    return (
        <VStack align={'start'} w={"full"} zIndex={1000}>
            <Text fontSize={50} fontWeight={"bold"} color={'whiteAlpha.800'} >The latest in the month</Text>
            <Grid templateColumns={{base : 'repeat(2, 1fr)' , md : 'repeat(6, 1fr)'}} gap={6} >
                {Render}
            </Grid>
        </VStack>
    )
}