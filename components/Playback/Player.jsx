import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import {playBackStyle} from "./style";
import {HStack, Icon, Link} from "@chakra-ui/react";
import {IoPause, IoPlay} from "react-icons/io5";
import {GiAnticlockwiseRotation, GiClockwiseRotation} from "react-icons/gi";
import {BiVolume, BiVolumeFull} from "react-icons/bi";
import {TbRepeat, TbRepeatOff} from "react-icons/tb";
import {RiDownload2Fill, RiHeart3Line} from "react-icons/ri";
import {useRecoilValue} from "recoil";
import {SPOTIFY_TRACKS_ID_ATOM} from "../../atoms/atoms";

const Player = () => {

    const trackInfo = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM);

    return (
        <AudioPlayer
            autoPlay={false}
            layout="stacked-reverse"
            className={playBackStyle}
            customIcons={{
                play: <Icon boxSize={7} as={IoPlay}/>,
                pause: <Icon boxSize={7} as={IoPause}/>,
                rewind: (
                    <Icon
                        boxSize={6}
                        as={GiAnticlockwiseRotation}
                    />
                ),
                forward: (
                    <Icon
                        boxSize={6}

                        as={GiClockwiseRotation}
                    />
                ),
                volume: (
                    <Icon
                        display={{sm: "none", md: "block"}}
                        boxSize={6}
                        bg={"whiteAlpha.300"}
                        rounded={50}
                        p={1}
                        as={BiVolumeFull}
                    />
                ),
                volumeMute: (
                    <Icon
                        display={{sm: "none", md: "block"}}
                        boxSize={6}
                        bg={"whiteAlpha.300"}
                        rounded={50}
                        p={1}
                        as={BiVolume}
                    />
                ),
                loop: (
                    <Icon
                        display={{sm: "none", md: "block"}}
                        boxSize={6}
                        bg={"whiteAlpha.300"}
                        rounded={50}
                        p={1}
                        as={TbRepeat}
                    />
                ),
                loopOff: (
                    <Icon
                        display={{sm: "none", md: "block"}}
                        boxSize={6}
                        bg={"whiteAlpha.300"}
                        rounded={50}
                        p={1}
                        as={TbRepeatOff}
                    />
                ),
            }}
            src={trackInfo?.preview_url}
            style={{
                boxShadow: "none",
                background: "transparent",
                opacity: trackInfo ? "100%" : "30%",
                pointerEvents: trackInfo ? "visible" : "none",
                width: "100%",
            }}
            customVolumeControls={[RHAP_UI.VOLUME]}
            customAdditionalControls={[
                RHAP_UI.LOOP,
                <HStack spacing={2}>
                    <Link href={trackInfo?.preview_url} download>
                        <Icon
                            display={{sm: "none", md: "block"}}
                            boxSize={6}
                            bg={"whiteAlpha.300"}
                            color={"whiteAlpha.600"}
                            rounded={50}
                            p={1}
                            as={RiDownload2Fill}
                        />
                    </Link>
                    <Icon
                        display={{sm: "none", md: "block"}}
                        boxSize={6}
                        bg={"whiteAlpha.300"}
                        color={"whiteAlpha.600"}
                        rounded={50}
                        p={1}
                        as={RiHeart3Line}
                    />
                </HStack>,
            ]}
        />
    );
};

export default Player;