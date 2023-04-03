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
    IconButton,
} from '@chakra-ui/react';
import ArtistsResult from './ArtistsResult';
import Songs from './Songs';
import BrowseAll from './BrowseAll';
import Loading from './Loading';
import Header from "./Header";
import {GetSearchResult} from "../../graphQl/query/api/getSearchResult";
import {RiSearchLine} from 'react-icons/ri';
import {useDebounce} from 'react-use';

export const SearchBar = () => {
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
            <HStack>
                <ArtistsResult artists={artists}/>
                <Songs tracks={tracks}/>
            </HStack>
        )
    }
    if (status === 'pending') {
        renderSearch = <Loading/>
    }
    if (status === 'idle') {
        renderSearch = <BrowseAll/>
    }

    return (
        <Box>
            <IconButton
                aria-label="search"
                w={{base: '6rem', md: 'auto'}}
                rounded="full"
                icon={<Icon as={RiSearchLine} boxSize={5}/>}
                onClick={handleSearch}
            />
            <Modal size="6xl" onClose={handleSearch} isOpen={isOpen} isCentered>
                <ModalOverlay bg="blackAlpha.800"/>
                <ModalContent bg="black" minH={550}>
                    <ModalHeader>
                        <Header
                            setInputSearch={setInputSearch}
                        />
                    </ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        {renderSearch}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};