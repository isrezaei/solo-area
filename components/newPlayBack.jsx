import {
    Box,
    Button,
    Center,
    Flex,
    Grid,
    HStack,
    Icon,
    Image, Link,
    Skeleton, SkeletonCircle,
    SkeletonText, Stack,
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
import {useAsync} from "react-use";
import {PropagateLoader} from "react-spinners";

export const NewPlayBack =() =>
{

    const trackID = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM)

    const [metaData , setMetaData] = useState()
    const [playBackStatus , setPlayBackStatus] = useState('idle')

    useAsync(async () => {

        setPlayBackStatus('idle')

        if (trackID) {
            setPlayBackStatus('pending')
            const getMetaData = await SPOTIFY_DOWNLOADER(trackID)
            setMetaData(getMetaData)
            setPlayBackStatus('success')
        }

    } , [trackID])

    console.log(playBackStatus)


    return (
        <Flex w={"full"} bgGradient={'linear(to-tl, whatsapp.800 , black)'}  justify={'space-around'} align={'center'} zIndex={1000}  position={'fixed'} bottom={0}>
            <Flex w={"full"} justify={"space-between"} align={"center"} p={2}  >
                <Box  flex={1} >
                    <HStack spacing={0}>
                        {playBackStatus === 'idle' && <Skeleton rounded={'md'} boxSize={50} startColor='#212121' endColor='#424242'/>}
                        {playBackStatus === 'success' && <Image src={metaData?.metadata?.cover} alt='' boxSize={65} rounded={'md'} boxShadow={'2xl'}/>}
                        {playBackStatus === 'pending' && <Center w={"full"}><PropagateLoader color={'#41d636'} size={10}/></Center>}
                        <VStack spacing={0} align={"start"} px={2}>
                            {playBackStatus === 'idle' && <SkeletonText  noOfLines={2} startColor='#212121' endColor='#424242'/>}
                            {
                                playBackStatus === 'success'&&
                                <>
                                    <Text  w={150}  whiteSpace={"nowrap"} textOverflow={'ellipsis'} overflow={'hidden'}  color={'whiteAlpha.800'} fontWeight={'bold'} fontSize={'md'}>{metaData?.metadata?.title}</Text>
                                    <Text  fontSize={'xs'} color={'whiteAlpha.800'}>{metaData?.metadata?.artists}</Text>
                                </>
                            }
                        </VStack>
                    </HStack>
                </Box>
                <Box flex={5} >
                    <AudioPlayer
                        autoPlay={false}
                        progressJumpSteps = {{forward: 30000, backward: 10000}}
                        layout="stacked-reverse"
                        customIcons={{
                            play : <Icon boxSize={7} as={IoPlay}/>,
                            pause : <Icon boxSize={7} as={IoPause}/>,
                            rewind : <Icon boxSize={8}  rounded={50} p={1} as={HiRewind}/>,
                            forward : <Icon boxSize={8} rounded={50} p={1} as={HiFastForward}/>,
                            volume: <Icon boxSize={6} bg={"whiteAlpha.300"} rounded={50} p={1} as={BiVolumeFull}/>,
                            volumeMute: <Icon boxSize={6} bg={"whiteAlpha.300"} rounded={50} p={1} as={BiVolume}/>
                        }}
                        src={metaData?.link}
                        style={{background : "transparent" , opacity : metaData ? '100%' : '30%' , pointerEvents : metaData ? 'visible' : 'none'}}
                        customVolumeControls={
                            [RHAP_UI.VOLUME,
                                <HStack>
                                    <Link href={metaData?.link} download>
                                        <Icon boxSize={6} bg={"whiteAlpha.300"} color={"whiteAlpha.600"} rounded={50} p={1}  as={RiDownload2Fill}/>
                                    </Link>
                                    <Icon boxSize={6} bg={"whiteAlpha.300"} color={"whiteAlpha.600"} rounded={50} p={1}  as={RiHeart3Line}/>
                                </HStack>]
                        }
                    />
                </Box>
            </Flex>
        </Flex>
    )
}