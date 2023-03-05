import {Button, HStack} from "@chakra-ui/react";
import {useRecoilState} from "recoil";
import {selectGenre} from "../../atoms/atoms";
import ReactPaginate from "react-paginate";
import {
    active,
    breakClassName,
    breakLinkClassName,
    next,
    page,
    pageLink,
    pagination,
    previous
} from "../ExtraStyleSidebar";

const genresList = [
    {
      name : 'All',
      variant : 'pop'
    },
    {
        name : 'Relax',
        variant : 'soul'
    },
    {
        name : 'Workout',
        variant : 'work-out'
    },
    {
        name : 'Focus',
        variant : 'chill'
    },
    {
        name : 'Energize',
        variant : 'techno'
    }
]


export const SelectGenre = () =>
{

    const [genre , setGenre] = useRecoilState(selectGenre)

    return (
        <HStack w={"full"} spacing={5} >

                {
                    genresList.map(({name , variant}) => (
                        <Button key={name}
                                rounded={'sm'}
                                size={'xs'}
                                onClick={() => setGenre(variant)}
                                variant={genre === variant ? 'solid' : 'outline'}
                                colorScheme={'pink'}>{name}</Button>
                    ))
                }


        </HStack>

    )
}