import {
    Box,
    Center,
    Container,
    Grid,
    AbsoluteCenter,
    Text,
    VStack,
    Button,
} from "@chakra-ui/react";
import Image from "next/image";
import {useState} from "react";
import _ from "lodash";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import Tilt from "react-parallax-tilt";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {getSeveralArtistsForPickup} from "../graphQl/query/api/getSeveralArtistsForPickup";
import {Swiper, SwiperSlide} from "swiper/react";


// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";



// import required modules
import {Grid as SwiperGrid} from "swiper";

export const PickFavouriteArtists = () => {

    const {data: {GET_SEVERAL_ARTISTS_FOR_PICKUP: {artists}}} = useSWR("GET_SEVERAL_ARTISTS_FOR_PICKUP", () => getSeveralArtistsForPickup())


    const user = useUser();
    const supabase = useSupabaseClient();
    const toast = useToast();
    const router = useRouter();

    const [selectFavourite, setFavourite] = useState([]);
    const [loading, setLoading] = useState(false);



    const handelSelect = (ARTIST_INFO) => {
        setFavourite((prevState) => {
            //? CHECK AND IF ARTIST EXIST , DO REMOVE THAT
            if (!!_.find(selectFavourite, {id: ARTIST_INFO.id}))
                return _.reject(prevState, {id: ARTIST_INFO.id});
            //?ADD UNIQ ARTIST IN LIST
            return _.uniq([...prevState, ARTIST_INFO]);
        });
    };


    const confirm = async () => {
        if (selectFavourite.length >= 10) {
            try {
                setLoading(true);

                const {data, error} = await supabase
                    .from("FAVOURITE_ARTISTS")
                    .upsert([
                        {
                            dependent_to: user?.email,
                            id: user?.id,
                            list: selectFavourite,
                            user_Id: user?.id,
                        },
                    ]);

                console.log(error);

                toast({
                    title: "nice ! ",
                    description: "We've created your favourite artists for you.",
                    status: "success",
                    duration: 1500,
                    isClosable: true,
                });
            } catch (error) {
                console.log(error);
            } finally {
                router.push("/");
                setLoading(false);
            }
        }

        if (selectFavourite.length < 10) {
            toast({
                title: "Oops ! ",
                description: "You need pick up minimum 10 artists",
                status: "warning",
                duration: 1500,
                isClosable: true,
            });
        }
    };

    return (
        <VStack maxW={"sm"} align={"center"}  h={"100svh"} p={3}  m={"auto"} position={"relative"}>

            <Image layout={"fill"}
                   objectFit={"cover"}
                   priority placeholder={"blur"}
                   blurDataURL={'/pickupBgLowQ.jpg'}
                   src={"/pickupBg.jpg"}
                   style={{opacity : "30%" , zIndex : -1}}/>


            <Text fontSize={20} fontWeight={"bold"}>Choose more artists you like</Text>



                <Swiper
                    slidesPerView={3}
                    spaceBetween={5}
                    grid={{
                      rows: 4,
                    }}

                    modules={[SwiperGrid]}
                    style={{width: "100%", height: 550}}
                >

                    {
                        _.sortBy(artists, 'name')?.map((artistsInfo) => {
                            return (
                                <SwiperSlide style={{ height: "8rem"}} key={artistsInfo.id}>

                                        <VStack
                                            p={3}
                                            cursor={"pointer"}
                                            opacity={
                                                !!_.find(selectFavourite, {id: artistsInfo.id}) ? "30%" : "100%"
                                            }
                                            transition={".5s"}
                                        >
                                            <Tilt scale={0.9} transitionSpeed={1000}>

                                                <Box w={94} h={94} rounded={100} overflow={"hidden"} position={"relative"}>
                                                    <Image
                                                        layout={"fill"}
                                                        objectFit={"cover"}
                                                        loading={"lazy"}
                                                        placeholder={"blur"}
                                                        blurDataURL={artistsInfo.images[2].url}
                                                        src={artistsInfo.images[0].url}
                                                        onClick={() => handelSelect(artistsInfo)}
                                                    />
                                                </Box>

                                            </Tilt>
                                            <Text fontSize={"xs"}>{artistsInfo.name}</Text>

                                        </VStack>
                                </SwiperSlide>
                            )
                        })
                    }


                </Swiper>




            <Button
                onClick={confirm}
                isLoading={loading}
                size={"sm"}
                rounded={"full"}
                loadingText="Submitting"
                colorScheme="gray">
                Confirm
            </Button>

        </VStack>
    );
};
