
import {ArtistInfo} from "../../components/pages/artist/ArtistInfo";
import {getArtistInformation} from "../../graphQl/query/getArtistInformation";
import {unstable_serialize} from "swr";
import {SWRConfig} from "swr";
import {Sidebar} from "../../components/Sidebar";
import {HStack} from "@chakra-ui/react";



export default function artist({GET_ARTIST_INFO , fallback})
{
    return (
        <SWRConfig value={{fallback}}>
            <HStack w={"full"} h={'100vh'}>
                <Sidebar/>
                <ArtistInfo ARTIST={GET_ARTIST_INFO}/>
            </HStack>

        </SWRConfig>
    )
}


export const getServerSideProps = async ({params : {artist : artistId}}) =>
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