import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    IconButton,
    HStack,
    Icon,
    Spacer,
    Stack,
    Text,
    Tooltip,
    VStack, Spinner
} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill, RiUserFollowFill, RiUserFollowLine, RiUserUnfollowFill} from "react-icons/ri";
import {useRouter} from "next/router";
import Image from "next/image";
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import {page , pageLink , next , previous , active , pagination , breakLinkClassName , breakClassName} from "./ExtraStyleSidebar";
import {useSupabaseClient , useUser} from "@supabase/auth-helpers-react"
import useSWR from "swr";
import {GetSubscribedList} from "../supabase/get/getSubscribedList";
import _ from 'lodash';
import {getRandomArtists} from "../graphQl/query/getRandomArtists";
import {getNewReleasesAlbums} from "../graphQl/query/getNewReleasesAlbums";



export const Sidebar = () =>
{
    const router = useRouter()
    const supabase = useSupabaseClient()
    const user = useUser()

    const [showMore , setShowMore] = useState({setHeight : false , setOverFlow : false})

    const [currentPage, setCurrentPage] = useState(0);


    const {
        data : getSubscribedList ,
        isValidating : subscribeStatus ,
        mutate : subscribeMutate
    } = useSWR(['GET SUBSCRIBED LIST' , user] , async (key , user) => GetSubscribedList(user))


    const {
        data : {
            randomArtists : {
                artists : {
                    items : randomArtists
                } = []
            } = {}
        } = {}
     , isValidating} = useSWR(['api' , 'GET_RANDOM_ARTISTS' , currentPage] , async (api , key , currentPage) => (await getRandomArtists(currentPage)) , {refreshInterval : 0})




    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }



    const handelSubscribe = async (randomArtist) =>
    {
        const Y = _.xorWith(getSubscribedList.subscribed , [randomArtist] , _.isEqual)

        console.log(Y)

        if (user)
        {
            try {
                const { data, error } = await supabase
                    .from('SUBSCRIBE_LIST')
                    .upsert([{
                            'id' : user.id,
                            'dependent-to' : user.email,
                            'subscribed' : Y
                        }],
                    )

                subscribeMutate()
            }
            catch (e)
            {
                console.log(e)
            }
        }
    }








    return (


        <Flex
            display={{base : 'none' , md : 'flex'}}
            flex={{md : 1.5 , '3xl' : 1}}
            w={300}
            h={'100vh'}
            direction={"column"}
            justify={'flex-start'}
            p={2}
            gap={5}
            position={"sticky"}
            top={0}
            overflowX={'hidden'}
            overflowY={'scroll'}>

            <Flex  direction={'column'} gap={1.5} py={2} >

                <HStack background={router.pathname === '/' ? "pink.900" : "whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                    <RiHome6Line color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Home</Text>
                </HStack>

                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Create playlist</Text>
                </HStack>
                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Liked song</Text>
                </HStack>
                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Listen later</Text>
                </HStack>
                <HStack background={"whiteAlpha.100"} spacing='.8vw' p={2} rounded={"md"} cursor={"pointer"}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>History</Text>
                </HStack>
            </Flex>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>

            <VStack justify={"center"}  p={1} >

                {
                    !getSubscribedList?.subscribed.length &&
                    <VStack justify={"center"} h={75} >
                        <Text textAlign={"center"} fontSize={"md"} w={"full"} >You don't have any Subscriptions</Text>
                        <Icon fontSize={"2xl"} as={RiUserFollowLine}/>
                    </VStack>
                }

                {
                    getSubscribedList?.subscribed.length &&
                    <>
                        <Text w={"full"}  fontSize={"lg"} fontWeight={'bold'}>Subscriptions</Text>
                        <Grid w={"full"} gap={2} templateColumns={'repeat(4 ,1fr)'}>
                            {
                                getSubscribedList?.subscribed.map(value => {

                                    return (
                                        <Tooltip key={value.id} bg={"black"} color={"whiteAlpha.800"} placement='bottom' label={value.name}>
                                            <Box w={45} h={45} onClick={() => router.push(`/artist/${value.id}`)} cursor={"pointer"} position={"relative"}>
                                                <Image style={{position : "absolute" , borderRadius : '50%'}} layout={"fill"} placeholder={"blur"} blurDataURL={value.images[2].url} src={value.images[2].url} loading={'lazy'} />
                                            </Box>
                                        </Tooltip>

                                    )

                                })
                            }
                        </Grid>
                    </>
                }




            </VStack>

            <Divider borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"}/>


            <VStack h={showMore.setHeight ? 'auto' : 290} overflow={showMore.setOverFlow ? 'visible' : 'hidden'}>

                <HStack w={"full"} justify={"flex-start"} spacing={3}>
                    <Text fontSize={"lg"} fontWeight={'bold'} >maybe you like it</Text>
                    <Button size={"xs"} onClick={() => setShowMore(prevState => ({setHeight: !prevState.setHeight , setOverFlow: !prevState.setOverFlow}))}>
                        {showMore.setHeight ? 'C' : 'O'}
                    </Button>
                </HStack>

                <HStack w={"full"} justify={'space-between'}>
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

                    {isValidating && <Spinner  thickness='3px' size={"sm"} color={'pink.800'}/>}
                </HStack>


                {randomArtists?.map(randomArtist => {
                    return (
                        <HStack key={randomArtist.id} w={"full"} pr={2} bg={'whiteAlpha.200'} cursor={'pointer'} fontSize={'sm'} roundedRight={'xl'} roundedLeft={'3xl'}>

                            <Box w={50} h={50} position={"relative"} overflow={"hidden"} rounded={'5rem 0rem 5rem 5rem'}>
                                <Image style={{position : "absolute"}} src={randomArtist?.images[2]?.url} layout={"fill"} objectFit={'cover'} placeholder={'blur'} blurDataURL={randomArtist?.images[2]?.url}/>
                            </Box>

                            <Box flex={1} spacing={0}>
                                <Text w={79} noOfLines={1} fontSize={"xs"}>{randomArtist.name}</Text>
                                <Text w={79} noOfLines={1} fontSize={"2xs"}>{randomArtist.genres[0]}</Text>
                            </Box>

                            <IconButton isLoading={subscribeStatus}
                                        aria-label={'subscribe-unSubscribe'}
                                        onClick={() => handelSubscribe(randomArtist)}
                                        rounded={"full"}
                                        colorScheme={'orange'}
                                        size={"sm"}
                                        icon={!!_.find(getSubscribedList?.subscribed , {id : randomArtist.id}) ? <RiUserUnfollowFill size={18}/>  : <RiUserFollowFill size={18}/>}
                                        variant={!!_.find(getSubscribedList?.subscribed , {id : randomArtist.id}) ? 'solid' :'outline'}/>
                        </HStack>
                    )
                })}
            </VStack>


        </Flex>

    )
}
