import React from 'react'
import { Box } from '@chakra-ui/react'
import SingleChats from './SingleChats'

const MyChats = () => {
    return (

        <Box
            flexDir="column"
            alignItems="center"
            p={3}
            bg="white"
            w={{ base: "100%", md: "31%" }}
            borderRadius="lg"
            borderWidth="1px">
            <Box
                pb={3}
                px={3}
                fontSize={{ base: "28px", md: "30px" }}
                fontFamily="Work sans"
                style={{ display: "flex" }}
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
                h="100%"
                borderRadius="lg"
                overflowY="hidden"

            ><SingleChats />

            </Box>
        </Box>
    )
}

export default MyChats