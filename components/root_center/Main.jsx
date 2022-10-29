import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Divider,
    Center,
    Flex,
    Spacer,
    HStack,
    Avatar, Text, Image , Menu , MenuButton , MenuList , MenuItem , IconButton
} from "@chakra-ui/react";

import prettyMilliseconds from 'pretty-ms';
import {TriangleDownIcon} from "@chakra-ui/icons";
import {TbPlayerRecord , TbAdjustmentsHorizontal} from 'react-icons/tb'
import {IoSettingsSharp} from 'react-icons/io5'
import {IoMdArrowDropdown} from 'react-icons/io'
import {HiBellAlert} from 'react-icons/hi2'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {signOut, useSession} from "next-auth/react";
import {useEffect} from "react";
import {getToken} from "next-auth/jwt";
import {useRecoilState, useRecoilValue} from "recoil";
import {NEW_RELEASES_LIST, playListIdState, playListState} from "../../atoms/PlayListAtom";
import useSpotify from "../../hooks/useSpotify";
import {CURRENT_TRACK_ID_STATE, IS_PLAYING_SONG} from "../../atoms/SongAtom";
import {Player} from "./Player";


export const Main = () =>
{

    const {data : session , status } = useSession()



    const spotifyApi = useSpotify()


    const playListId = useRecoilValue(playListIdState)

    const [playList , setPlayList] = useRecoilState(playListState)

    const [newReleasesList , setNewReleasesList] = useRecoilState(NEW_RELEASES_LIST)


    const [currentTrackId , setCurrentTrackId] = useRecoilState(CURRENT_TRACK_ID_STATE)
    const [isPlayingState , setIsPlayingState] = useRecoilState(IS_PLAYING_SONG)


    useEffect(() => {

        if (status === 'authenticated')
        {
            spotifyApi.getNewReleases({ limit : 5, offset: 0 ,  country: 'US'}).then(data => setNewReleasesList(data.body)).catch(error => console.log("Something went wrong!", error))

            spotifyApi.getPlaylist(playListId).then(data => setPlayList(data.body)).catch(err => console.log(err + ' Error Fetching Data '))
        }

    } , [spotifyApi , playListId , status])



    return (

        <Box flexGrow={8} p={4}>
            <Flex>
                {/*SEARCH INPUT*/}
                <InputGroup flex={6} size={'lg'}>
                    <InputLeftElement
                        pointerEvents='none'
                        children={<TbPlayerRecord className={'text-3xl'} color={'#d7d7d7'}/>}
                    />

                    <Input
                        type={"search"}
                        placeholder={'Search...'}
                        rounded={'50vw'}
                        color={'#d7d7d7'}
                        bg={'#1c1c1c'}
                        borderColor={'#505050'}
                        fontSize={12}
                    />

                    <InputRightElement width={"auto"} mx={5}>

                        <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'}  >
                            Minimal
                        </Button>

                        <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'}  >
                            House
                        </Button>

                        <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'} >
                            Rack
                        </Button>

                        <Divider height={5} orientation={'vertical'} mx={2}/>

                        <Button leftIcon={<TbAdjustmentsHorizontal size={18}/>} h={'1.75rem'} size={'xs'} mx={1} rounded={12} variant={'link'} >
                            Filters
                        </Button>

                    </InputRightElement>
                </InputGroup>
                {/*SETTING CONTROL*/}

                <Flex flex={1}
                      justify={'center'}
                      align={'center'}
                      borderWidth={2}
                      borderColor={'whiteAlpha.400'}
                      rounded={50}
                      gap={5}
                      mx={8}>
                    <IoSettingsSharp color={'#fff'}/>
                    <HiBellAlert color={'#fff'}/>
                    <RiLogoutCircleRLine color={'#fff'} onClick={() => signOut()}/>
                </Flex>

                <Menu>
                    <MenuButton
                        bgColor={'#1c1c1c'}
                        color={'whiteAlpha.800'}
                        height={'auto'}
                        rounded={'3xl'}
                        pl={3}
                        as={IconButton}
                        rightIcon={<Avatar name={session?.user.name} src={session?.user.image}/>}
                        _hover={{ bg: 'transparent' }}
                        _expanded={{ bg: '#1c1c1c' }}
                        _focus={{ bg : '#1c1c1c' , boxShadow : 'none'}}>
                        <TriangleDownIcon w={3} h={3} mr={2} color={'whiteAlpha.600'} />
                        {session?.user.name}
                    </MenuButton>

                    <MenuList>
                        <MenuItem>Sign Out</MenuItem>
                    </MenuList>
                </Menu>
            </Flex>

            {/*MUSIC CARD*/}
            <Flex justify={'center'} align={'center'} gap={5} my={8} >

                {newReleasesList?.albums?.items.map(ALBUMS_DATA => {

                    const {images , name , artists} = ALBUMS_DATA
                    return (
                        <Image src={images[0].url} boxSize={'15vw'} rounded={50}/>
                    )
                })}

            </Flex>


            {/***MUSIC ALL***/}
            <Flex>

                <Player/>


                <Flex flex={3} direction={"column"} h={'30vw'} px={5}  overflowY={'scroll'} css={{'&::-webkit-scrollbar':{display: 'none'}}}>


                    {playList?.tracks?.items.map((MUSIC_DATA , INDEX) => {

                        const {track} = MUSIC_DATA
                        // console.log(track)

                        const playSong = async () =>
                        {
                            setCurrentTrackId(track.id)
                            setIsPlayingState(true)
                            spotifyApi.play({ uris : [track.id]}).then(() =>  console.log('Playback started') ).catch(error => console.log(error))
                        }

                        return (
                            <Flex onClick={playSong} key={MUSIC_DATA.id} mb={3} p={3} rounded={'1vw'} bgColor={'#1c1c1c'} justify={'space-between'} align={'center'} w={"full"} h={'5vw'}>

                                {/************/}

                                <Flex flex={1} justify={'space-around'} align={'center'}>
                                    <Text fontSize={"sm"}  color={'whiteAlpha.800'} w={'1vw'} >{INDEX + 1}</Text>
                                    <Image src={track.album.images[0]?.url} boxSize={'4vw'} rounded={'xl'}/>
                                    <Text  fontSize={'sm'} color={'whiteAlpha.800'} w={'10vw'} align={"center"} >{track.name}</Text>
                                </Flex>


                                {/************/}
                                <Text fontSize={'sm'} color={'whiteAlpha.800'} flex={.5}>
                                    <center>
                                        {track.artists[0].name}
                                    </center>
                                </Text>

                                {/************/}
                                <Text fontSize={'sm'} color={'whiteAlpha.800'} flex={.5}>
                                    <center>
                                        {prettyMilliseconds(track.duration_ms , {colonNotation: true , secondsDecimalDigits : 0 })}
                                    </center>
                                </Text>

                                {/************/}
                                <Box color={'whiteAlpha.800'} flex={.5}>
                                    <center>
                                        ----
                                    </center>
                                </Box>
                            </Flex>
                        )
                    })
                    }

                </Flex>


            </Flex>
        </Box>


    )
}