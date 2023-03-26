import {
    Box, Flex, HStack, Text, VStack, Button, Icon, Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Stack
} from "@chakra-ui/react";
import Image from "next/image";
import { Img } from '@chakra-ui/react'
import {RiPlayFill} from 'react-icons/ri'
import Tilt from "react-parallax-tilt";
import prettyMilliseconds from "pretty-ms";
import {ScrollContainer} from "react-indiana-drag-scroll";
import {useState} from "react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {getArtistInformation} from "../../../graphQl/query/getArtistInformation";
import {Sidebar} from "../../Sidebar";
import {GoPlay} from 'react-icons/go'
import { Swiper, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";



export const ArtistInfo = () =>
{

    const {push , query : {artist : artistId}} = useRouter()

    const {data :
        {
            getArtistInfo ,
            getAlbumsOfArtist ,
            getArtistTopTracks ,
            getRelatedArtist
        }
    } = useSWR(['api' , 'GET_ARTISTS_INFO' , artistId] , async (key , id , artistId) => (await getArtistInformation(artistId)))


    console.log(getRelatedArtist)


    //? For Modal
    const [open , setOpen] = useState(false)

    return (

        <Box w={"full"} h={'full'} position={"relative"}>

            <Image layout={"fill"} objectFit={"cover"} priority={true} src={getArtistInfo.images[0].url} style={{position : "absolute" , opacity : '30%'}}  placeholder={"blur"} blurDataURL={getArtistInfo.images[2].url}/>


            <Flex w={"full"} h={'100vh'} px={5} direction={'column'} position={"absolute"} overflowY={"scroll"} overflowX={'hidden'} >




                <HStack w={"full"} py={10}  justifyContent={"space-between"}>

                    <HStack spacing={2}>
                        <Icon boxSize={16} color={"lightgreen"} as={GoPlay}/>
                        <Text fontSize={50} fontWeight={"bold"} color={"whiteAlpha.700"}>{getArtistInfo.name}</Text>
                    </HStack>


                    <HStack>
                        <Button size={"sm"} variant={"outline"} colorScheme={'green'}>Subscribe</Button>
                    </HStack>

                </HStack>


                <VStack justify={'start'} align={'start'} w={"100%"} >

                    <VStack w={"full"} spacing={3}>
                        <Text w={"full"} fontSize={45} fontWeight={"bold"} color={"whiteAlpha.700"}>Popular</Text>
                        {
                            getArtistTopTracks.tracks.slice(0 ,5).map((track , index) => {
                                return (
                                    <HStack key={track.id} w={"full"} px={3} py={2} justify={"space-between"} align={'center'} rounded={'lg'} bg={'whiteAlpha.200'}>
                                        <HStack>
                                            <Text w={5}>{index + 1}</Text>
                                            <Box w={50} h={50} position={"relative"} rounded={5} overflow={"hidden"}  >
                                                <Image layout={"fill"} style={{position : "absolute"}} objectFit={"cover"} src={track.album?.images?.[1]?.url} placeholder={"blur"} blurDataURL={track.album?.images?.[2]?.url}/>
                                            </Box>
                                            <Box align={'start'}>
                                                <Text fontSize={15} noOfLines={1} fontWeight={"bold"} color={'whiteAlpha.800'}>{track.album?.name}</Text>
                                                <Text fontSize={12} color={'whiteAlpha.600'}>{track.album?.artists?.[0]?.name}</Text>
                                            </Box>
                                        </HStack>

                                        <Text fontSize={13} noOfLines={1} color={'whiteAlpha.800'}>{track.album?.name}</Text>

                                        <Text fontSize={13} color={'whiteAlpha.800'}>{prettyMilliseconds(track.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}</Text>
                                    </HStack>
                                )
                            })
                        }
                    </VStack>


                    <HStack w={"full"} justify={'space-between'}>
                        <Text  align={'left'} color={"whiteAlpha.800"} fontWeight={'bold'} fontSize={'2vw'}>More albums from {getArtistInfo.name}</Text>
                        <Text onClick={() => setOpen(prevState => !prevState)}>SHOW ALL</Text>
                    </HStack>

                    {/**************/}

                    <ScrollContainer style={{display : 'flex' , width : '100%'}}>
                        {

                            getAlbumsOfArtist.items.slice(0 , 8).map(albums => (

                                <VStack  key={albums.id} flex={'none'} bg={'whiteAlpha.200'} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300" , transition : '.3s'}}>
                                    <Img src={albums.images[0].url} boxSize={200} p={2} rounded={'1.5vw'} alt=''/>
                                    <Text w={200}
                                          whiteSpace={"nowrap"}
                                          overflow={'hidden'}
                                          textOverflow={'ellipsis'}
                                          textAlign={'center'}
                                          fontWeight={'bold'}
                                          fontSize={'md'}
                                          color={'whitesmoke'}>{albums.name}</Text>

                                    <HStack>
                                        <Text fontWeight={'bold'} fontSize={'sm'} color={'#9e9e9e'}>{albums.release_date.slice(0 , 4)}</Text>
                                        <Text fontWeight={'bold'} fontSize={'sm'} color={'#9e9e9e'}>{albums.type}</Text>
                                    </HStack>

                                </VStack>

                            ))

                        }
                    </ScrollContainer>


                    <Text  align={'left'} color={"whiteAlpha.800"} fontWeight={'bold'} fontSize={'2vw'}>Fans also like</Text>

                    <>
                        <Swiper
                            breakpointsBase={true}
                            slidesPerView={5}
                            grid={{
                                rows: 2,
                            }}
                            spaceBetween={0}
                            pagination={{
                                clickable: true,
                            }}
                            modules={[Grid , Pagination]}
                            style={{width : '100%' , height : '35rem'}}>

                                {
                                    getRelatedArtist.artists.map(related => (
                                        <SwiperSlide  key={related.id} style={{height : '15rem'}}>
                                            <VStack >
                                                <Box onClick={() => push(`/artist/${related.id}`)} position={"relative"} width={190} height={190} rounded={"full"} overflow={"hidden"}>
                                                    <Image src={related.images[0].url} loading={"lazy"} placeholder={"blur"} blurDataURL={related.images[2].url} layout={"fill"} objectFit={"cover"} style={{position : "absolute"}}/>
                                                </Box>

                                                <Text w={200}
                                                      whiteSpace={"nowrap"}
                                                      overflow={'hidden'}
                                                      textOverflow={'ellipsis'}
                                                      textAlign={'center'}
                                                      fontWeight={'bold'}
                                                      fontSize={'md'}
                                                      color={'whitesmoke'}>{related.name}</Text>

                                                <HStack>
                                                    <Text fontWeight={'bold'} fontSize={'sm'} color={'#9e9e9e'}>{related.type}</Text>
                                                </HStack>

                                            </VStack>
                                        </SwiperSlide>
                                    ))
                                }

                        </Swiper>

                    </>

                </VStack>

            </Flex>


            {/*More Albums*/}

            <Modal size={'full'} isOpen={open} onClose={() => setOpen(prevState => !prevState)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader bg={"black"}>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody bg={"black"}>

                        <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                            {
                                getAlbumsOfArtist.items.map(ALBUMS => (

                                    <VStack  key={ALBUMS.id} flex={'none'} bg={'whiteAlpha.200'} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300" , transition : '.3s'}}>
                                        <Img src={ALBUMS?.images[0].url} boxSize={200} p={2} rounded={'1.5vw'} alt=''/>
                                        <Text w={200}
                                              whiteSpace={"nowrap"}
                                              overflow={'hidden'}
                                              textOverflow={'ellipsis'}
                                              textAlign={'center'}
                                              fontWeight={'bold'}
                                              fontSize={'md'}
                                              color={'whitesmoke'}>{ALBUMS?.name}</Text>

                                        <HStack>
                                            <Text fontWeight={'bold'} fontSize={'sm'} color={'#9e9e9e'}>{ALBUMS.release_date.slice(0 , 4)}</Text>
                                            <Text fontWeight={'bold'} fontSize={'sm'} color={'#9e9e9e'}>{ALBUMS.type}</Text>
                                        </HStack>
                                    </VStack>
                                ))
                            }
                        </Grid>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => setOpen(prevState => !prevState)}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>



    )

}