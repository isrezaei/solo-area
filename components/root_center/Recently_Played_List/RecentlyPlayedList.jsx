import useSWR from 'swr'
import {
    Box,
    Circle,
    Flex,
    Grid,
    Image,
    Text,
    VStack,
    Fade,
    Divider,
    Menu,
    MenuButton,
    MenuList, MenuItem, MenuDivider, Center
} from "@chakra-ui/react";
import {FETCH_RECENTLY_PLAYED_TRACK} from "../../../lib/FetcherFuncs/Fetch_Recently_Played_Track";
import {RiPlayCircleLine} from 'react-icons/ri'
import Tilt from 'react-parallax-tilt'
import {PUT_SPOTIFY_PLAY_MUSIC} from "../../../lib/PuterFuncs/PUT_SPOTIFY_PLAY_MUSIC";
import {SPOTIFY_DEVICE_ID_ATOM} from "../../../atoms/atoms";
import {useRecoilValue , useRecoilState} from "recoil";
import {FETCH_TRACK} from "../../../lib/FetcherFuncs/FETCH_TRACK";
import {useState} from "react";
import _ from 'lodash'
import { Icon } from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi'
import {RiPlayFill} from 'react-icons/ri'
import {useRouter} from "next/router";
import {SPOTIFY_DOWNLOADER} from "../../../lib/FetcherFuncs/SPOTIFY_DOWNLOADER";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../../atoms/atoms";


export const RecentlyPlayedList = () =>
{

    const router = useRouter()

    //?GET RECENTLY PLAYED LIST AS A FIRST CLINE SIDE RENDERING
    const {data : RECENTLY_PLAYED} = useSWR('/api/get_recently_played_list' , async () => (await FETCH_RECENTLY_PLAYED_TRACK()))


    const [activePlaying , setActivePlaying] = useState()

    const [trackID , setTrackID] = useRecoilState(SPOTIFY_TRACKS_ID_ATOM)


    const PLAY_TRACK = async (trackID) =>
    {
        //?She's going to take a song ID and bring
        const TRACK = await FETCH_TRACK(trackID)

        console.log(TRACK.name)

        //? ID from get track
        setActivePlaying(TRACK.id)
        setTrackID(TRACK.id)

    }




    //? This render we don't have track uri
    const RENDER = _.unionBy(RECENTLY_PLAYED , 'id')?.slice(0 , 10).map(TRACK => {

        return (

                <Flex
                    w={{base : 'full' , md : '20vw'}}
                    justify={'space-evenly'}
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


                    <Center
                        flex={3}
                        onClick={() => PLAY_TRACK(TRACK.id)}
                        opacity={TRACK.id === activePlaying ? '100%' : '0%'}
                        pointerEvents={TRACK.id === activePlaying ? 'visible' : 'none'}
                        transition={'.5s'}
                        _groupHover={{opacity : '100%' , pointerEvents : 'auto'}}>

                      <Icon boxSize={25} as={RiPlayFill} color={'whiteAlpha.600'}/>
                    </Center>



                    <Box flex={2}>
                        <Menu>
                            <MenuButton>
                                <Icon color={"whiteAlpha.500"} as={HiDotsHorizontal}/>
                            </MenuButton>
                            <MenuList bg={'blackAlpha.900'}>
                                <MenuItem>Add to queue</MenuItem>
                                <MenuDivider />
                                <MenuItem onClick={() => router.push(`/artist/${TRACK.artists[0].id}`)}>Go to artist</MenuItem>
                                <MenuItem>Got to albums</MenuItem>
                                <MenuDivider />
                                <MenuItem>Save to your Liked Songs </MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>

                </Flex>

        )
    })


    return (

        <Box w={"full"} h={'auto'}  my={4} px={5}>

            <Text my={2} fontSize={'2vw'} fontWeight={"bold"} color={'whiteAlpha.700'} >Let's listen again</Text>

            <Grid templateColumns={{base : 'repeat(1, 1fr)' , md : 'repeat(3, 1fr)'}} gap={4}>
                {RENDER}
            </Grid>

        </Box>
    )
}