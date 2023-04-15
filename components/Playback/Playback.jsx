import {HStack,} from "@chakra-ui/react";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";
import {useRecoilValue} from "recoil";
import MetaData from "./MetaData";
import Player from "./Player";
import "react-h5-audio-player/lib/styles.css";



export const Playback = () => {
    const trackInfo = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM);
    return (
        <HStack
            w={{sm : "90%" , md : "95%"}}
            h={{sm : 65 , md : 75}}
            p={3}
            bg={"black"}
            justify={"space-around"}
            align={"center"}
            zIndex={2000}
            position={"fixed"}
            bottom={{sm : 3 , md : 0}}
            left={0}
            right={0}
            m={"auto"}
            border={"1px solid #424242"}
        >
            <HStack w={"full"}>
                <HStack flex={.1}>
                    <MetaData/>
                </HStack>
                <HStack flex={1}>
                    <Player/>
                </HStack>
            </HStack>
        </HStack>
    );
};
