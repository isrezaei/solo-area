import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    HStack,
    Icon,
    Image, Link,
    Skeleton,
    SkeletonText,
    Text,
    VStack
} from "@chakra-ui/react";
import useSWR from "swr";
import {FETCH_MY_FLOWING_ARTISTS} from "../lib/FetcherFuncs/FETCH_MY_FLOWING_ARTISTS";
import {IoPlay , IoPause} from 'react-icons/io5'
import { HiRewind , HiFastForward} from 'react-icons/hi'
import {RiDownload2Fill , RiHeart3Line} from 'react-icons/ri'
import {BiVolumeFull , BiVolume} from 'react-icons/bi'
import {SPOTIFY_DOWNLOADER} from "../lib/FetcherFuncs/SPOTIFY_DOWNLOADER";
import {SPOTIFY_TRACKS_ID_ATOM} from "../atoms/atoms";
import {useRecoilValue} from "recoil";
import {useEffect, useState} from "react";
import AudioPlayer , {RHAP_UI} from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import {useRouter} from "next/router";
import {useDebounce} from "react-use";


export const NewPlayBack =() =>
{

    const router = useRouter()
    const trackID = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM)

    const {data : FLOWING_ARTISTS} = useSWR('FETCH FLOWING ARTIST' , async () => (await FETCH_MY_FLOWING_ARTISTS()))
    // const {data : PLAYBACK} = useSWR('GET PLAY MUSIC' , async () => (await SPOTIFY_DOWNLOADER(trackID)))

    const [PLAYBACK , setPLAYBACK] = useState()
    const [playBackStatus , setPlayBackStatus] = useState('success')

    // useEffect(() => {
    //     if (trackID)
    //     {
    //         const getData = async () =>
    //         {
    //             const Data = await SPOTIFY_DOWNLOADER(trackID)
    //             console.log(Data)
    //             setPLAYBACK(Data)
    //         }
    //         getData()
    //     }
    //
    // } , [trackID])
    //


    useDebounce(async () => {

        setPlayBackStatus('pending')

        if (trackID) {
            const Data = await SPOTIFY_DOWNLOADER(trackID)
            console.log(Data)
            setPLAYBACK(Data)
            setPlayBackStatus('success')
        }


    } , 2000 , [trackID])


    return (
        <Flex flex={1.8} direction={'column'} justify={'space-around'} align={'center'} h={'100vh'} bg={"whiteAlpha.100"} px={3} position={'sticky'} top={0}>

            <VStack >
                <Text w={"full"} fontSize={'1.5vw'} fontWeight={'bold'} textColor={'whiteAlpha.600'}>Your Flowing</Text>
                <Grid templateColumns={'repeat(3 , 1fr)'}  h={'15vw'} gap={1.5}>
                    {
                        FLOWING_ARTISTS?.map(ARTIST => {
                            return (
                                <VStack key={Math.random()} onClick={() => router.push(`/artist/${ARTIST.id}`)} cursor={'pointer'} my={1} bg={'#0e0e0e'} p={'.5vw'} rounded={'.8vw'}>
                                    <Image src={ARTIST?.images?.[0].url} alt={ARTIST?.name} boxSize={'4vw'} rounded={"3xl"}/>
                                    <Text textAlign={'center'} fontSize={10} fontWeight={'bold'} color={'white'}>{ARTIST?.name}</Text>
                                </VStack>
                            )
                        })
                    }
                </Grid>
            </VStack>


            {playBackStatus === 'pending' && "Loading 000"}
            {playBackStatus === 'success' &&  <VStack w={"full"} justify={"center"} align={"center"} >

                <Flex direction={'column'} justify={'center'} alignItems={'center'} w={"full"} height={"auto"} >
                    <Skeleton isLoaded={PLAYBACK} startColor='#212121' endColor='#424242'>
                        <Image src={PLAYBACK?.metadata.cover} alt='' boxSize={220} rounded={'md'} boxShadow={'2xl'}/>
                    </Skeleton>

                    {
                        PLAYBACK ?
                            <VStack spacing={0} my={1}>
                                <Text  w={150}  whiteSpace={"nowrap"} textOverflow={'ellipsis'} overflow={'hidden'}  align={'center'}  color={'whiteAlpha.800'} fontWeight={'bold'} fontSize={'md'}>{PLAYBACK?.metadata.title}</Text>
                                <Text  fontSize={'xs'} color={'whiteAlpha.800'}>{PLAYBACK?.metadata.artist}</Text>
                            </VStack>
                            :
                            <Box w={"full"}>
                                <SkeletonText padding={3} noOfLines={2} startColor='#212121' endColor='#424242'/>
                            </Box>
                    }
                </Flex>

                <AudioPlayer
                    autoPlay
                    width={'100px'}
                    progressJumpSteps = {{forward: 30000, backward: 10000}}
                    layout="stacked-reverse"
                    customIcons={{
                        play : <Icon boxSize={7} as={IoPlay}/>,
                        pause : <Icon boxSize={7} as={IoPause}/>,
                        rewind : <Icon boxSize={8} bg={"whiteAlpha.300"} rounded={50} p={1} as={HiRewind}/>,
                        forward : <Icon boxSize={8} bg={"whiteAlpha.300"} rounded={50} p={1} as={HiFastForward}/>,
                        volume: <Icon boxSize={6} bg={"whiteAlpha.300"} rounded={50} p={1} as={BiVolumeFull}/>,
                        volumeMute: <Icon boxSize={6} bg={"whiteAlpha.300"} rounded={50} p={1} as={BiVolume}/>
                    }}
                    src={PLAYBACK?.link}
                    style={{background : "transparent" , opacity : PLAYBACK ? '100%' : '30%' , pointerEvents : PLAYBACK ? 'visible' : 'none'}}
                    customVolumeControls={
                        [RHAP_UI.VOLUME,
                            <HStack>
                                <Link href={PLAYBACK?.soundcloudTrack?.audio[0].url} download>
                                    <Icon boxSize={6} bg={"whiteAlpha.300"} color={"whiteAlpha.600"} rounded={50} p={1}  as={RiDownload2Fill}/>
                                </Link>
                                <Icon boxSize={6} bg={"whiteAlpha.300"} color={"whiteAlpha.600"} rounded={50} p={1}  as={RiHeart3Line}/>
                            </HStack>]}
                    customControlsSection={
                        [
                            RHAP_UI.MAIN_CONTROLS,
                            RHAP_UI.VOLUME_CONTROLS,
                        ]
                    }
                />
            </VStack>}





        </Flex>
    )
}