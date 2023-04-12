import {Icon, Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {RiSearchLine} from "react-icons/ri";

const Header = ({setInputSearch}) => {
    const handleInputChange = e => setInputSearch(e.target.value)
    return (
        <>
            <InputGroup>
                {/*<InputLeftElement pointerEvents="none" children={<Icon as={RiSearchLine}/>}/>*/}
                <Input
                    type="text"
                    w={{sm : 210 , md : "sm"}}
                    fontSize={{sm : 10 , md : 12}}
                    bg="whiteAlpha.200"
                    color="white"
                    _placeholder={{color: 'whiteAlpha.800'}}
                    rounded="full"
                    border={"none"}
                    focusBorderColor="transparent"
                    placeholder="What do you want to listen to?"
                    onChange={handleInputChange}
                />
            </InputGroup>
        </>
    );
};

export default Header;