import { Box, Text } from '@chakra-ui/react'
import React from 'react'
import { BellIcon } from '@chakra-ui/icons'
import { Avatar, } from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'
import { Button } from "@chakra-ui/button";
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


const Navbar = () => {

    const toast = useToast()
    const { user } = ChatState();
    const history = useHistory();
    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
        toast({
            title: "Logout successfully",
            status: 'success',
            duration: 2000,
            isClosable: true,
            variant: 'left-accent',
            position: "bottom",
        });
    };

    return (
        <>
            <Box style={{ display: "flex", position: "sticky" }}
                justifyContent="space-between"
                alignItems="center"
                bg="white"
                w="100%"
                h="70px"
                p="5px 10px 5px 10px"

                borderWidth="5px">
                <Text fontSize="2xl" fontFamily="Work sans">
                    Chat-App
                </Text>
                <div>
                    <Menu>
                        <MenuButton p={1}>
                            <BellIcon fontSize="3xl" m={4} />
                        </MenuButton>
                        {/* {<MenuList></MenuList>} */}
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
                        <Button m={4} colorScheme='teal' variant='ghost' onClick={logoutHandler}>
                            Logout
                        </Button>
                    </Menu>
                </div>
            </Box>
        </>
    )
}

export default Navbar