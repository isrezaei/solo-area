import {IconButton, Menu, MenuButton, MenuItem, MenuList , Avatar} from "@chakra-ui/react";
import {TriangleDownIcon} from "@chakra-ui/icons";
import {useSession} from "next-auth/react";

export const Account = () =>
{

    const {data : session } = useSession()


    return (
        <Menu>
            <MenuButton
                bgColor={'#1c1c1c'}
                color={'whiteAlpha.800'}
                height={'auto'}
                rounded={'3xl'}
                pl={3}
                as={IconButton}
                rightIcon={<Avatar name={session?.user.name} src={session?.user.image}/>}
                _hover={{ bg: 'transparent' }}
                _expanded={{ bg: '#1c1c1c' }}
                _focus={{ bg : '#1c1c1c' , boxShadow : 'none'}}>
                <TriangleDownIcon w={3} h={3} mr={2} color={'whiteAlpha.600'} />
                {session?.user.name}
            </MenuButton>

            <MenuList>
                <MenuItem>Sign Out</MenuItem>
            </MenuList>
        </Menu>
    )
}