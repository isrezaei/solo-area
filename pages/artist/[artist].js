import {FETCH_ARTIST} from "../../lib/FetcherFuncs/FETCH_ARTIST";
import {ArtistCOMP} from "../../components/pages/artist/ArtistCOMP";


export default function artist()
{
    return <ArtistCOMP/>
}


export const getServerSideProps = async ({params : {artist : artistID}}) =>
{

    const GET_ARTIST_INFO = await FETCH_ARTIST(artistID)



    return {
        props : {
            fallback : {
                'GET ARTIST INFORMATION' : GET_ARTIST_INFO
            }
        }
    }
}