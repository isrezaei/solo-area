import React from 'react';
import {IconButton, HStack, Text} from "@chakra-ui/react";
import {Searchbar} from "../Searchbar/Searchbar";
import {Account} from "./Account";
import Greetings from "./Greetings";
import {HAMBURGER_MENU} from "../../atoms/atoms";
import {useSetRecoilState} from "recoil";
import {FiMenu} from "react-icons/fi"

const Header = () => {

    const openHamburger = useSetRecoilState(HAMBURGER_MENU)

    return (
        <HStack zIndex={2} w={"full"} h={{sm: 65, md: 110}} justify={"space-between"} py={5} px={{sm: 2, md: 0}}>

            <HStack>
                <IconButton
                    aria-label={'HamburgerMenu'}
                    icon={<FiMenu size={25}/>}
                    bg={"none"}
                    display={{sm: "block", md: "block" , lg : "block" , xl : "none"}}
                    onClick={() => openHamburger(prev => !prev)} size={"xs"}/>
                <Text
                    fontSize={{sm: 20, md: "4xl"}}
                    fontWeight={"bold"}
                    color={"white"}>
                    <Greetings/>
                </Text>
            </HStack>


            <HStack>
                <Searchbar/>
                <Account/>
            </HStack>

        </HStack>

    );
};

export default Header;