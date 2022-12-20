import useSWR from "swr";
import {Box, Image, Text, VStack, Flex, HStack, Divider, Center , Progress} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {MY_PLAY_LIST_ID_ATOM , SPOTIFY_DEVICE_ID_ATOM} from "../../../atoms/atoms";
import {FETCH_ONE_PLAYLIST} from "../../../lib/FetcherFuncs/FETCH_ONE_PLAYLIST";
import prettyMilliseconds from "pretty-ms";
import {PUT_SPOTIFY_PLAY_MUSIC} from "../../../lib/PuterFuncs/PUT_SPOTIFY_PLAY_MUSIC";
import Tilt from 'react-parallax-tilt';

export const FeaturedPlayList = () =>
{
    const GET_PLAY_LIST_ID = useRecoilValue(MY_PLAY_LIST_ID_ATOM)
    const GET_SPOTIFY_DEVICE_ID = useRecoilValue(SPOTIFY_DEVICE_ID_ATOM)


    const {data : PLAYLIST_DATA} = useSWR('FETCH FEATURED PLAYLIST' , () => FETCH_ONE_PLAYLIST(GET_PLAY_LIST_ID))



    return (

        <Box w={'full'} >
            <Flex w={'full'}   direction={'column'}  px={5} bg={"whiteAlpha.100"} >
                <Flex w={"full"} h={'22vw'}  justify={'flex-start'} align={'center'} bgGradient='linear(to-b, green.800 , blackAlpha.200)'>
                    <Image src={PLAYLIST_DATA?.images[0]?.url} alt='' boxSize={250} mx={6} boxShadow={'2xl'}/>
                    <VStack align={'start'}>
                        <Text fontWeight={'bold'}>PUBLIC PLAYLIST</Text>
                        <Text fontSize={50} fontWeight={'bold'}>{PLAYLIST_DATA?.name}</Text>
                        <HStack>
                            <Text>{PLAYLIST_DATA?.owner.display_name}</Text>
                            <Center height={8}>
                                <Divider orientation='vertical' />
                            </Center>
                            <Text>{PLAYLIST_DATA?.tracks.total} Songs</Text>
                        </HStack>
                    </VStack>
                </Flex>

                <HStack w={"full"} justify={'space-between'} px={3} color={'whiteAlpha.600'} fontSize={15}>
                    <Text flex={1} textAlign={'center'}># TITLE</Text>
                    <Text flex={1} textAlign={'center'}>ALBUMS</Text>
                    <Text flex={1} textAlign={'center'}>DATA ADDED</Text>
                    <Text flex={1} textAlign={'center'}>TIME</Text>
                </HStack>

                {PLAYLIST_DATA?.id === GET_PLAY_LIST_ID ?  <Divider my={3} bg={'whiteAlpha.700'} p={.4}/> : <Progress my={3} size='xs' isIndeterminate />}


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
                                                      onClick={() => PUT_SPOTIFY_PLAY_MUSIC(TRACKS.track.uri , GET_SPOTIFY_DEVICE_ID)}>

                                                    <Flex flex={1.1} justify={'space-around'} align={'center'}>
                                                        <Text flex={.5} align={'center'} >{INDEX + 1}</Text>

                                                        <Center flex={1.2} >
                                                            <Image src={TRACKS?.track?.album?.images?.[0]?.url} boxSize={14} rounded={'xl'}/>
                                                        </Center>

                                                        <Box flex={2} align={'start'}>
                                                            <Text>{TRACKS?.track?.name}</Text>
                                                            <Text fontSize={'sm'}>{TRACKS?.track?.artists?.[0]?.name}</Text>
                                                        </Box>
                                                    </Flex>

                                                    <Text flex={1}  textAlign={'center'}>{TRACKS?.track?.album?.name}</Text>
                                                    <Text flex={1}  textAlign={'center'}>{TRACKS?.added_at}</Text>
                                                    <Text flex={1}  textAlign={'center'}>  {prettyMilliseconds(TRACKS?.track?.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}</Text>
                                                </Flex>
                                            </Tilt>
                                        </Box>
                                )
                            })
                        }



            </Flex>


        </Box>


    )
}