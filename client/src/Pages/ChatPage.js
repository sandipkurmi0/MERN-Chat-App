import React from 'react'
import { Box } from '@chakra-ui/react'
import { ChatState } from '../context/ChatProvider'
import Navbar from '../components/ChatsComponents/navBar/Navbar'
import MyChats from '.././components/ChatsComponents/MyChats'
import Chatbox from '.././components/ChatsComponents/Chatbox'

const ChatPage = () => {
    const { user } = ChatState()

    return (
        <div style={{ width: "100%" }}>
            {user && <Navbar />}
            <Box style={{ display: "flex" }} justifyContent="space-between" w="100%" h="91.5vh" p="10px">
                {user && <MyChats />}
                {user && (<Chatbox />)}
            </Box>
        </div>
    )
}

export default ChatPage