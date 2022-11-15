import {useRecoilValue} from "recoil";
import {NEW_RELEASES_ALBUMS_TRACK_ATOM} from "../../../atoms/ItemsAtom";
import {HStack, Text, VStack, Flex, Center, Box} from "@chakra-ui/react";
import prettyMilliseconds from "pretty-ms";
import {TRACK_FOR_WEB_PLAY_BACK} from "../../../atoms/ItemsAtom";
import {useSetRecoilState} from "recoil";
import useSpotify from "../../../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {Fetch_AccessToken} from "../../../lib/FetcherFuncs/Fetch_AccessToken";
import {SPOTIFY_DEVICE_ID_ATOM} from "../../../atoms/ItemsAtom";


export const TracksInfo = () =>
{

    const SPOTIFY_DEVICE_ID = useRecoilValue(SPOTIFY_DEVICE_ID_ATOM)

    const SET_TRACK_FOR_WEB_PLAY_BACK = useSetRecoilState(TRACK_FOR_WEB_PLAY_BACK)

    const NEW_RELEASES_ALBUM_TRACK = useRecoilValue(NEW_RELEASES_ALBUMS_TRACK_ATOM)

    const {tracks} = NEW_RELEASES_ALBUM_TRACK

    const spotifyApi = useSpotify()



    const Kilyed = async (access_token , spotify_uri) =>
    {
        await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${SPOTIFY_DEVICE_ID}`, {
            method: 'PUT',
            body: JSON.stringify({ uris: [spotify_uri] }),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
        });
    }




    const PlayMusic = (Track) =>
    {
        SET_TRACK_FOR_WEB_PLAY_BACK(Track.uri)

        // await fetch(`https://api.spotify.com/v1/me/player/play?device_id=${SPOTIFY_DEVICE_ID}`, {
        //     method: 'PUT',
        //     body: JSON.stringify({ uris: [Track.uri] }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${spotifyApi.getMyCurrentPlaybackState()}`
        //     },
        // });
    }



    return (
        <Box w={'100%'}>
            {
                tracks?.items.map((Track , Index) => {
                    return (
                        <Flex key={Math.random()} width={'full'} my={3} py={3} onClick={() => PlayMusic(Track)}>
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