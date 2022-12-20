import {Box, Flex, Image, Text , HStack} from "@chakra-ui/react";
import {useRecoilValue} from "recoil";
import {NEW_RELEASES_ALBUMS_TRACK_ATOM} from "../../../atoms/atoms";
import useSWR from "swr";
import {FETCH_ARTIST} from "../../../lib/FetcherFuncs/FETCH_ARTIST";
import {FETCH_NEW_RELESES_TRACK} from "../../../lib/FetcherFuncs/FETCH_NEW_RELESES_TRACK";


export const AlbumsInfo = () =>
{

    const {images , type , name  , artists , release_date , total_tracks} = useRecoilValue(NEW_RELEASES_ALBUMS_TRACK_ATOM)


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
                    <Text color={'whiteAlpha.900'}>{artists?.[0].name}</Text>
                    <Text color={'whiteAlpha.900'}>{release_date}</Text>
                    <Text color={'whiteAlpha.900'}>{total_tracks} Songs</Text>
                </HStack>
            </Flex>
        </Flex>
    )
}