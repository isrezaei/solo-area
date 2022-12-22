import {
    Box, Flex, HStack, Image, Text, VStack, Button, Icon, Center,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton, Grid
} from "@chakra-ui/react";
import { Img } from '@chakra-ui/react'
import {RiPlayFill} from 'react-icons/ri'
import Tilt from "react-parallax-tilt";
import prettyMilliseconds from "pretty-ms";
import {ScrollContainer} from "react-indiana-drag-scroll";
import {useState} from "react";

export const ArtistCOMP = ({ARTIST}) =>
{

    console.log(ARTIST)

    //? For Modal
    const [open , setOpen] = useState(false)

        return (
            <Box position={"relative"}>

                <Img src={ARTIST?.artist_info.images[0].url} w={'full'} h={'100vh'} objectFit={'cover'} opacity={'30%'} position={"absolute"}/>

                <Flex w={"full"} h={'100vh'} p={5} direction={'column'} position={"absolute"} overflowY={"scroll"} overflowX={'hidden'} >


                    <VStack justify={"center"} align={'start'} w={'full'} h={'40vh'} px={5} >
                        <Text fontWeight={'bold'} fontSize={'5vw'}>{ARTIST?.artist_info.name}</Text>
                        <Text fontSize={'1.2vw'}>{ARTIST?.artist_info.followers.total} Followers </Text>

                        <HStack gap={5} my={5}>
                                <Center w={45} h={45} rounded={'full'} bg={'lightgreen'}>
                                    <Icon boxSize={8} color={"blackAlpha.800"} as={RiPlayFill}/>
                                </Center>
                            <Button variant={"outline"} colorScheme={'green'}>Follow</Button>
                            <Text>...</Text>
                        </HStack>
                    </VStack>



                    <VStack justify={'start'} align={'start'} w={"full"}>

                        <VStack w={"full"}  align={"start"}>
                            <Text  align={'left'} color={"whiteAlpha.800"} fontWeight={'bold'} fontSize={'2vw'}>Popular</Text>
                            {
                                ARTIST?.top_track.slice(0 , 5).map((TRACKS , INDEX) => (
                                    <Box w={'full'} key={TRACKS.id}>
                                        <Tilt tiltEnable={false} glareEnable={true} glareBorderRadius={'.8vw'} glareMaxOpacity={0.3} glareColor="#6d6d6d" glarePosition="all">
                                            <Flex key={Math.random()}
                                                  w={"full"}
                                                  justify={"center"}
                                                  align={'center'}
                                                  my={1}
                                                  p={2}
                                                  rounded={'lg'}
                                                  bg={'whiteAlpha.200'}>

                                                <Flex flex={1.1} justify={'space-around'} align={'center'}>
                                                    <Text flex={.5} align={'center'} >{INDEX + 1}</Text>

                                                    <Center flex={1.2} >
                                                        <Image src={TRACKS?.album?.images?.[0]?.url} boxSize={14} rounded={'xl'}/>
                                                    </Center>

                                                    <Box flex={2} align={'start'}>
                                                        <Text w={200} overflow={'hidden'} whiteSpace={"nowrap"} textOverflow={'ellipsis'}>{TRACKS?.name}</Text>
                                                        <Text fontSize={'sm'}>{TRACKS?.artists?.[0]?.name}</Text>
                                                    </Box>
                                                </Flex>

                                                <Text flex={1}  textAlign={'center'}>{TRACKS?.album?.name}</Text>

                                                <Text flex={1}  textAlign={'center'}>  {prettyMilliseconds(TRACKS?.duration_ms , {secondsDecimalDigits : 0 , colonNotation : true})}</Text>
                                            </Flex>
                                        </Tilt>
                                    </Box>
                                ))
                            }

                        </VStack>


                        <HStack w={"full"} justify={'space-between'}>
                            <Text  align={'left'} color={"whiteAlpha.800"} fontWeight={'bold'} fontSize={'2vw'}>More albums from {ARTIST?.artist_info.name}</Text>
                            <Text onClick={() => setOpen(prevState => !prevState)}>SHOW ALL</Text>
                        </HStack>


                            <ScrollContainer style={{display : 'flex' , width : '100%'}}>
                                {

                                    ARTIST?.artist_albums.items.slice(0 , 8).map(ALBUMS => (

                                        <VStack  key={ALBUMS.id} flex={'none'} bg={'whiteAlpha.200'} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300" , transition : '.3s'}}>
                                            <Image src={ALBUMS?.images[0].url} boxSize={200} p={2} rounded={'1.5vw'} alt=''/>
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
                            </ScrollContainer>

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
                                ARTIST?.artist_albums.items.map(ALBUMS => (

                                    <VStack  key={ALBUMS.id} flex={'none'} bg={'whiteAlpha.200'} p={1} mr={3} rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300" , transition : '.3s'}}>
                                        <Image src={ALBUMS?.images[0].url} boxSize={200} p={2} rounded={'1.5vw'} alt=''/>
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