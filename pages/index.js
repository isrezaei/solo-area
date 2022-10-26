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



export default function Home() {

    const { data: session } = useSession()
    console.log(session)

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

                            <Text fontSize={'lg'} color={'whiteAlpha.900'} my={3}>Library</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                            <Text fontSize='sm' color={'whiteAlpha.600'} my={2}>PlayList</Text>
                        </Flex>
                </Box>

                <Box flexGrow={8} p={4} >
                   <RootMain/>
                </Box>

            </Flex>



        </Container>
    )
}
