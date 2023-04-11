import {AbsoluteCenter, Box, Icon} from "@chakra-ui/react";
import Image from "next/image";
import {CgPlayButtonO} from "react-icons/cg";
import {useSetRecoilState} from "recoil";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";

const Images = ({track}) => {

    const setTrackForPlay = useSetRecoilState(SPOTIFY_TRACKS_ID_ATOM)

    const handelPlay = (name , preview_url , id , artists , images , duration_ms) => {
        setTrackForPlay({name , preview_url , id , artists , images , duration_ms})
    }


    return (
        <Box  position={"relative"}>
            <Box
                w={{sm : 150 , md : 59}}
                h={{sm : 150 , md : 59}}
                position={"relative"}
                rounded={{sm : "full" , md : 50}}
                overflow={"hidden"}
                transition={".2s"}
                _groupHover={{ opacity: "30%" }}
            >
                <Image
                    layout={"fill"}
                    placeholder={"blur"}
                    blurDataURL={track?.album?.images?.[2].url}
                    src={track?.album?.images?.[1].url}
                    loading={"lazy"}
                    alt={track.name}
                />
            </Box>

            <AbsoluteCenter>
                <Icon
                    onClick={() => handelPlay(track.name , track.preview_url , track.id , track.artists ,track.album.images ,track.duration_ms)}
                    display={"none"}
                    cursor={"pointer"}
                    _groupHover={{ display: "block" }}
                    fontSize={{sm : 45 , md : 25}}
                    as={CgPlayButtonO}
                />
            </AbsoluteCenter>
        </Box>
    );
};

export default Images;