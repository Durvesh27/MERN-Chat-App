import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import api from "../ApiConfig";
import toast from "react-hot-toast";
import UserListItem from "../Avatar/UserListItem";
import UserBadgeItem from "../Avatar/UserBadgeItem";

const GroupChatModal = ({ children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [groupChatName, setGroupChatName] = useState();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, chats, setChats } = ChatState();

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
      return;
    }
    try {
      setLoading(true);
      const { data } = await api.get(`/user?search=${search}`);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast.error(error.message);
    }
  };
  const handleSubmit =async() => {
    if(!groupChatName || !selectedUsers){
    return toast.error("Please Fill all the Fields")
    }
    try{
const{data}=await api.post('/chat/group',{
    name:groupChatName,
    users:JSON.stringify(selectedUsers.map(p=>p._id))
})
setChats([data,...chats])
onClose()
toast.success("New Group Created")
    }catch(error){
    toast.error("Failed to create chat")
    }
  };
  const handleDelete = (delUser) => {
    setSelectedUsers(selectedUsers.filter((sel)=>sel._id!==delUser._id))
  };
  const handleGroup = (userToAdd) => {
    if(selectedUsers.includes(userToAdd)){
    return toast("User already added")
    }
    setSelectedUsers([...selectedUsers,userToAdd])
  };
  return (
    <>
      <span onClick={onOpen}>{children}</span>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader
            fontSize="25px"
            fontFamily="Arial"
            display="flex"
            justifyContent="center"
          >
            Create Group Chat
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody d="flex" flexDir="column" alignItems="center">
            <FormControl>
              <Input
                placeholder="Chat name"
                mb={3}
                onChange={(e) => setGroupChatName(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <Input
                placeholder="Add users eg: John,David,Mitchell"
                mb={3}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </FormControl>
            {selectedUsers?.map((u)=>(
                <UserBadgeItem
                key={u._id}
                user={u}
 handleFunction={()=>handleDelete(u)}
                />
            ))}
            {loading ? (
              <div>Loading...</div>
            ) : (
              searchResult
                ?.slice(0, 4)
                .map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => handleGroup(user)}
                  />
                ))
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Create Chat
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default GroupChatModal;
