import {Search} from "./Header/Search";
import {Controller} from "./Header/Controller";
import {Account} from "./Header/Account";
import {NewReleasesAlbumsList} from "./New_Releases_Albums_List/NewReleasesAlbumsList";
import {RecentlyPlayedList} from "./Recently_Played_List/RecentlyPlayedList";
import {FeaturedPlayList} from "./Featured_playList/FeaturedPlayList";
import {Box, Flex, Text} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";

const Animator = dynamic(
    import("react-scroll-motion").then((it) => it.Animator),
    { ssr: true }
);

import {ScrollContainer , ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut , Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";


export const Main = () =>
{

    return (
        <Box py={5} position={"relative"}>

            {/*HEADER COMPONENTS*/}

            <Flex w={"full"} px={5} position={'absolute'} zIndex={1000}>
                <Search/>
                <Controller/>
                <Account/>
            </Flex>


            <ScrollContainer>

                <ScrollPage>
                    <Animator animation={batch(Move() , MoveOut(300 , 0) )}>
                        <Flex  direction={'column'} justify={"center"} align={'start'}  h={'100vh'}>
                            {/*NEW RELEASES COMPONENTS*/}
                            <NewReleasesAlbumsList/>
                            {/*RECENTLY PLAYED LIST*/}
                            <RecentlyPlayedList/>
                        </Flex>
                    </Animator>
                </ScrollPage>


                <ScrollPage>
                    <Animator  animation={batch(FadeIn() , MoveIn(-300 , 0) )}>
                        <FeaturedPlayList/>
                    </Animator>
                </ScrollPage>


            </ScrollContainer>



        </Box>
    )
}