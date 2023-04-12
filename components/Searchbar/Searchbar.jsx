import {useState} from 'react';
import {
    Box,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Icon,
    HStack,
    IconButton, Stack, Button,
} from '@chakra-ui/react';
import ArtistsResult from './ArtistsResult';
import Songs from './Songs';
import BrowseAll from './BrowseAll';
import Loading from './Loading';
import Header from "./Header";
import {GetSearchResult} from "../../graphQl/query/api/getSearchResult";
import {RiSearchLine} from 'react-icons/ri';
import {useDebounce} from 'react-use';

export const Searchbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputSearch, setInputSearch] = useState(null);
    const [status, setStatus] = useState('idle');
    const [response, setResponse] = useState({});
    const {artists, tracks} = response;

    useDebounce(async () => {
            switch (true) {
                case (inputSearch?.length < 2):
                default:
                    setResponse({});
                    setStatus('idle');
                    break;
                case (inputSearch?.length > 2):
                    setStatus('pending');
                    const {SEARCH_RESULT} = await GetSearchResult(inputSearch);
                    setResponse(SEARCH_RESULT)
                    setStatus('success');
                    break;
            }
        },
        500,
        [inputSearch]
    );

    const handleSearch = () => {
        setIsOpen((prevState) => !prevState);
    };


    let renderSearch;
    if (status === 'success') {
        renderSearch = (
            <Stack direction={{sm : "column" , md : "row"}} justify={{sm : "flex-start" , md : "center"}} >
                <ArtistsResult artists={artists}/>
                <Songs tracks={tracks}/>
            </Stack>
        )
    }
    if (status === 'pending') {
        renderSearch = <Loading/>
    }
    if (status === 'idle') {
        renderSearch = <BrowseAll/>
    }

    return (
        <HStack>
            <IconButton
                aria-label="search"
                rounded="full"
                boxSize={{sm : 7 , md : 10}}
                icon={<Icon as={RiSearchLine} boxSize={{sm : 4 , md : 5}}/>}
                onClick={handleSearch}
            />


            <Modal size={{sm : "xs" , md : "6xl"}} onClose={handleSearch} isOpen={isOpen} isCentered>
                <ModalOverlay bg="blackAlpha.800"/>
                <ModalContent bg={"#212121"} h={600} overflow={{sm : "auto" }} >


                        <ModalHeader>
                            <HStack>
                                <Header setInputSearch={setInputSearch}/>
                                <Button size={"sm"} rounded={"full"} colorScheme='red' mr={3} onClick={handleSearch}>
                                    Close
                                </Button>
                            </HStack>
                        </ModalHeader>


                    <ModalBody>

                        {renderSearch}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </HStack>
    );
};