import useSWR from 'swr'
import {Box, Circle, Flex, Grid, Image, Text, VStack, Fade, Divider} from "@chakra-ui/react";
import {FETCH_RECENTLY_PLAYED_TRACK} from "../../../lib/FetcherFuncs/Fetch_Recently_Played_Track";
import {RiPlayCircleLine} from 'react-icons/ri'
import Tilt from 'react-parallax-tilt'
import {PUT_SPOTIFY_PLAY_MUSIC} from "../../../lib/PuterFuncs/PUT_SPOTIFY_PLAY_MUSIC";
import {SPOTIFY_DEVICE_ID_ATOM} from "../../../atoms/atoms";
import {useRecoilValue} from "recoil";
import {FETCH_TRACK} from "../../../lib/FetcherFuncs/FETCH_TRACK";
import {useState} from "react";
import _ from 'lodash'



export const RecentlyPlayedList = () =>
{

    //?GET RECENTLY PLAYED LIST AS A FIRST CLINE SIDE RENDERING
    const {data : RECENTLY_PLAYED} = useSWR('/api/get_recently_played_list' , async () => (await FETCH_RECENTLY_PLAYED_TRACK()))
    const DEVICE_ID = useRecoilValue(SPOTIFY_DEVICE_ID_ATOM)

    const [activePlaying , setActivePlaying] = useState()


    const PLAY_TRACK = async (trackID) =>
    {
        const TRACK = await FETCH_TRACK(trackID)

        //? ID from get track
        setActivePlaying(TRACK.id)

        //? Get track uri for playing song
        return PUT_SPOTIFY_PLAY_MUSIC(TRACK.uri , DEVICE_ID)
    }




    //? This render we don't have track uri
    const RENDER = _.unionBy(RECENTLY_PLAYED , 'id')?.slice(0 , 10).map(TRACK => {

        // console.log(TRACK)

        return (
            <Tilt key={TRACK.id} scale={0.95} transitionSpeed={1500} glareBorderRadius={'150px'}>
                <Flex
                    w={'full'}
                    justify={'space-between'}
                    align={'center'}
                    bg={'whiteAlpha.200'}
                    _hover={{bg : 'whiteAlpha.300' , transition : '.3s'}}
                    roundedLeft={50}
                    roundedRight={20}
                    cursor={'pointer'}
                    role={'group'}>

                    <Image src={TRACK?.album?.images?.[0].url}
                           boxSize={59}
                           position={'relative'}
                           filter={'auto'}
                           roundedLeft={5}
                           alt={TRACK.name}/>

                    <Flex flex={2}
                          mx={3}
                          direction={'column'}>
                        <Text w={150} color={'whiteAlpha'}  fontWeight={'bold'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{TRACK.name}</Text>
                        <Text fontSize={'xs'} color={'whiteAlpha.500'}>{TRACK.artists[0].name}</Text>
                    </Flex>


                    <Circle
                        onClick={() => PLAY_TRACK(TRACK.id)}
                        size={10}
                        bg={'#8bc34a'}
                        mx={2}
                        opacity={TRACK.id === activePlaying ? '100%' : '0%'}
                        pointerEvents={TRACK.id === activePlaying ? 'visible' : 'none'}
                        transition={'.5s'}
                        _groupHover={{opacity : '100%' , pointerEvents : 'auto'}}>

                        <RiPlayCircleLine size={30} color={'rgba(0,0,0,0.63)'}/>

                    </Circle>
                </Flex>
            </Tilt>
        )
    })


    return (

        <Box w={"full"} h={'auto'}  my={4} px={5}>

            <Text fontSize={'lg'} color={'whiteAlpha.600'} >Let's listen again</Text>

            <Divider orientation='horizontal' mb={3} />

            <Grid templateColumns='repeat(3, 1fr)' gap={4}>
                {RENDER}
            </Grid>

        </Box>
    )
}