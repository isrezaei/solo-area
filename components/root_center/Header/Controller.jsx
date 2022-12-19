import {Flex, useColorMode, useColorModeValue} from "@chakra-ui/react";
import {IoSettingsSharp} from "react-icons/io5";
import {RiLogoutCircleRLine} from "react-icons/ri";
import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const Controller = () =>
{

    const { colorMode, toggleColorMode } = useColorMode()

    const bg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
    const color = useColorModeValue('whiteAlpha.800' , 'blackAlpha.800')
    const border = useColorModeValue('blackAlpha.300' , 'whiteAlpha.300')



    return (
        <Flex flex={1}
              justify={'center'}
              align={'center'}
              bg={bg}
              rounded={50}
              gap={5}
              mx={8}>

            <IoSettingsSharp color={'whiteAlpha.800'}/>

            <RiLogoutCircleRLine color={'whiteAlpha.800'}/>

            <DarkModeSwitch
                moonColor={'#fff'}
                sunColor={'#ffb74d'}
                checked={colorMode === 'dark'}
                onChange={toggleColorMode}
                size={18}
            />

        </Flex>
    )
}