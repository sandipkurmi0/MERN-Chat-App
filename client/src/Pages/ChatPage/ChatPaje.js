import React, { useEffect, useState, useRef } from 'react'
import './chatPage.css'
import NavBar from '../../components/navBar/Navbar'
import Conversation from '../../components/conversations/Conversation'
import Message from '../../components/message/Message'
import { ChatState } from '../../context/ChatProvider'
import axios from 'axios'
import { useToast } from '@chakra-ui/react'
import { Text } from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

const ChatPaje = () => {

    const toast = useToast()
    const { user } = ChatState();
    const [conversations, setConversations] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [activeCurrentChat, setActiveCurrentChat] = useState('');
    // const [arivalMessage, setArivalMessage] = useState(null);
    const scrollRef = useRef()

    const currentChatHandler = (e, conv) => {
        e.preventDefault()
        setCurrentChat(conv)
        setActiveCurrentChat(conv)

    }

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await axios.get("/api/chat/" + user?.data._id)
                setConversations(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getConversations()
    }, [user?.data._id])

    useEffect(() => {
        const getMessages = async () => {
            try {
                const res = await axios.get("/api/message/" + currentChat?._id)
                setMessages(res.data.data)
            } catch (error) {
                console.log(error);
            }
        }
        getMessages()
    }, [currentChat])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender_id: user.id,
            message: newMessage,
            chatId: currentChat._id
        }

        try {
            const res = await axios.post("/api/message", message)
            console.log(res)
            setMessages([...messages, res.data.data])
            setNewMessage("")
            toast({
                title: "Message has been successfully sent",
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: "bottom",
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    return (
        <>
            <NavBar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((conv, index) => (

                            <div onClick={(e) => currentChatHandler(e, conv)} className={conv?._id === currentChat?._id ? 'active' : ""}>
                                {console.log(conv)}
                                <Conversation conversation={conv} currentUser={user} key={index} />
                            </div>
                        ))}

                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((msg, index) => (
                                        <div ref={scrollRef}>
                                            <Message message={msg} own={msg.sender === user._id} key={index} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea onChange={(e) => setNewMessage(e.target.value)} value={newMessage} className="chatMessageInput" placeholder="write some thing"></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit} >
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                <Text fontSize='50px' color='#29928B'>
                                    Open a conversation to start a chat
                                </Text>
                            </span>
                        )}

                    </div>

                </div>
            </div>


        </>
    )
}

export default ChatPaje