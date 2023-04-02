import {useRecoilValue} from "recoil";
import {NEW_RELEASES_ALBUMS_TRACK_ATOM} from "../../atoms/atoms";
import {Text, VStack, Flex, Center, Box} from "@chakra-ui/react";
import prettyMilliseconds from "pretty-ms";
import {SPOTIFY_DEVICE_ID_ATOM} from "../../atoms/atoms";



export const TracksInfo = () =>
{

    const SPOTIFY_DEVICE_ID = useRecoilValue(SPOTIFY_DEVICE_ID_ATOM)

    const {tracks} = useRecoilValue(NEW_RELEASES_ALBUMS_TRACK_ATOM)


    return (
        <Box w={'100%'}>
            {
                tracks?.items.map((TRACKS , Index) => {
                    return (
                        <Flex key={Math.random()} width={'full'} my={3} py={3} onClick={() => PUT_SPOTIFY_PLAY_MUSIC(TRACKS.uri , SPOTIFY_DEVICE_ID)}>
                            <Center color={'whiteAlpha.800'} flex={.2}>{Index + 1}</Center>
                            <VStack flex={1} align={"start"}>
                                <Text  color={'whiteAlpha.800'} fontWeight={'bold'}>{TRACKS?.name}</Text>
                                <Text  color={'whiteAlpha.800'}>{TRACKS?.artists?.[0].name}</Text>
                            </VStack>
                            <Text flex={2} color={'whiteAlpha.800'}>
                                {prettyMilliseconds(TRACKS?.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}
                            </Text>
                        </Flex>

                    )
                })
            }
        </Box>
    )
}