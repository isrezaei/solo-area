import {useRecoilValue} from "recoil";
import {NEW_RELEASES_ALBUMS_TRACK_ATOM} from "../../../atoms/ItemsAtom";
import {HStack, Text, VStack, Flex, Center, Box} from "@chakra-ui/react";
import prettyMilliseconds from "pretty-ms";
import {TRACK_FOR_WEB_PLAY_BACK} from "../../../atoms/ItemsAtom";
import {useSetRecoilState} from "recoil";

export const TracksInfo = () =>
{
    const SET_TRACK_FOR_WEB_PLAY_BACK = useSetRecoilState(TRACK_FOR_WEB_PLAY_BACK)

    const NEW_RELEASES_ALBUM_TRACK = useRecoilValue(NEW_RELEASES_ALBUMS_TRACK_ATOM)

    const {tracks} = NEW_RELEASES_ALBUM_TRACK


    return (
        <Box w={'100%'}>
            {
                tracks?.items.map((Track , Index) => {
                    return (
                        <Flex key={Math.random()} width={'full'} my={3} py={3} onClick={() => SET_TRACK_FOR_WEB_PLAY_BACK(Track.uri)}>
                            <Center color={'whiteAlpha.800'} flex={.2}>{Index + 1}</Center>
                            <VStack flex={1} align={"start"}>
                                <Text  color={'whiteAlpha.800'} fontWeight={'bold'}>{Track?.name}</Text>
                                <Text  color={'whiteAlpha.800'}>{Track?.artists?.[0].name}</Text>
                            </VStack>
                            <Text flex={2} color={'whiteAlpha.800'}>
                                {prettyMilliseconds(Track?.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}
                            </Text>
                        </Flex>

                    )
                })
            }
        </Box>
    )
}