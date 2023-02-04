import {useEffect, useState} from "react";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Icon, InputGroup, InputLeftElement, Input, HStack, VStack, Image , Img, Text, Tooltip
} from "@chakra-ui/react";

import {RiSearchLine} from 'react-icons/ri'
import {PhoneIcon} from "@chakra-ui/icons";
import {FETCH_SEARCH_RESULT} from "../../lib/FetcherFuncs/FETCH_SEARCH_RESULT";
import {useAsync, useDebounce} from "react-use";
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'

export const SearchBarModal = () =>
{
    const [isOpen, onOpen] = useState(false)
    const [searchInput , setSearchInput] = useState(null)
    const [searchResult , setSearchResult] = useState({})
    const [searchStatus , setSearchStatus] = useState('pending')



    const [isReady , cancel] = useDebounce(async () => {

        if (searchInput?.length >=2)
        {
            const FETCH_RESULT = await FETCH_SEARCH_RESULT(searchInput)
            setSearchResult(FETCH_RESULT)
            setSearchStatus('success')
        }
        if (searchInput?.length <= 2)
        {
            setSearchResult({})
        }


    }, 2000, [searchInput]);


    // console.log(searchResult)


    const {albums , artists , tracks} = searchResult


    return (
        <Box  flex={1}>

            <Button w={"2xs"} rounded={"3xl"} leftIcon={<Icon as={RiSearchLine} />}  onClick={() => onOpen(prevState => !prevState)}>search your music</Button>


            <Modal size={"4xl"}  onClose={()=> onOpen(prevState => !prevState)} isOpen={isOpen} isCentered>

                <ModalOverlay />
                <ModalContent bg={"black"}>
                    <ModalHeader>
                        <InputGroup>

                            <InputLeftElement
                                pointerEvents='none'
                                children={<Icon as={RiSearchLine} />}
                            />
                            <Input type='text' w={"xl"} fontSize={12} bg={"whiteAlpha.200"} color={"white"} _placeholder={{ color: 'whiteAlpha.800' }} rounded={"full"} focusBorderColor={'transparent'} placeholder='What do you want to listen to ? ' onChange={e => {
                                setSearchInput(e.target.value)
                                setSearchStatus('pending')
                            }} />
                        </InputGroup>


                    </ModalHeader>


                    <ModalCloseButton />

                    <ModalBody>

                        {
                           searchStatus === 'success' ?  <HStack w={"full"} justify={"space-around"} align={'start'} >

                                <VStack justify={"space-between"} position={"relative"} flex={1} h={350} >

                                    <VStack w={"full"} spacing={0}  align={'center'} >
                                        <Img src={artists?.items[0].images[0].url}  boxSize={230}  objectFit={'contain'}  rounded={"full"}/>
                                        <Text zIndex={1} fontSize={"4xl"} fontWeight={'bold'} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={'hidden'}>{artists?.items[0].name}</Text>
                                        <Text zIndex={1} fontSize={"sm"} fontWeight={'bold'} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={'hidden'}>{artists?.items[0].type}</Text>
                                    </VStack>

                                    {/***************/}

                                    <VStack align={'start'}>
                                        <Text fontSize={"sm"}>more artist related</Text>
                                        <ScrollContainer className="scroll-container" style={{display : "flex" , width : '25rem'}}>
                                            {
                                                artists?.items.map(ARTIST => {
                                                    return (
                                                        <Tooltip key={ARTIST.id} label={ARTIST.name} bg={"blackAlpha.600"} color={"white"}>
                                                            <Img p={1} boxSize={55} src={ARTIST?.images[0]?.url} rounded={"full"} cursor={"pointer"}/>
                                                        </Tooltip>

                                                    )
                                                })
                                            }
                                        </ScrollContainer>

                                    </VStack>

                                </VStack>



                                <Box flex={1} h={400}  overflowY={"scroll"}>
                                    {
                                        tracks?.items.map(TRACKS => {

                                            return (
                                                <HStack bg={"whiteAlpha.300"} rounded={"xl"} spacing={0} justify={"space-between"} align={"start"} p={2} mb={4}>

                                                    <HStack justify={"center"} align={"start"}>
                                                        <Img loading={"lazy"} rounded={"xl"} src={TRACKS.album.images[0].url} boxSize={50}/>
                                                        <VStack>
                                                            <Text fontSize={"sm"} w={200} fontWeight={'bold'} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={'hidden'}>{TRACKS.name}</Text>
                                                            <Text fontSize={"xs"} w={200} textOverflow={"ellipsis"} whiteSpace={"nowrap"} overflow={'hidden'} >{TRACKS.artists[0].name}</Text>
                                                        </VStack>
                                                    </HStack>
                                                    <Text  fontSize={"xs"}>1:00</Text>
                                                </HStack>
                                            )
                                        })
                                    }






                                </Box>

                            </HStack> : 'Loading ....'
                        }



                    </ModalBody>




                </ModalContent>
            </Modal>
        </Box>
    )
}