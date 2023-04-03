import {Icon, Text, VStack} from "@chakra-ui/react";
import {RiUserFollowLine} from "react-icons/ri";

const Empty = () => {
    return (
        <VStack justify={"center"} h={75}>
            <Text textAlign={"center"} fontSize={"md"} w={"full"}>
                You don't have any Subscriptions
            </Text>
            <Icon fontSize={"2xl"} as={RiUserFollowLine}/>
        </VStack>
    );
};

export default Empty;