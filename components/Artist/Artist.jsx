import {Box} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import useSWR from "swr";
import {getArtistInformation} from "../../graphQl/query/api/getArtistInformation";
import Header from "./Header";
import Popular from "./Popular";
import MoreAlbums from "./MoreAlbums";
import Fans from "./Fans";
import ShowAll from "./ShowAll";

export const Artist = () => {
    const {
        query: {artist: artistId},
    } = useRouter();

    const {
        data: {
            getArtistInfo,
            getAlbumsOfArtist,
            getArtistTopTracks,
            getRelatedArtist,
        },
    } = useSWR(
        ["api", "GET_ARTISTS_INFO", artistId],
        async (key, id, artistId) => await getArtistInformation(artistId)
    );

    const [open, setOpen] = useState(false);

    return (
        <Box>

            <Header getArtistInfo={getArtistInfo}/>

            <Popular getArtistTopTracks={getArtistTopTracks}/>

            <MoreAlbums
                getArtistInfo={getArtistInfo}
                getAlbumsOfArtist={getAlbumsOfArtist}
                setOpen={setOpen}
            />

            <Fans getRelatedArtist={getRelatedArtist}/>


            {/** modal for show all albums for artist **/}
            <ShowAll
                getAlbumsOfArtist={getAlbumsOfArtist}
                getArtistInfo={getArtistInfo}
                open={open}
                setOpen={setOpen}
            />
        </Box>
    );
};
