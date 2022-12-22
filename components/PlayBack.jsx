import {useEffect, useState} from "react";
import {
    Box,
    Divider,
    Flex,
    Image,
    Text,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack, VStack, Grid, useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Button, Center,
} from "@chakra-ui/react";
import {usePlayer} from "../hooks/usePlayer";
import {Skeleton , SkeletonText} from "@chakra-ui/react";
import {MdShuffle, MdRepeat , MdComputer} from 'react-icons/md'
import {FaStepForward , FaStepBackward , FaPlay , FaPause} from 'react-icons/fa'
import {BiVolumeFull} from 'react-icons/bi'
import {useRecoilState} from "recoil";
import {SPOTIFY_DEVICE_ID_ATOM} from "../atoms/atoms";
import PulseDot from 'react-pulse-dot'
import 'react-pulse-dot/dist/index.css'
import {FETCH_MY_FLOWING_ARTISTS} from "../lib/FetcherFuncs/FETCH_MY_FLOWING_ARTISTS";
import useSWR from "swr";
import {useDebounce} from "react-use";
import {useRouter} from "next/router";



export const PlayBack = () =>
{

    const {data : FLOWING_ARTISTS} = useSWR('FETCH FLOWING ARTIST' , async () => (await FETCH_MY_FLOWING_ARTISTS()))

    const player = usePlayer()

    const router = useRouter()


    const toast = useToast()
    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(undefined);
    const [connect_stream , setConnectStream] = useState(false)
    const [stream_modal , setModalCondition] = useState(false)
    const [button_modal , setButtonCondition] = useState(false)
    const [volume , setDeviceVolume] = useState(0.5)
    const [SPOTIFY_DEVICE_ID , SET_SPOTIFY_DEVICE_ID] = useRecoilState(SPOTIFY_DEVICE_ID_ATOM)


    //*HANDEL CHANGE VOLUME IN DEBOUNCE MOOD
    useDebounce(() => {
        player?.setVolume(volume).then(() => {
            console.log('Volume updated!');
        });
    } , 1000 , [volume])


    //* GET SPOTIFY INFORMATION AND BEHAVIOR FOR WEB PLAY BACK
    useEffect(() => {
        player?.addListener('player_state_changed', ( state => {
            setTrack(state?.track_window.current_track);
            setPaused(state?.paused)
            player.getCurrentState().then( state => {
                if (state?.track_window?.current_track !== null) return setActive(true)
                return setActive(false)
            }).catch(reason => console.log(reason))
        }))
    } , [player , connect_stream])


    //*HANDEL ALERT SPOTIFY DEVICE ID
    useEffect(() => {
        if (SPOTIFY_DEVICE_ID)
        {
            setButtonCondition(false)
            toast({
                title: 'DEVICE ID IS READY 👍',
                description: "device id is ready , check your spotify stream",
                status: 'info',
                duration: 5000,
                isClosable: true,
                position : 'top-left'
            })
        }
        if (!SPOTIFY_DEVICE_ID)
        {
            setButtonCondition(false)
        }
    } , [SPOTIFY_DEVICE_ID])


    //* ALERT FOR CONNECT STREAM IS SUCCESSFUL OR FAILED
    useEffect(() => {
        if (is_active)
        {
            toast({
                title: 'SPOTIFY STREAM',
                description: "spotify stream connected ",
                status: 'success',
                duration: 5000,
                isClosable: true,
                position : 'top-left'
            })
        }
        if (!is_active)
        {
            toast({
                title: 'SPOTIFY STREAM',
                description: "spotify stream disconnect",
                status: 'error',
                duration: 5000,
                isClosable: true,
                position : 'top-left'
            })
        }
    } , [is_active])

    // console.log(is_active)

    //* HANDEL GENERATE NEW DEVICE ID OR REMOVE DEVICE ID
    const stream_connector = () =>
    {
        if (!connect_stream)
        {
            player.addListener('ready', ({ device_id }) => {
                SET_SPOTIFY_DEVICE_ID(device_id)
                console.log('Ready with Device ID', device_id);
            })
            player.connect()
            setConnectStream(state => !state)
            setButtonCondition(true)
        }

        if (connect_stream)
        {
            player.disconnect()
            setConnectStream(state => !state)
            toast({
                title: 'DEVICE ID IS DEAD 😵',
                description: "device id is disconnect",
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position : 'top-left'
            })
            SET_SPOTIFY_DEVICE_ID(undefined)
            setButtonCondition(true)
        }
    }


    return (
        <Flex direction={"column"} justify={'space-around'} alignItems={'center'} flex={2} h={'100vh'} position={'sticky'} top={0} bg={"#181818"}>

            <Text w={"full"} fontSize={'1.5vw'} px={4} fontWeight={'bold'} textColor={'whiteAlpha.600'}>Your Flowing</Text>

            <Grid templateColumns={'repeat(3 , 1fr)'}  w={'95%'} h={'15vw'} gap={1.5}>
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



            <Flex w={'95%'} p={'.8vw'} direction={'column'} bg={'#0e0e0e'} rounded={'2xl'}>
                {
                    is_active
                        ?
                        <Flex direction={'column'} justify={'center'} alignItems={'center'} w={"full"} height={"auto"} >
                            <Image src={current_track?.album?.images?.[2]?.url} alt='' boxSize={'15vw'} rounded={'md'} boxShadow={'2xl'}/>
                            <Text my={1} align={'center'}  color={'whiteAlpha.800'} fontWeight={'bold'} fontSize={'lg'}>{current_track?.name}</Text>
                            <Text fontSize={'xs'} color={'whiteAlpha.800'}>{current_track?.artists?.[0]?.name} {current_track?.artists?.[1]?.name}</Text>
                        </Flex>
                        :
                        <Box w={"full"} height={"auto"}>
                            <Skeleton height='15vw'  mx={3} startColor='#212121' endColor='#424242'/>
                            <SkeletonText padding={3} noOfLines={1} startColor='#212121' endColor='#424242'/>
                            <SkeletonText paddingX={'5vw'} noOfLines={1} startColor='#212121' endColor='#424242'/>
                        </Box>
                }

                <Flex opacity={is_active ? '100%' : '30%'} pointerEvents={is_active ? 'auto' : 'none'} cursor={'pointer'} w={"full"} h={'5vw'} justify={'space-evenly'} alignItems={'center'}>

                    <Center w={'2vw'} h={'2vw'} bg={'#424242'} rounded={'xl'}>
                        <MdRepeat color={'white'} size={20}/>
                    </Center>


                    <Center w={'2.8vw'} h={'2.8vw'} bg={'#424242'} rounded={'full'}>
                        <FaStepBackward color={'#efefef'} onClick={() => player.previousTrack()} size={25}/>
                    </Center>


                    <Center  w={'3vw'} h={'3vw'} bg={'#424242'} rounded={'full'} onClick={()=> player.togglePlay().then(() => console.log(current_track ? 'Web Playback is active' : 'need web play back active !'))} >
                        { is_paused ?  <FaPlay color={'#efefef'} size={23}/> : <FaPause color={'#efefef'} size={23}/> }
                    </Center>

                    <Center w={'2.8vw'} h={'2.8vw'} bg={'#424242'} rounded={'full'}>
                        <FaStepForward color={'#efefef'} size={25} onClick={() => player.nextTrack()} />
                    </Center>

                    <Center w={'2vw'} h={'2vw'} bg={'#424242'} rounded={'xl'}>
                        <MdShuffle color={'white'} size={20}/>
                    </Center>

                </Flex>




                <Flex justify={'space-evenly'} alignItems={'center'} w={'full'}>

                    <Skeleton  flex={1}  height={'1vw'} isLoaded={is_active} rounded={'.3vw'} startColor='#212121' endColor='#424242'>
                        <Flex w={'full'} justify={'center'} alignItems={'center'} gap={3}  >
                            <BiVolumeFull  color={'white'} size={20}/>
                            <RangeSlider w={'8vw'} aria-label={['min', 'max']} defaultValue={[0, volume * 100]} onChange={e => setDeviceVolume(e[1] / 100)}>
                                <RangeSliderTrack boxSize={'.8vw'} bg='red.100' rounded={'1vw'}>
                                    <RangeSliderFilledTrack bg={'#81c784'} />
                                </RangeSliderTrack>
                            </RangeSlider>
                        </Flex>

                    </Skeleton>

                    <Flex flex={.3} justify={'center'} align={'center'} position={"relative"} cursor={'pointer'}>
                        <PulseDot color={is_active ? '#81c784' : '#424242'} style={{fontSize: '1.8em'}}/>
                        <MdComputer className={'absolute top-50 left-50 right-50'} color={is_active ? '#2b8335' : '#e0e0e0'} size={15} onClick={() => setModalCondition(true)}/>
                    </Flex>

                </Flex>

            </Flex>



            <Modal isCentered size={'xl'} scrollBehavior={'inside'} isOpen={stream_modal} onClose={() => setModalCondition(false)}>

                <ModalOverlay
                    bg='blackAlpha.300'
                    backdropFilter='blur(10px) hue-rotate(90deg)'
                />

                <ModalContent bg='#212121'>
                    <ModalHeader color={"white"}>Start Spotify streaming 😊</ModalHeader>
                    <ModalCloseButton color={'white'} />
                    <ModalBody css={{
                        '&::-webkit-scrollbar': {
                            display : 'none',
                        }}}>

                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* First of all, you need a Spotify Premium account</Text>
                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* Click on the (Start connect to stream) button</Text>
                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* Run the real Spotify software on your device</Text>
                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* Click on the PC logo</Text>
                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* You will see a list of devices ready to stream</Text>
                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* The name of the device you need to connect to is :</Text>
                        <Text my={2} color={"#cfcfcf"} fontWeight={'bold'}>* Spotify Web Playback " Your account name "</Text>

                        <Divider my={5}/>

                        <Image src='/SpotifyGuide.png' width={'auto'} mx={"auto"} my={3} rounded={'.8vw'} boxShadow={'2xl'}/>

                    </ModalBody>

                    <ModalFooter>
                        {/*<Button variant='solid' rounded={'2xl'} colorScheme={'whatsapp'} onClick={stream_connector}>Start Stream</Button>*/}

                        <Button
                            isLoading={button_modal}
                            loadingText='Loading'
                            colorScheme={SPOTIFY_DEVICE_ID ? 'red' : 'whatsapp'}
                            variant='solid'
                            size={'md'}
                            onClick={stream_connector}>
                            {SPOTIFY_DEVICE_ID ? 'disconnect' : 'start stream'}
                        </Button>


                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Flex>

    )
}