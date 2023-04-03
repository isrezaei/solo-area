import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Grid,
  HStack,
  Icon,
  Image,
  Link,
  Skeleton,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IoPlay, IoPause } from "react-icons/io5";
import { HiRewind, HiFastForward } from "react-icons/hi";
import { TbRepeat, TbRepeatOff } from "react-icons/tb";
import { RiDownload2Fill, RiHeart3Line } from "react-icons/ri";
import { BiVolumeFull, BiVolume } from "react-icons/bi";
import { SPOTIFY_DOWNLOADER } from "../lib/FetcherFuncs/SPOTIFY_DOWNLOADER";
import { SPOTIFY_TRACKS_ID_ATOM } from "../atoms/atoms";
import { useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import AudioPlayer, { RHAP_UI } from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";
import { useAsync } from "react-use";
import { PropagateLoader } from "react-spinners";
import "animate.css";

export const PlayBack = () => {
  const trackID = useRecoilValue(SPOTIFY_TRACKS_ID_ATOM);

  const [metaData, setMetaData] = useState();
  const [playBackStatus, setPlayBackStatus] = useState("idle");

  useAsync(async () => {
    setPlayBackStatus("idle");

    if (trackID) {
      setPlayBackStatus("pending");
      const getMetaData = await SPOTIFY_DOWNLOADER(trackID);
      setMetaData(getMetaData);
      setPlayBackStatus("success");
    }
  }, [trackID]);

  return (
    <Flex
      w={"full"}
      h={85}
      p={3}
      bgGradient={`linear(to-tl, pink.900 , black , black , black)`}
      justify={"space-around"}
      align={"center"}
      zIndex={"2000"}
      position={"fixed"}
      bottom={0}
      left={0}
      transition={".1s"}
    >
      <Flex
        w={"full"}
        direction={"row"}
        gap={2}
        justify={"space-between"}
        align={"center"}
      >
        <HStack flex={0.3}>
          {playBackStatus === "idle" && (
            <Skeleton
              rounded={"md"}
              boxSize={65}
              startColor="#212121"
              endColor="#424242"
            />
          )}
          {playBackStatus === "success" && (
            <Image
              src={metaData?.metadata?.cover}
              alt=""
              boxSize={65}
              rounded={"md"}
              boxShadow={"2xl"}
            />
          )}
          {playBackStatus === "pending" && (
            <Center w={"full"}>
              <PropagateLoader color={"#41d636"} size={10} />
            </Center>
          )}

          <VStack spacing={0} align={"center"}>
            {playBackStatus === "idle" && (
              <SkeletonText
                boxSize={120}
                height={4}
                noOfLines={2}
                spacing="1"
                startColor="#212121"
                endColor="#424242"
              />
            )}
            {playBackStatus === "success" && (
              <VStack align={"start"} spacing={0}>
                <Text
                  overflow={"hidden"}
                  whiteSpace={"nowrap"}
                  textOverflow={"ellipsis"}
                  w={95}
                  fontSize={"sm"}
                  fontWeight={"bold"}
                >
                  {metaData?.metadata?.title}
                </Text>
                <Text fontSize={"xs"} color={"whiteAlpha.800"}>
                  {metaData?.metadata?.artists}
                </Text>
              </VStack>
            )}
          </VStack>
        </HStack>

        <HStack flex={2.2}>
          <AudioPlayer
            autoPlay={false}
            progressJumpSteps={{ forward: 30000, backward: 10000 }}
            layout="stacked-reverse"
            customIcons={{
              play: <Icon boxSize={7} as={IoPlay} />,
              pause: <Icon boxSize={7} as={IoPause} />,
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
                  boxSize={6}
                  bg={"whiteAlpha.300"}
                  rounded={50}
                  p={1}
                  as={BiVolumeFull}
                />
              ),
              volumeMute: (
                <Icon
                  boxSize={6}
                  bg={"whiteAlpha.300"}
                  rounded={50}
                  p={1}
                  as={BiVolume}
                />
              ),
              loop: (
                <Icon
                  boxSize={6}
                  bg={"whiteAlpha.300"}
                  rounded={50}
                  p={1}
                  as={TbRepeat}
                />
              ),
              loopOff: (
                <Icon
                  boxSize={6}
                  bg={"whiteAlpha.300"}
                  rounded={50}
                  p={1}
                  as={TbRepeatOff}
                />
              ),
            }}
            src={metaData?.link}
            style={{
              boxShadow: "none",
              background: "transparent",
              opacity: metaData ? "100%" : "30%",
              pointerEvents: metaData ? "visible" : "none",
              width: "100%",
            }}
            customVolumeControls={[RHAP_UI.VOLUME]}
            customAdditionalControls={[
              RHAP_UI.LOOP,
              <HStack spacing={2}>
                <Link href={metaData?.link} download>
                  <Icon
                    boxSize={6}
                    bg={"whiteAlpha.300"}
                    color={"whiteAlpha.600"}
                    rounded={50}
                    p={1}
                    as={RiDownload2Fill}
                  />
                </Link>
                <Icon
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
    </Flex>
  );
};
