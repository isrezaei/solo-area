import {Box, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill} from "react-icons/ri";
import {BsMusicPlayerFill} from "react-icons/bs";
import {MdOutlineQueueMusic} from "react-icons/md";
import {FETCH_ALL_PLAYLIST} from "../../lib/FetcherFuncs/FETCH_ALL_PLAYLIST";
import useSWR from "swr";
import dynamic from "next/dynamic";

import {useSetRecoilState , useRecoilState} from "recoil";
import {MY_PLAY_LIST_ID_ATOM} from "../../atoms/atoms"
import Tilt from 'react-parallax-tilt'

const Animator = dynamic(
    import("react-scroll-motion").then((it) => it.Animator),
    { ssr: true }
);

import {ScrollContainer , ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut , Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";



export const Sidebar = () =>
{

    const {data : MY_PLAY_LISTS} = useSWR('FETCH MY PLAYLIST' , async () => (await FETCH_ALL_PLAYLIST()))

    const [PLAYLIST_ID , SET_PLAYLIST_ID] = useRecoilState(MY_PLAY_LIST_ID_ATOM)


    return (
        <Box  flex={1.5}  h={'100vh'} p={4} position={"sticky"} top={0} >

            <Text  color={'whiteAlpha.900'} my={3}>Browser Music</Text>

            <Flex direction={'column'}>
                <HStack spacing='.8vw' my={'1rem'}>
                    <RiHome6Line color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Home</Text>
                </HStack>
                <HStack spacing='.8vw' my={'1rem'}>
                    <BsMusicPlayerFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Albums</Text>
                </HStack>
                <HStack spacing='.8vw' my={'1rem'}>
                    <MdOutlineQueueMusic color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Tracks</Text>
                </HStack>
                <HStack spacing='.8vw' my={'1rem'}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Genres</Text>
                </HStack>
                <Spacer/>
            </Flex>


            <Text>PLAY LISTS</Text>


            <Flex w={"full"} h={'50vh'}  direction={'column'} justify={'flex-start'} align={"center"} gap={3} py={3} overflowY={'scroll'}  css={{
                '&::-webkit-scrollbar': {
                    width: '0px',
                }}}>

                {MY_PLAY_LISTS?.map(data => (
                        <Box w={"full"} key={Math.random()} >
                            <Tilt glareEnable={true} glareBorderRadius={'15px'} glareMaxOpacity={0.5} glareColor="#689f38" glarePosition="all">
                                <HStack w={"full"}
                                        key={Math.random()}
                                        p={1}
                                        cursor={'pointer'}
                                        fontSize='sm'
                                        bg={PLAYLIST_ID === data.id ? 'green.600' : 'whiteAlpha.200'}
                                        rounded={'xl'}
                                        onClick={() => SET_PLAYLIST_ID(data.id)}>

                                    <Image src={data?.images[0]?.url} boxSize={45} rounded={'xl'}/>
                                    <Text fontSize={12} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{data.name}</Text>
                                </HStack>
                            </Tilt>
                        </Box>
                    )
                )
                }


            </Flex>






        </Box>
    )
}
