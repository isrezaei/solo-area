import {Sidebar} from "./Sidebar";
import {Flex, Box, Container, Button, Img} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {selectGenre} from "../atoms/atoms";
import Image from "next/image";
import {useEffect, useState} from "react";
import _ from 'lodash'
import { motion } from "framer-motion";

const genreWall = {

    pop: {image : '/windows.jpeg' , variant : 'pop'},
    soul: {image : '/relax.jpg' , variant : 'soul'},
    chill: {image : '/chill.jpg' , variant : 'chill'},
    techno: {image : '/energy.jpg' , variant : 'techno'},
    'work-out': {image : '/work-out.jpg' , variant :'work-out'}

    }


    export default function Layout({ children }) {

        const router = useRouter();

        const { pathname } = router;

        const getGenre = useRecoilValue(selectGenre)

        return (

            <Container maxW={'1990px'}>



                <Flex zIndex={2} position={"relative"}>


                    {
                        pathname === '/' &&
                        <Box w={"full"} h={400} position={"absolute"} zIndex={1}
                             _after={{
                                 content: `""`,
                                 position: "absolute",
                                 bottom: 0,
                                 left: 0,
                                 width: "100%",
                                 height: "30%",
                                 zIndex : 2,
                                 backgroundImage:
                                     "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))"
                             }}>

                                        <Box w={"full"} h={400} zIndex={1} opacity={'30%'}>

                                            <motion.div key={genreWall[getGenre]?.image} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{duration : .5}}>
                                                    <Image
                                                        objectFit="cover"
                                                        layout={"fill"}
                                                        placeholder={'blur'}
                                                        src={genreWall[getGenre]?.image}
                                                        priority={true}
                                                        blurDataURL={genreWall[getGenre]?.image}/>

                                                </motion.div>




                                        </Box>

                        </Box>
                    }

                    <Flex w={"full"} zIndex={2}>
                        {pathname === '/' && <Sidebar/>}
                        {/*{pathname === '/' && <PlayBack/>}*/}
                        <Box flex={10} >
                            {children}
                        </Box>
                    </Flex>

                </Flex>
            </Container>
        )
    }