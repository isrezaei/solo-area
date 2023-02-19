import {Box, Center, Container, Grid, Image, AbsoluteCenter, Text, VStack, Button} from "@chakra-ui/react";
import {useState} from "react";
import _ from 'lodash';
import {useSupabaseClient , useUser} from "@supabase/auth-helpers-react";

export const PickFavouriteArtists = ({getSeveralArtist}) =>
{
    const user = useUser()
    const supabase = useSupabaseClient()

    const [selectFavourite , setFavourite] = useState([])



    const handelSelect = (ARTIST_INFO) =>
    {

        setFavourite(prevState => {

            //? CHECK AND IF ARTIST EXIST , DO REMOVE THAT
            if (!! _.find( selectFavourite   , {id : ARTIST_INFO.id})) return  _.reject(prevState , {id : ARTIST_INFO.id})
            //?ADD UNIQ ARTIST IN LIST
            return  _.uniq([...prevState , ARTIST_INFO])

        } )
    }


    console.log(user)


    const confirm =  async () =>
    {
        const { data , error } = await supabase
            .from('FAVOURITE_ARTISTS')
            .upsert([{
                'dependent-to' : user.email,
                'id' : user.id,
                'favourite_artists' : selectFavourite
            }])

        console.log(error)

    }



    return (
        <VStack maxW={'sm'} h={'100Vh'} p={3} gap={5} m={"auto"} bg={'whiteAlpha.200'}>

            <Text fontSize={"md"} fontWeight={"bold"}>Choose more artists you like </Text>

            <Grid templateColumns={'repeat(3, 1fr)'} justifyContent="center" alignItems="center"  gap={5}>

                {
                    getSeveralArtist?.map(ARTIST => {

                        return (
                            <Center w={"full"} key={ARTIST.id}>
                                <VStack opacity={!! _.find( selectFavourite   , {id : ARTIST.id})? '30%' : '100%'} transition={'.5s'}>
                                    <Image  boxSize={79} rounded={"full"}  src={ARTIST.images[0].url} onClick={() => handelSelect(ARTIST)}/>
                                    <Text fontSize={"xs"}>{ARTIST.name}</Text>
                                </VStack>

                            </Center>
                        )

                    })
                }

            </Grid>


            <Button variant={'solid'} onClick={confirm} colorScheme={"pink"}>Confirm</Button>
        </VStack>
    )
}