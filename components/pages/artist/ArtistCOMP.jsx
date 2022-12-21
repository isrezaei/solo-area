import useSWR from "swr";
import {FETCH_ARTIST} from "../../../lib/FetcherFuncs/FETCH_ARTIST";
import {useRouter} from "next/router";
import {Box, Flex, HStack, Image, Text, VStack, Button, Icon, Center} from "@chakra-ui/react";
import {useState} from "react";
import { Img } from '@chakra-ui/react'
import { HiDotsHorizontal } from 'react-icons/hi'
import {RiPlayFill} from 'react-icons/ri'
import Tilt from "react-parallax-tilt";
import {PUT_SPOTIFY_PLAY_MUSIC} from "../../../lib/PuterFuncs/PUT_SPOTIFY_PLAY_MUSIC";
import prettyMilliseconds from "pretty-ms";
import {ScrollContainer} from "react-indiana-drag-scroll";

export const ArtistCOMP = () =>
{

    const [artistImage , setArtistImage] = useState()

    const {query : {artist : artistID}} = useRouter()

    const {data : ARTIST} = useSWR('GET ARTIST INFORMATION' , ()  => (FETCH_ARTIST(artistID)))

    // const images = data?.map(value => value?.images?.[0].url)


    console.log(ARTIST)



        return (
            <Box position={"relative"}>

                <Img src={ARTIST?.artist_info.images[0].url} w={'full'} h={'100vh'} objectFit={'cover'} opacity={'30%'} position={"absolute"}/>

                <Flex w={"full"} h={'100vh'} p={5} direction={'column'} position={"absolute"} overflowY={"scroll"} overflowX={'hidden'} >


                    <VStack justify={"center"} align={'start'} w={'full'} h={'40vh'} px={5} >
                        <Text fontWeight={'bold'} fontSize={'5vw'}>{ARTIST?.artist_info.name}</Text>
                        <Text fontSize={'1.2vw'}>{ARTIST?.artist_info.followers.total} Followers </Text>

                        <HStack gap={5} my={5}>
                                <Center w={45} h={45} rounded={'full'} bg={'lightgreen'}>
                                    <Icon boxSize={8} color={"blackAlpha.800"} as={RiPlayFill}/>
                                </Center>
                            <Button variant={"outline"} colorScheme={'green'}>Follow</Button>
                            <Text>...</Text>
                        </HStack>
                    </VStack>



                    <VStack justify={'start'} align={'start'} w={"full"}>

                        <VStack w={"full"}  align={"start"}>
                            <Text>Popular</Text>
                            {
                                ARTIST?.top_track.map((TRACKS , INDEX) => (
                                    <Box w={'full'} key={TRACKS.id}>
                                        <Tilt tiltEnable={false} glareEnable={true} glareBorderRadius={'.8vw'} glareMaxOpacity={0.3} glareColor="#6d6d6d" glarePosition="all">
                                            <Flex key={Math.random()}
                                                  w={"full"}
                                                  justify={"center"}
                                                  align={'center'}
                                                  my={1}
                                                  p={2}
                                                  rounded={'lg'}
                                                  bg={'whiteAlpha.50'}>

                                                <Flex flex={1.1} justify={'space-around'} align={'center'}>
                                                    <Text flex={.5} align={'center'} >{INDEX + 1}</Text>

                                                    <Center flex={1.2} >
                                                        <Image src={TRACKS?.album?.images?.[0]?.url} boxSize={14} rounded={'xl'}/>
                                                    </Center>

                                                    <Box flex={2} align={'start'}>
                                                        <Text>{TRACKS?.name}</Text>
                                                        <Text fontSize={'sm'}>{TRACKS?.artists?.[0]?.name}</Text>
                                                    </Box>
                                                </Flex>

                                                <Text flex={1}  textAlign={'center'}>{TRACKS?.album?.name}</Text>

                                                <Text flex={1}  textAlign={'center'}>  {prettyMilliseconds(TRACKS?.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}</Text>
                                            </Flex>
                                        </Tilt>
                                    </Box>
                                ))
                            }

                        </VStack>


                        <Text fontWeight={'bold'} fontSize={'2vw'}>More albums from {ARTIST?.artist_info.name}</Text>


                            <ScrollContainer style={{display : 'flex' , width : '100%'}}>
                                {
                                    ARTIST?.artist_albums.items.map(ALBUMS => (

                                        <VStack  key={ALBUMS.id} flex={'none'} bg={"blackAlpha.500"} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "#212121"}}>
                                            <Image src={ALBUMS?.images[0].url} boxSize={'15vw'} p={3} rounded={'1.5vw'} alt=''/>
                                            <Text  textAlign={'left'} fontWeight={'bold'} fontSize={'md'} align={'left'} color={'whitesmoke'}>{ALBUMS?.name}</Text>
                                            <Text  textAlign={'left'} fontSize={'.8vw'} align={'left'} color={'#9e9e9e'}>{ALBUMS?.artists[0]?.name}</Text>
                                        </VStack>

                                    ))

                                }
                            </ScrollContainer>

                    </VStack>

                </Flex>
            </Box>

        )

}