import {
    VStack,
    HStack,
    Grid,
    Stack,
} from "@chakra-ui/react";
import {selectGenre} from "../../atoms/atoms";
import {useRecoilValue} from "recoil";
import {useState} from "react";
import {motion} from "framer-motion";
import {getNewReleasesAlbums} from "../../graphQl/query/api/getNewReleasesAlbums";
import {ScrollContainer} from "react-indiana-drag-scroll";
import useSWR from "swr";
import Pagination from "./pagination";
import Title from "./Title";
import Loading from "./Loading";
import Albums from "./Albums";


export const NewReleasesAlbums = () => {

    const getGenre = useRecoilValue(selectGenre);
    const [currentPage, setCurrentPage] = useState(0);
    const {data: {newReleases: {albums: {items: newReleaseLists} = []} = {}} = {}} = useSWR(["api", "GET_NEW_RELEASES", getGenre, currentPage],
        async (key, ip, getGenre, currentPage) =>
            await getNewReleasesAlbums(getGenre, currentPage),
        {refreshInterval: false}
    );

    let RenderNewReleases;

    if (!newReleaseLists) {
        RenderNewReleases = <Loading/>
    }

    if (newReleaseLists) {
        RenderNewReleases = newReleaseLists?.map((albumsInfo) => <Albums key={albumsInfo.id} albumsInfo={albumsInfo}/>);
    }

    const handlePageClick = ({selected: selectedPage}) => {
        setCurrentPage(selectedPage);
    };

    return (
        <VStack
            w={"full"}
            h={{sm: 250, md: 810 , lg: 890 , xl : 520 , "2xl" : 560 , "3xl" : 710}}
            position={"relative"}
            zIndex={1000}>

            <Stack direction={{sm : "row" , md : "column" , lg : "column" , xl : "row"}} w={"full"} align={"center"} justify={"space-between"}>
                <Title/>
                <Pagination handlePageClick={handlePageClick}/>
            </Stack>


            {/*mobile render*/}
            <Stack w={"full"} position={"relative"}>
                <Stack position={"absolute"} overflow={"hidden"} w={"full"} display={{sm: "flex", md: "none"}}>
                    <ScrollContainer style={{display: "flex"}}>
                        {RenderNewReleases}
                    </ScrollContainer>
                </Stack>
            </Stack>


            {/*desktop render*/}
            <motion.div
                key={[currentPage, getGenre, newReleaseLists]}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}
            >
                <Grid
                    display={{sm: "none", md: "grid"}}
                    templateColumns={{md : "repeat(4, 1fr)" , lg : "repeat(4, 1fr)" , xl : "repeat(6, 1fr)"}}
                    gap={{md : 3 , "3xl" : 15}}
                >
                    {RenderNewReleases}
                </Grid>
            </motion.div>
        </VStack>
    );
};
