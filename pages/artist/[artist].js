import {FETCH_ARTIST} from "../../lib/FetcherFuncs/FETCH_ARTIST";
import {ArtistCOMP} from "../../components/pages/artist/ArtistCOMP";

export default function artist({GET_ARTIST_INFO})
{
    return <ArtistCOMP ARTIST={GET_ARTIST_INFO}/>
}


export const getServerSideProps = async ({params : {artist : artistID}}) =>
{
    const GET_ARTIST_INFO = await FETCH_ARTIST(artistID)

    return {
        props : {
                GET_ARTIST_INFO
        }
    }
}