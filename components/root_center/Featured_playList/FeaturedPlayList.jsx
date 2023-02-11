import useSWR from "swr";
import {Box, Image, Text, VStack, Flex, HStack, Divider, Center , Progress} from "@chakra-ui/react";
import {useRecoilState, useRecoilValue} from "recoil";
import {MY_PLAY_LIST_ID_ATOM, SPOTIFY_DEVICE_ID_ATOM, SPOTIFY_TRACKS_ID_ATOM} from "../../../atoms/atoms";
import {FETCH_ONE_PLAYLIST} from "../../../lib/FetcherFuncs/FETCH_ONE_PLAYLIST";
import prettyMilliseconds from "pretty-ms";
import {PUT_SPOTIFY_PLAY_MUSIC} from "../../../lib/PuterFuncs/PUT_SPOTIFY_PLAY_MUSIC";
import Tilt from 'react-parallax-tilt';

export const FeaturedPlayList = () =>
{
    const GET_PLAY_LIST_ID = useRecoilValue(MY_PLAY_LIST_ID_ATOM)
    const GET_SPOTIFY_DEVICE_ID = useRecoilValue(SPOTIFY_DEVICE_ID_ATOM)


    const {data : PLAYLIST_DATA} = useSWR('FETCH FEATURED PLAYLIST' , () => FETCH_ONE_PLAYLIST(GET_PLAY_LIST_ID))

    const [trackID , setTrackID] = useRecoilState(SPOTIFY_TRACKS_ID_ATOM)




    return (



            <Flex  w={'full'} h={'100vh'} overflow={'hidden'}  direction={'column'}   >

                <Flex w={"full"} justify={'start'} align={'center'} direction={{base : "column" , md : 'row'}} py={8} bgGradient={'linear(to-b , blackAlpha.100, whatsapp.800 , blackAlpha.100)'}>

                    <Image src={PLAYLIST_DATA?.images[0]?.url} alt={PLAYLIST_DATA?.name} boxSize={230} mx={6} boxShadow={'2xl'}/>
                    <VStack spacing={0} py={{base : 3 , md : 0}} align={{base : 'center' , md :'start'}}>
                        <Text fontWeight={'bold'}>PUBLIC PLAYLIST</Text>
                        <Text fontSize={{base : 30 , md:50}} fontWeight={'bold'}>{PLAYLIST_DATA?.name}</Text>
                        <Text>{PLAYLIST_DATA?.tracks.total} Songs</Text>
                    </VStack>

                </Flex>

                <HStack w={"full"} justify={'space-between'} px={3} color={'whiteAlpha.600'} fontSize={15}>
                    <Text flex={1} textAlign={'center'}># TITLE</Text>
                    <Text flex={1} textAlign={'center'}>ALBUMS</Text>
                    <Text flex={1} textAlign={'center'}>DATA ADDED</Text>
                    <Text flex={1} textAlign={'center'}>TIME</Text>
                </HStack>

                {PLAYLIST_DATA?.id === GET_PLAY_LIST_ID ?  <Divider my={3} bg={'whiteAlpha.700'} p={.4}/> : <Progress my={3} size='xs' isIndeterminate />}

                <Box w={"full"} h={'100vh'} overflowY={'scroll'} overflowX={"hidden"}>
                        {
                            PLAYLIST_DATA?.tracks.items.map((TRACKS , INDEX) => {


                                return (
                                        <Box w={'full'} key={TRACKS.track.id}>
                                            <Tilt tiltEnable={false} glareEnable={true} glareBorderRadius={'.8vw'} glareMaxOpacity={0.3} glareColor="#6d6d6d" glarePosition="all">
                                                <Flex key={Math.random()}
                                                      w={"full"}
                                                      justify={"center"}
                                                      align={'center'}
                                                      my={1}
                                                      p={2}
                                                      rounded={'lg'}
                                                      bg={'whiteAlpha.50'}
                                                      onClick={() => setTrackID(TRACKS.track.id)}>

                                                    <Flex flex={1.1} justify={'space-around'} align={'center'}>
                                                        <Text display={{base : 'none' , md : 'block'}} flex={.5} align={'center'} >{INDEX + 1}</Text>

                                                        <Center flex={1.2} >
                                                            <Image src={TRACKS?.track?.album?.images?.[0]?.url} boxSize={14} rounded={'xl'}/>
                                                        </Center>

                                                        <Box flex={2} align={'start'}>
                                                            <Text w={100} whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={'hidden'}>{TRACKS?.track?.name}</Text>
                                                            <Text w={79} whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={'hidden'} fontSize={'sm'}>{TRACKS?.track?.artists?.[0]?.name}</Text>
                                                        </Box>
                                                    </Flex>

                                                    <Text flex={1} w={1} whiteSpace={'nowrap'} textOverflow={"ellipsis"} overflow={'hidden'} fontSize={"sm"} textAlign={'center'}>{TRACKS?.track?.album?.name}</Text>
                                                    <Text display={{base : 'none' , md : 'block'}} flex={1}  textAlign={'center'} fontSize={"sm"}>{TRACKS?.added_at.slice(0 , 10)}</Text>
                                                    <Text display={{base : 'none' , md : 'block'}} flex={1}  textAlign={'center'} fontSize={"sm"}>  {prettyMilliseconds(TRACKS?.track?.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}</Text>
                                                    <Text display={{base : 'none' , md : 'block'}} flex={.2} >{trackID === TRACKS.track.id ? 'play' : ''}</Text>
                                                </Flex>
                                            </Tilt>
                                        </Box>
                                )
                            })
                        }

                </Box>


            </Flex>




    )
}