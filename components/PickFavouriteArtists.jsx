import {Box, Button, IconButton, Text, useToast, VStack,} from "@chakra-ui/react";
import Image from "next/image";
import {useState} from "react";
import _ from "lodash";
import {useSupabaseClient, useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {getSeveralArtistsForPickup} from "../graphQl/query/api/getSeveralArtistsForPickup";
import {Swiper, SwiperSlide} from "swiper/react";
import {EffectCards} from "swiper";
import "swiper/css";
import "swiper/css/effect-cards";
import {BsHeart, BsHeartFill} from "react-icons/bs";
import {useRecoilState} from "recoil";
import {PICK_ARTISTS} from "../atoms/atoms";


export const PickFavouriteArtists = () => {

    const {data: {GET_SEVERAL_ARTISTS_FOR_PICKUP: {artists}}} = useSWR("GET_SEVERAL_ARTISTS_FOR_PICKUP", () => getSeveralArtistsForPickup())


    const user = useUser();
    const supabase = useSupabaseClient();
    const toast = useToast();
    const router = useRouter();


    const [selectFavourite, setFavourite] = useRecoilState(PICK_ARTISTS);

    console.log(selectFavourite)

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
        <Box maxW={"sm"} overflow={"hidden"} m={"auto"} position={"relative"}>
            <VStack h={"100vh"} spacing={5} justify={"center"} align={"center"}>
                <Box>
                    <Text color={"whiteAlpha.600"} fontSize={18}>Welcome to solo area music</Text>
                    <Text fontWeight={"semibold"} fontSize={23}>Pick 10 of your favourite artists</Text>
                </Box>
                <Swiper
                    effect={"cards"}
                    modules={[EffectCards]}
                    style={{maxWidth: "70%"}}
                >
                    {
                        _.sortBy(artists, 'name')?.map((artistsInfo) => {
                            return (
                                <SwiperSlide style={{
                                    width: "390px",
                                    height: "390px",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                }} key={artistsInfo.id}>
                                    <Image
                                        layout={"fill"}
                                        objectFit={"cover"}
                                        loading={"lazy"}
                                        placeholder={"blur"}
                                        blurDataURL={artistsInfo.images[2].url}
                                        src={artistsInfo.images[0].url}
                                    />

                                    <VStack w={"70%"} position={"absolute"} bg={"blackAlpha.600"} p={3}>
                                        <Text fontSize={20} noOfLines={1} fontWeight={"bold"}>{artistsInfo.name}</Text>
                                        <IconButton
                                            icon={!!_.find(selectFavourite, {id: artistsInfo.id}) ?
                                                <BsHeartFill size={30}/> : <BsHeart size={30}/>}
                                            size={"sm"}
                                            variant={"link"}
                                            colorScheme={"purple"}
                                            aria-label={'select favourite'}
                                            onClick={() => handelSelect(artistsInfo)}/>
                                    </VStack>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
                <Button onClick={confirm} rounded={0} colorScheme={"purple"}>Confirm</Button>

            </VStack>

        </Box>
    );
};
