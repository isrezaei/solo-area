import {useState} from "react";
import {
    Box,
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/react";

export const SearchBarModal = () =>
{
    const [isOpen, onOpen] = useState(false)

    return (
        <Box flex={1}>
            <Button w={"full"}  onClick={() => onOpen(prevState => !prevState)}>search your music</Button>

            <Modal onClose={()=> onOpen(prevState => !prevState)} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={()=> onOpen(prevState => !prevState)}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}