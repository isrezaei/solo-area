import {Search} from "./Header/Search";
import {Controller} from "./Header/Controller";
import {Account} from "./Header/Account";
import {NewReleasesAlbumsList} from "./New_Releases_Albums_List/NewReleasesAlbumsList";
import {RecentlyPlayedList} from "./Recently_Played_List/RecentlyPlayedList";
import {FeaturedPlayList} from "./Featured_playList/FeaturedPlayList";
import {Box, Flex, Text} from "@chakra-ui/react";
import dynamic from "next/dynamic";
import {useRouter} from "next/router";
import {useRecoilValue, useSetRecoilState} from "recoil";
import {RANDOM_COLOR} from "../../atoms/atoms";
import _ from "lodash";
import {useEffect, useMemo, useState} from "react";
import {SearchBarModal} from "./SearchBarModal";
import randomColor from 'randomcolor'
import {useInterval} from "react-use";

export const Main = () =>
{


    const color = randomColor({
        count: 10,
        hue: 'green'
    });

    const [count , setCount] = useState(0)

    useInterval(() => setCount(prevState => prevState === 9 ? 0 : prevState + 1) ,3000);


    return (
        <Box position={"relative"}>

            <Box  bgGradient={'linear(to-b, whatsapp.800 , blackAlpha.500)'} w={"full"} h={380} position={'absolute'} ></Box>


            {/*HEADER COMPONENTS*/}

            <Flex  w={"full"} p={5} >
                <SearchBarModal/>
                <Search/>
                <Controller/>
                <Account/>
            </Flex>




            <Flex  direction={'column'} justify={"start"} align={'start'}  >
                {/*NEW RELEASES COMPONENTS*/}
                <NewReleasesAlbumsList/>
                {/*RECENTLY PLAYED LIST*/}
                <RecentlyPlayedList/>
            </Flex>

            <FeaturedPlayList/>




        </Box>
    )
}