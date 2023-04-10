import {Text} from "@chakra-ui/react";

const Title = () => {
    return (
        <Text
            fontSize={{sm : 20 , md : 35}}
            fontWeight={"bold"}
            color={"white"}>
            Top 10 your favourite artists
        </Text>
    );
};

export default Title;