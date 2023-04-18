import {Grid, Stack, Flex} from "@chakra-ui/react";
import {useEffect, useState} from "react";
import {getFavouriteArtists} from "../../graphQl/query/database/getFavouriteArtists";
import {getArtistInformation} from "../../graphQl/query/api/getArtistInformation";
import {motion} from "framer-motion";
import {ScrollContainer} from "react-indiana-drag-scroll";
import useSWR from "swr";
import TopTenArtists from "./TopTenArtists";
import TopTenMusic from "./TopTenMusic";
import Title from "./Title";
import Loading from "./Loading";
import 'react-indiana-drag-scroll/dist/style.css'

export const FavouriteArtists = ({user}) => {

    const [artistID, setArtistID] = useState(null);

    // const {data: {GET_FAVOURITE_ARTISTS: favouriteArtists}} = useSWR(["api", "GET_FAVORITE_ARTISTS", user?.id], () => getFavouriteArtists(user?.id));

    const {data: {GET_FAVOURITE_ARTISTS: favouriteArtists} = {}} = useSWR(["GET_FAVORITE_ARTISTS", user?.id], () => getFavouriteArtists(user?.id));


    const {data: {getArtistTopTracks} = {}} = useSWR(artistID ? ["GET_ARTIST_DATA", artistID] : null,
        async (key, artistID) => getArtistInformation(artistID),
        {refreshInterval: null});


    useEffect(() => {
        setArtistID(favouriteArtists?.[0].list[0].id);
    }, [favouriteArtists]);


    const handelSelect = (artisId) => {
        setArtistID(artisId);
    };

    let RenderTopTen;

    if (!getArtistTopTracks) {
        RenderTopTen = <Loading/>
    }

    if (getArtistTopTracks) {
        RenderTopTen = getArtistTopTracks?.tracks?.map(trackInfo => <TopTenMusic key={trackInfo.id} trackInfo={trackInfo}/>)
    }

    return (

        <Stack w={"full"} h={{sm: 360, md: 650 , lg : 690 , "2xl" : "450" , "3xl" : 460}} >

            <Title/>

            {/*top 10 artists list*/}
            <Stack w={"full"} h={{sm: 175, md: 190 , "3xl" : 220}} position={"relative"}>
                <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                    <ScrollContainer style={{display: "flex"}}>
                        {favouriteArtists?.[0]?.list?.map(artist => (
                            <TopTenArtists key={artist.id} artist={artist} artistID={artistID} handelSelect={handelSelect}/>
                        ))}
                    </ScrollContainer>
                </Flex>
            </Stack>


            {/*mobile render*/}
            <Stack display={{sm: "flex", md: "none"}} w={"full"} h={{sm: 130, md: 190}} position={"relative"}>
                <Flex w={"full"} position={"absolute"} overflow={"hidden"}>
                    <ScrollContainer style={{display: "flex"}}>
                        {RenderTopTen}
                    </ScrollContainer>
                </Flex>
            </Stack>


            {/*screen render*/}
            <motion.div
                key={[artistID]}
                initial={{opacity: 0}}
                animate={{opacity: 1}}
                transition={{duration: 0.5}}>
                <Grid display={{sm: "none", md: "grid"}} gap={2}
                      templateColumns={{sm: "repeat(2, 1fr)", md: "repeat(2, 1fr)" , lg : "repeat(2, 1fr)" ,  xl : "repeat(5, 1fr)"}}>
                    {RenderTopTen}
                </Grid>
            </motion.div>
        </Stack>
    );
};
