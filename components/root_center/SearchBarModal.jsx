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
    Icon, InputGroup, InputLeftElement, Input, HStack, VStack, Img, Text, Tooltip, Center, IconButton
} from "@chakra-ui/react";
import Image from "next/image";

import {RiSearchLine} from 'react-icons/ri'
import {PhoneIcon} from "@chakra-ui/icons";
import {FETCH_SEARCH_RESULT} from "../../lib/FetcherFuncs/FETCH_SEARCH_RESULT";
import {useAsync, useDebounce} from "react-use";
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import Tilt from "react-parallax-tilt";
import {useRouter} from "next/router";


export const SearchBarModal = () =>
{
    const router = useRouter()
    const [isOpen, onOpen] = useState(false)
    const [searchInput , setSearchInput] = useState(null)
    const [searchResult , setSearchResult] = useState({})
    const [searchStatus , setSearchStatus] = useState('idle')



    const [isReady , cancel] = useDebounce(async () => {

        if (searchInput?.length >=2)
        {
            setSearchStatus('pending')
            const FETCH_RESULT = await FETCH_SEARCH_RESULT(searchInput)
            setSearchResult(FETCH_RESULT)
            setSearchStatus('success')
        }
        if (searchInput?.length <= 2)
        {
            setSearchResult({})
            setSearchStatus('idle')
        }


    }, 2000, [searchInput]);


    // console.log(searchResult)


    const {albums , artists , tracks} = searchResult


    return (
        <Box >

            <IconButton aria-label='search'  w={{base : '6rem' , md : 'auto'}} rounded={"full"} icon={<Icon boxSize={5} as={RiSearchLine} />}  onClick={() => onOpen(prevState => !prevState)}/>

            <Modal size={"4xl"}  onClose={()=> onOpen(prevState => !prevState)} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg={"black"}>
                    <ModalHeader>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<Icon as={RiSearchLine} />}
                            />
                            <Input type='text' w={"xl"} fontSize={12} bg={"whiteAlpha.200"} color={"white"} _placeholder={{ color: 'whiteAlpha.800' }} rounded={"full"} focusBorderColor={'transparent'} placeholder='What do you want to listen to ? ' onChange={e => setSearchInput(e.target.value)} />
                        </InputGroup>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        {
                            searchStatus === 'success' &&  <HStack w={"full"} justify={"space-around"} align={'start'} >

                                <VStack justify={"space-between"} position={"relative"} flex={1} h={350} >

                                    <VStack w={"full"} spacing={0}  align={'center'} >
                                        <Tilt  scale={.90} transitionSpeed={1000}>
                                            <Box w={250} h={250} rounded={"full"}  position={"relative"} cursor={"pointer"} onClick={() => router.push(`/artist/${artists.items[0].id}`)}>
                                                <Image style={{borderRadius : "100%"}} layout={"fill"}  src={artists?.items[0].images[0].url} priority={true}  placeholder={"blur"} blurDataURL={artists?.items[0].images[0].url}/>
                                            </Box>
                                        </Tilt>
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
                                                                <Img onClick={() => router.push(`/artist/${ARTIST.id}`)} src={ARTIST?.images[0]?.url} boxSize={50} mr={2} rounded={'full'}/>
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
                                                        <Box w={50} h={50} position={"relative"} >
                                                            <Image style={{borderRadius : '.5rem'}} layout={"fill"} src={TRACKS.album.images[0].url} placeholder={"blur"} blurDataURL={TRACKS.album.images[0].url}/>
                                                        </Box>
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
                            </HStack>
                        }
                        {searchStatus === 'pending' && 'Loading'}
                        {searchStatus === 'idle' && 'please search'}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}