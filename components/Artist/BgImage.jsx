import Image from "next/image";
import {useRouter} from "next/router";
import useSWR from "swr";
import {getArtistInformation} from "../../graphQl/query/api/getArtistInformation";

const BgImage = () => {

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


    return (
        <Image
            layout={"fill"}
            objectFit={"cover"}
            src={getArtistInfo?.images[0]?.url}
            style={{zIndex: -1, opacity: "20%" }}
            placeholder={"blur"}
            blurDataURL={getArtistInfo?.images[2]?.url}
        />
    );
};

export default BgImage;