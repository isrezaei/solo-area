import {
  Text,
  Box,
  VStack,
  HStack,
  Divider,
  Center,
  Flex,
  Grid,
  Skeleton,
  Stack,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import useSWR from "swr";
import Tilt from "react-parallax-tilt";
import useSound from "use-sound";
import { selectGenre } from "../../atoms/atoms";
import { useRecoilValue } from "recoil";
import ReactPaginate from "react-paginate";
import {
  active,
  breakClassName,
  breakLinkClassName,
  next,
  page,
  pageLink,
  pagination,
  previous,
} from "../Sidebar/PaginationStyle";
import { useState } from "react";
import { motion } from "framer-motion";
import { getNewReleasesAlbums } from "../../graphQl/query/api/getNewReleasesAlbums";
import {ScrollContainer} from "react-indiana-drag-scroll";
import Pagination from "./pagination";
import Title from "./Title";



export const NewReleasesAlbums = () => {
  const router = useRouter();
  const getGenre = useRecoilValue(selectGenre);
  const [currentPage, setCurrentPage] = useState(0);
  const {
    data: {
      newReleases: { albums: { items: newReleaseLists } = [] } = {},
    } = {},
    error,
    isValidating,
  } = useSWR(
    ["api", "GET_NEW_RELEASES", getGenre, currentPage],
    async (key, ip, getGenre, currentPage) =>
      await getNewReleasesAlbums(getGenre, currentPage),
    { refreshInterval: false }
  );

  let Render;

  if (!newReleaseLists) {
    const loadingElement = Array.from({ length: 12 });

    Render = loadingElement.map((_, index) => (
      <Stack key={index} mx={{sm : 1 , md : 0}}>
        <Skeleton
          rounded={0}
          startColor={"whiteAlpha.300"}
          endColor={"whiteAlpha.400"}
          height={{sm : 150 , md : 180}}
          width={{sm : 150 , md : 175}}
        />
        <Skeleton
            rounded={0}
          startColor={"whiteAlpha.300"}
          endColor={"whiteAlpha.400"}
          height={{sm : 2 , md : 3}}
          mt="2"
        />
        <Skeleton
            rounded={0}
          startColor={"whiteAlpha.300"}
          endColor={"whiteAlpha.400"}
          height={{sm : 2 , md : 2}}
          mt="1"
        />
      </Stack>
    ));
  }

  if (newReleaseLists) {
    Render = newReleaseLists?.map((ALBUMS_DATA) => {

      const { images, name, artists, id } = ALBUMS_DATA;

      return (
        <Tilt
          key={id}
          className="parallax-effect"
          perspective={500}
          scale={1.05}
        >
          <VStack
            cursor={"pointer"}
            overflow={"hidden"}
          >
            <Stack
              w={{sm : 170 , md : 180}}
              h={{sm : 170 , md : 180}}
              position={"relative"}
              bg={"whiteAlpha.200"}
              mx={{sm : 2 , md : 0}}
              rounded={"md"}
              overflow={"hidden"}
            >
              <Image
                onClick={() => router.push(`/new-releases-albums/${id}`)}
                objectFit={"cover"}
                layout={"fill"}
                placeholder={"blur"}
                blurDataURL={images[2].url}
                src={images[0].url}
                alt={name}
                priority
              />
            </Stack>


            <VStack spacing={0}>
              <Text
                  noOfLines={1}
                  fontWeight={"bold"}
                  fontSize={{sm : 10 , md : "sm"}}
                  color={"whitesmoke"}
              >
                {name}
              </Text>
              <Text  fontSize={{sm : 9 , md : "xs"}} color={"#9e9e9e"}>
                {artists[0]?.name}
              </Text>
            </VStack>
          </VStack>

        </Tilt>
      );
    });
  }

  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  return (
    <VStack w={"full"} h={{sm : 230 , md : "auto"}} position={"relative"} zIndex={1000}>


      <HStack  w={"full"} align={"center"} justify={"space-between"}>
        <Title/>
        <Pagination handlePageClick={handlePageClick}/>
      </HStack>



      {/*mobile render*/}
      <Stack w={"full"} position={"relative"}>
        <Stack position={"absolute"} overflow={"hidden"}  w={"full"}  display={{sm : "flex" , md : "none"}}>
          <ScrollContainer style={{display : "flex"}}>
            {Render}
          </ScrollContainer>
        </Stack>
      </Stack>


      {/*desktop render*/}
      <motion.div
        key={[currentPage, getGenre, newReleaseLists]}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Grid
          display={{sm : "none" , md : "grid"}}
          templateColumns={"repeat(6, 1fr)"}
          gap={2}
        >
          {Render}
        </Grid>
      </motion.div>
    </VStack>
  );
};
