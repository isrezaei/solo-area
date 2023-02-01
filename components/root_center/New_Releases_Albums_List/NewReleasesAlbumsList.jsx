import {Image, Text, Box, VStack, HStack, Divider, Center, Flex, Grid} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {ScrollContainer, useScrollContainer} from "react-indiana-drag-scroll";
import 'react-indiana-drag-scroll/dist/style.css'
import useSWR from "swr";
import Tilt from "react-parallax-tilt";

import {ChooseRandomColor} from "../../../lib/useRandom";



import {Fetch_New_Releases_Albums} from "../../../lib/FetcherFuncs/Fetch_New_Releases_Albums";
import {useSetRecoilState} from "recoil";
import {RANDOM_COLOR} from "../../../atoms/atoms";
import {useEffect} from "react";
import _ from "lodash";

export const NewReleasesAlbumsList = () =>
{
    const router = useRouter()

    const {data} = useSWR('/api/get_new_releases_albums_list' , async () => (await Fetch_New_Releases_Albums()))


    const setRandomColor = useSetRecoilState(RANDOM_COLOR)


    const pickRandomColor = () =>
    {
        const randomCount = _.random(5);

        console.log(randomCount)

        const randomColorArray = ['cyan', 'pink' , 'purple' , 'teal' , 'orange' , 'red'][randomCount]

        setRandomColor(randomColorArray)
    }



    const Render = data?.map(ALBUMS_DATA => {

        const {images , name , artists , id} = ALBUMS_DATA

        return (
            <Tilt className="parallax-effect" perspective={500} scale={1.1}>
                <VStack cursor={"pointer"} spacing={0} key={id} bg={'whiteAlpha.200'} p={1}  rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300"}}>
                    <Image onClick={() => router.push(`/new-releases-albums/${id}`)} src={images[0].url} boxSize={180} p={3} rounded={'1.5vw'} alt=''/>
                    <Text px={5} w={150} textAlign={'center'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} fontWeight={'bold'} fontSize={'sm'} color={'whitesmoke'}>{name}</Text>
                    <Text fontSize={'xs'}  color={'#9e9e9e'}>{artists[0]?.name}</Text>
                </VStack>
            </Tilt>
        )
    })


    return (
        <Box w={"full"}  px={5}>

            <Text my={2} fontSize={'2vw'} fontWeight={"bold"} color={'whiteAlpha.700'} >Weekly musics</Text>
            <Grid templateColumns='repeat(5, 1fr)' gap={6} >
                {Render}
            </Grid>
        </Box>
    )
}