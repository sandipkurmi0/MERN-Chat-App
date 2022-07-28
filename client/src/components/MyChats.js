import React, { useState, useEffect } from 'react'
import { ChatState } from '../context/ChatProvider';
import { Box, Stack, useToast } from '@chakra-ui/react'
import axios from 'axios'
import ChatLoading from './ChatLoading';
import { Text } from '@chakra-ui/react'
import { getSender } from '../config/ChatLogics'
import "./styles.css"


const MyChats = () => {
    const [loggedUser, setLoggedUser] = useState();
    const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();


    const toast = useToast();

    const fetchChats = async () => {
        try {
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`
                }
            };

            const { data } = await axios.get('/api/chat', config);
            setChats(data.data)

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the chats",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom-left",
            });
        }
    }

    useEffect(() => {
        setLoggedUser(JSON.parse(localStorage.getItem('userInfo')))
        fetchChats()
    }, [])

    return (
        <>
            <Box
                style={{ display: { base: selectedChat ? "none" : "flex", md: "flex" } }}
                flexDir="column"
                alignItems="center"
                p={3}
                bg="white"
                w={{ base: "100%", md: "31%" }}
                borderRadius="lg"
                borderWidth="1px"
            >
                <Box
                    style={{ display: "flex" }}
                    pb={3}
                    px={3}
                    fontSize={{ base: "25px", md: "25px" }}
                    fontFamily="Work sans"
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >MyChats</Box>
                <Box
                    style={{ display: "flex" }}
                    flexDir="column"
                    p={3}
                    bg="#F8F8F8"
                    w="100%"
                    h="90%"
                    borderRadius="lg"
                    overflowY="hidden"
                >
                    {chats ? (
                        <Stack overflowY="scroll">
                            {chats.map((chat, index) => (
                                <Box onClick={() => setSelectedChat(chat)}
                                    cursor="pointer"
                                    bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                                    color={selectedChat === chat ? "white" : "black"}
                                    px={3}
                                    py={2}
                                    borderRadius="lg"
                                    key={index}>
                                    {console.log(chats)}
                                    <Text>
                                        {getSender(loggedUser.data, chat.users)}
                                    </Text>
                                </Box>
                            ))}
                        </Stack>
                    ) : (<ChatLoading />)}
                </Box>
            </Box>
        </>
    )
}

export default MyChats