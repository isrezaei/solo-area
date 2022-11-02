import {
    Box,
    Button,
    Divider,
    Flex,
    Image,
    RangeSlider,
    RangeSliderFilledTrack, RangeSliderThumb,
    RangeSliderTrack,
    Text
} from "@chakra-ui/react";
import useSpotify from "../../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useEffect, useState , Suspense} from "react";
import {CURRENT_TRACK_ID_STATE, IS_PLAYING_SONG , IS_UPDATE} from "../../atoms/SongAtom";
import {useRecoilState, useRecoilValue, useSetRecoilState} from "recoil";
import useSongInfo from "../../hooks/useSongInfo";
import {CiPlay1 , CiStop1} from 'react-icons/ci'
import {TbPlayerTrackNext , TbPlayerTrackPrev} from 'react-icons/tb'
import {RiVolumeUpLine ,RiVolumeDownLine} from "react-icons/ri";
import {useDebounce} from "react-use";




export const Player = () =>
{
    const spotifyApi = useSpotify()
    const lastSongInfo = useSongInfo()

    const [currentTrackId , setCurrentTrackId] = useRecoilState(CURRENT_TRACK_ID_STATE)
    const [isPlayingState , setIsPlayingState] = useRecoilState(IS_PLAYING_SONG)
    const setISUpdate = useSetRecoilState(IS_UPDATE)

    const [update, setUpdate] = useState(0)

    const [volume , setVolume] = useState(50)


    console.log(lastSongInfo)

    const {data : session , status} = useSession()



    const fetchCurrentLastSong = () =>
    {
        if (!lastSongInfo)
        {
            spotifyApi.getMyCurrentPlayingTrack().then(res => setCurrentTrackId(res?.body?.item?.id))
            spotifyApi.getMyCurrentPlaybackState().then(res =>setIsPlayingState(res?.body?.is_playing))
        }
    }

    useEffect(()=>{
        if (status === 'authenticated' && !currentTrackId)
        {
            fetchCurrentLastSong()
            setVolume(50)
        }
    } , [status , session , spotifyApi , currentTrackId , lastSongInfo])


    // useEffect(() => {
    //
    //
    //     spotifyApi.getMyCurrentPlaybackState().then(res => console.log(res))
    //
    // } , [update])


    const handelPlayPause = () =>
    {
        spotifyApi.getMyCurrentPlaybackState().then( res => {
            if (res.body.is_playing)
            {
                spotifyApi.pause()
                setIsPlayingState(false)
            }
            else
            {
                spotifyApi.play()
                setIsPlayingState(true)
            }
        })
    }


    useDebounce(()=> {

        spotifyApi.setVolume(volume).catch(err => {console.log(err)})

    } , 500 ,[volume])


    const nextSong = () =>
    {
        spotifyApi.skipToNext()
        setISUpdate(Math.random)
    }

    const previousSong = () =>
    {
        spotifyApi.skipToPrevious()
        setISUpdate(Math.random)
    }

    return (
        <Flex direction={"column"}
              justify={'center'}
              align={'center'}
              gap={1}
              flex={2}
              h={'30vw'}
              background={'#1c1c1c'}
              rounded={'2xl'}>



            <Image src={lastSongInfo?.album?.images?.[0]?.url} boxSize={'13vw'}/>

            <Text color={'whiteAlpha.800'} fontWeight={'bold'}>{lastSongInfo?.name}</Text>
            <Text fontSize={'.8vw'} color={'whiteAlpha.600'}>{lastSongInfo?.album?.name}</Text>
            <Text fontSize={'.8vw'} color={'whiteAlpha.600'}>{lastSongInfo?.artists?.[0]?.name}</Text>

            <Flex align={'center'} gap={3} m={3}>
                <TbPlayerTrackPrev onClick={previousSong} color={'white'} size={24}/>
                <Flex justify={'center'} align={'center'} w={'3vw'} h={'3vw'} bg={'white'} rounded={'full'}>
                    {
                        isPlayingState ? <CiStop1 size={25} onClick={handelPlayPause}/> : <CiPlay1 size={25} onClick={handelPlayPause}/>
                    }
                </Flex>
                <TbPlayerTrackNext onClick={nextSong} color={'white'} size={24}/>
            </Flex>


            <Flex w={'20vw'} align={'center'} gap={3}>

                <RiVolumeDownLine onClick={() => volume > 0 && setVolume(volume => volume - 10)} size={'2vw'} color={'white'}/>


                <RangeSlider
                    colorScheme='green'
                    defaultValue={[0, volume]}
                    value={[0 , volume]}
                    onChange={e => setVolume(e[1])}
                >
                    <RangeSliderTrack>
                        <RangeSliderFilledTrack/>
                    </RangeSliderTrack>
                    <RangeSliderThumb index={1} />
                </RangeSlider>


                <RiVolumeUpLine  onClick={() => volume < 100 && setVolume(volume => volume + 10)} size={'2vw'} color={'white'}/>

            </Flex>


        </Flex>
    )
}