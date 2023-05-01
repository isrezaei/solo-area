import {HStack,} from "@chakra-ui/react";
import MetaData from "./MetaData";
import Player from "./Player";
import "react-h5-audio-player/lib/styles.css";



export const Playback = () => {
    return (
        <HStack
            w={{sm : "100%" , md : "100%"}}
            h={{sm : 65 , md : 75}}
            p={3}
            bg={"black"}
            justify={"space-around"}
            align={"center"}
            zIndex={2000}
            position={"fixed"}
            bottom={0}
            borderTop={"1px solid #424242"}
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
