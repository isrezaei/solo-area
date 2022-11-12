import {Button, Divider, Input, InputGroup, InputLeftElement, InputRightElement} from "@chakra-ui/react";
import {TbAdjustmentsHorizontal, TbPlayerRecord} from "react-icons/tb";

export const Search = () =>
{
    return (
        <InputGroup flex={6} size={'lg'}>
            <InputLeftElement
                pointerEvents='none'/>
            <Input
                type={"search"}
                placeholder={'Search...'}
                rounded={'50vw'}
                color={'#d7d7d7'}
                bg={'#1c1c1c'}
                borderColor={'#505050'}
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