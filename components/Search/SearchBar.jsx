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
    Icon, InputGroup, InputLeftElement, Input, HStack, VStack, Img, Text, Tooltip, Center, IconButton, Grid, Stack
} from "@chakra-ui/react";
import Image from "next/image";

import {RiSearchLine} from 'react-icons/ri'
import {PhoneIcon} from "@chakra-ui/icons";
import {GetSearchResult} from "../../graphQl/query/api/getSearchResult";
import {useAsync, useDebounce} from "react-use";
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import Tilt from "react-parallax-tilt";
import {useRouter} from "next/router";
import ArtistsResult from "./ArtistsResult";
import Songs from "./Songs";
import useSWR from "swr";
import {getSeveralCategories} from "../../graphQl/query/api/getSeveralCategories";


export const SearchBar = () => {
    const router = useRouter()

    const [isOpen, onOpen] = useState(false)
    const [searchInput, setSearchInput] = useState(null)
    const [searchResult, setSearchResult] = useState({})
    const [searchStatus, setSearchStatus] = useState('idle')

    const {data: {GET_SEVERAL_CATEGORIES} = {}} = useSWR('Categories', () => getSeveralCategories())

    console.log(GET_SEVERAL_CATEGORIES)


    const [isReady, cancel] = useDebounce(async () => {

        if (searchInput?.length >= 2) {
            setSearchStatus('pending')

            const {SEARCH_RESULT} = await GetSearchResult(searchInput)

            console.log(SEARCH_RESULT)

            setSearchResult(SEARCH_RESULT)
            setSearchStatus('success')
        }
        if (searchInput?.length <= 2) {
            setSearchResult({})
            setSearchStatus('idle')
        }


    }, 1000, [searchInput]);


    const {albums, artists, tracks} = searchResult


    return (
        <Box>
            <IconButton aria-label='search' w={{base: '6rem', md: 'auto'}} rounded={"full"}
                        icon={<Icon boxSize={5} as={RiSearchLine}/>} onClick={() => onOpen(prevState => !prevState)}/>
            <Modal size={"6xl"} onClose={() => onOpen(prevState => !prevState)} isOpen={isOpen} isCentered>
                <ModalOverlay bg={"blackAlpha.800"}/>
                <ModalContent bg={"black"} minH={550}>
                    <ModalHeader>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                children={<Icon as={RiSearchLine}/>}
                            />
                            <Input type='text' w={"xl"} fontSize={12} bg={"whiteAlpha.200"} color={"white"}
                                   _placeholder={{color: 'whiteAlpha.800'}} rounded={"full"}
                                   focusBorderColor={'transparent'} placeholder='What do you want to listen to ? '
                                   onChange={e => setSearchInput(e.target.value)}/>
                        </InputGroup>
                    </ModalHeader>
                    <ModalCloseButton/>


                    <ModalBody>

                        {
                            searchStatus === 'success' &&

                            <HStack w={"full"} justify={"space-around"} align={'start'}>

                                <ArtistsResult artists={artists}/>
                                <Songs tracks={tracks}/>

                            </HStack>
                        }


                        {searchStatus === 'pending' && 'Loading'}
                        {searchStatus === 'idle' &&

                            <Stack m={'auto'} w={"90%"}>

                                <Text w={"full"} fontSize={20} fontWeight={"bold"} color={"whiteAlpha.700"}>Browse all</Text>
                                <Grid h={500} overflowY={"scroll"} templateColumns={"repeat(6 , 1fr)"} gap={3}>

                                    {
                                        GET_SEVERAL_CATEGORIES?.categories?.items.map(data => {
                                            return (
                                                <VStack>
                                                    <VStack w={150} h={95} position={"relative"} rounded={5} overflow={"hidden"}>
                                                        <Image layout={"fill"}
                                                               objectFit={"cover"}
                                                               loading={'lazy'}
                                                               src={data.icons[0].url}
                                                               style={{position: "absolute"}}/>
                                                        <Text position={'absolute'}
                                                              bottom={1}
                                                              fontSize={13}
                                                              fontWeight={"bold"}
                                                        >
                                                            {data.name}
                                                        </Text>
                                                    </VStack>
                                                </VStack>
                                            )

                                        })
                                    }

                                </Grid>
                            </Stack>
                        }


                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    )
}