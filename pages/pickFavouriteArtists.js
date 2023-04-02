import {FETCH_SEVERAL_ARTIST} from "../lib/FetcherFuncs/FETCH_SEVERAL_ARTIST";
import {PickFavouriteArtists} from "../components/PickFavouriteArtists";

export default function pickFavouriteArtists ({getSeveralArtist : {artists}})
{
    return <PickFavouriteArtists getSeveralArtist={artists}/>
}


export const getStaticProps = async () =>
{
    const getSeveralArtist = await FETCH_SEVERAL_ARTIST()


    return {
        props : {
            getSeveralArtist
        }
    }
}