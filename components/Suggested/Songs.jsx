import {Stack} from "@chakra-ui/react";
import Options from "./Options";
import TextInfo from "./TextInfo";
import Images from "./Images";

const Songs = ({track}) => {


    return (
        <Stack
            direction={{sm : "column" , md : "row"}}
            w={"full"}
            justify={"space-between"}
            align={"center"}
            bg={{sm : "transparent" , md : "whiteAlpha.200"}}
            cursor={"pointer"}
            role={"group"}
            rounded={50}
            p={2}
            mr={{sm : 3 , md : 0}}
        >

            <Stack justify={"center"} align={"center"} direction={{sm : "column" , md : "row"}}>
                <Images track={track}/>
                <TextInfo track={track}/>
            </Stack>


            <Options track={track}/>

        </Stack>

    );
};

export default Songs;