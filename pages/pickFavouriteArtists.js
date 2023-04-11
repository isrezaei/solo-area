import {PickFavouriteArtists} from "../components/PickFavouriteArtists";
import {getSeveralArtistsForPickup} from "../graphQl/query/api/getSeveralArtistsForPickup";
import {SWRConfig} from "swr";
import {Box, Text} from "@chakra-ui/react";
import Image from "next/image";

export default function pickFavouriteArtists({fallback}) {
    return (
        <Box maxW={"md"} m={"auto"} h={"100vh"}   position={"relative"}>
            <Image layout={"fill"}
                   objectFit={"cover"}
                   priority placeholder={"blur"}
                   blurDataURL={'/pickupBgLowQ.jpg'}
                   src={"/pickupBg.jpg"}
                   style={{opacity: "30%"}}/>

            <SWRConfig value={{fallback}}>
                <PickFavouriteArtists/>
                {/*<Text w={"full"} mt={5} bg={"red"}>HELLO</Text>*/}
            </SWRConfig>
        </Box>

    )
}

export const getStaticProps = async () => {

    const GET_SEVERAL_ARTISTS_FOR_PICKUP = await getSeveralArtistsForPickup()

    return {
        props: {
            fallback: {
                "GET_SEVERAL_ARTISTS_FOR_PICKUP": GET_SEVERAL_ARTISTS_FOR_PICKUP
            }
        }
    }

}