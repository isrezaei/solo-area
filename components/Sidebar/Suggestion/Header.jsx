import {Button, HStack, Text} from "@chakra-ui/react";

const Header = ({handelHeight , showMore }) => {
    return (
        <HStack w={"full"} justify={"flex-start"} spacing={3}>
            <Text fontSize={15} fontWeight={"bold"} color={"whiteAlpha.800"}>
                maybe you like it
            </Text>
            <Button
                size={"xs"}
                onClick={handelHeight}>
                {showMore ? "C" : "O"}
            </Button>
        </HStack>
    );
};

export default Header;