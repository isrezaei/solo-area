import {Button, HStack, Text} from "@chakra-ui/react";

const Header = ({handelHeight , showMore}) => {
    return (
        <HStack>
            <Text fontSize={15} fontWeight={"bold"} color={"whiteAlpha.800"}>
                Subscriptions
            </Text>
            <Button size={"xs"} onClick={handelHeight}>
                {showMore ? "O" : "C"}
            </Button>
        </HStack>
    );
};

export default Header;