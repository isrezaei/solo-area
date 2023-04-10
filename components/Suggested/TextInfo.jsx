import {Text, Stack} from "@chakra-ui/react";

const TextInfo = ({track}) => {
    return (
        <Stack align={{sm : "center" , md : "flex-start"}} spacing={0}>
            <Text noOfLines={1}
                fontWeight={"bold"}>
                {track.name}
            </Text>
            <Text fontSize={"xs"} color={"whiteAlpha.800"}>
                {track.artists[0].name}
            </Text>
        </Stack>
    );
};

export default TextInfo;