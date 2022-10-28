import {Flex, Container} from "@chakra-ui/react";
import {Main} from "../components/root_center/Main";
import {Sidebar} from "../components/root_sidebar/Sidebar";

export default function Home() {

    return (
        <Container maxW={'1990px'}>
            <Flex>
                <Sidebar/>
                <Main/>
            </Flex>
        </Container>
    )
}
