import { Input } from "@chakra-ui/input";
import { FormControl } from "@chakra-ui/form-control";
import { useToast, Box, Text } from '@chakra-ui/react';
import { ChatState } from "../context/ChatProvider";
import { useEffect, useState, useRef } from "react";
// import ScrollableChat from "./ScrollableChat";
import Message from './Message/Message'
import { Spinner } from '@chakra-ui/react'
import axios from 'axios'


const SingleChat = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("")
    const toast = useToast();
    const { selectedChat, user } = ChatState();
    const scrollRef = useRef()


    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            const config = {
                headers: {
                    authorization: `Bearer ${user.token}`,
                }
            };

            setLoading(true)
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config)
            setMessages(data.data)
            setLoading(false)

        } catch (error) {
            toast({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    }

    const sendMessage = async (e) => {
        if (e.key === "Enter" && newMessage) {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        authorization: `Bearer ${user.token}`,
                    }
                };
                setNewMessage("");
                const { data } = await axios.post(`/api/message`, {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config)
                setMessages([...messages, data])
            } catch (error) {
                toast({
                    title: "Error Occured!",
                    description: "Failed to send the Messages",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom-left",
                });
            }
        }

    }

    const typingHandler = (e) => {
        setNewMessage(e.target.value)

        //Typing indicator Logic
    }

    useEffect(() => {
        fetchMessages();
    }, [selectedChat])

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        style={{ display: "flex" }}
                        justifyContent={{ base: "space-between" }}
                        alignItems="center"
                    >sandip</Text>
                    <Box
                        style={{ display: "flex" }}
                        flexDir="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="90%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto" />
                        ) : (
                            <>
                                {messages.map((msg, index) => (
                                    <div ref={scrollRef} key={index}>

                                        <Message message={msg} own={msg.sender._id === user.data._id} />
                                    </div>
                                ))}
                            </>

                        )}

                        <FormControl
                            onKeyDown={sendMessage}
                            id="first-name"
                            isRequired
                            mt={3}
                        >
                            <Input
                                variant="filled"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </FormControl>
                    </Box>
                </>

            ) : (
                <Box d="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>

            )}

        </>
    )
}

export default SingleChat