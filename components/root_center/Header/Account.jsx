import {IconButton, Menu, MenuButton, MenuItem, MenuList, Avatar, Button} from "@chakra-ui/react";
import {FETCH_ME} from "../../../lib/FetcherFuncs/FETCH_ME";
import useSWR from "swr";
import {TriangleDownIcon} from "@chakra-ui/icons";
import {useSetRecoilState} from "recoil";
import {LOGIN_TOKEN_ATOM} from "../../../atoms/atoms";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";


export const Account = () =>
{
    const {data : ME} = useSWR('GET ME INFORMATION' , async () => (await FETCH_ME()))
    const removeToken = useSetRecoilState(LOGIN_TOKEN_ATOM)

    const router = useRouter()

    const supabase = useSupabaseClient()

    const singOut = async () => {

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log('Error signing out:', error.message)
        } else {
            console.log('Signed out successfully')
            router.push('/login_signup')
        }

        // removeToken(undefined)
        // localStorage.removeItem('token')
    }


    return (
        <Menu>
            <MenuButton
                bgColor={'whiteAlpha.200'}
                color={'whiteAlpha.800'}
                height={'auto'}
                rounded={'3xl'}
                pl={3}
                as={IconButton}
                rightIcon={<Avatar name={ME?.display_name} src={ME?.images[0]?.url}/>}

                _expanded={{ bg: 'whiteAlpha.200' }}
                _focus={{ bg : '#1c1c1c' , boxShadow : 'none'}}>
                <TriangleDownIcon w={3} h={3} mr={2} color={'whiteAlpha.600'} />
                {ME?.display_name}
            </MenuButton>

            <MenuList>

            </MenuList>

            <Button cursor={'pointer'} onClick={singOut}>Sign Out</Button>
        </Menu>
    )
}