import {
    Box,
    Button,
    Center,
    Divider,
    Flex,
    Grid,
    HStack,
    Icon,
    Link,
    Skeleton,
    SkeletonCircle,
    SkeletonText,
    Stack,
    Text,
    VStack,
} from "@chakra-ui/react";
import Image from "next/image";
import {IoPlay, IoPause} from "react-icons/io5";
import {HiRewind, HiFastForward} from "react-icons/hi";
import {TbRepeat, TbRepeatOff} from "react-icons/tb";
import {RiDownload2Fill, RiHeart3Line} from "react-icons/ri";
import {BiVolumeFull, BiVolume} from "react-icons/bi";
import {SPOTIFY_TRACKS_ID_ATOM} from "../atoms/atoms";
import {useRecoilValue} from "recoil";
import {useEffect, useState} from "react";
import AudioPlayer, {RHAP_UI} from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import {useAsync} from "react-use";
import {PropagateLoader} from "react-spinners";
import {css} from "@emotion/css";

const style = css`


  .rhap_main, .rhap_stacked {
  }

  .rhap_progress-bar {
  }
  

  .rhap_loop--off {

  }

  .rhap_play-status--paused {

  }
  



  @media (min-width: 20em) {

    .rhap_progress-section {
      display: none;
    }
    .rhap_volume-controls {
      display: none;
    }
    .rhap_additional-controls {
      display: none;
    }
    
    .rhap_main-controls{
      width: 100%;
      height: 100%;
      justify-content: center;
      align-items: center;
      line-height: 0;
    }
    
    .rhap_controls-section {
      margin: 0
    }

  }
  @media (min-width: 30em) {
    .rhap_progress-section {
      display: flex;
    }
    .rhap_volume-controls {
      display: flex;
    }

    .rhap_additional-controls {
      display: flex;
    }

    .rhap_main-controls{
      width: auto;
      height: auto;
      justify-content: center;
      align-items: center;
      line-height: 0;
    }
  }



  .rhap_current-time, .rhap_time, .rhap_total-time {
    color: white !important;
    font-size: .8vw !important;
  }

  .rhap_progress-indicator {
    display: none;
    width: 10px !important;
    height: 14px !important;
    top: -4px !important;
    background-color: #ad1457 !important;
  }



  .rhap_progress-filled {
    background-color: #ad1457 !important;
  }

  .rhap_download-progress {
    background-color: rgba(56, 56, 56, 0.41) !important;
  }

  .rhap_progress-container {

  }

  .rhap_progress-bar {

  }

  .rhap_volume-container {

  }

  .rhap_volume-bar {
    background-color: #ad1457 !important;
  }

  .rhap_additional-controls {

  }

  .pagination {
    display: flex;
    justify-content: center;
  }

  .page {
    display: inline-block;
    margin: 0 5px;
  }

  .page-link {
    cursor: pointer;
    color: #333;
    border-radius: 3px;
    padding: 3px 6px;
    border: 1px solid #ddd;
  }

  .active {
    background-color: #007bff;
    color: #fff;
    border: none;
  }

  .previous,
  .next {
    cursor: pointer;
    color: #007bff;
    margin: 0 5px;
  }

`


export const PlayBack = () => {

    const trackInfo = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM);
    console.log(trackInfo)

    return (
        <HStack
            w={{sm : "90%" , md : "100%"}}
            h={{sm : 65 , md : 85}}
            p={3}
            bg={"#1a1a1a"}
            justify={"space-around"}
            align={"center"}
            zIndex={2000}
            position={"fixed"}
            rounded={{sm : 15 , md : 0}}
            bottom={{sm : 3 , md : 0}}
            left={0}
            right={0}
            m={"auto"}

        >

            <Flex
                w={"full"}
                direction={"row"}
                gap={2}
                justify={"space-between"}
                align={"center"}
            >



                <HStack flex={0.3}>


                    {!trackInfo && (
                        <Skeleton
                            rounded={"md"}
                            boxSize={35}
                            startColor="#212121"
                            endColor="#424242"
                        />
                    )}
                    {trackInfo && (
                        <Stack w={{sm : 45 , md : 65}} h={{sm : 45 , md : 65}} rounded={20} overflow={"hidden"} position={"relative"}>
                            <Image
                                layout={"fill"}
                                objectFit={"cover"}
                                src={trackInfo?.images[1].url}
                            />
                        </Stack>
                    )}


                    <VStack spacing={0} align={"center"}>
                        {!trackInfo && (
                            <SkeletonText
                                boxSize={120}
                                height={4}
                                noOfLines={2}
                                spacing="1"
                                startColor="#212121"
                                endColor="#424242"
                            />
                        )}
                        {trackInfo && (
                            <VStack align={"start"} spacing={0}>
                                <Text
                                    overflow={"hidden"}
                                    whiteSpace={"nowrap"}
                                    textOverflow={"ellipsis"}
                                    w={95}
                                    fontSize={"sm"}
                                    fontWeight={"bold"}
                                >
                                    {trackInfo.name}
                                </Text>
                                <Text fontSize={"xs"} color={"whiteAlpha.800"}>
                                    {trackInfo?.artists[0].name}
                                </Text>
                            </VStack>
                        )}
                    </VStack>

                </HStack>


                <HStack flex={1}>

                    <AudioPlayer
                        autoPlay={false}
                        layout="stacked-reverse"
                        className={style}
                        customIcons={{
                            play: <Icon boxSize={7} as={IoPlay}/>,
                            pause: <Icon boxSize={7} as={IoPause}/>,
                            rewind: (
                                <Icon
                                    boxSize={8}
                                    bg={"whiteAlpha.300"}
                                    rounded={50}
                                    p={1}
                                    as={HiRewind}
                                />
                            ),
                            forward: (
                                <Icon
                                    boxSize={8}
                                    bg={"whiteAlpha.300"}
                                    rounded={50}
                                    p={1}
                                    as={HiFastForward}
                                />
                            ),
                            volume: (
                                <Icon
                                    display={{sm : "none" , md : "block"}}
                                    boxSize={6}
                                    bg={"whiteAlpha.300"}
                                    rounded={50}
                                    p={1}
                                    as={BiVolumeFull}
                                />
                            ),
                            volumeMute: (
                                <Icon
                                    display={{sm : "none" , md : "block"}}
                                    boxSize={6}
                                    bg={"whiteAlpha.300"}
                                    rounded={50}
                                    p={1}
                                    as={BiVolume}
                                />
                            ),
                            loop: (
                                <Icon
                                    display={{sm : "none" , md : "block"}}
                                    boxSize={6}
                                    bg={"whiteAlpha.300"}
                                    rounded={50}
                                    p={1}
                                    as={TbRepeat}
                                />
                            ),
                            loopOff: (
                                <Icon
                                    display={{sm : "none" , md : "block"}}
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
                                        display={{sm : "none" , md : "block"}}
                                        boxSize={6}
                                        bg={"whiteAlpha.300"}
                                        color={"whiteAlpha.600"}
                                        rounded={50}
                                        p={1}
                                        as={RiDownload2Fill}
                                    />
                                </Link>
                                <Icon
                                    display={{sm : "none" , md : "block"}}
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
                </HStack>
            </Flex>
        </HStack>
    );
};
