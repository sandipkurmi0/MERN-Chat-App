import React, { useEffect } from 'react'
import { Box, Text } from "@chakra-ui/layout";
import {
    FormControl,
    Input
} from '@chakra-ui/react'
import { ChatState } from '../../context/ChatProvider'


const Chatbox = () => {

    const { currentUser } = ChatState();
    // console.log(`currentUser`, currentUser);
    let user = "";

    useEffect(() => {
        if (currentUser !== undefined) {
            user = currentUser
        }
    }, [user])

    console.log(user)

    return (
        <Box
            // d={{ base: selectedChat ? "flex" : "none", md: "flex" }}
            alignItems="center"
            flexDir="column"
            p={3}
            bg="white"
            w={{ base: "100%", md: "68%" }}
            borderRadius="lg"
            borderWidth="1px"
        >
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                style={{ display: "flex" }}
                w="100%"
                justifyContent="space-between"
                alignItems="center"
            >{user.name}'s Chats</Box>
            <Box
                d="flex"
                flexDir="column"
                p={3}
                bg="#F8F8F8"
                w="100%"
                h="90%"
                borderRadius="lg"
                overflowY="hidden"
            >all the single chats


                <Box
                    pb={3}
                    px={3}
                    fontSize={{ base: "28px", md: "30px" }}
                    fontFamily="Work sans"
                    style={{ display: "flex" }}
                    w="100%"
                    justifyContent="space-between"
                    alignItems="center"
                >
                    <FormControl
                        //   onKeyDown={sendMessage}
                        id="first-name"
                        isRequired
                        style={{ top: "640px" }}
                    >
                        <Input
                            variant="filled"
                            bg="#E0E0E0"
                            placeholder="Enter a message.."
                        />
                    </FormControl>
                </Box>
            </Box>

        </Box>
    )
}

export default Chatbox