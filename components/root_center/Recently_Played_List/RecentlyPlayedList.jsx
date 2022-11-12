import useSpotify from "../../../hooks/useSpotify";
import useSWR from 'swr'
import {Box, Flex, Image, Text} from "@chakra-ui/react";
import axios from "axios";
import { ScrollContainer } from 'react-indiana-drag-scroll'
import {useRef , useEffect} from "react";
import {Fetch_New_Releases_Albums} from "../../../lib/FetcherFuncs/Fetch_New_Releases_Albums";
import {FETCH_RECENTLY_PLAYED_TRACK} from "../../../lib/FetcherFuncs/Fetch_Recently_Played_Track";

export const RecentlyPlayedList = () =>
{
    
    //?GET RECENTLY PLAYED LIST AS A FIRST CLINE SIDE RENDERING
    const { data, error } = useSWR('/api/get_recently_played_list' , async () => (await FETCH_RECENTLY_PLAYED_TRACK()))

    const RENDER = data?.slice(0 , 10).map(value => {

        return (
            <Image key={Math.random()} src={value?.album?.images?.[0].url}  boxSize={'15vw'} mr={5} alt=''/>
        )

    })


    return (

        <Box my={4}>

            <Text fontSize={'2vw'} color={'whiteAlpha.800'} my={5}>Recently Played</Text>


            <ScrollContainer style={{display : 'flex'}}>
                {RENDER}
            </ScrollContainer>

        </Box>
    )
}