import {Box, Button, Flex, Grid, HStack, Text, VStack} from "@chakra-ui/react";
import {useUser , useSupabaseClient} from "@supabase/auth-helpers-react";
import {useAsync} from "react-use";
import Image from "next/image";
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import {useEffect, useRef, useState} from "react";
import {FETCH_ARTIST} from "../lib/FetcherFuncs/FETCH_ARTIST";
import useSWR from "swr";
import _ from 'lodash'


export const FavouriteArtists = () =>
{


    const user = useUser()
    const supabase = useSupabaseClient()

    const [artistID, setArtistID] = useState(null)

    const {data : {top_track} = {} , isValidating} = useSWR(artistID ? ['GET ARTIST DATA' , artistID]  : null , async (key , value) => FETCH_ARTIST(value) , {refreshInterval : null})

    // console.log(top_track)


    const state = useAsync( async () => {
        if (user)
        {
            let { data: USERS, error } = await supabase
                .from('USERS')
                .select(`id , username , FAVOURITE_ARTISTS(*) `).eq('id' , user.id)

            return USERS
        }

    } , [user])

    const handelSelect = (artisId) =>
    {
        setArtistID(artisId)

        console.log(artisId)
        console.log(top_track)
    }




    return (
        <HStack w={"full"} h={"auto"} justify={"center"} >



            {
                state?.value?.[0]?.FAVOURITE_ARTISTS ?

                    <VStack>

                        <HStack>
                            <VStack justify={"center"} align={"center"} px={3} h={180} bg={"purple.900"} flex={.5} rounded={"xl"} >
                                <Text  fontSize={28} fontWeight={"bold"}>Top 10 your favourite's artist</Text>
                            </VStack>

                            <HStack flex={5}>
                                <ScrollContainer style={{width : '100%' , display : "flex" , justifyContent : 'flex-start' , alignItems : 'flex-start' , cursor : 'pointer'}}  >
                                    {
                                        state.value?.[0].FAVOURITE_ARTISTS?.favourite_artists.map(value => {
                                                return (
                                                    <Box flex={'none'} p={2} key={value.id} >
                                                        <Image style={
                                                            {
                                                                borderRadius : '100%' ,
                                                                transition : '.1s' ,
                                                                opacity : value.id === artistID ? '50%' : '100%',
                                                                transform : value.id === artistID ? 'scale(.95)' : 'scale(1)'
                                                            }
                                                        }
                                                               width={200} height={200}
                                                               onClick={()=> handelSelect(value.id)}
                                                               placeholder={'blur'}
                                                               blurDataURL={value.images[0].url}
                                                               src={value.images[0].url}/>
                                                    </Box >
                                                )
                                            }
                                        )
                                    }
                                </ScrollContainer>
                            </HStack>
                        </HStack>

                        <VStack w={"full"} py={8} >

                            {isValidating && <Text>Loading ...</Text>}
                            {
                                !isValidating &&
                                <Grid gap={5} templateColumns={'repeat(5 , 1fr)'}>
                                    {
                                        top_track?.map(({id , name , previewUrl , duration_ms , artists , album : {images}} )=> {

                                            return (
                                                <HStack>
                                                    <Image style={{borderRadius : '1rem'}} src={images[0].url} width={160} height={160}/>
                                                </HStack>
                                            )
                                        })
                                    }
                                </Grid>
                            }

                        </VStack>

                    </VStack>
                    :
                    <>
                        <Image width={660} height={200} src={'/popularArtist.png'} placeholder={"blur"} blurDataURL={'/popularArtist.png'} />
                        <VStack align={"start"} spacing={0}>
                            <Text>Tell us which artists you like</Text>
                            <Text>We'll create an experience just for you</Text>
                            <Button>Lets go</Button>
                        </VStack>
                    </>

            }

        </HStack>
    )
}