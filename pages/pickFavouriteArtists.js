import {PickFavouriteArtists} from "../components/PickFavouriteArtists";
import {getSeveralArtistsForPickup} from "../graphQl/query/api/getSeveralArtistsForPickup";
import {SWRConfig} from "swr";

export default function pickFavouriteArtists ({fallback})
{
    return (
        <SWRConfig value={{fallback}}>
            <PickFavouriteArtists/>
        </SWRConfig>
    )
}

export const getStaticProps = async () => {

    const GET_SEVERAL_ARTISTS_FOR_PICKUP = await getSeveralArtistsForPickup()

    return {
        props : {
            fallback : {
                "GET_SEVERAL_ARTISTS_FOR_PICKUP" : GET_SEVERAL_ARTISTS_FOR_PICKUP
            }
        }
    }

}