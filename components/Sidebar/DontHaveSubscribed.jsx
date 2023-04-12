import {Icon, Text, VStack} from "@chakra-ui/react";
import {RiUserUnfollowFill} from "react-icons/ri";


const DontHaveSubscribed = () => {
    return (
        <VStack justify={"center"} h={65}>
            <Text>You don't have any subscribe</Text>
            <Icon as={RiUserUnfollowFill} boxSize={25}/>
        </VStack>
    );
};

export default DontHaveSubscribed;