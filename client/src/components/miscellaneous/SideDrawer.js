import React, { useState } from 'react'
import { useDisclosure } from "@chakra-ui/hooks";
import { Box, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import { Tooltip } from "@chakra-ui/tooltip";
import { ChatState } from "../../context/ChatProvider";
import { BellIcon } from '@chakra-ui/icons'
import { Avatar } from '@chakra-ui/react'
import { Input } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import { useHistory } from "react-router-dom";
import {
    Menu,
    MenuButton,
} from "@chakra-ui/menu";
import {
    Tag,
    TagLabel,
} from '@chakra-ui/react'
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
} from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem'
import { Spinner } from '@chakra-ui/react'



const SideDrawer = () => {
    const [search, setSearch] = useState("");
    const [searchResult, setSearchResult] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, setSelectedChat, chats, setChats } = ChatState();


    const toast = useToast()
    const history = useHistory();

    const LogoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
        window.location.reload(false);
        toast({
            title: "Logout successfully",
            status: 'success',
            duration: 2000,
            isClosable: true,
            variant: 'left-accent',
            position: "bottom",
        });
    };

    const handleSearch = async () => {
        if (!search) {
            toast({
                title: "Please Enter something in search",
                status: "warning",
                duration: 4000,
                isClosable: true,
                position: "top-left",
            });
            return;
        }

        try {
            setLoading(true)

            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };
            const { data } = await axios.get(`/api/search?search=${search}`, config)
            // console.log(data.data);
            setLoading(false)
            setSearchResult(data.data)

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Search Results",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }

    }

    const accessChat = async (userId) => {
        try {
            setLoadingChat(true)
            const config = {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
            };

            const { data } = await axios.post(`/api/chat`, { userId }, config)

            if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats])

            setSelectedChat(data.data)
            setLoadingChat(false)
            onClose();
            window.location.reload(false);

        } catch (error) {
            toast({
                title: "Error fetching the chat",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }


    return (
        <>
            <Box style={{ display: "flex" }}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
                    <Button variant="ghost" onClick={onOpen}>
                        <i className="fas fa-search"></i>
                        <Text d={{ base: "none", md: "flex" }} px={4}>
                            Search User
                        </Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="3xl" m={4} />
                        </MenuButton>
                    </Menu>
                    <Menu>
                        <MenuButton pb={5}>
                            <Tag size='lg' colorScheme='teal' borderRadius='full'>
                                <Avatar
                                    src={user?.data.pic}
                                    size='xs'
                                    name={user?.data.name}
                                    ml={-1}
                                    mr={2}
                                />
                                <TagLabel>{user?.data.name}</TagLabel>
                            </Tag>
                        </MenuButton>
                    </Menu>
                    <Menu >
                        <Button m={4} colorScheme='teal' variant='ghost' onClick={LogoutHandler}>
                            Logout
                        </Button>
                    </Menu>
                </div>
            </Box>


            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
                    <DrawerBody>
                        <Box style={{ display: "flex" }} pb={2}>
                            <Input
                                placeholder="Search by name or email"
                                mr={2}
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <Button onClick={handleSearch}>
                                Go
                            </Button>
                        </Box>
                        {
                            loading ? (
                                <ChatLoading />
                            ) : (
                                searchResult.map((user) => (
                                    <UserListItem
                                        key={user._id}
                                        user={user}
                                        handleFunction={() => accessChat(user._id)}
                                    />
                                )
                                )
                            )
                        }
                        {loadingChat && <Spinner ml="auto" style={{ display: "flex" }} />}
                    </DrawerBody>
                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SideDrawer