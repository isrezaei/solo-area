import {Search} from "./Header/Search";
import {Controller} from "./Header/Controller";
import {Account} from "./Header/Account";
import {NewReleasesAlbumsList} from "./New_Releases_Albums_List/NewReleasesAlbumsList";
import {RecentlyPlayedList} from "./Recently_Played_List/RecentlyPlayedList";
import {FeaturedPlayList} from "./Featured_playList/FeaturedPlayList";
import {Box, Flex} from "@chakra-ui/react";
import { Parallax } from 'react-parallax';

import dynamic from "next/dynamic";
const Animator = dynamic(
    import("react-scroll-motion").then((it) => it.Animator),
    { ssr: false }
);

import { ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";


export const Main = () =>
{

    const ZoomInScrollOut = batch(StickyIn(), FadeIn(), ZoomIn());

    return (
        <Box w={"full"}>
            {/*HEADER COMPONENTS*/}
            <Flex>
                <Search/>
                <Controller/>
                <Account/>
            </Flex>


            <ScrollContainer>
                <ScrollPage>
                    <Animator animation={batch(Fade(), MoveOut(0, -50) , ZoomOut())}>
                        {/*NEW RELEASES COMPONENTS*/}
                        <NewReleasesAlbumsList/>
                        {/*RECENTLY PLAYED LIST*/}
                        <RecentlyPlayedList/>
                    </Animator>
                </ScrollPage>

                <ScrollPage>
                        <Animator animation={batch(FadeIn() , MoveIn(50 , 0) )} >
                            <FeaturedPlayList/>
                        </Animator>
                </ScrollPage>


            </ScrollContainer>
        </Box>
    )
}