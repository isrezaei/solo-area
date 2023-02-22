import {Box, Button, Flex, HStack, Text, VStack} from "@chakra-ui/react";
import {useUser , useSupabaseClient} from "@supabase/auth-helpers-react";
import {useAsync} from "react-use";
import Image from "next/image";
import ScrollContainer from 'react-indiana-drag-scroll'
import 'react-indiana-drag-scroll/dist/style.css'
import {useEffect, useRef} from "react";


export const FavouriteArtists = () =>
{

    const user = useUser()
    const supabase = useSupabaseClient()

    const state = useAsync( async () => {
        if (user)
        {
            let { data: USERS, error } = await supabase
                .from('USERS')
                .select(`id , username , FAVOURITE_ARTISTS(*) `).eq('id' , user.id)

            return USERS
        }

    } , [user])

    return (
        <HStack w={"full"} h={250} justify={"center"} >



            {
                state?.value?.[0]?.FAVOURITE_ARTISTS ?

                    <HStack>

                        <VStack justify={"center"} align={"center"} px={3} h={180} bgGradient='linear(to-r, purple.900, black )' flex={.8} >
                            <Text  fontSize={28} fontWeight={"bold"}>Your favourite's artist</Text>
                        </VStack>

                        <HStack flex={5}>
                            <ScrollContainer style={{width : '100%' , display : "flex" , justifyContent : 'flex-start' , alignItems : 'flex-start'}}  >
                                {
                                    state.value?.[0].FAVOURITE_ARTISTS?.favourite_artists.map(value => {
                                            return (
                                                <Box flex={'none'} p={2} key={value.id}>
                                                    <Image style={{borderRadius : '100%'}} width={200} height={200} src={value.images[0].url} />
                                                </Box >
                                            )
                                        }
                                    )
                                }
                            </ScrollContainer>
                        </HStack>

                    </HStack>
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