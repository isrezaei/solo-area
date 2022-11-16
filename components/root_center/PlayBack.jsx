import {useEffect, useState} from "react";
import {
    Box,
    Divider,
    Flex,
    Image,
    Text,
    HStack,
    RangeSlider,
    RangeSliderTrack,
    RangeSliderFilledTrack, RangeSliderThumb
} from "@chakra-ui/react";
import {usePlayer} from "../../lib/usePlayer";
import {Skeleton , SkeletonText} from "@chakra-ui/react";
import {CiPlay1 , CiPause1} from 'react-icons/ci'
import {MdOutlineSkipNext, MdOutlineSkipPrevious, MdShuffle, MdRepeat, MdGraphicEq , MdComputer} from 'react-icons/md'
import {SlControlForward , SlControlRewind} from 'react-icons/sl'
import {BiVolumeFull} from 'react-icons/bi'
import {useToasts} from "react-toast-notifications";
import {HiComputerDesktop} from 'react-icons/hi2'
import {useSetRecoilState} from "recoil";
import {SPOTIFY_DEVICE_ID_ATOM} from "../../atoms/ItemsAtom";
import PulseDot from 'react-pulse-dot'
import 'react-pulse-dot/dist/index.css'


export const PlayBack = () =>
{


    const player = usePlayer()

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [current_track, setTrack] = useState(undefined);
    const [connect_stream , setConnect] = useState(false)

    const SET_SPOTIFY_DEVICE_ID = useSetRecoilState(SPOTIFY_DEVICE_ID_ATOM)

    const { addToast } = useToasts();

    useEffect(() => {

        if (player)
        {
            player.addListener('player_state_changed', ( state => {
                setTrack(state?.track_window.current_track);
                setPaused(state?.paused)
                player.getCurrentState().then( state => {

                    console.log(state)

                    !state?.context?.uri ? setActive(false) : setActive(true)
                }).catch(reason => console.log(reason))
            }))
        }

    } , [player , connect_stream])



    useEffect(() => {

        if (is_active)
        {
            addToast('Spotify Stream Is Connected', {
                appearance: 'success' ,
                autoDismiss: true
            })
        }

        if (!is_active)
        {
            addToast('Spotify Stream Is Offline', {
                appearance: 'error',
                autoDismiss: true,
            })
        }



    } , [is_active])





    const stream_connector = () =>
    {
        if (!connect_stream)
        {
            player.addListener('ready', ({ device_id }) => {
                SET_SPOTIFY_DEVICE_ID(device_id)
                console.log('Ready with Device ID', device_id);
            })

            player.connect()

            setConnect(state => !state)

            addToast('Ready with Device ID to Connect Spotify app', {
                appearance: 'info' ,
                autoDismiss: true
            })
        }

        if (connect_stream)
        {
            player.disconnect()
            setConnect(state => !state)
            addToast('Device ID is not Ready to Connect Spotify app', {
                appearance: 'info' ,
                autoDismiss: true
            })
        }
    }


    return (
        <Flex direction={"column"} justifyContent={'flex-end'} alignItems={'center'}  w={'20vw'} h={'100vh'} bg={"#424242"}>
            {
                is_active
                    ?
                    <Flex direction={'column'} justify={'center'} alignItems={'center'} w={"full"} height={"auto"} >
                        <Image src={current_track?.album?.images?.[2]?.url} alt='' boxSize={'18vw'} rounded={'md'} boxShadow={'lg'}/>
                        <Text my={1} align={'center'}  color={'whiteAlpha.800'} fontWeight={'bold'} fontSize={'lg'}>{current_track?.name}</Text>
                        <Text fontSize={'xs'} color={'whiteAlpha.800'}>{current_track?.artists?.[0]?.name} {current_track?.artists?.[1]?.name}</Text>
                    </Flex>
                    :
                    <Box w={"full"} height={"auto"}>
                        <Skeleton height='18vw' mx={3}/>
                        <SkeletonText padding={3} noOfLines={1}/>
                        <SkeletonText paddingX={'5vw'} noOfLines={1}/>
                    </Box>
            }


            <Flex w={"full"} h={'5vw'} justify={'space-evenly'} alignItems={'center'}>
                <MdRepeat color={'white'} size={20}/>
                <SlControlRewind color={'white'} onClick={() => player.previousTrack()} size={25}/>
                <Box onClick={()=> player.togglePlay().then(() => console.log(current_track ? 'Web Playback is active' : 'need web play back active !'))} >
                    { is_paused ?  <CiPlay1 color={'white'} size={25}/> : <CiPause1 color={'white'} size={25}/> }
                </Box>
                <SlControlForward color={'white'} size={25} onClick={() => player.nextTrack()} />
                <MdShuffle color={'white'} size={25}/>
            </Flex>



            <Flex  justify={'space-evenly'} alignItems={'center'} w={'full'} height={'5vw'}>

                <Flex flex={.3} justify={'center'} align={'center'} position={"relative"} cursor={'pointer'}>
                    <PulseDot color={is_active ? '#81c784' : '#626262'} style={{fontSize: '2em'}}/>
                    <MdComputer className={'absolute top-50 left-50 right-50'} color={is_active ? '#2b8335' : '#e0e0e0'} size={20} onClick={stream_connector}/>
                </Flex>

                <Flex justify={'space-evenly'} alignItems={'center'} flex={1} >

                    <BiVolumeFull  color={'white'} size={20}/>


                    <RangeSlider w={'8vw'}  defaultValue={[0, 50]}>

                        <RangeSliderTrack bg='red.100'>
                            <RangeSliderFilledTrack bg={'#81c784'} />
                        </RangeSliderTrack>

                        <RangeSliderThumb boxSize={4} index={1}>
                            <Box color={'#81c784'} as={MdGraphicEq} />
                        </RangeSliderThumb>

                    </RangeSlider>
                    <Text textColor={'white'}>100</Text>
                </Flex>


            </Flex>

        </Flex>

    )
}