import {Box, Center, Container, Grid, Image, AbsoluteCenter, Text, VStack, Button} from "@chakra-ui/react";
import {useState} from "react";
import _ from 'lodash';
import {useSupabaseClient , useUser} from "@supabase/auth-helpers-react";
import Tilt from "react-parallax-tilt";
import {useToast} from "@chakra-ui/react";
import {useRouter} from "next/router";

export const PickFavouriteArtists = ({getSeveralArtist}) =>
{
    const user = useUser()
    const supabase = useSupabaseClient()
    const toast = useToast()
    const router = useRouter()

    const [selectFavourite , setFavourite] = useState([])
    const [loading , setLoading] = useState(false)

    console.log(selectFavourite)

    const handelSelect = (ARTIST_INFO) =>
    {
        setFavourite(prevState => {
            //? CHECK AND IF ARTIST EXIST , DO REMOVE THAT
            if (!! _.find( selectFavourite   , {id : ARTIST_INFO.id})) return  _.reject(prevState , {id : ARTIST_INFO.id})
            //?ADD UNIQ ARTIST IN LIST
            return  _.uniq([...prevState , ARTIST_INFO])
        } )
    }


    const confirm =  async () =>
    {
        if (selectFavourite.length >= 5)
        {
            try {
                setLoading(true)

                const { data , error } = await supabase
                    .from('FAVOURITE_ARTISTS')
                    .upsert([{
                        'dependent-to' : user.email,
                        'id' : user.id,
                        'favourite_artists' : selectFavourite
                    }])

                toast({
                    title: 'nice ! ',
                    description: "We've created your favourite artists for you.",
                    status: 'success',
                    duration: 1500,
                    isClosable: true,
                })

            }catch (error)
            {
                console.log(error)
            }
            finally {
                router.push('/')
                setLoading(false)
            }
        }


        if (selectFavourite.length < 5)
        {
            toast({
                title: 'Oops ! ',
                description: "You need pick up minimum 5 artists",
                status: 'warning',
                duration: 1500,
                isClosable: true,
            })
        }


    }



    return (
        <VStack maxW={'sm'} h={'100Vh'} p={3} gap={5} m={"auto"} >

            <Text fontSize={"md"} fontWeight={"bold"}>Choose more artists you like </Text>

            <Grid templateColumns={'repeat(3, 1fr)'} justifyContent="center" alignItems="center"  gap={5}>

                {
                    getSeveralArtist?.map(ARTIST => {

                        return (
                            <Center w={"full"} key={ARTIST.id}>
                                <VStack cursor={'pointer'} opacity={!! _.find( selectFavourite   , {id : ARTIST.id})? '30%' : '100%'} transition={'.5s'}>
                                    <Tilt scale={1.2} transitionSpeed={1000}>
                                        <Image  boxSize={90} rounded={"full"}  src={ARTIST.images[0].url} onClick={() => handelSelect(ARTIST)}/>
                                    </Tilt>
                                    <Text fontSize={"xs"}>{ARTIST.name}</Text>
                                </VStack>

                            </Center>
                        )

                    })
                }

            </Grid>


            <Button
                onClick={confirm}
                isLoading={loading}
                size={"sm"}
                loadingText='Submitting'
                colorScheme='pink'>
                confirm and next
            </Button>

        </VStack>
    )
}