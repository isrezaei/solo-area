import { useRef } from "react";
import {Box, HStack, Stack, Text, VStack} from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Navigation } from "swiper";
import Image from "next/image";
import { useRouter } from "next/router";
import MySwiperControls from "./MySwiperControls";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";


const Fans = ({ getRelatedArtist }) => {
  const { push } = useRouter();

  const swiperRef = useRef(null);

  return (
    <VStack w={"full"} align={"flex-start"} zIndex={1000}>

      <Stack direction={{sm : "column" , md : "row"}}  justify={{sm : "center" , md : "space-between"}} align={"center"} my={5} w={"full"}>
        <Text
          align={"left"}
          fontSize={{sm : 20 , md : 45}}
          fontWeight={"bold"}
        >
          Fans also like
        </Text>
        <MySwiperControls
          onPrev={() => swiperRef.current.slidePrev()}
          onNext={() => swiperRef.current.slideNext()}
        />
      </Stack>

      <Box w={"full"} height={540} position={"relative"}>
        <Swiper
          ref={swiperRef}
          pagination={{
            clickable: true,
          }}
          modules={[Grid, Navigation]}
          style={{ width: "100%", height: 500, position: "absolute" }}
          breakpoints={{
            310 : {
              slidesPerView: 2,
              spaceBetween: 0,
              grid: {
                rows: 2,
              },
            },
            640: {
              slidesPerView: 3,
              spaceBetween: 2,
              grid: {
                rows: 2,
              },
            },
            1080 :{
              slidesPerView: 4,
              spaceBetween: 3,
              grid: {
                rows: 2,
              },
            },
            1200: {
              slidesPerView: 5,
              spaceBetween: 3,
              grid: {
                rows: 2,
              },
            },
            1920: {
              slidesPerView: 7,
              spaceBetween: 0,
              grid: {
                rows: 2,
              },
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {getRelatedArtist.artists.map((related) => (
            <SwiperSlide key={related.id} style={{ height: 235 }}>
              <VStack>
                <Box
                  onClick={() => push(`/artist/${related.id}`)}
                  bg={"whiteAlpha.200"}
                  boxShadow={"dark-lg"}
                  position={"relative"}
                  width={{sm : 180 , md : 190}}
                  height={{sm : 180 , md : 190}}
                  rounded={"full"}
                  overflow={"hidden"}
                >
                  <Image
                    src={related?.images[0]?.url}
                    loading={"lazy"}
                    placeholder={"blur"}
                    blurDataURL={related?.images[2]?.url}
                    layout={"fill"}
                    objectFit={"cover"}
                  />
                </Box>
                <Text
                  bg={"whiteAlpha.200"}
                  rounded={5}
                  p={1}
                  fontSize={12}
                  noOfLines={1}
                  color={"whitesmoke"}
                >
                  {related.name}
                </Text>
              </VStack>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </VStack>
  );
};

export default Fans;
