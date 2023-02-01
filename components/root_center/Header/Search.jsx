import {
    Button, color,
    Divider, HStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement, Tag, TagCloseButton, TagLabel,
    useColorModeValue
} from "@chakra-ui/react";
import {TbAdjustmentsHorizontal, TbPlayerRecord} from "react-icons/tb";
import {PhoneIcon, SpinnerIcon} from "@chakra-ui/icons";

export const Search = () =>
{

    const bg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
    const color = useColorModeValue('blackAlpha.600' , 'whiteAlpha.600')
    const border = useColorModeValue('blackAlpha.300' , 'whiteAlpha.300')


    return (
        <HStack flex={1} zIndex={1000}>
            <Tag size={'sm'}>
                <TagLabel>Minimal</TagLabel>
                <TagCloseButton />
            </Tag>

            <Tag size={'sm'}>
                <TagLabel>House</TagLabel>
                <TagCloseButton />
            </Tag>
            <Divider height={5} orientation={'vertical'} mx={2}/>
            <Tag colorScheme={'green'} size={'sm'}>Filters</Tag>
        </HStack>
    )
}