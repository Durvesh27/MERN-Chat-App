import { ViewIcon } from "@chakra-ui/icons";
import {
  Button,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Image,
Text
} from "@chakra-ui/react";
import React from "react";
import { ChatState } from "../../Context/chatProvider";

const ProfileModal = ({ children }) => {
  const{user}=ChatState()
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        />
      )}
      <Modal isOpen={isOpen} onClose={onClose} size='lg' isCentered >
        <ModalOverlay />
        <ModalContent h='410px'>
          <ModalHeader
            fontSize="30px"
            display="flex"
            fontFamily="Arial"
            justifyContent="center"
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display='flex' flexDirection='column' alignItems='center' justifyContent='space-between'>
            <Image borderRadius='full' boxSize='150px' src={user?.pic} alt={user?.name}/>
            <Text fontSize={{base:"15px",md:"30px"}}>
            Email:{user?.email}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant="ghost">Secondary Action</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ProfileModal;
