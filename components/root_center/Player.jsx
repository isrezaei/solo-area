import {Box, Divider, Flex, Image, Text} from "@chakra-ui/react";
import useSpotify from "../../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useEffect, useState , Suspense} from "react";
import {CURRENT_TRACK_ID_STATE, IS_PLAYING_SONG} from "../../atoms/SongAtom";
import {useRecoilState, useRecoilValue} from "recoil";
import useSongInfo from "../../hooks/useSongInfo";

export const Player = () =>
{
    const spotifyApi = useSpotify()
    const lastSongInfo = useSongInfo()

    console.log(lastSongInfo)

    const [currentTrackId , setCurrentTrackId] = useRecoilState(CURRENT_TRACK_ID_STATE)
    const [isPlayingState , setIsPlayingState] = useRecoilState(IS_PLAYING_SONG)


    const {data : session , status} = useSession()


    useEffect(()=>{

        if (status === 'authenticated' && !currentTrackId && !lastSongInfo)
        {
            spotifyApi.getMyCurrentPlayingTrack().then(res =>{
                setCurrentTrackId(res?.body?.item?.id)
                setIsPlayingState(res?.body?.is_playing)
            })
        }

    } , [status , session , spotifyApi , currentTrackId])



    return (
        <Flex direction={"column"}
              justify={'center'}
              align={'center'}
              gap={3}
              flex={2}
              h={'20vw'}
              background={'#1c1c1c'}
              rounded={'2xl'}>



            <Image rounded={'3vw'} src={lastSongInfo?.album?.images?.[2]?.url} boxSize={'13vw'}/>
            <Text color={'whiteAlpha.800'} fontWeight={'bold'}>{lastSongInfo?.album?.name}</Text>
            <Text color={'whiteAlpha.600'}>{lastSongInfo?.artists?.[0]?.name}</Text>



        </Flex>
    )
}