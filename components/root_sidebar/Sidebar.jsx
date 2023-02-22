import {Box, Button, Divider, Flex, HStack, Icon, Spacer, Text, VStack} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill, RiUserFollowLine} from "react-icons/ri";
import {BsMusicPlayerFill} from "react-icons/bs";
import {MdOutlineQueueMusic} from "react-icons/md";
import {FETCH_ALL_PLAYLIST} from "../../lib/FetcherFuncs/FETCH_ALL_PLAYLIST";
import useSWR from "swr";
import {useRouter} from "next/router";
import {useSetRecoilState , useRecoilState} from "recoil";
import {MY_PLAY_LIST_ID_ATOM} from "../../atoms/atoms"
import Tilt from 'react-parallax-tilt'
import {FETCH_RANDOM_ARTIST} from "../../lib/FetcherFuncs/FETCH_RANDOM_ARTIST";
import {useAsync} from "react-use";
import _ from 'lodash'
import Image from "next/image";
import {useRef, useState} from "react";


export const Sidebar = () =>
{
    const router = useRouter()

    const {data : MY_PLAY_LISTS} = useSWR('FETCH MY PLAYLIST' , async () => (await FETCH_ALL_PLAYLIST()))

    const [PLAYLIST_ID , SET_PLAYLIST_ID] = useRecoilState(MY_PLAY_LIST_ID_ATOM)


    const randomArtist = useAsync(async () => {

        return  await FETCH_RANDOM_ARTIST( 10)

    } , [8])

    console.log(randomArtist)


    const [showMore , setShowMore] = useState({setHeight : false , setOverFlow : false})



    return (


            <Flex display={{base : 'none' , md : 'flex'}} direction={"column"} justify={'flex-start'} pr={2} gap={5} flex={1.5} h={'100vh'} position={"sticky"} top={0} overflowY={'scroll'}>



                <Flex  direction={'column'} gap={1.5} py={2} >

                    <HStack background={router.pathname === '/' ? "pink.900" : "whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                        <RiHome6Line color={'#989898'}/>
                        <Text fontSize='sm' color={'whiteAlpha.700'}>Home</Text>
                    </HStack>

                    <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                        <RiMusicFill color={'#989898'}/>
                        <Text fontSize='sm' color={'whiteAlpha.700'}>Create playlist</Text>
                    </HStack>
                    <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                        <RiMusicFill color={'#989898'}/>
                        <Text fontSize='sm' color={'whiteAlpha.700'}>Liked song</Text>
                    </HStack>
                    <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                        <RiMusicFill color={'#989898'}/>
                        <Text fontSize='sm' color={'whiteAlpha.700'}>Listen later</Text>
                    </HStack>
                    <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                        <RiMusicFill color={'#989898'}/>
                        <Text fontSize='sm' color={'whiteAlpha.700'}>History</Text>
                    </HStack>
                </Flex>

                <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>


                <VStack justify={"center"}  p={1} >
                    <VStack justify={"center"} h={75} >
                        <Text textAlign={"center"} fontSize={"md"} w={"full"} >You don't have any Subscriptions</Text>
                        <Icon fontSize={"2xl"} as={RiUserFollowLine}/>
                    </VStack>
                </VStack>

                <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>



                <VStack h={showMore.setHeight ? 'auto' : 265} overflow={showMore.setOverFlow ? 'visible' : 'hidden'}>

                    <HStack w={"full"} >
                        <Text fontSize={"lg"} fontWeight={'bold'} w={"full"} >maybe you like it</Text>
                        <Button size={"xs"} onClick={() => setShowMore(prevState => ({setHeight: !prevState.setHeight , setOverFlow: !prevState.setOverFlow}))}>Show more</Button>
                    </HStack>

                    {randomArtist.value?.map(data => {
                            return (
                                <HStack w={"full"}
                                        key={data.id}
                                        cursor={'pointer'}
                                        fontSize='sm'
                                        bg={PLAYLIST_ID === data.id ? 'whatsapp.700' : 'whiteAlpha.200'}
                                        roundedRight={'xl'}
                                        roundedLeft={'3xl'}
                                        onClick={() => SET_PLAYLIST_ID(data.id)}>

                                    <Image style={{borderRadius : '5rem 0rem 5rem 5rem'}} src={data?.images[0]?.url} boxSize={45} width={50} height={50} placeholder={'blur'} blurDataURL={data?.images[0]?.url}/>


                                    <Box spacing={0} justify={"flex-start"}>
                                        <Text fontSize={"xs"} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{data.name}</Text>
                                        <Text fontSize={"2xs"}>{data.genres[0]}</Text>
                                    </Box>
                                </HStack>
                            )
                        }
                    )}
                </VStack>

            </Flex>

    )
}
