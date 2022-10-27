import Head from "next/head";
import {Box, Button} from "@chakra-ui/react";
import {Center , Flex , Spacer , Container , HStack , Text} from "@chakra-ui/react";
import {HomeIcon , MusicalNoteIcon} from "@heroicons/react/24/outline";
import {MdOutlineQueueMusic} from 'react-icons/md'
import {RiMusicFill , RiHome6Line} from 'react-icons/ri'
import {BsMusicPlayerFill} from 'react-icons/bs'
import {RootMain} from "../components/ROOT_MAIN/RootMain";
import { useSession, signIn, signOut } from "next-auth/react"
import {getToken} from "next-auth/jwt";
import {useEffect, useState} from "react";
import spotifyApi from "../lib/SpotifyWebApi";
import useSpotify from "../hooks/useSpotify";
import {useRecoilState} from "recoil";
import {playListIdState} from "../atoms/PlayListAtom";


export default function Home() {

    const spotifyApi = useSpotify()

    const { data: session  , status} = useSession()

    const [playList , setPlayList] = useState([])

    const [playListId , setPlayListId] = useRecoilState(playListIdState)

    useEffect(()=>{

        if (spotifyApi.getAccessToken())
        {
            spotifyApi.getUserPlaylists().then(data => setPlayList(data.body.items))
        }
    } , [session , spotifyApi])


    console.log(playList)

    return (

        <Container maxW={'1990px'}>


            <Flex>

                <Box flexGrow={1}  h={'100vh'} p={4}>


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



                            {playList.map(data => <Text onClick={() => setPlayListId(data.id)} cursor={'pointer'} id={data.id} fontSize='sm' color={'whiteAlpha.600'} my={2}>{data.name}</Text>)}


                        </Flex>
                </Box>





                <Box flexGrow={8} p={4} >
                   <RootMain/>
                </Box>

            </Flex>



        </Container>
    )
}
