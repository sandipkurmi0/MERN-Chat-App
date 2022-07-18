import React from 'react'
import { Box } from "@chakra-ui/layout";
import {
    FormControl,
    Input
} from '@chakra-ui/react'

const Chatbox = () => {
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
                d
            >sandip's Chats</Box>
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
            </Box>
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                style={{ display: "flex" }}
                w="100%"
                justifyContent="space-between"
                alignItems="center"
                d
            >
                <FormControl
                    //   onKeyDown={sendMessage}
                    id="first-name"
                    isRequired
                    mt={3}
                >
                    <Input
                        variant="filled"
                        bg="#E0E0E0"
                        placeholder="Enter a message.."
                    // value={newMessage}
                    // onChange={typingHandler}
                    />
                </FormControl>
            </Box>
        </Box>
    )
}

export default Chatbox