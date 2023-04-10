import {Box, Icon, Menu, MenuButton, MenuDivider, MenuItem, MenuList} from "@chakra-ui/react";
import {HiDotsHorizontal} from "react-icons/hi";
import {useRouter} from "next/router";

const Options = ({track}) => {

    const router = useRouter()

    return (
        <Box>
            <Menu>
                <MenuButton>
                    <Icon color={"whiteAlpha.500"} as={HiDotsHorizontal}/>
                </MenuButton>
                <MenuList bg={"blackAlpha.900"}>
                    <MenuItem
                        onClick={() => router.push(`/artist/${track.artists[0].id}`)}>
                        Go to artist
                    </MenuItem>
                </MenuList>
            </Menu>
        </Box>
    );
};

export default Options;