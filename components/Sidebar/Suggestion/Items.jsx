import {HStack} from "@chakra-ui/react";
import ItemsImages from "./ItemsImages";
import ItemsNames from "./ItemsNames";
import ItemsSubButton from "./ItemsSubButton";

const Items = ({artists}) => {
    return (
        <HStack
            key={artists.id}
            w={"full"}
            cursor={"pointer"}
            bg={"whiteAlpha.200"}
            rounded={"full"}
            pr={2}
        >
            <ItemsImages
                artists={artists}/>
            <ItemsNames
                artists={artists}/>
            <ItemsSubButton
                artists={artists}/>
        </HStack>
    );
};

export default Items;