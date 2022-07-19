import React, { useState, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import SingleChats from './SingleChats'
import { useGetAllUsersQuery } from '../../services/massages'
import { ChatState } from '../../context/ChatProvider'

const MyChats = () => {

    const [activeListID, setActiveListID] = useState('');

    const { user } = ChatState();

    const { data } = useGetAllUsersQuery()

    var userList = [];

    if (data !== undefined) {
        userList = data.data
    }


    const result = userList.filter((userli) => {
        return userli._id !== user.data._id
    });

    const handleClick = (activeID) => {
        console.log(activeID);
        setActiveListID(activeID);
    }

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
                h="90%"
                borderRadius="lg"
                overflowY="hidden"
            >
                {result.map((user) => {
                    return <SingleChats
                        handleClick={handleClick}
                        user={user}
                        key={user._id}
                        activeListID={activeListID}
                    />
                })}

            </Box>

        </Box>
    )
}

export default MyChats