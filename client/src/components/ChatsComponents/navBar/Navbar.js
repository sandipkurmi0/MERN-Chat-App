import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { Avatar, } from '@chakra-ui/react'
import { ChatState } from '../../../context/ChatProvider'
import { Button } from "@chakra-ui/button";
import ProfileModal from "./ProfileModal";
import { useHistory } from "react-router-dom";
import {
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
} from "@chakra-ui/menu";
const Navbar = () => {

    const { user } = ChatState();
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    return (
        <>
            <Box style={{ display: "flex" }}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                p="5px 10px 5px 10px"
                borderWidth="5px">
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat-App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="2xl" m={1} />
                        </MenuButton>
                        {/* {<MenuList></MenuList>} */}
                    </Menu>
                    <Menu>
                        <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                            <Avatar
                                size="sm"
                                cursor="pointer"
                                name={user.data.name}
                                src={user.data.pic}
                            />
                        </MenuButton>
                        <MenuList>
                            <ProfileModal user={user.data}>
                                <MenuItem>My Profile</MenuItem>
                            </ProfileModal>
                            <MenuDivider />
                            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                        </MenuList>

                    </Menu>
                </div>

            </Box>



        </>
    )
}

export default Navbar