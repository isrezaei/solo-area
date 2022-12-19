import useSWR from 'swr'
import {Box, Circle, Flex, Grid, Image, Text, VStack , Fade} from "@chakra-ui/react";
import {FETCH_RECENTLY_PLAYED_TRACK} from "../../../lib/FetcherFuncs/Fetch_Recently_Played_Track";


export const RecentlyPlayedList = () =>
{

    //?GET RECENTLY PLAYED LIST AS A FIRST CLINE SIDE RENDERING
    const { data, error } = useSWR('/api/get_recently_played_list' , async () => (await FETCH_RECENTLY_PLAYED_TRACK()))

    const RENDER = data?.slice(0 , 10).map(value => {

        return (
            <Flex key={value.id}
                  w={'full'}
                  justify={'space-between'}
                  align={'center'}
                  bg={'whiteAlpha.200'}
                  _hover={{bg : 'whiteAlpha.300' , transition : '.3s'}}
                  roundedLeft={50}
                  roundedRight={20}
                  cursor={'pointer'}
                  role={'group'}>

                <Image src={value?.album?.images?.[0].url}
                       boxSize={59}
                       position={'relative'}
                       filter={'auto'}
                       roundedLeft={5}
                       alt={value.name}/>

                <Flex flex={2}
                      mx={3}
                      direction={'column'}>
                    <Text w={150} color={'whiteAlpha'}  fontWeight={'bold'} whiteSpace={'nowrap'} overflow={'hidden'} textOverflow={'ellipsis'}>{value.name}</Text>
                    <Text fontSize={'xs'} color={'whiteAlpha.500'}>{value.artists[0].name}</Text>
                </Flex>


                <Circle size={10}
                        bg={'#8bc34a'}
                        mx={2}
                        opacity={'100%'}
                        pointerEvents={'none'}
                        _groupHover={{opacity : '100%' , pointerEvents : 'auto'}}>
                </Circle>

            </Flex>
        )

    })


    return (

        <Box w={"full"} h={'auto'}  my={4}>

            <Text fontSize={'2vw'} color={'whiteAlpha.800'} my={5}>Recently Played</Text>

            <Grid templateColumns='repeat(3, 1fr)' gap={6}>
                {RENDER}
            </Grid>

        </Box>
    )
}