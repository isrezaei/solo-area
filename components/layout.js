import {Flex, Box, Container, Button, Img} from "@chakra-ui/react";
import {useRouter} from "next/router";
import {useRecoilValue} from "recoil";
import {selectGenre} from "../atoms/atoms";
import Image from "next/image";
import {useEffect, useState} from "react";
import _ from 'lodash'
import {motion} from "framer-motion";

const genreWall = {

    pop: {
        image: 'https://user-images.githubusercontent.com/77073972/223062444-5e821892-43be-4774-8421-6828cb6d215c.jpg',
        variant: 'pop'
    },
    soul: {
        image: 'https://user-images.githubusercontent.com/77073972/223062438-e50501ba-511b-4f55-9eea-bc3e1b25f30c.jpg',
        variant: 'soul'
    },
    chill: {
        image: 'https://user-images.githubusercontent.com/77073972/223062438-e50501ba-511b-4f55-9eea-bc3e1b25f30c.jpg',
        variant: 'chill'
    },
    techno: {
        image: 'https://user-images.githubusercontent.com/77073972/223062457-e4ce6b6f-d98e-471d-aa95-175a300f9670.jpg',
        variant: 'techno'
    },
    'work-out': {
        image: 'https://user-images.githubusercontent.com/77073972/223062449-17066c7b-cf15-4bc0-8243-e77032162607.jpg',
        variant: 'work-out'
    }

}


export default function Layout({children}) {

    const router = useRouter();

    const {pathname} = router;

    const getGenre = useRecoilValue(selectGenre)

    return (

        <Container maxW={'1950px'}>
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
                             zIndex: 2,
                             backgroundImage:
                                 "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))"
                         }}>

                        <Box w={{base : "full"}} h={400} zIndex={1} opacity={'30%'}>

                            <motion.div key={genreWall[getGenre]?.image} initial={{opacity: 0}} animate={{opacity: 1}}
                                        transition={{duration: .5}}>
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
                    <Box flex={10}>
                        {children}
                    </Box>
                </Flex>

            </Flex>

        </Container>
    )
}