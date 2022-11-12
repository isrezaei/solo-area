import {Flex} from "@chakra-ui/react";
import {IoSettingsSharp} from "react-icons/io5";
import {HiBellAlert} from "react-icons/hi2";
import {RiLogoutCircleRLine} from "react-icons/ri";
import {signOut} from "next-auth/react";

export const Controller = () =>
{

    return (
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
    )
}