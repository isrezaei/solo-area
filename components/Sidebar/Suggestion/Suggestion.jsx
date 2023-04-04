import _ from "lodash";
import {VStack} from "@chakra-ui/react";
import useSWR from "swr";
import {getRandomArtists} from "../../../graphQl/query/api/getRandomArtists";
import {useEffect, useState} from "react";
import Pagination from "./Pagination";
import Header from "./Header";
import Loading from "./Loading";
import Items from "./Items";

const Suggestion = () => {

    //* set random word for get random artists from spotify api
    const [randomWord, setRandomWord] = useState("")
    useEffect(() => {
        const alphabet = _.sampleSize("abcdefghijklmnopqrstuvwxyz", 1).join('');
        setRandomWord(alphabet)
    }, [])
    //*

    //* handel offset for search random artists
    const [currentPage, setCurrentPage] = useState(0);
    const handlePagination = ({selected: selectedPage}) => {
        setCurrentPage(selectedPage);
    };
    //*

    //* get random artists from spotify api
    const {
        data: {
            randomArtists: {
                artists
            } = {}
        } = {},
        isValidating
    } = useSWR(
        ["api", "GET_RANDOM_ARTISTS", currentPage, randomWord],
        async (api, key, currentPage, randomWord) =>
            await getRandomArtists(currentPage, randomWord),
        {refreshInterval: 0});
    //*

    //* handel grow height or shrink height
    // const [showMore, setShowMore] = useState({
    //     setHeight: false,
    //     setOverFlow: false,
    // });

    const [showMore, setShowMore] = useState(false);

    const handelHeight = () => {
        // setShowMore((prevState) => ({
        //     setHeight: !prevState.setHeight,
        //     setOverFlow: !prevState.setOverFlow,
        // }))

        setShowMore(prev => !prev)
    }
    //*

    return (
        <VStack>

            <Header
                handelHeight={handelHeight}
                showMore={showMore}/>

            <Pagination
                handlePagination={handlePagination}/>

            {
                isValidating && <Loading/>
            }
            {
                !isValidating && artists?.items?.slice(0 , showMore ? undefined : -45 ).map((artists) => <Items artists={artists}/>)
            }
        </VStack>
    );
};

export default Suggestion;

//["a" , "b" , "c" , "d" , "e" , "f" , "j"]