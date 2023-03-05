import {Image, Text, Box, VStack, HStack, Divider, Center, Flex, Grid} from "@chakra-ui/react";
import {useRouter} from "next/router";
import 'react-indiana-drag-scroll/dist/style.css'
import useSWR from "swr";
import Tilt from "react-parallax-tilt";
import {FETCH_NEW_RELEASES_ALBUMS} from "../../../lib/FetcherFuncs/FETCH_NEW_RELEASES_ALBUMS";
import useSound from 'use-sound';
import {selectGenre} from "../../../atoms/atoms";
import {useRecoilValue} from "recoil";
import ReactPaginate from "react-paginate";
import {
    active,
    breakClassName,
    breakLinkClassName, next,
    page,
    pageLink,
    pagination,
    previous
} from "../../ExtraStyleSidebar";
import {useState} from "react";
import {motion} from "framer-motion";

export const NewReleasesAlbumsList = () =>
{
    const router = useRouter()

    const getGenre = useRecoilValue(selectGenre)

    const [currentPage , setCurrentPage] = useState(0)

    const {data , error , isLoading , isValidating} = useSWR(['api' , 'GET_NEW_RELEASES'  , getGenre , currentPage] , async (key , ip , getGenre , currentPage) => (await FETCH_NEW_RELEASES_ALBUMS(getGenre , currentPage)) , {refreshInterval : false})


    const [play , {stop}] = useSound('/beepSound.mp3');

    const Render = data?.map(ALBUMS_DATA => {

        const {images , name , artists , id} = ALBUMS_DATA

        return (
            <Tilt key={id} className="parallax-effect" perspective={500} scale={1.05}>
                <VStack onClick={play}  cursor={"pointer"} spacing={0} bg={'whiteAlpha.200'} p={1}  rounded={'.8vw'} _hover={{ bg: "whiteAlpha.300"}}>
                    <Image onClick={() => router.push(`/new-releases-albums/${id}`)} src={images[0].url} boxSize={{lg : 180 , '3xl' : 220}} p={2}  rounded={25} alt=''/>
                    <Text px={5} w={150} textAlign={'center'} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={'hidden'} fontWeight={'bold'} fontSize={'sm'} color={'whitesmoke'}>{name}</Text>
                    <Text fontSize={'xs'}  color={'#9e9e9e'}>{artists[0]?.name}</Text>
                </VStack>
            </Tilt>
        )
    })

    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    console.log(isValidating)


    return (
        <VStack w={"full"} zIndex={1000}>
            <HStack w={"full"} align={'center'}>
                <Text w={"full"} fontSize={40} fontWeight={"bold"} color={'whiteAlpha.600'}>The latest in the month</Text>
                <HStack>
                    <ReactPaginate
                        onPageChange={handlePageClick}
                        marginPagesDisplayed={0}
                        pageRangeDisplayed={4}
                        pageCount={10}
                        breakLabel="..."
                        breakClassName={breakClassName}
                        breakLinkClassName={breakLinkClassName}
                        containerClassName={pagination}
                        pageClassName={page}
                        pageLinkClassName={pageLink}
                        activeClassName={active}
                        previousClassName={previous}
                        nextClassName={next}
                        previousLinkClassName=""
                        nextLinkClassName=""
                        previousLabel=""
                        nextLabel=""
                        renderOnZeroPageCount={null}
                    />
                </HStack>
            </HStack>


            <motion.div key={currentPage } initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration : .5}}>
            <Grid py={2} templateColumns={{base : 'repeat(2, 1fr)' , md : 'repeat(6, 1fr)'}} gap={6} >
                {Render}
            </Grid>
            </motion.div>


        </VStack>
    )
}