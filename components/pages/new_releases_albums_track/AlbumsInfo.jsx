import {Box, Flex, Image, Text , HStack} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {NEW_RELEASES_ALBUMS_TRACK_ATOM} from "../../../atoms/ItemsAtom";
import {Suspense, useEffect, useState} from "react";
import useSpotify from "../../../hooks/useSpotify";

import {useSession} from "next-auth/react";

export const AlbumsInfo = () =>
{

    const {data : session , status} = useSession()

    const spotifyApi = useSpotify()



    const NEW_RELEASES_ALBUM_TRACK = useRecoilValue(NEW_RELEASES_ALBUMS_TRACK_ATOM)

    const {images , type , name  , artists , release_date , total_tracks} = NEW_RELEASES_ALBUM_TRACK

    const [ALBUM_ARTIST_DATA , SET_ALBUM_ARTIST_DATA] = useState('')

    useEffect(() => {

        if (status === 'authenticated' && artists)
        {
            spotifyApi.getArtist(artists?.[0]?.id).then(artist => SET_ALBUM_ARTIST_DATA(artist.body))
        }


        return () => SET_ALBUM_ARTIST_DATA('')


    } , [status , artists , spotifyApi])



    return (

        <Flex
            flex={3}
            h={'25vw'}
            p={3}
            gap={5}
            className='bg-gradient-to-b from-indigo-500'>


            <Image boxShadow={'dark-lg'} src={images?.[0].url} boxSize={'20vw'} alt=''/>


            <Flex height={'20vw'} direction={'column'} justify={"end"}>

                <Text color={'whiteAlpha.900'} fontSize={'1vw'} fontWeight={'bold'}>{type}</Text>
                <Text color={'whiteAlpha.900'} fontSize={'5vw'} fontWeight={'bold'}>{name}</Text>

                <HStack>
                    <Image src={ALBUM_ARTIST_DATA?.images?.[0].url} boxSize={'3vw'} rounded={'full'} alt=''/>
                    <Text color={'whiteAlpha.900'}>{artists?.[0].name}</Text>
                    <Text color={'whiteAlpha.900'}>{release_date}</Text>
                    <Text color={'whiteAlpha.900'}>{total_tracks} Songs</Text>
                </HStack>
            </Flex>
        </Flex>
    )
}