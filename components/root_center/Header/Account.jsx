import {IconButton, Menu, MenuButton, MenuItem, MenuList , Avatar} from "@chakra-ui/react";
import {FETCH_ME} from "../../../lib/FetcherFuncs/FETCH_ME";
import useSWR from "swr";
import {TriangleDownIcon} from "@chakra-ui/icons";
import {useSetRecoilState} from "recoil";
import {LOGIN_TOKEN_ATOM} from "../../../atoms/atoms";


export const Account = () =>
{
    const {data : ME} = useSWR('GET ME INFORMATION' , async () => (await FETCH_ME()))
    const removeToken = useSetRecoilState(LOGIN_TOKEN_ATOM)


    const singOut = () => {

        removeToken(undefined)
        localStorage.removeItem('token')
    }


    return (
        <Menu>
            <MenuButton
                bgColor={'#1c1c1c'}
                color={'whiteAlpha.800'}
                height={'auto'}
                rounded={'3xl'}
                pl={3}
                as={IconButton}
                rightIcon={<Avatar name={ME?.display_name} src={ME?.images[0].url}/>}
                _hover={{ bg: 'transparent' }}
                _expanded={{ bg: '#1c1c1c' }}
                _focus={{ bg : '#1c1c1c' , boxShadow : 'none'}}>
                <TriangleDownIcon w={3} h={3} mr={2} color={'whiteAlpha.600'} />
                {ME?.display_name}
            </MenuButton>

            <MenuList>
                <MenuItem onClick={singOut}>Sign Out</MenuItem>
            </MenuList>
        </Menu>
    )
}