import {Flex, useColorMode, useColorModeValue} from "@chakra-ui/react";

import { DarkModeSwitch } from 'react-toggle-dark-mode';

export const Controller = () =>
{

    const { colorMode, toggleColorMode } = useColorMode()

    const bg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')

    return (
        <Flex
            zIndex={1000}
            flex={.4}
            justify={'center'}
            align={'center'}
            bg={bg}
            rounded={50}
            gap={5}
            mx={8}>

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