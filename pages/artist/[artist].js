
import {Main} from "../../components/Artist/main";
import {getArtistInformation} from "../../graphQl/query/api/getArtistInformation";
import {unstable_serialize} from "swr";
import {SWRConfig} from "swr";
import {Sidebar} from "../../components/Sidebar";
import {Divider, HStack} from "@chakra-ui/react";


export default function artist({fallback})
{


    return (
        <SWRConfig value={{fallback}}>
            <HStack spacing={0} w={"full"} h={'100vh'} position={"relative"}>
                <Sidebar/>
                <Divider h={'80%'} borderColor="whiteAlpha.500" borderWidth={1} rounded={"full"} orientation={'vertical'}/>
                <Main/>
            </HStack>

        </SWRConfig>
    )
}


export const getServerSideProps = async ({res , params : {artist : artistId}}) =>
{
    const GET_ARTIST_INFO = await getArtistInformation(artistId)


    return {
        props : {
            fallback : {
                [unstable_serialize(['api' , 'GET_ARTISTS_INFO' , artistId])] : GET_ARTIST_INFO,
            },
        }
    }
}