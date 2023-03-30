import {HStack , Icon} from "@chakra-ui/react";
import {BiRightArrow , BiLeftArrow} from 'react-icons/bi'

function MySwiperControls({ onPrev , onNext }) {
    return (
        <HStack>
            <Icon boxSize={25} color={"whiteAlpha.600"} cursor={"pointer"} _hover={{color : "whiteAlpha.900"}} onClick={onPrev} as={BiLeftArrow}/>
            <Icon boxSize={25} color={"whiteAlpha.600"} cursor={"pointer"} _hover={{color : "whiteAlpha.900"}} onClick={onNext} as={BiRightArrow}/>
        </HStack>
    );
}

export default MySwiperControls;