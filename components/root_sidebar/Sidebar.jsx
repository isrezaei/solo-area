import {
    Box,
    Button,
    Divider,
    Flex,
    Grid,
    GridItem,
    HStack,
    Icon,
    Spacer,
    Stack,
    Text,
    Tooltip,
    VStack
} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill, RiUserFollowLine} from "react-icons/ri";
import {useRouter} from "next/router";
import {FETCH_RANDOM_ARTIST} from "../../lib/FetcherFuncs/FETCH_RANDOM_ARTIST";
import {useAsync} from "react-use";
import Image from "next/image";
import {useEffect, useState} from "react";
import ReactPaginate from 'react-paginate';
import {page , pageLink , next , previous , active , pagination , breakLinkClassName , breakClassName} from "./ExtraStyleSidebar";
import {useSupabaseClient , useUser} from "@supabase/auth-helpers-react"
import _ from 'lodash'
import {useRealtime} from "react-supabase";


export const Sidebar = () =>
{
    const router = useRouter()
    const supabase = useSupabaseClient()
    const user = useUser()

    const [showMore , setShowMore] = useState({setHeight : false , setOverFlow : false})
    const [currentPage, setCurrentPage] = useState(0);
    const [subscribeList , setSubscribeList] = useState([])
    //? I PREVERNT TO FIRST RUN IN FIRST MOUNT FOR SET SUBSCRIBE IN SUPABASE
    const [shouldRunSetSubscribe, setShouldRunSetSubscribe] = useState(false);


    const randomArtist = useAsync(async () => await FETCH_RANDOM_ARTIST(currentPage),[currentPage])


    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage);
    }

    const handelSubscribe = (randomArtist) =>
    {
        setSubscribeList(prevState => {
            if (!!_.find(prevState , {id : randomArtist.id})) return _.reject(prevState , {id : randomArtist.id})
            return _.uniq([...prevState , randomArtist])

        })
        setShouldRunSetSubscribe(true)
    }


    const setSubscribed = useAsync(async () => {

        if (user && shouldRunSetSubscribe)
        {
            try {
                const { data, error } = await supabase
                    .from('SUBSCRIBE_LIST')
                    .upsert([{
                            'id' : user.id,
                            'dependent-to' : user.email,
                            'subscribed' : subscribeList
                        }],
                    )
                console.log(error)
            }
            catch (e)
            {
                console.log(e)
            }
        }

    }  , [subscribeList.length , shouldRunSetSubscribe])


    const getSubscribed = useAsync(async () => {

        try {
            if (user)
            {
                console.log('get Subscribed again mounting')

                const {data , error} = await supabase
                    .from('SUBSCRIBE_LIST')
                    .select("subscribed , id").eq('id' , user?.id)

                //?SET NEW LIST OF SUBSCRIBED IN STATE
                setSubscribeList(data?.[0].subscribed.map(value => value))

                return data?.[0]

            }

        }
        catch (error)
        {
            console.log(error)
        }
    }  , [setSubscribed.loading, user])






    return (


        <Flex display={{base : 'none' , md : 'flex'}} direction={"column"} justify={'flex-start'} pr={2} gap={5} flex={1.5} h={'100vh'} position={"sticky"} top={0} overflowY={'scroll'}>



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
                    !getSubscribed?.value?.subscribed.length &&
                    <VStack justify={"center"} h={75} >
                        <Text textAlign={"center"} fontSize={"md"} w={"full"} >You don't have any Subscriptions</Text>
                        <Icon fontSize={"2xl"} as={RiUserFollowLine}/>
                    </VStack>
                }

                {
                    getSubscribed?.value?.subscribed.length &&
                    <>
                        <Text w={"full"}  fontSize={"lg"} fontWeight={'bold'}>Subscriptions</Text>
                        <Grid w={"full"} gap={2} templateColumns={'repeat(4 ,1fr)'}>
                            {
                                getSubscribed?.value?.subscribed.map(value => {

                                    return (
                                        <Tooltip key={value.id} bg={"black"} color={"whiteAlpha.800"} placement='bottom' label={value.name}>
                                        <Box w={45} h={45} onClick={() => router.push(`/artist/${value.id}`)} cursor={"pointer"} position={"relative"}>
                                            <Image style={{position : "absolute" , borderRadius : '50%'}} layout={"fill"} placeholder={"blur"} blurDataURL={value.images[0].url} src={value.images[0].url} />
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


                {randomArtist.value?.map(randomArtist => {
                        return (
                            <HStack key={randomArtist.id} w={"full"} pr={1} bg={'whiteAlpha.200'} cursor={'pointer'} fontSize={'sm'} roundedRight={'xl'} roundedLeft={'3xl'}>

                                <Image style={{borderRadius : '5rem 0rem 5rem 5rem' , flex : 1}} src={randomArtist?.images[0]?.url} boxSize={45} width={50} height={50} placeholder={'blur'} blurDataURL={randomArtist?.images[0]?.url}/>

                                <Box flex={1} spacing={0} justify={"flex-start"}>
                                    <Text w={79} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={"hidden"} fontSize={"xs"}>{randomArtist.name}</Text>
                                    <Text w={79} whiteSpace={'nowrap'} textOverflow={'ellipsis'} overflow={"hidden"} fontSize={"2xs"}>{randomArtist.genres[0]}</Text>
                                </Box>

                                <Button isLoading={getSubscribed.loading}
                                        onClick={() => handelSubscribe(randomArtist)}
                                        flex={.8}
                                        rounded={"full"}
                                        colorScheme={"telegram"}
                                        variant={!!_.find(getSubscribed?.value?.subscribed , {id : randomArtist.id}) ? 'solid' :'outline'} size={"xs"}>

                                    {!!_.find(getSubscribed?.value?.subscribed , {id : randomArtist.id}) ? 'Subscribed' : 'Subscribe'}

                                </Button>

                            </HStack>
                        )
                    }
                )}
            </VStack>

        </Flex>

    )
}
