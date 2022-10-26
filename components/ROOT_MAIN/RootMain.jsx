import {
    Box,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    Button,
    Divider,
    Center,
    Flex,
    Spacer,
    HStack,
    Avatar
} from "@chakra-ui/react";
import {TriangleDownIcon} from "@chakra-ui/icons";
import {TbPlayerRecord , TbAdjustmentsHorizontal} from 'react-icons/tb'
import {IoSettingsSharp} from 'react-icons/io5'
import {IoMdArrowDropdown} from 'react-icons/io'
import {HiBellAlert} from 'react-icons/hi2'
import {RiLogoutCircleRLine} from 'react-icons/ri'
import {signOut} from "next-auth/react";
import spotifyApi from "../../lib/SpotifyWebApi";
import {useEffect} from "react";
import {getToken} from "next-auth/jwt";

export const RootMain = () =>
{

    return (

        <Box>


        <Flex>

            {/*SEARCH INPUT*/}
           <InputGroup flex={6} size={'lg'}>
               <InputLeftElement
               pointerEvents='none'
               children={<TbPlayerRecord className={'text-3xl'} color={'#d7d7d7'}/>}
               />

               <Input
                   type={"search"}
                   placeholder={'Search...'}
                   rounded={'50vw'}
                   color={'#d7d7d7'}
                   bg={'#1c1c1c'}
                   borderColor={'#505050'}
                   fontSize={12}
               />

               <InputRightElement width={"auto"} mx={5}>

                   <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'}  >
                       Minimal
                   </Button>

                   <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'}  >
                       House
                   </Button>

                   <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'} >
                       Rack
                   </Button>

                   <Divider height={5} orientation={'vertical'} mx={2}/>

                   <Button leftIcon={<TbAdjustmentsHorizontal size={18}/>} h={'1.75rem'} size={'xs'} mx={1} rounded={12} variant={'link'} >
                       Filters
                   </Button>

               </InputRightElement>
           </InputGroup>


            {/*SETTING CONTROL*/}
            <Flex flex={1}
                  justify={'center'}
                  align={'center'}
                  borderWidth={2}
                  borderColor={'whiteAlpha.400'}
                  rounded={50}
                  gap={5}
                  mx={8}>
                <IoSettingsSharp color={'#fff'}/>
                <HiBellAlert color={'#fff'}/>
                <RiLogoutCircleRLine color={'#fff'} onClick={() => signOut()}/>
            </Flex>


            {/*AVATAR AND USER CONTROL*/}
            <Flex flex={.7} justify={'space-between'} align={'center'} bg={'rgba(72,72,72,0.7)'} rounded={'full'}>
                <TriangleDownIcon w={4} h={4} ml={15} color={'whiteAlpha.600'} />
                <Avatar name={'mohammad hossein'} src=''/>
            </Flex>


        </Flex>


            {/*MUSIC CARD*/}
            <Flex justify={'center'} align={'center'} gap={5} my={8} >
                <Box w={'15vw'} h={'20vw'} bg={'orange.200'} rounded={50}></Box>
                <Box w={'15vw'} h={'20vw'} bg={'red.200'} rounded={50}></Box>
                <Box w={'15vw'} h={'20vw'} bg={'gainsboro'} rounded={50}></Box>
                <Box w={'15vw'} h={'20vw'} bg={'aqua'} rounded={50}></Box>
                <Box w={'15vw'} h={'20vw'} bg={'linkedin.800'} rounded={50}></Box>
            </Flex>


        </Box>


    )
}