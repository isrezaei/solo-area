import {
    Button, color,
    Divider,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    useColorModeValue
} from "@chakra-ui/react";
import {TbAdjustmentsHorizontal, TbPlayerRecord} from "react-icons/tb";

export const Search = () =>
{

    const bg = useColorModeValue('blackAlpha.200', 'whiteAlpha.200')
    const color = useColorModeValue('whiteAlpha.800' , 'blackAlpha.800')
    const border = useColorModeValue('blackAlpha.300' , 'whiteAlpha.300')


    return (
        <InputGroup flex={6} size={'lg'}>
            <InputLeftElement
                pointerEvents='none'/>
            <Input
                type={"search"}
                placeholder={'Search...'}
                rounded={'50vw'}
                color={color}
                bg={bg}
                borderColor={border}
                fontSize={12}/>
            <InputRightElement width={"auto"} mx={5}>
                <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'}  >
                    Minimal
                </Button>
                <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'}  >
                    House
                </Button>
                <Button h={'1.75rem'} size={'xs'} mx={1} rounded={12} colorScheme={'blackAlpha'} >
                    Rack
                </Button>
                <Divider height={5} orientation={'vertical'} mx={2}/>
                <Button leftIcon={<TbAdjustmentsHorizontal size={18}/>} h={'1.75rem'} size={'xs'} mx={1} rounded={12} variant={'link'} >
                    Filters
                </Button>
            </InputRightElement>
        </InputGroup>
    )
}