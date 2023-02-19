import {Box, Flex, HStack, Image, Spacer, Text} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill} from "react-icons/ri";
import {BsMusicPlayerFill} from "react-icons/bs";
import {MdOutlineQueueMusic} from "react-icons/md";
import {FETCH_ALL_PLAYLIST} from "../../lib/FetcherFuncs/FETCH_ALL_PLAYLIST";
import useSWR from "swr";
import {useRouter} from "next/router";
import {useSetRecoilState , useRecoilState} from "recoil";
import {MY_PLAY_LIST_ID_ATOM} from "../../atoms/atoms"
import Tilt from 'react-parallax-tilt'




export const Sidebar = () =>
{
    const router = useRouter()

    const {data : MY_PLAY_LISTS} = useSWR('FETCH MY PLAYLIST' , async () => (await FETCH_ALL_PLAYLIST()))

    const [PLAYLIST_ID , SET_PLAYLIST_ID] = useRecoilState(MY_PLAY_LIST_ID_ATOM)


    return (
        <Flex display={{base : 'none' , md : 'flex'}} direction={"column"} justify={'flex-start'} flex={1.5}  h={'100vh'} px={3} position={"sticky"} top={0} >

            <Flex direction={'column'} gap={3} py={2} >

                <HStack background={router.pathname === '/' ? "pink.900" : "whiteAlpha.100"} spacing='.8vw' p={2}>
                    <RiHome6Line color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Home</Text>
                </HStack>

                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Create playlist</Text>
                </HStack>
                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Like song</Text>
                </HStack>
                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Listen later</Text>
                </HStack>
                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>History</Text>
                </HStack>
            </Flex>


            <Flex w={"full"} h={'auto'}  direction={'column'} justify={'flex-start'} align={"center"} gap={3} py={3} overflowY={'scroll'}  css={{
                '&::-webkit-scrollbar': {
                    width: '5px',
                }}}>
                <Text w={"full"} textAlign={'left'}>Playlists</Text>
                {MY_PLAY_LISTS?.map(data => (
                        <Box w={"full"} key={Math.random()} >
                            <Tilt glareEnable={true} glareBorderRadius={'15px'} glareMaxOpacity={0.2}  glarePosition="all">

                                <HStack w={"full"}
                                        key={Math.random()}
                                        p={1}
                                        cursor={'pointer'}
                                        fontSize='sm'
                                        bg={PLAYLIST_ID === data.id ? 'whatsapp.700' : 'whiteAlpha.200'}
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






        </Flex>
    )
}
