import {IconButton, Menu, MenuButton, MenuItem, MenuList, Avatar, Button} from "@chakra-ui/react";
import {FETCH_ME} from "../../../lib/FetcherFuncs/FETCH_ME";
import useSWR from "swr";
import {TriangleDownIcon} from "@chakra-ui/icons";
import {useSupabaseClient , useUser} from "@supabase/auth-helpers-react";
import {useRouter} from "next/router";
import {useAsync} from "react-use";


export const Account = () =>
{
    const {data : ME} = useSWR('GET ME INFORMATION' , async () => (await FETCH_ME()))


    const router = useRouter()
    const supabase = useSupabaseClient()
    const user = useUser()


    const ownerUser = useAsync(async () => {

        if (user)
        {
            const {data  , error} = await supabase
                .from('USERS')
                .select(`*`).eq('id' , user.id)

            return data
        }

    } , [user])


    const singOut = async () =>
    {

        router.push('/login_signup')

        const { error } = await supabase.auth.signOut()

        if (error) {
            console.log('Error signing out:', error.message)
        } else {
            console.log('Signed out successfully')
        }

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
                rightIcon={<Avatar  src={ownerUser.value?.[0]?.avatar_url}/>}

                _expanded={{ bg: 'whiteAlpha.200' }}
                _focus={{ bg : '#1c1c1c' , boxShadow : 'none'}}>

                <TriangleDownIcon w={3} h={3} mr={2} color={'whiteAlpha.600'} />

                {ownerUser.value?.[0]?.firstname}

            </MenuButton>

            <MenuList  bgColor={"whiteAlpha.200"}>
                <MenuItem onClick={singOut}>
                    Sign Out
                </MenuItem>
            </MenuList>

        </Menu>
    )
}