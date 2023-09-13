import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  Spinner,
  Text,
  Tooltip,
  useDisclosure
} from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import React from "react";
import { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../ApiConfig";
import ChatLoading from "../Avatar/ChatLoading.jsx";
import UserListItem from "../Avatar/UserListItem";

const SideDrawer = () => {
  const { user } = ChatState();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
//   const [loadingChat, setLoadingChat] = useState();
  const router = useNavigate();
  const logoutHandler = () => {
    localStorage.removeItem("ChatToken");
    router("/login");
  };
  const handleSearch=async()=>{
    if(!search)
   return toast.error("Please enter something in search")
   try{
    setLoading(true)
    const response=await api.get(`/user?search=${search}`)
    setLoading(false)
    setSearchResult(response.data)
    console.log(response.data,"datata")
  }catch(error){
    toast.error("Failed to load search result") 
  }
  }
  console.log(searchResult,"searchres")
  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="white"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
      >
        <Tooltip label="Search user to Chat" hasArrow placement="bottom-end">
          <Button variant="ghost" onClick={onOpen}>
            <i class="fa-solid fa-magnifying-glass"></i>
            <Text d={{ base: "none", md: "flex" }} px={4}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize="2xl" fontFamily="Arial">
          Chat Now
        </Text>
        <div>
          <Menu>
            <MenuButton p={1}>
              <BellIcon fontSize="2xl" m={1} />
              {/* <MenuList></MenuList> */}
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
              <Avatar
                size="sm"
                cursor="pointer"
                name={user?.name}
                src={user?.pic}
              ></Avatar>
            </MenuButton>
            <MenuList>
              <ProfileModal>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider />
              <MenuItem onClick={logoutHandler}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
        <DrawerBody>
          <Box display="flex" pb={2}>
            <Input
              placeholder="Search by name or email"
              mr={2}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button
             onClick={handleSearch}
             >
            Go
            </Button>
          </Box>
          {
            loading? 
            (<ChatLoading/>):
(
    searchResult?.map((ele)=>(
<UserListItem
                  key={ele._id}
                  user={ele}
/>
    ))
)
          }
          {/* <Spinner ml="auto" display="flex" /> */}
        </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default SideDrawer;
