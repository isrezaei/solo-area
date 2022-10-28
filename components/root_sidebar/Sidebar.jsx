import {Box, Flex, HStack, Spacer, Text} from "@chakra-ui/react";
import {RiHome6Line, RiMusicFill} from "react-icons/ri";
import {BsMusicPlayerFill} from "react-icons/bs";
import {MdOutlineQueueMusic} from "react-icons/md";
import useSpotify from "../../hooks/useSpotify";
import {useSession} from "next-auth/react";
import {useRecoilState} from "recoil";
import {playListIdState , NEW_RELEASES_LIST} from "../../atoms/PlayListAtom";
import {useEffect , useState} from "react";


export const Sidebar = () =>
{

    const spotifyApi = useSpotify()

    const { data: session  , status} = useSession()

    const [playList , setPlayList] = useState([])

    const [playListId , setPlayListId] = useRecoilState(playListIdState)





    useEffect(()=>{

        if (spotifyApi.getAccessToken())
        {
            spotifyApi.getUserPlaylists().then(data => setPlayList(data.body.items))
        }
    } , [session , spotifyApi])



    return (
        <Box flexGrow={1}  h={'100vh'} p={4}>
            <Text  color={'whiteAlpha.900'} my={3}>Browser Music</Text>
            <Flex direction={'column'}>
                <HStack spacing='.8vw' my={'1rem'}>
                    <RiHome6Line color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Home</Text>
                </HStack>
                <HStack spacing='.8vw' my={'1rem'}>
                    <BsMusicPlayerFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Albums</Text>
                </HStack>
                <HStack spacing='.8vw' my={'1rem'}>
                    <MdOutlineQueueMusic color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Tracks</Text>
                </HStack>
                <HStack spacing='.8vw' my={'1rem'}>
                    <RiMusicFill color={'#989898'}/>
                    <Text fontSize='sm' color={'whiteAlpha.700'}>Genres</Text>
                </HStack>
                <Spacer/>
                {playList.map(data => <Text onClick={() => setPlayListId(data.id)} cursor={'pointer'} id={data.id} fontSize='sm' color={'whiteAlpha.600'} my={2}>{data.name}</Text>)}
            </Flex>
        </Box>
    )
}
